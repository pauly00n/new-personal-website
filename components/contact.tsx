import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const socials = [
  { label: "GitHub", href: "#", icon: Github },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "X / Twitter", href: "#", icon: Twitter },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
]

export function Contact() {
  return (
    <section id="contact" className="border-t border-border/50">
      <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Contact
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              {"Let\u2019s work"}
              <br />
              <span className="italic" style={{ color: "#017bb9" }}>
                together.
              </span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              If you&apos;d like to discuss a project or just say hello,
              I&apos;m always open to a conversation. Feel free to reach out
              through any of the channels below.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="group flex items-center justify-between rounded-xl border border-border/50 px-6 py-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <social.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {social.label}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground transition-transform group-hover:translate-x-1">
                  {"\u2192"}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
