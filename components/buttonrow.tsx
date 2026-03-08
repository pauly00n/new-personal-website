"use client"

import { useState, useEffect } from "react"
import { Github, Mail, Linkedin, Twitter } from "lucide-react"

const SOCIALS = [
  { href: "https://github.com/pauly00n", icon: Github, label: "GitHub" },
  { href: "mailto:pauljy@stanford.edu", icon: Mail, label: "Email" },
  { href: "https://linkedin.com/in/pauljinyoon", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/asian1x", icon: Twitter, label: "Twitter" },
]


const W = 52   // single button px (px-4 + icon h-5 + px-4 = 16+20+16)
const GAP = 12 // gap-3

const EASING = "cubic-bezier(0.4, 0, 0.2, 1)"

const SEQUENCE = [0, 1, 2, 3, 2, 1] // ping-pong: right then back left

export function ButtonRow() {
  const [tick, setTick] = useState(0)
  const phase = SEQUENCE[tick % SEQUENCE.length]

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(id)
  }, [])

  const CONTAINER_W = W * 5 + GAP * 4 // 308px

  return (
    <div className="mt-10 flex justify-center">
      <div style={{ position: "relative", width: CONTAINER_W, height: W }}>
        {[0, 1, 2, 3, 4].map(i => {
          const isFirst    = i === phase
          const isAbsorbed = i === phase + 1
          const socialIdx  = i <= phase ? i : i - 1
          const social     = SOCIALS[socialIdx]
          const Icon       = social.icon

          return (
            <a
              key={i}
              href={isAbsorbed ? undefined : social.href}
              className="inline-flex items-center justify-center rounded-full text-sm font-medium text-foreground bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.20)] overflow-hidden hover:bg-white/20 hover:border-white/40 active:scale-[0.98]"
              style={{
                position:      "absolute",
                left:          i * (W + GAP),
                top:           0,
                width:         isFirst ? W * 2 + GAP : W,
                height:        W,
                opacity:       isAbsorbed ? 0 : 1,
                pointerEvents: isAbsorbed ? "none" : undefined,
                gap:           isFirst ? "8px" : "0px",
                transition:    `width 0.45s ${EASING}, opacity 0.2s ease`,
              }}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span
                style={{
                  maxWidth:   isFirst ? "80px" : "0px",
                  opacity:    isFirst ? 1 : 0,
                  overflow:   "hidden",
                  whiteSpace: "nowrap",
                  transition: `max-width 0.4s ${EASING} 0.05s, opacity 0.25s ease 0.05s`,
                }}
              >
                {social.label}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
