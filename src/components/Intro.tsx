import { motion } from 'framer-motion'
import { useEffect } from 'react'

/** Short page-load moment. It unmounts after ~1.2s and hands off to the hero entrance. */
export function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 1250)
    return () => window.clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.span
        className="display text-6xl text-fog"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        VL
      </motion.span>
      <motion.span
        className="mt-5 h-px w-28 origin-left bg-champagne/70"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.div>
  )
}
