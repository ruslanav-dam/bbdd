-- ═══════════════════════════════════════════════════════════════════════════
-- BBDD EXAM PLATFORM — Supabase Schema
-- Executar al SQL Editor del projecte Supabase (com a superuser)
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Profiles (whitelist) ─────────────────────────────────────────────────────
-- Estén auth.users amb rol i control de whitelist
CREATE TABLE IF NOT EXISTS profiles (
  id             UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email          TEXT UNIQUE NOT NULL,
  full_name      TEXT NOT NULL,
  role           TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student','teacher')),
  is_whitelisted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger: crea el profile automàticament en fer signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role, is_whitelisted)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE((NEW.raw_user_meta_data->>'is_whitelisted')::boolean, FALSE)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── Exam Attempts ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS exam_attempts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_slug        TEXT NOT NULL,
  user_id          UUID NOT NULL REFERENCES profiles(id),
  status           TEXT NOT NULL DEFAULT 'in_progress'
                   CHECK (status IN ('in_progress','submitted','suspended')),
  session_token    UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  score            NUMERIC(5,2),
  score_pct        NUMERIC(5,2),
  passed           BOOLEAN,
  started_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at     TIMESTAMPTZ,
  time_spent_sec   INT,
  time_left_sec    INT,
  infraction_count INT NOT NULL DEFAULT 0,
  user_agent       TEXT
);

CREATE INDEX IF NOT EXISTS idx_attempts_user ON exam_attempts (user_id, exam_slug, status);

-- Trigger: impedeix una segona entrega per al mateix user+exam
CREATE OR REPLACE FUNCTION prevent_double_submission()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status = 'submitted' THEN
    IF EXISTS (
      SELECT 1 FROM exam_attempts
      WHERE user_id   = NEW.user_id
        AND exam_slug = NEW.exam_slug
        AND status    = 'submitted'
        AND id        != NEW.id
    ) THEN
      RAISE EXCEPTION 'already_submitted: L''examen ja ha estat entregat';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_double_submission ON exam_attempts;
CREATE TRIGGER trg_prevent_double_submission
  BEFORE INSERT OR UPDATE ON exam_attempts
  FOR EACH ROW EXECUTE FUNCTION prevent_double_submission();

-- ── Attempt Answers ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attempt_answers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id      UUID NOT NULL REFERENCES exam_attempts(id) ON DELETE CASCADE,
  question_number INT NOT NULL,
  question_type   TEXT NOT NULL CHECK (question_type IN ('mc','fill','write')),
  mc_answer       TEXT,           -- 'A' | 'B' | 'C' | 'D'
  fill_values     TEXT[],         -- ['AVG'] o ['HAVING','3']
  write_text      TEXT,
  is_correct      BOOLEAN,
  is_partial      BOOLEAN NOT NULL DEFAULT FALSE,
  points_awarded  NUMERIC(5,2) NOT NULL DEFAULT 0,
  UNIQUE (attempt_id, question_number)
);

-- ── Active Sessions (un navegador a la vegada) ───────────────────────────────
CREATE TABLE IF NOT EXISTS active_sessions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id     UUID NOT NULL REFERENCES exam_attempts(id) ON DELETE CASCADE,
  user_id        UUID NOT NULL REFERENCES profiles(id),
  session_token  UUID NOT NULL UNIQUE,
  last_heartbeat TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RPC: reclama una sessió exclusiva (mata sessions zombie de >10s)
CREATE OR REPLACE FUNCTION claim_exam_session(p_attempt_id UUID)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_user_id   UUID := auth.uid();
  existing_hb TIMESTAMPTZ;
  new_token   UUID := gen_random_uuid();
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;

  SELECT last_heartbeat INTO existing_hb
  FROM active_sessions
  WHERE user_id = v_user_id AND is_active = TRUE
  ORDER BY last_heartbeat DESC
  LIMIT 1;

  IF FOUND AND (NOW() - existing_hb) < INTERVAL '10 seconds' THEN
    RAISE EXCEPTION 'session_conflict: Sessió activa en un altre navegador o pestanya';
  END IF;

  -- Invalida sessions anteriors
  UPDATE active_sessions SET is_active = FALSE WHERE user_id = v_user_id;

  INSERT INTO active_sessions (attempt_id, user_id, session_token)
  VALUES (p_attempt_id, v_user_id, new_token);

  RETURN new_token;
