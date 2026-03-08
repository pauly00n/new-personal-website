"use client"

import { useEffect, useRef, useState } from "react"
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

  const [headingVisible, setHeadingVisible] = useState(false)
  const [colVisible, setColVisible] = useState([false, false, false])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeadingVisible(true); observer.disconnect() } },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observers = colRefs.map((ref, i) => {
      const el = ref.current
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setColVisible(prev => { const next = [...prev]; next[i] = true; return next })
            observer.disconnect()
          }
        },
        { threshold: 0.05 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  function headingFade(): React.CSSProperties {
    return headingVisible
      ? { animation: `skillsFromBottom 600ms ease-out 0ms both` }
      : { opacity: 0 }
  }

  function colFade(col: number): React.CSSProperties {
    if (!colVisible[col]) return { opacity: 0 }
    return { animation: `${COL_ANIM[col]} 550ms ease-out 300ms both` }
  }

  return (
    <section ref={sectionRef} id="skills" className="relative border-t border-border/50">
      <style>{`
        @keyframes skillsFromLeft {
          0%   { opacity: 0; transform: translateX(-20px); }
          60%  { opacity: 1; transform: translateX(5px); }
          80%  { transform: translateX(-2px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes skillsFromRight {
          0%   { opacity: 0; transform: translateX(20px); }
          60%  { opacity: 1; transform: translateX(-5px); }
          80%  { transform: translateX(2px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes skillsFromBottom {
          0%   { opacity: 0; transform: translateY(16px); }
          60%  { opacity: 1; transform: translateY(-5px); }
          80%  { transform: translateY(2px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Radial glow on top border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'radial-gradient(ellipse 60% 1px at 50% 0%, rgba(1,123,185,0.35) 0%, transparent 100%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{ height: '120px', background: 'radial-gradient(ellipse 50% 120px at 50% 0%, rgba(1,123,185,0.08) 0%, transparent 100%)' }}
      />

      <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16" style={headingFade()}>
          <span className="text-sm font-medium uppercase tracking-widest text-foreground">
            Skills
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {columns.map((col, ci) => (
            <div
              key={col.heading}
              ref={colRefs[ci]}
              style={colFade(ci)}
            >
              <div className="rounded-2xl border border-white/20 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-7 py-6 h-full hover:bg-white/8 hover:border-white/40 transition-colors">
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
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
