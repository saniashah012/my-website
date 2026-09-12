import { DribbbleIcon, GithubIcon, LinkedinIcon } from '@/components/brand-icons'

const socials = [
  { label: 'LinkedIn', href: '#', icon: LinkedinIcon },
  { label: 'Dribbble', href: '#', icon: DribbbleIcon },
  { label: 'GitHub', href: '#', icon: GithubIcon },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Sania Shah. All rights reserved.
        </p>
        <div className="flex gap-2">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                <Icon className="size-5" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