END;
$$;

-- RPC: heartbeat (cridat cada 5s pel client)
CREATE OR REPLACE FUNCTION heartbeat_session(p_session_token UUID)
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_user_id    UUID := auth.uid();
  rows_updated INT;
BEGIN
  IF v_user_id IS NULL THEN RETURN FALSE; END IF;

  UPDATE active_sessions
  SET last_heartbeat = NOW()
  WHERE session_token = p_session_token
    AND user_id       = v_user_id
    AND is_active     = TRUE;

  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  RETURN rows_updated > 0;
END;
$$;

-- ── Audit Events (trampes i sospites) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id  UUID NOT NULL REFERENCES exam_attempts(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id),
  event_type  TEXT NOT NULL,   -- 'tab_hidden'|'window_blur'|'copy_attempt'|'devtools'|...
  event_data  JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_attempt ON audit_events (attempt_id, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_type    ON audit_events (event_type);

-- ── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_attempts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events    ENABLE ROW LEVEL SECURITY;

-- Helper: és professor?
CREATE OR REPLACE FUNCTION is_teacher()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT COALESCE((SELECT role = 'teacher' FROM profiles WHERE id = auth.uid()), FALSE);
$$;

-- profiles
DROP POLICY IF EXISTS "profiles_read"   ON profiles;
DROP POLICY IF EXISTS "profiles_insert" ON profiles;
DROP POLICY IF EXISTS "profiles_update" ON profiles;
CREATE POLICY "profiles_read"   ON profiles FOR SELECT USING (id = auth.uid() OR is_teacher());
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (id = auth.uid() OR is_teacher());

-- exam_attempts
DROP POLICY IF EXISTS "attempts_select" ON exam_attempts;
DROP POLICY IF EXISTS "attempts_insert" ON exam_attempts;
DROP POLICY IF EXISTS "attempts_update" ON exam_attempts;
CREATE POLICY "attempts_select" ON exam_attempts FOR SELECT USING (user_id = auth.uid() OR is_teacher());
CREATE POLICY "attempts_insert" ON exam_attempts FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "attempts_update" ON exam_attempts FOR UPDATE USING (user_id = auth.uid() OR is_teacher());

-- attempt_answers
DROP POLICY IF EXISTS "answers_select" ON attempt_answers;
DROP POLICY IF EXISTS "answers_insert" ON attempt_answers;
DROP POLICY IF EXISTS "answers_update" ON attempt_answers;
CREATE POLICY "answers_select" ON attempt_answers FOR SELECT USING (
  EXISTS (SELECT 1 FROM exam_attempts e WHERE e.id = attempt_id AND (e.user_id = auth.uid() OR is_teacher()))
);
CREATE POLICY "answers_insert" ON attempt_answers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM exam_attempts e WHERE e.id = attempt_id AND e.user_id = auth.uid())
);
CREATE POLICY "answers_update" ON attempt_answers FOR UPDATE USING (
  EXISTS (SELECT 1 FROM exam_attempts e WHERE e.id = attempt_id AND e.user_id = auth.uid())
);

-- active_sessions
DROP POLICY IF EXISTS "sessions_all" ON active_sessions;
CREATE POLICY "sessions_all" ON active_sessions FOR ALL USING (user_id = auth.uid() OR is_teacher());

-- audit_events
DROP POLICY IF EXISTS "audit_insert" ON audit_events;
DROP POLICY IF EXISTS "audit_select" ON audit_events;
CREATE POLICY "audit_insert" ON audit_events FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "audit_select" ON audit_events FOR SELECT USING (user_id = auth.uid() OR is_teacher());
