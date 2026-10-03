import { useEffect } from 'react'

/**
 * Shared, non-reactive input state read every frame by the 3D scene.
 * Kept outside React state so pointer and scroll events never trigger re-renders.
 */
export const input = { mx: 0, my: 0, scroll: 0 }

export function useSceneInput(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      input.mx = (e.clientX / window.innerWidth) * 2 - 1
      input.my = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      input.scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    onScroll()
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled])
}
