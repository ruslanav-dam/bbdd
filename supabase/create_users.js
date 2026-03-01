/**
 * BBDD Exam Platform — Crear usuaris al Supabase
 *
 * Ús:
 *   1. Afegeix SUPABASE_URL i SERVICE_ROLE_KEY al .env o directament aquí
 *   2. node supabase/create_users.js
 *
 * Necessita: npm install @supabase/supabase-js (ja instal·lat al projecte)
 *
 * IMPORTANT: usa la SERVICE_ROLE_KEY (Settings > API > service_role), mai l'anon key
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL      = process.env.VITE_SUPABASE_URL      || 'https://TU_PROJECTE.supabase.co'
const SERVICE_ROLE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || 'TU_SERVICE_ROLE_KEY'
const INITIAL_PASSWORD  = 'LaSalle2026!'   // alumnes l'han de canviar

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const USERS = [
  // Professor
  {
    email:     'irvirijac@lasalle.cat',
    full_name: 'Profesor',
    role:      'teacher',
    is_whitelisted: true,
  },
  // Alumnes
  { email: 'ignacioalvarezfernandez@tarragona.lasalle.cat', full_name: 'Ignacio Álvarez Fernández',  role: 'student', is_whitelisted: true },
  { email: 'rogerbasoramarrase@tarragona.lasalle.cat',      full_name: 'Roger Basora Marrasé',       role: 'student', is_whitelisted: true },
  { email: 'stefanodelmonteperez@tarragona.lasalle.cat',    full_name: 'Stefano Delmonte Pérez',     role: 'student', is_whitelisted: true },
  { email: 'adriagalerasanchez@tarragona.lasalle.cat',      full_name: 'Adrià Galera Sánchez',       role: 'student', is_whitelisted: true },
  { email: 'hectormoracobo@tarragona.lasalle.cat',          full_name: 'Héctor Mora Cobo',           role: 'student', is_whitelisted: true },
  { email: 'normanperezmalanda@tarragona.lasalle.cat',      full_name: 'Norman Pérez Malanda',       role: 'student', is_whitelisted: true },
  { email: 'daniiltingaevsoloviev@tarragona.lasalle.cat',   full_name: 'Daniil Tingaev Soloviev',    role: 'student', is_whitelisted: true },
]

async function main() {
  console.log('Creant usuaris a Supabase Auth...\n')

  for (const u of USERS) {
    const { data, error } = await supabase.auth.admin.createUser({
      email:         u.email,
      password:      INITIAL_PASSWORD,
      email_confirm: true,
      user_metadata: {
        full_name:      u.full_name,
        role:           u.role,
        is_whitelisted: u.is_whitelisted,
      },
    })

    if (error) {
      console.error(`✗ ${u.full_name.padEnd(30)} ${error.message}`)
    } else {
      console.log(`✓ ${u.full_name.padEnd(30)} ${data.user.id}`)
    }
  }

  console.log(`\nContrasenya inicial per a tots: ${INITIAL_PASSWORD}`)
  console.log('Executa ara: supabase/seed.sql al SQL Editor de Supabase')
}

main()
