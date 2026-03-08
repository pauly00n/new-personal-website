'use client'

import React, {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

export interface GlassPillSafariProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  className?: string
  borderRadius?: number
  blurAmount?: number
  shadowColor?: string
  shadowBlur?: number
  shadowSpread?: number
  tintColor?: string
  tintOpacity?: number
  outerShadowBlur?: number
}

const cn = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(' ')

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '')
  const full  = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean
  return `${parseInt(full.slice(0, 2), 16)}, ${parseInt(full.slice(2, 4), 16)}, ${parseInt(full.slice(4, 6), 16)}`
}

function drawSpecular(
  canvas: HTMLCanvasElement,
  w: number,
  h: number,
  radius: number
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)

  // clip to rounded rect
  ctx.save()
  ctx.beginPath()
  ctx.roundRect(0, 0, w, h, radius)
  ctx.clip()

  // top-left specular sheen
  const sheen = ctx.createLinearGradient(0, 0, w * 0.65, h * 0.55)
  sheen.addColorStop(0,   'rgba(255,255,255,0.52)')
  sheen.addColorStop(0.4, 'rgba(255,255,255,0.14)')
  sheen.addColorStop(1,   'rgba(255,255,255,0.0)')
  ctx.fillStyle = sheen
  ctx.fillRect(0, 0, w, h)

  // subtle bottom-right darkening
  const dark = ctx.createRadialGradient(w, h, 0, w, h, Math.max(w, h) * 0.8)
  dark.addColorStop(0,   'rgba(0,0,0,0.06)')
  dark.addColorStop(1,   'rgba(0,0,0,0.0)')
  ctx.fillStyle = dark
  ctx.fillRect(0, 0, w, h)

  ctx.restore()
}

export default function GlassPillSafari({
  children,
  className,
  borderRadius     = 100,
  blurAmount       = 5,
  shadowColor      = '#ffffff',
  shadowBlur       = 20,
  shadowSpread     = -5,
  tintColor        = '#ffffff',
  tintOpacity      = 1,
  outerShadowBlur  = 24,
  style,
  ...divProps
}: GlassPillSafariProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setSize({ width: el.offsetWidth, height: el.offsetHeight })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || size.width < 2 || size.height < 2) return
    const r = Math.min(borderRadius, Math.min(size.width, size.height) / 2)
    drawSpecular(canvas, size.width, size.height, r)
  }, [size, borderRadius])

  const tintRgb = hexToRgb(tintColor)

  const containerStyle: CSSProperties = {
    borderRadius,
    boxShadow: `0px 4px ${outerShadowBlur}px rgba(0,0,0,0.18)`,
    ...style,
  }

  return (
    <div
      ref={containerRef}
      {...divProps}
      className="relative isolate overflow-hidden"
      style={containerStyle}
    >
      {/* CSS backdrop blur — works in Safari */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          borderRadius,
          backdropFilter:       `blur(${blurAmount}px) saturate(180%) brightness(1.08)`,
          WebkitBackdropFilter: `blur(${blurAmount}px) saturate(180%) brightness(1.08)`,
          backgroundColor: `rgba(${tintRgb}, ${tintOpacity === 40 ? 0.20 : 0.01})`,
          transition: 'background-color 500ms ease',
        }}
      />

      {/* 2D canvas specular sheen */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{ borderRadius }}
        width={size.width}
        height={size.height}
      />

      {/* Inner glow / inset shadow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          borderRadius,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.05), inset 0 0 ${shadowBlur}px ${shadowSpread}px ${shadowColor}`,
        }}
      />

      {/* content */}
      <span className={cn('relative z-20', className)}>
        {children}
      </span>
    </div>
  )
}

