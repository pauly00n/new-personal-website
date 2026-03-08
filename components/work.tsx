import { ArrowUpRight } from "lucide-react"
import { SectionTopGlow } from "@/components/ui/section-top-glow"
import { SectionLabel } from "@/components/ui/section-label"

const experiences = [
  {
    period: "Sept 2025 \u2014 Apr 2026",
    title: "Researcher",
    company: "Stanford Center for Artificial Intelligence in Medicine & Imaging",
    url: "https://aimi.stanford.edu",
    description:
      "",
    tags: ["React", "TypeScript", "Next.js", "Supabase"],
  },
  {
    period: "Sept 2025 \u2014 Apr 2026",
    title: "Researcher",
    company: "Stanford Undergraduate Research In Mathematics",
    url: "https://surim.stanford.edu",
    description:
      "",
    tags: ["Lean", "Mathlib", "LaTeX", "VsCode"],
  },
  {
    period: "Jul 2024 \u2014 Sept 2024",
    title: "Software Engineering Intern",
    company: "Sundial",
    url: "https://sundial.ai",
    description:
      "",
    tags: ["Python", "Jupyter Notebook", "Pandas", "Apache Spark"],
  },
  {
    period: "May 2020 \u2014 Jul 2023",
    title: "Research Assistant",
    company: "Stanford University School of Medicine",
    url: "https://med.stanford.edu/",
    description:
      "",
    tags: ["JavaScript", "Vue.js", "SCSS", "Webpack"],
  },
]

export function Work() {
  return (
    <section id="work" className="relative border-t border-border/50">
      <SectionTopGlow />

      <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">

        <SectionLabel>Experience</SectionLabel>

        {/* Experience list */}
        <div className="flex flex-col gap-3">
          {experiences.map((exp, idx) => (
            <a
              key={idx}
              href={exp.url}
              className="group grid gap-4 rounded-xl border border-border/50 px-6 py-5 transition-shadow hover:shadow-md lg:grid-cols-8"
            >
              {/* Date column */}
              <div className="lg:col-span-2">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {exp.period}
                </span>
              </div>

              {/* Content column */}
              <div className="lg:col-span-6">
                <h3 className="flex items-center gap-2 text-base font-medium text-foreground">
                  {exp.title}
                  <span className="text-muted-foreground">{"·"}</span>
                  <span className="text-foreground/80">{exp.company}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>

                {exp.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full border border-border/50 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
