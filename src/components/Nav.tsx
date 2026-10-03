import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { asset, navItems, site, type SectionId } from '../data/resume'
import { scrollToId } from '../lib/scroll'
import { CloseIcon, DownloadIcon, MenuIcon } from './Icons'

export function Nav({ active, visible }: { active: SectionId; visible: boolean }) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const go = (id: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id, reduced)
  }

  // Lock page scroll and manage focus while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-5"
        initial={{ opacity: 0, y: -18 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Desktop: floating pill */}
        <nav aria-label="Primary" className="glass pointer-events-auto hidden items-center gap-0.5 rounded-full p-1.5 md:flex">
          {navItems.map(({ id, label }) => {
            const isActive = active === id
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={go(id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-mute hover:text-fog'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative">{label}</span>
              </a>
            )
          })}
          <a
            href={asset(site.resumeFile)}
            download
            className="ml-1 inline-flex items-center gap-2 rounded-full bg-champagne px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            <DownloadIcon width={15} height={15} />
            Resume
          </a>
        </nav>

        {/* Mobile: compact bar + full-screen menu */}
        <div className="glass pointer-events-auto flex w-full items-center justify-between rounded-full py-1.5 pl-5 pr-1.5 backdrop-blur-xl md:hidden">
          <a href="#home" onClick={go('home')} className="display text-xl" aria-label="Vatsal Lodaya, back to top">
            VL
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-11 place-items-center rounded-full text-fog"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="space-y-1">
              {navItems.map(({ id, label }, i) => (
                <li key={id}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={active === id ? 'true' : undefined}
                    className={`display block py-2 text-[2.6rem] leading-tight ${active === id ? 'text-champagne' : 'text-fog'}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={asset(site.resumeFile)}
              download
              className="mt-10 inline-flex w-fit items-center gap-2.5 rounded-full bg-champagne px-6 py-3 text-[0.95rem] font-medium text-ink"
            >
              <DownloadIcon />
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
