"use client"

import { useState, useEffect } from "react"
import { Github, Mail, Linkedin, Twitter } from "lucide-react"
import GlassButton2 from "@/components/ui/glassbutton2"

const SOCIALS = [
  { href: "https://github.com/pauly00n", icon: Github, label: "GitHub" },
  { href: "mailto:pauljy@stanford.edu", icon: Mail, label: "Email" },
  { href: "https://linkedin.com/in/pauljinyoon", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/asian1x", icon: Twitter, label: "Twitter" },
]

const W = 52
const GAP = 12
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)"
const SEQUENCE = [0, 1, 2, 3, 2, 1]

export function ButtonRow() {
  const [tick, setTick] = useState(0)
  const active = SEQUENCE[tick % SEQUENCE.length]

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(id)
  }, [])

  const STEP = W + GAP
  const CONTAINER_W = W * 5 + GAP * 4

  return (
    <div className="mt-10 flex justify-center">
      <div style={{ position: "relative", width: CONTAINER_W, height: W }}>
        {SOCIALS.map((social, i) => {
          const isActive = i === active
          const left =
            i < active
              ? i * STEP
              : i === active
                ? active * STEP
                : (i + 1) * STEP

          return (
            <GlassButton2
              key={social.label}
              href={social.href}
              fill
              spanStyle={{ gap: isActive ? "6px" : "0px" }}
              wrapperStyle={{
                position: "absolute",
                left,
                top: 0,
                width: isActive ? W * 2 + GAP : W,
                height: W,
                transition: `width 0.45s ${EASING}, left 0.45s ${EASING}`,
              }}
            >
              <social.icon className="h-5 w-5 shrink-0" />
              <span
                style={{
                  display: "inline-block",
                  maxWidth: isActive ? "80px" : "0px",
                  opacity: isActive ? 1 : 0,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  transition: isActive
                    ? `max-width 0.4s ${EASING} 0.05s, opacity 0.1s ease 0.05s`
                    : `max-width 0.4s ${EASING} 0.05s, opacity 0s`,
                  fontSize: "0.875rem",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.05em",
                  color: "rgba(50, 50, 50, 1)",
                }}
              >
                {social.label}
              </span>
            </GlassButton2>
          )
        })}
      </div>
    </div>
  )
}
