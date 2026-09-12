import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects = [
  {
    title: 'E-commerce Store',
    description:
      'A full shopping experience with product discovery, cart, and a frictionless checkout flow designed to boost conversion.',
    image: '/images/project-ecommerce.png',
    tags: ['UX Research', 'UI Design'],
  },
  {
    title: 'Restaurant Website',
    description:
      'An appetizing marketing site with online reservations and a responsive menu that looks great on any device.',
    image: '/images/project-restaurant.png',
    tags: ['Branding', 'Web Design'],
  },
  {
    title: 'Portfolio Blog',
    description:
      'A minimal, typography-first blog and portfolio platform focused on readability and effortless content management.',
    image: '/images/project-blog.png',
    tags: ['Design System', 'Prototyping'],
  },
]

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-16 bg-muted/40 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-widest text-primary">
            Portfolio
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            My Projects
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
            A selection of recent work spanning e-commerce, hospitality, and
            content-driven products.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={`${project.title} project preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {project.description}
                </p>

                <div className="mt-5">
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={
                      <a href="#" aria-label={`View ${project.title} project`}>
                        View Project
                        <ArrowUpRight className="size-4" />
                      </a>
                    }
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
