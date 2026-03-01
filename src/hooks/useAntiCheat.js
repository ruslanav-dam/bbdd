import { useEffect, useRef } from 'react'

/**
 * useAntiCheat
 * Detecta i registra intents de trampa mentre l'examen està actiu.
 *
 * @param {boolean}  active       - l'examen s'està executant
 * @param {function} onInfraction - callback({ type, detail }) cridat en cada infracció
 */
export default function useAntiCheat(active, onInfraction) {
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    if (!active) return

    function fire(type, detail = '') {
      if (!activeRef.current) return
      onInfraction({ type, detail, ts: new Date().toISOString() })
    }

    // ── Tab / visibilitat ─────────────────────────────────────────────────
    function onVisibility() {
      if (document.hidden) fire('tab_hidden', 'Canvi de pestanya o minimització')
    }

    // ── Pèrdua de focus (Alt+Tab, click fora) ─────────────────────────────
    function onBlur() {
      fire('window_blur', "Pèrdua de focus: Alt+Tab o canvi d'aplicació")
    }

    // ── Teclat: DevTools, Ctrl+U, Ctrl+A, etc. ───────────────────────────
    function onKey(e) {
      const ctrl = e.ctrlKey || e.metaKey
      if (e.key === 'F12') {
        e.preventDefault()
        fire('devtools_key', 'F12 premut')
        return
      }
      if (ctrl && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase())) {
        e.preventDefault()
        fire('devtools_key', `Ctrl+Shift+${e.key.toUpperCase()} premut`)
        return
      }
      if (ctrl && e.key.toLowerCase() === 'u') {
        e.preventDefault()
        fire('view_source', 'Ctrl+U premut')
        return
      }
      if (ctrl && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        fire('select_all', 'Ctrl+A premut')
        return
      }
      if (ctrl && e.key.toLowerCase() === 's') {
        e.preventDefault()
        fire('save_attempt', 'Ctrl+S premut')
        return
      }
      // Ctrl+C fora d'un textarea → intent de copiar
      if (ctrl && e.key.toLowerCase() === 'c') {
        const tag = document.activeElement?.tagName
        if (tag !== 'TEXTAREA' && tag !== 'INPUT') {
          fire('copy_attempt', 'Ctrl+C fora de camp de text')
        }
      }
    }

    // ── Menú contextual ──────────────────────────────────────────────────
    function onContext(e) {
      e.preventDefault()
      fire('context_menu', 'Clic dret detectat')
    }

    // ── DevTools per dimensions (comprova cada 2s) ────────────────────────
    const devtoolsInterval = setInterval(() => {
      if (!activeRef.current) return
      const wDiff = window.outerWidth  - window.innerWidth
      const hDiff = window.outerHeight - window.innerHeight
      if (wDiff > 160 || hDiff > 160) {
        fire('devtools_size', `DevTools oberts (w:${wDiff} h:${hDiff})`)
      }
    }, 2000)

    // ── Print ─────────────────────────────────────────────────────────────
    function onBeforePrint() {
      fire('print_attempt', 'Intent d\'impressió')
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('blur',               onBlur)
    document.addEventListener('keydown',          onKey)
    document.addEventListener('contextmenu',      onContext)
    window.addEventListener('beforeprint',        onBeforePrint)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur',               onBlur)
      document.removeEventListener('keydown',          onKey)
      document.removeEventListener('contextmenu',      onContext)
      window.removeEventListener('beforeprint',        onBeforePrint)
      clearInterval(devtoolsInterval)
    }
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps
}
