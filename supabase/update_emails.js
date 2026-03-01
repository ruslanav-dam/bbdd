/**
 * Actualitza els emails dels usuaris ja creats a Supabase.
 * Ús: node --env-file=.env supabase/update_emails.js
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const UPDATES = [
  { id: '3908e4d0-a6f2-4d8f-8d86-4c3e5034d803', name: 'Profesor',                    email: 'irvirijac@lasalle.cat' },
  { id: 'f466afdc-2688-4cdc-bdc0-0aeebeaff7a5', name: 'Ignacio Álvarez Fernández',   email: 'ignacioalvarezfernandez@tarragona.lasalle.cat' },
  { id: 'b4d8c667-ddf6-4933-80a9-173c506b37b6', name: 'Roger Basora Marrasé',        email: 'rogerbasoramarrase@tarragona.lasalle.cat' },
  { id: '4563c243-3b56-45fd-bcfa-934a38719f5b', name: 'Stefano Delmonte Pérez',      email: 'stefanodelmonteperez@tarragona.lasalle.cat' },
  { id: '8ba131e7-8eb0-4e50-a956-db7e5906beab', name: 'Adrià Galera Sánchez',        email: 'adriagalerasanchez@tarragona.lasalle.cat' },
  { id: '7c976795-2911-4023-879e-86905196b1d6', name: 'Héctor Mora Cobo',            email: 'hectormoracobo@tarragona.lasalle.cat' },
  { id: 'f51407f9-a2d9-4479-8b5e-c1927304dae8', name: 'Norman Pérez Malanda',       email: 'normanperezmalanda@tarragona.lasalle.cat' },
  { id: 'f0c7c7fd-e1d9-4950-8877-561a0f8b5b57', name: 'Daniil Tingaev Soloviev',    email: 'daniiltingaevsoloviev@tarragona.lasalle.cat' },
]

async function main() {
  console.log('Actualitzant emails a Supabase Auth...\n')

  for (const u of UPDATES) {
    const { error } = await supabase.auth.admin.updateUserById(u.id, { email: u.email })
    if (error) {
      console.error(`✗ ${u.name.padEnd(30)} ${error.message}`)
    } else {
      console.log(`✓ ${u.name.padEnd(30)} → ${u.email}`)
    }
  }

  console.log('\nFet! Ara executa update_profiles.sql al SQL Editor de Supabase.')
}

main()
