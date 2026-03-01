import { useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

/**
 * useHeartbeat
 * Envia un ping a Supabase cada 5s per mantenir la sessió activa.
 * Si el servidor respon FALSE (token invàlid → sessió robada), crida onConflict.
 *
 * @param {string}   sessionToken - token de la sessió activa
 * @param {string}   userId       - UUID de l'usuari
 * @param {boolean}  active       - l'examen s'està executant
 * @param {function} onConflict   - callback si la sessió ha estat revocada
 */
export default function useHeartbeat(sessionToken, userId, active, onConflict) {
  const tokenRef = useRef(sessionToken)

  useEffect(() => {
    tokenRef.current = sessionToken
  }, [sessionToken])

  useEffect(() => {
    if (!active || !sessionToken || !userId) return

    const interval = setInterval(async () => {
      if (!tokenRef.current) return
      try {
        const { data, error } = await supabase.rpc('heartbeat_session', {
          p_session_token: tokenRef.current,
        })
        if (error || data === false) {
          onConflict('Sessió invàlida: un altre dispositiu ha iniciat sessió')
        }
      } catch {
        // Ignora errors de xarxa puntuals
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [active, sessionToken, userId]) // eslint-disable-line react-hooks/exhaustive-deps
}
