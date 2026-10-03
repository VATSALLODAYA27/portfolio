import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { experience, experienceNote } from '../data/resume'
import { scrollToId } from '../lib/scroll'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Experience() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <Section id="experience" title="Experience" lead="Where I have worked so far.">
      <div ref={ref} className="relative pl-9 md:pl-14">
        {/* Timeline rail; the bright segment draws as you scroll. */}
        <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-line" />
        <motion.span
          aria-hidden
          style={{ scaleY: reduced ? 1 : draw, transformOrigin: 'top' }}
          className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-ultra to-champagne"
        />

        {experience.map((job) => (
          <Reveal key={job.company}>
            <article className="relative">
              <span
                aria-hidden
                className="absolute -left-9 top-3 grid size-[15px] place-items-center rounded-full border border-ultra bg-ink shadow-[0_0_22px_rgba(111,140,255,0.75)] md:-left-14"
              >
                <span className="size-1.5 rounded-full bg-ultra" />
              </span>

              <div className="glass rounded-3xl p-6 md:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="display text-3xl md:text-4xl">{job.company}</h3>
                  <p className="text-sm text-mute">{job.period}</p>
                </div>
                <p className="mt-2 text-lg text-champagne">{job.role}</p>
                <ul className="mt-6 space-y-3 text-fog/90">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-4">
                      <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-champagne/60" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-sm text-mute">
            {experienceNote}{' '}
            <a
              href="#education"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('education', reduced)
              }}
              className="text-champagne underline decoration-champagne/30 underline-offset-4 hover:decoration-champagne"
            >
              See certifications
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
