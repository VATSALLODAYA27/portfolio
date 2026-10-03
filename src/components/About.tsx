import type { ReactNode } from 'react'
import { aboutCards as c } from '../data/resume'
import { spotlightMove } from '../lib/spotlight'
import { Reveal } from './Reveal'
import { Section } from './Section'

function Panel({
  title,
  className = '',
  frosted = false,
  delay = 0,
  children,
}: {
  title: string
  className?: string
  frosted?: boolean
  delay?: number
  children: ReactNode
}) {
  return (
    <Reveal delay={delay} className={className}>
      <div
        onPointerMove={spotlightMove}
        className={`spotlight h-full rounded-3xl p-6 md:p-8 ${
          frosted ? 'glass' : 'border border-line bg-white/[0.025]'
        }`}
      >
        <h3 className="text-sm font-medium text-champagne">{title}</h3>
        {children}
      </div>
    </Reveal>
  )
}

const chip = 'rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-sm text-fog/90'

export function About() {
  return (
    <Section id="about" title="About me" lead="A computer engineer who builds for the web and learns from data.">
      <div className="grid gap-4 md:grid-cols-6">
        <Panel title={c.background.title} frosted className="md:col-span-4">
          <p className="display mt-4 max-w-lg text-3xl leading-[1.15] md:text-[2.5rem]">{c.background.heading}</p>
          <p className="mt-5 max-w-md text-mute">{c.background.body}</p>
        </Panel>

        <Panel title={c.strengths.title} className="md:col-span-2" delay={0.08}>
          <ul className="mt-5 flex flex-wrap gap-2">
            {c.strengths.items.map((s) => (
              <li key={s} className={chip}>
                {s}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={c.focus.title} className="md:col-span-2">
          <p className="mt-4 text-fog/90">{c.focus.body}</p>
        </Panel>

        <Panel title={c.interests.title} className="md:col-span-2" delay={0.08}>
          <ul className="mt-4 space-y-2 text-fog/90">
            {c.interests.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </Panel>

        <Panel title={c.direction.title} className="md:col-span-2" delay={0.16}>
          <p className="mt-4 text-fog/90">{c.direction.body}</p>
        </Panel>
      </div>
    </Section>
  )
}
