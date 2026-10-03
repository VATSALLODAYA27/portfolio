import { certifications, education, type Certification } from '../data/resume'
import { ChartIcon, CloudIcon, CodeIcon } from './Icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

const icons: Record<Certification['icon'], () => React.JSX.Element> = {
  cloud: () => <CloudIcon />,
  code: () => <CodeIcon />,
  chart: () => <ChartIcon />,
}

export function Education() {
  return (
    <Section id="education" title="Education and certifications">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <h3 className="display text-2xl">Education</h3>
          <div className="relative mt-8 space-y-6 pl-9 md:pl-14">
            <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-ultra to-transparent" />
            {education.map((e) => (
              <div key={e.institution} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-9 top-3 grid size-[15px] place-items-center rounded-full border border-ultra bg-ink shadow-[0_0_22px_rgba(111,140,255,0.75)] md:-left-14"
                >
                  <span className="size-1.5 rounded-full bg-ultra" />
                </span>
                <div className="glass rounded-3xl p-6 md:p-8">
                  <p className="text-sm text-champagne">{e.period}</p>
                  <h4 className="display mt-2 text-2xl leading-snug md:text-[1.75rem]">{e.institution}</h4>
                  <p className="mt-3 text-fog/90">{e.degree}</p>
                  <p className="mt-2 text-mute">{e.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="display text-2xl">Certifications</h3>
          <ul className="mt-8 space-y-4">
            {certifications.map((c) => (
              <li key={c.title} className="flex items-start gap-4 rounded-2xl border border-line bg-white/[0.025] p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ultra/25 to-champagne/15 text-champagne">
                  {icons[c.icon]()}
                </span>
                <div>
                  <p className="text-fog">{c.title}</p>
                  <p className="mt-0.5 text-sm text-mute">
                    {c.issuer}
                    {c.when ? `, ${c.when}` : ''}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
