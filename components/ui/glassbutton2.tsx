'use client'

import React from 'react'
import { cn } from '@/lib/utils'

const BLUR_STD = 2 // px, used for SVG feGaussianBlur (Chrome path)

const STYLES = `
@property --gb2-angle-1 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -75deg;
}
@property --gb2-angle-2 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -45deg;
}

.gb2-wrap {
  position: relative;
  display: inline-block;
  z-index: 2;
  border-radius: var(--gb2-radius, 999vw);
  background: transparent;
  pointer-events: none;
  transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1);
}

.gb2-shadow {
  --shadow-cuttoff-fix: 2em;
  position: absolute;
  width: calc(100% + var(--shadow-cuttoff-fix));
  height: calc(100% + var(--shadow-cuttoff-fix));
  top: calc(0% - var(--shadow-cuttoff-fix) / 2);
  left: calc(0% - var(--shadow-cuttoff-fix) / 2);
  filter: blur(clamp(2px, 0.125em, 12px));
  overflow: visible;
  pointer-events: none;
}

.gb2-shadow::after {
  content: "";
  position: absolute;
  z-index: 0;
  border-radius: var(--gb2-radius, 999vw);
  background: linear-gradient(180deg, rgba(0,0,0,0.20), rgba(0,0,0,0.1));
  width: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
  height: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
  top: calc(var(--shadow-cuttoff-fix) - 0.5em);
  left: calc(var(--shadow-cuttoff-fix) - 0.875em);
  padding: 0.125em;
  box-sizing: border-box;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1);
  overflow: visible;
  opacity: 1;
}

.gb2-btn {
  --border-width: clamp(1px, 0.0625em, 4px);
  position: relative;
  isolation: isolate;
  pointer-events: auto;
  z-index: 3;
  background: linear-gradient(-75deg, rgba(255,255,255,0.03), rgba(255,255,255,0.12), rgba(255,255,255,0.03));
  border-radius: var(--gb2-radius, 999vw);
  box-shadow:
    inset 0 0.125em 0.125em rgba(0,0,0,0.05),
    inset 0 -0.125em 0.125em rgba(255,255,255,0.30),
    0 0.25em 0.125em -0.125em rgba(0,0,0,0.2),
    0 0 0.1em 0.25em inset rgba(255,255,255,0.12),
    0 0 0 0 rgba(255,255,255,1);
  transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1);
}

.gb2-clip {
  position: absolute;
  inset: 0;
  border-radius: var(--gb2-radius, 999vw);
  overflow: hidden;
  pointer-events: none;
}

.gb2-backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
  backdrop-filter: url(#gb2-blur-filter);
  -webkit-backdrop-filter: url(#gb2-blur-filter);
  transition: opacity 400ms cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
}

.gb2-btn:not(.gb2-btn--no-hover):hover .gb2-clip .gb2-backdrop {
  opacity: 0;
}

.gb2-btn:not(.gb2-btn--no-hover):hover {
  box-shadow:
    inset 0 0.125em 0.125em rgba(0,0,0,0.0.03),
    inset 0 -0.125em 0.125em rgba(255,255,255,0.3),
    0 0.15em 0.05em -0.1em rgba(0,0,0,0.25),
    0 0 0.05em 0.1em inset rgba(255,255,255,0.3),
    0 0 0 0 rgba(255,255,255,1);
}

.gb2-span {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--gb2-radius, 999vw);
  user-select: none;
  -webkit-user-select: none;
  font-family: "Inter", sans-serif;
  letter-spacing: -0.05em;
  font-weight: 500;
  font-size: 1em;
  color: rgba(50, 50, 50, 1);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-shadow: 0em 0.25em 0.1em rgba(0,0,0,0.22);
  transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1);
  padding-inline: 1.5em;
  padding-block: 0.875em;
}

.gb2-btn:not(.gb2-btn--no-hover):hover .gb2-span {
  text-shadow: 0.025em 0.025em 0.025em rgba(0,0,0,0.12);
}

.gb2-span::after {
  content: "";
  display: block;
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: linear-gradient(
    var(--gb2-angle-2),
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.35) 40% 50%,
    rgba(255,255,255,0) 55%
  );
  z-index: 3;
  mix-blend-mode: screen;
  pointer-events: none;
  transform: translate(var(--gb2-sheen-tx, 25%), var(--gb2-sheen-ty, 25%));
  will-change: transform;
  transition:
    transform 500ms cubic-bezier(0.25, 1, 0.5, 1),
    --gb2-angle-2 500ms cubic-bezier(0.25, 1, 0.5, 1);
}

.gb2-btn:not(.gb2-btn--no-hover):hover .gb2-span::after {
  transform: translate(var(--gb2-sheen-hover-tx, 5%), var(--gb2-sheen-hover-ty, 5%));
  --gb2-angle-2: var(--gb2-sheen-hover-angle, -45deg);
}

.gb2-btn::after {
  content: "";
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: var(--gb2-radius, 999vw);
  width: calc(100% + var(--border-width));
  height: calc(100% + var(--border-width));
  top: calc(0% - var(--border-width) / 2);
  left: calc(0% - var(--border-width) / 2);
  padding: var(--border-width);
  box-sizing: border-box;
  background:
    conic-gradient(
      from var(--gb2-angle-1) at 50% 50%,
      rgba(0,0,0,0.5),
      rgba(0,0,0,0) 5% 40%,
      rgba(0,0,0,0.5) 50%,
      rgba(0,0,0,0) 60% 95%,
      rgba(0,0,0,0.5)
    ),
    linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.10));
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1), --gb2-angle-1 500ms ease;
  box-shadow: inset 0 0 0 calc(var(--border-width) / 2) rgba(255,255,255,0.29);
}

.gb2-btn:not(.gb2-btn--no-hover):hover::after { --gb2-angle-1: -125deg; }

.gb2-wrap:has(.gb2-btn:not(.gb2-btn--no-hover):hover) .gb2-shadow {
  filter: blur(clamp(2px, 0.0625em, 6px));
  transition: filter 400ms cubic-bezier(0.25, 1, 0.5, 1);
}

.gb2-wrap:has(.gb2-btn:not(.gb2-btn--no-hover):hover) .gb2-shadow::after {
  top: calc(var(--shadow-cuttoff-fix) - 0.875em);
  opacity: 1;
}

/* Scroll-line active state (mobile) — mirrors all :hover rules */
.gb2-btn--active .gb2-clip .gb2-backdrop { opacity: 0; }

.gb2-btn--active {
  box-shadow:
    inset 0 0.125em 0.125em rgba(0,0,0,0.03),
    inset 0 -0.125em 0.125em rgba(255,255,255,0.3),
    0 0.15em 0.05em -0.1em rgba(0,0,0,0.25),
    0 0 0.05em 0.1em inset rgba(255,255,255,0.3),
    0 0 0 0 rgba(255,255,255,1);
}

.gb2-btn--active .gb2-span {
  text-shadow: 0.025em 0.025em 0.025em rgba(0,0,0,0.12);
}

.gb2-btn--active .gb2-span::after {
  transform: translate(var(--gb2-sheen-hover-tx, 5%), var(--gb2-sheen-hover-ty, 5%));
  --gb2-angle-2: var(--gb2-sheen-hover-angle, -45deg);
}

.gb2-btn--active::after { --gb2-angle-1: -125deg; }

.gb2-wrap:has(.gb2-btn--active) .gb2-shadow {
  filter: blur(clamp(2px, 0.0625em, 6px));
  transition: filter 400ms cubic-bezier(0.25, 1, 0.5, 1);
}

.gb2-wrap:has(.gb2-btn--active) .gb2-shadow::after {
  top: calc(var(--shadow-cuttoff-fix) - 0.875em);
  opacity: 1;
}

/* Fill mode: wrapper is sized externally, btn/span stretch to fill */
.gb2-wrap--fill {
  display: block;
}

.gb2-wrap--fill .gb2-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.gb2-wrap--fill .gb2-span {
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
`

