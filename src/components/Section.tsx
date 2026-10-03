import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function Section({
  id,
  title,
  lead,
  children,
}: {
  id: string
  title: string
  lead?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 id={`${id}-title`} className="display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02]">
            {title}
          </h2>
          {lead && <p className="mt-5 max-w-xl text-lg text-mute">{lead}</p>}
        </Reveal>
        <div className="mt-12 md:mt-20">{children}</div>
      </div>
    </section>
  )
}
