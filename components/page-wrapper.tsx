"use client"

import { useEffect, useState } from "react"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0.8,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  )
}
