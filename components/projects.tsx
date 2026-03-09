"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Github } from "lucide-react"
import { SectionTopGlow } from "@/components/ui/section-top-glow"
import { useIntersectionOnce } from "@/hooks/use-intersection-once"

const projects = [
  {
    title: "Ask Stella",
    description:
      "Full stack web app integrating multiple AI radiology workflows into one",
    tags: ["Next.js", "TypeScript", "Supabase"],
    liveUrl: "https://paulyoon.xyz/stella",
    githubUrl: "https://github.com/pauly00n/personal-website",
    image: "/stella.png",
  },
  {
    title: "Hidden Studios AdTech Platform",
    description:
      "Ad campaign scheduling platform with impression forecasting powered by live Fortnite player-count data",
    liveUrl: "https://scsdaily.com",
    tags: ["Next.js", "TypeScript", "Supabase"],
    image: "/hidden-studios.png",
  },
  {
    title: "Stanford Christian Students App",
    description:
      "Full stack web & mobile app delivering daily scripture reading(s) for Stanford students",
    tags: ["React Native", "TypeScript", "AWS"],
    liveUrl: "https://apps.apple.com/us/app/stanford-christian-students/id1606989492",
    image: "/scsapp.png",
  },
  {
    title: "Formalizing Wigner's Semicircle Law",
    description:
      "Translating random matrix theory proofs into machine-verified mathematics",
    tags: ["Lean", "Mathlib", "LaTeX"],
    liveUrl: "https://fredraj3.github.io/SemicircleLaw/",
    githubUrl: "https://github.com/FredRaj3/SemicircleLaw",
    image: "/formalizing.png",
  },
  {
    title: "Timestamping Video Game Eliminations",
    description:
      "Lightweight computer vision pipeline for splicing Brawl Stars highlights from raw footage",
    tags: ["Python", "YOLOv8", "OpenCV"],
    githubUrl: "https://github.com/pauly00n/timestamping-video-game-eliminations",
    image: "/timestamping.jpeg",
  },
  {
    title: "S1R PET/MRI Knee Pain Research",
    description:
      "Analyzed PET/MRI scans of patients with chronic knee pain. Presented at SNMMI conference. Co-author of manuscript",
    tags: ["Horos", "Excel", "Powerpoint"],
    liveUrl: "https://jnm.snmjournals.org/content/62/supplement_1/143",
    image: "/knee-pain.png",
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowRef0 = useRef<HTMLDivElement>(null)
  const rowRef1 = useRef<HTMLDivElement>(null)
  const rowRef2 = useRef<HTMLDivElement>(null)
  const rowRefs = [rowRef0, rowRef1, rowRef2]

  const headingVisible = useIntersectionOnce(sectionRef)
  const [rowVisible, setRowVisible] = useState([false, false, false])
  // Tracks when each row's observer fired — used to detect simultaneous triggers
  const rowTriggeredAt = useRef<(number | null)[]>([null, null, null])

  // Per-row observers — each fires independently when that row enters the viewport
  useEffect(() => {
    const observers = rowRefs.map((ref, i) => {
      const el = ref.current
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            rowTriggeredAt.current[i] = performance.now()
            setRowVisible(prev => { const next = [...prev]; next[i] = true; return next })
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

  function fadeStyle(delayMs: number): React.CSSProperties {
    return headingVisible
      ? { animation: `projectsFadeIn 500ms ease-out ${delayMs}ms both` }
      : { opacity: 0 }
  }

  // Delays are now relative to when the row becomes visible.
  // Row 0: left card at 0ms, right card staggered 200ms.
  // Rows 1+: both cards fire simultaneously at 0ms.
  const CARD_ANIM = [
    { name: "projectsFadeTopLeft",  delay: 700 },
    { name: "projectsFadeTopRight", delay: 900 },
    { name: "projectsFadeLeft",     delay: 500 },
    { name: "projectsFadeRight",    delay: 500 },
    { name: "projectsFadeLeft",     delay: 200 },
    { name: "projectsFadeRight",    delay: 200 },
  ]

  function cardFadeStyle(idx: number): React.CSSProperties {
    const row = Math.floor(idx / 2)
    if (!rowVisible[row]) return { opacity: 0 }

    const { name, delay } = CARD_ANIM[idx]
    const myTime = rowTriggeredAt.current[row] ?? 0

    // If a previous row fired within 150ms of this one, they were simultaneous —
    // add 300ms stagger per such row so they cascade rather than all pop at once.
    let stagger = 0
    for (let r = 0; r < row; r++) {
      const t = rowTriggeredAt.current[r]
      if (t !== null && Math.abs(myTime - t) < 150) stagger += 500
    }

    return { animation: `${name} 550ms ease-out ${delay + stagger}ms both` }
  }

  return (
    <section ref={sectionRef} id="projects" className="relative border-t border-border/50 min-h-screen" >
      <SectionTopGlow />

      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-20">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            <span style={fadeStyle(200)}>
              Here&apos;s what I&apos;ve
            </span>
            <br />
            <span className="italic" style={{ color: "#017bb9", ...fadeStyle(500) }}>
              worked on.
            </span>
          </h2>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const primaryUrl = project.liveUrl || project.githubUrl || "#"
            const rowRef = idx % 2 === 0 ? rowRefs[idx / 2] : undefined
            return (
              <div key={project.title} ref={rowRef} className="group" style={cardFadeStyle(idx)}>

                {/* Image card */}
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[4/3] overflow-hidden rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(160deg, #f5f9fd 0%, #e8f3fb 25%, #d6eaf8 50%, #c4e0f5 100%)",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 25%, rgba(1, 60, 110, 0.55) 50%, rgba(0, 40, 85, 0.92) 100%)",
                    }}
                  />

                  {/* Overlay content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <h3 className="font-serif text-xl font-medium text-white leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex rounded-full border border-white/25 px-3 py-1 text-xs text-white/65 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>

                {/* Below-card row */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {project.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground/60 hover:text-foreground transition-colors"
                        aria-label={`${project.title} on GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground/60 hover:text-foreground transition-colors"
                        aria-label={`${project.title} live`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
