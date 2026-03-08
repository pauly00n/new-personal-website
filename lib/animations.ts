import type { CSSProperties } from "react"

export const fadeUp = (delay: number): CSSProperties => ({
  animation: `fadeUp 550ms ease-out ${delay}ms both`,
})
