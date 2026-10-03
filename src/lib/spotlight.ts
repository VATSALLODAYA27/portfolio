import type { PointerEvent } from 'react'

/** Feeds the cursor position to the `.spotlight` highlight in index.css. */
export function spotlightMove(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