interface GlassButton2Props {
  children?: React.ReactNode
  size?: string
  className?: string
  spanStyle?: React.CSSProperties
  wrapperStyle?: React.CSSProperties
  href?: string
  fill?: boolean
  forceHover?: boolean
  disableHover?: boolean
}

export default function GlassButton2({
  children,
  size,
  className,
  spanStyle,
  wrapperStyle,
  href,
  fill,
  forceHover,
  disableHover,
}: GlassButton2Props) {
  const Inner = href ? 'a' : 'div'
  return (
    <>
      <style>{STYLES}</style>
      {/* Shared SVG filter — Chrome uses backdrop-filter: url(#gb2-blur-filter) */}
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="gb2-blur-filter">
            <feGaussianBlur stdDeviation={BLUR_STD} />
          </filter>
        </defs>
      </svg>
      <div
        className={cn('gb2-wrap', fill && 'gb2-wrap--fill')}
        style={{ ...(size ? { fontSize: size } : undefined), ...wrapperStyle }}
      >
        <Inner className={cn('gb2-btn', forceHover && 'gb2-btn--active', disableHover && 'gb2-btn--no-hover')} {...(href ? { href } : {})}>
          <span className="gb2-clip" aria-hidden="true">
            <span className="gb2-backdrop" />
          </span>
          <span className={cn('gb2-span', className)} style={spanStyle}>{children}</span>
        </Inner>
        <div className="gb2-shadow" />
      </div>
    </>
  )
}
