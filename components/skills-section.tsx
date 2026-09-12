import { Code2, Palette, Wrench } from 'lucide-react'

const skillGroups = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    title: 'Design Tools',
    icon: Palette,
    skills: ['Figma', 'Photoshop'],
  },
  {
    title: 'Platforms & More',
    icon: Wrench,
    skills: ['WordPress', 'Git'],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-16 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-widest text-primary">
            Toolkit
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Skills &amp; Technologies
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
            The tools and technologies I reach for to take ideas from concept to
            polished product.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = group.icon
            return (
              <div
                key={group.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">
                    {group.title}
                  </h3>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
