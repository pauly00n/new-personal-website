"use client"

import { useEffect, useState } from "react"

export function HeroBackground() {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    setIsSafari(/^((?!chrome|android).)*safari/i.test(ua))
  }, [])

  return (
    <>
      {/* Base gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, #f5f9fd 0%, #e8f3fb 25%, #d6eaf8 50%, #c4e0f5 70%, #d8ecf9 100%)",
        }}
      />

      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/noise.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "900px 900px",
          opacity: isSafari ? 0.10 : 0.4,
          mixBlendMode: isSafari ? "normal" : "soft-light",
        }}
      />

{/* Drifting radial bloom */}
      <style>{`
        @keyframes driftBloom {
          0%   { transform: translate(-150px, -150px); }
          25%  { transform: translate( 150px, -150px); }
          50%  { transform: translate( 150px,  150px); }
          75%  { transform: translate(-150px,  150px); }
          100% { transform: translate(-150px, -150px); }
        }
      `}</style>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          style={{
            position: "absolute",
            inset: "-25%",
            background:
              "radial-gradient(ellipse 50% 50%, rgba(1, 123, 185, 0.40), transparent)",
            animation: "driftBloom 7s ease-in-out infinite",
          }}
        />
      </div>
    </>
  )
}
