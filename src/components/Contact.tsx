import { asset, contactLinks, site } from '../data/resume'
import { btnGhost, btnPrimary } from '../lib/styles'
import { DownloadIcon } from './Icons'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative px-6 pb-14 pt-24 md:px-10 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 id="contact-title" className="display max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.98]">
            Let&rsquo;s build something meaningful.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-mute">
            You can reach me by email or phone, and find my work on LinkedIn and GitHub.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href={`mailto:${site.email}`} className={btnPrimary}>
                Email me
              </a>
            </Magnetic>
            <Magnetic>
              <a href={asset(site.resumeFile)} download className={btnGhost}>
                <DownloadIcon />
                Download Resume
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-16 border-b border-line md:mt-24">
            {contactLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-baseline justify-between gap-6 border-t border-line py-5 transition-colors hover:border-champagne/40 md:py-6"
                >
                  <span className="text-sm text-mute">{l.label}</span>
                  <span className="display break-all text-right text-xl transition-colors group-hover:text-champagne md:text-[1.9rem]">
                    {l.value}
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-6 border-t border-line py-5 md:py-6">
              <span className="text-sm text-mute">Location</span>
              <span className="display text-right text-xl md:text-[1.9rem]">{site.location}</span>
            </li>
          </ul>
        </Reveal>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 text-sm text-mute">
          <p>&copy; {new Date().getFullYear()} {site.name}</p>
          <a href="#home" className="transition-colors hover:text-fog">
            Back to top
          </a>
        </footer>
      </div>
    </section>
  )
}
