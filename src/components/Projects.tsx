import { projects } from '../data/resume'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      lead="Six projects across web, AI and analytics. Four are on my resume and two more come from my GitHub."
    >
      <div className="grid items-start gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.08} className={p.wide ? 'md:col-span-2' : ''}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
