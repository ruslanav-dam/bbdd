-- ═══════════════════════════════════════════════════════════════════════════
-- SEED — Executar DESPRÉS de schema.sql al SQL Editor de Supabase
-- ═══════════════════════════════════════════════════════════════════════════

-- Pas 1: Insereix profiles des de auth.users pels usuaris que ja existien
-- (necessari perquè el trigger handle_new_user no existia quan es van crear)
INSERT INTO profiles (id, email, full_name, role, is_whitelisted)
SELECT
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', ''),
  COALESCE(raw_user_meta_data->>'role', 'student'),
  COALESCE((raw_user_meta_data->>'is_whitelisted')::boolean, FALSE)
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
  full_name      = EXCLUDED.full_name,
  role           = EXCLUDED.role,
  is_whitelisted = EXCLUDED.is_whitelisted;

-- Pas 2: Assegura rol teacher per al professor
UPDATE profiles
SET role = 'teacher', is_whitelisted = TRUE
WHERE email = 'irvirijac@lasalle.cat';

-- Pas 3: Assegura whitelist per a tots els alumnes
UPDATE profiles
SET is_whitelisted = TRUE
WHERE email IN (
  'ignacioalvarezfernandez@tarragona.lasalle.cat',
  'rogerbasoramarrase@tarragona.lasalle.cat',
  'stefanodelmonteperez@tarragona.lasalle.cat',
  'adriagalerasanchez@tarragona.lasalle.cat',
  'hectormoracobo@tarragona.lasalle.cat',
  'normanperezmalanda@tarragona.lasalle.cat',
  'daniiltingaevsoloviev@tarragona.lasalle.cat'
);

-- Verificació
SELECT email, full_name, role, is_whitelisted
FROM profiles
ORDER BY role DESC, full_name;
