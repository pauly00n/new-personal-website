import { cn } from "@/lib/utils"
import type { CSSProperties } from "react"

export function SectionLabel({
  children,
  style,
  className,
}: {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
}) {
  return (
    <div className="flex items-center gap-4 mb-16" style={style}>
      <span className={cn("text-xs font-medium uppercase tracking-widest text-muted-foreground", className)}>
        {children}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}
