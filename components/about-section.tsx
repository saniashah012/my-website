import Image from 'next/image'

const stats = [
  { value: '3+', label: 'Years experience' },
  { value: '20+', label: 'Projects shipped' },
  { value: '15+', label: 'Happy clients' },
]

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.8fr_1fr]">
        <div className="relative mx-auto w-full max-w-xs">
          <div
            aria-hidden="true"
            className="absolute inset-0 -translate-x-4 translate-y-4 rounded-3xl bg-accent/15"
          />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
            <Image
              src="/images/headshot.png"
              alt="Sania Shah working"
              width={480}
              height={560}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-widest text-primary">
            About Me
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Designing with empathy, shipping with intention
          </h2>

          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a product and UX/UI designer with over three years of
              experience turning complex problems into clean, human-centered
              interfaces. My work sits at the intersection of research, visual
              craft, and product strategy.
            </p>
            <p>
              I&apos;ve partnered with startups and established teams to design
              everything from e-commerce flows to content platforms, always
              starting with the people who&apos;ll actually use the product. I
              believe great design is invisible — it just feels right.
            </p>
            <p>
              When I&apos;m not in Figma, you&apos;ll find me sketching ideas,
              exploring new design systems, and learning just enough front-end
              code to make my prototypes feel real.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card px-4 py-5 text-center"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
