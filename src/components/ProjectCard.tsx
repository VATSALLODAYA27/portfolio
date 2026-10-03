import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useId, useState } from 'react'
import type { PointerEvent } from 'react'
import { asset, type Project } from '../data/resume'
import { useFinePointer } from '../hooks/useMedia'
import { spotlightMove } from '../lib/spotlight'
import { ChevronIcon, ExternalIcon, GitHubIcon } from './Icons'
import { Motif } from './Motifs'

export function ProjectCard({ project: p }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const detailsId = useId()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 180, damping: 20 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 20 })
  const tilt = fine && !reduced && !open

  const onMove = (e: PointerEvent<HTMLElement>) => {
    spotlightMove(e)
    if (!tilt) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`spotlight glass overflow-hidden rounded-[1.75rem] ${
        p.wide ? 'md:col-span-2 lg:grid lg:grid-cols-[1.05fr_1fr]' : ''
      }`}
    >
      {/* Preview */}
      <div
        className={`relative overflow-hidden border-b border-line bg-ink-2 lg:border-b-0 ${
          p.wide ? 'aspect-[16/9] lg:aspect-auto lg:border-r lg:border-line' : 'aspect-[16/9]'
        }`}
      >
        {p.preview.type === 'motif' ? (
          <Motif kind={p.preview.motif} />
        ) : (
          <div className="absolute inset-5 grid place-items-center overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
            <img
              src={asset(p.preview.src)}
              alt={p.preview.alt}
              width={900}
              height={579}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-champagne">{p.kind}</span>
          {p.badge && (
            <span className="rounded-full border border-champagne/30 px-2.5 py-0.5 text-xs text-champagne/90">
              {p.badge}
            </span>
          )}
        </div>
        <h3 className="display mt-3 text-[1.75rem] leading-tight md:text-[2rem]">{p.name}</h3>
        <p className="mt-3 text-mute">{p.summary}</p>

        <ul aria-label={`Technologies used in ${p.name}`} className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <li key={t} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-fog/85">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            type="button"
            onClick={() => {
              reset()
              setOpen((v) => !v)
            }}
            aria-expanded={open}
            aria-controls={detailsId}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-fog transition-colors hover:border-champagne/40 hover:text-white"
          >
            {open ? 'Hide details' : 'View details'}
            <ChevronIcon width={15} height={15} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </button>
          {p.links.map((l) => {
            const gh = l.href.includes('github.com')
            return (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} ${gh ? 'on GitHub' : 'live demo'} (opens in a new tab)`}
              className="inline-flex items-center gap-2 text-sm text-champagne transition-colors hover:text-white"
            >
              {gh ? <GitHubIcon width={16} height={16} /> : <ExternalIcon width={16} height={16} />}
              {l.label}
            </a>
            )
          })}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={detailsId}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-6 border-t border-line pt-6 text-sm">
                {p.contribution && (
                  <div>
                    <h4 className="font-medium text-champagne">My contribution</h4>
                    <p className="mt-2 text-fog/90">{p.contribution}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-champagne">Highlights</h4>
                  <ul className="mt-2 space-y-2 text-fog/90">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-champagne/60" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {p.extra && (
                  <div>
                    <h4 className="font-medium text-champagne">{p.extra.title}</h4>
                    <ul className="mt-2 space-y-2 text-fog/90">
                      {p.extra.items.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-champagne/60" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {p.extra.note && <p className="mt-3 text-mute">{p.extra.note}</p>}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}
