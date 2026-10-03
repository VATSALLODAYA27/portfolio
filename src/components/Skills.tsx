import { useReducedMotion } from 'framer-motion'
import { skillGroups } from '../data/resume'
import { spotlightMove } from '../lib/spotlight'
import { Reveal } from './Reveal'
import { Section } from './Section'

const span: Record<string, string> = {
  technical: 'md:col-span-7',
  software: 'md:col-span-5',
  strengths: 'md:col-span-5',
  soft: 'md:col-span-7',
  projects: 'md:col-span-12',
}

const pill = {
  primary:
    'inline-block cursor-default rounded-full border border-champagne/25 bg-champagne/[0.06] px-5 py-2.5 text-base text-fog transition-all duration-300 hover:-translate-y-0.5 hover:border-ultra/70 hover:text-white hover:shadow-[0_0_28px_-6px_rgba(111,140,255,0.7)]',
  quiet:
    'inline-block cursor-default rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-fog/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-ultra/60 hover:text-white hover:shadow-[0_0_24px_-8px_rgba(111,140,255,0.7)]',
}

export function Skills() {
  const reduced = useReducedMotion()
  return (
    <Section
      id="skills"
      title="Skills"
      lead="Grouped as they appear on my resume, plus the tools that showed up in my project work."
    >
      <div className="grid gap-4 md:grid-cols-12">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.id} delay={(gi % 2) * 0.08} className={span[g.id] ?? 'md:col-span-6'}>
            <div
              onPointerMove={spotlightMove}
              className={`spotlight h-full rounded-3xl p-6 md:p-8 ${
                g.tone === 'primary' ? 'glass' : 'border border-line bg-white/[0.02]'
              }`}
            >
              <h3 className="display text-2xl">{g.title}</h3>
              {g.note && <p className="mt-1 text-sm text-mute">{g.note}</p>}
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {g.items.map((item, i) => (
                  <li
                    key={item}
                    style={reduced ? undefined : { animation: `drift ${5 + (i % 3)}s ease-in-out ${i * 0.35}s infinite` }}
                  >
                    <span className={pill[g.tone]}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
