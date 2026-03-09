"use client"

import { useRef } from "react"
import { SectionTopGlow } from "@/components/ui/section-top-glow"
import { SectionLabel } from "@/components/ui/section-label"
import { useIntersectionOnce, useIntersectionsOnce } from "@/hooks/use-intersection-once"
import GlassButton2 from "@/components/ui/glassbutton2"
import { FaPython, FaReact } from "react-icons/fa"
import {
  SiGit, SiLatex, SiTypescript, SiJavascript, SiPandas,
  SiScikitlearn, SiPytorch, SiCplusplus, SiApachespark,
  SiJupyter, SiQt,
} from "react-icons/si"
import { PiFileHtmlDuotone } from "react-icons/pi"
import { TbBrandReactNative } from "react-icons/tb"
import { RiNextjsFill, RiSupabaseFill } from "react-icons/ri"
import { VscVscode } from "react-icons/vsc"

const columns = [
  {
    heading: "Languages",
    skills: [
      { label: "Python",      Icon: FaPython },
      { label: "LaTeX",       Icon: SiLatex },
      { label: "JavaScript",  Icon: SiJavascript },
      { label: "TypeScript",  Icon: SiTypescript },
      { label: "HTML / CSS",  Icon: PiFileHtmlDuotone },
      { label: "C++",         Icon: SiCplusplus },
    ],
  },
  {
    heading: "Frameworks / Libraries",
    skills: [
      { label: "React",        Icon: FaReact },
      { label: "React Native", Icon: TbBrandReactNative },
      { label: "Next.js",      Icon: RiNextjsFill },
      { label: "Pandas",       Icon: SiPandas },
      { label: "Scikit-Learn", Icon: SiScikitlearn },
      { label: "PyTorch",      Icon: SiPytorch },
    ],
  },
  {
    heading: "Developer Tools",
    skills: [
      { label: "Git & Github",     Icon: SiGit },
      { label: "VS Code",          Icon: VscVscode },
      { label: "Apache Spark",     Icon: SiApachespark },
      { label: "Supabase",         Icon: RiSupabaseFill },
      { label: "Jupyter Notebook", Icon: SiJupyter },
      { label: "Qt Creator",       Icon: SiQt },
    ],
  },
]

// animation name per column index: left bounces from left, middle from bottom, right from right
const COL_ANIM = ["skillsFromLeft", "skillsFromBottom", "skillsFromRight"]

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const colRef0 = useRef<HTMLDivElement>(null)
  const colRef1 = useRef<HTMLDivElement>(null)
  const colRef2 = useRef<HTMLDivElement>(null)
  const colRefs = [colRef0, colRef1, colRef2]

  const headingVisible = useIntersectionOnce(sectionRef)
  const colVisible = useIntersectionsOnce(colRefs)

  function headingFade(): React.CSSProperties {
    return headingVisible
      ? { animation: `skillsFromBottom 600ms ease-out 0ms both` }
      : { opacity: 0 }
  }

  function headingFade2(): React.CSSProperties {
    return headingVisible
      ? { animation: `skillsFromBottom 600ms ease-out 300ms both` }
      : { opacity: 0 }
  }

  function colFade(col: number): React.CSSProperties {
    if (!colVisible[col]) return { opacity: 0 }
    return { animation: `${COL_ANIM[col]} 550ms ease-out 300ms both` }
  }

  return (
    <section ref={sectionRef} id="skills" className="relative border-t border-border/50">
      <SectionTopGlow />

      <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">

        <h2 className="mb-10 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          <span style={headingFade()}>Skills: Things I</span>
          <br />
          <span className="italic" style={{ color: "#017bb9", ...headingFade2() }}>
            Build With.
          </span>
        </h2>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {columns.map((col, ci) => (
            <div
              key={col.heading}
              ref={colRefs[ci]}
              style={colFade(ci)}
              className="h-full"
            >
              <GlassButton2
                fill
                wrapperStyle={{ '--gb2-radius': '1rem', '--gb2-sheen-pos': '7% 7%', '--gb2-sheen-hover-pos': '13% 21%', height: '100%' } as React.CSSProperties}
                spanStyle={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '1.5rem 1.75rem',
                  textShadow: 'none',
                  letterSpacing: 'normal',
                }}
              >
                <h3 className="mb-5 text-sm font-medium uppercase tracking-widest text-foreground/90">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-4">
                  {col.skills.map(({ label, Icon }) => (
                    <li key={label} className="flex items-center gap-3.5">
                      <Icon className="h-5 w-5 shrink-0 text-foreground/50" />
                      <span className="text-base text-foreground/80">{label}</span>
                    </li>
                  ))}
                </ul>
              </GlassButton2>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
