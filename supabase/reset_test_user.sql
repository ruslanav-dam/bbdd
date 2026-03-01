-- ═══════════════════════════════════════════════════════════════════════════
-- RESET examen — usuari de test
-- Executar al SQL Editor de Supabase
-- ═══════════════════════════════════════════════════════════════════════════

-- Esborra en cascada: attempt_answers, active_sessions i audit_events
-- s'eliminen automàticament per ON DELETE CASCADE
DELETE FROM exam_attempts
WHERE user_id = (
  SELECT id FROM profiles WHERE email = 'alumne.test@tarragona.lasalle.cat'
);

-- Verificació
SELECT 'Intents restants:' AS info, COUNT(*) AS n
FROM exam_attempts
WHERE user_id = (
  SELECT id FROM profiles WHERE email = 'alumne.test@tarragona.lasalle.cat'
);
