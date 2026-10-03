import { useEffect, useState } from 'react'

export function useMedia(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

export const useIsMobile = () => useMedia('(max-width: 767px)')
/** True for mouse/trackpad devices. Tilt and magnetic effects are skipped on touch. */
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)')
