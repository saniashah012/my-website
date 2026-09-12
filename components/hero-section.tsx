import Image from 'next/image'
import { ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pt-16 pb-20 md:pt-24 md:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-24 size-80 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="flex flex-col items-start">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-accent" />
            Available for new projects
          </span>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{' '}
            <span className="text-primary">Sania Shah</span>
          </h1>

          <p className="mt-4 font-display text-xl font-medium text-foreground/80 sm:text-2xl">
            Product &amp; UX/UI Designer
          </p>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            I&apos;m passionate about crafting intuitive, engaging experiences
            grounded in human behavior and cutting-edge technology.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={
                <a href="#projects">
                  View My Work
                  <ArrowRight className="size-4" />
                </a>
              }
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={
                <a href="#contact">
                  <Mail className="size-4" />
                  Contact Me
                </a>
              }
            />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-primary/10"
          />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
            <Image
              src="/images/headshot.png"
              alt="Portrait of Sania Shah"
              width={640}
              height={720}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
