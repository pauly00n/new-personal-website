import { ArrowDown } from "lucide-react"
import TextLink from "@/components/ui/textlink";
import { ButtonRow } from "@/components/buttonrow"

const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `heroFadeUp 550ms ease-out ${delay}ms both`,
})

export function Hero() {
  return (
    <section className="hero relative flex min-h-svh flex-col">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Nav spacer */}
      <div className="h-[74px] shrink-0" />

      {/* Centered content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8 pt-8 sm:pt-0">

          {/* Name */}
          <h1 style={fadeUp(0)} className="text-balance font-serif text-6xl font-medium leading-tight tracking-tight text-foreground sm:text-[5rem]">
            Paul Yoon
          </h1>

          {/* Role */}
          <p style={fadeUp(400)} className="mt-4 text-lg text-muted-foreground font-medium sm:text-xl">
            Full-Stack Developer & Researcher
          </p>

          {/* Bio */}
        <div className="px-[5%]">
          <p style={fadeUp(520)} className="mx-auto mt-6 max-w-[600px] text-pretty text-[15px] sm:text-[17px] leading-relaxed text-foreground/70">
            I'm a third year undergraduate at <TextLink href="https://stanford.edu" className="text-[15px] sm:text-[17px]">Stanford University</TextLink> studying <span className="font-medium text-foreground">Computer Science and Music</span>. I strive to find meaning through my work, whether I'm building projects, conducting research, or learning new things.
          </p>
        </div>

          <div style={fadeUp(640)}>
            <ButtonRow />
          </div>

        </div>
      </div>

      {/* Scroll indicator pinned to bottom */}
      <div style={fadeUp(760)} className="shrink-0 pb-16 sm:pb-8 flex justify-center">
        <a
          href="#projects"
          className="flex flex-col items-center gap-2 text-muted-foreground/90 transition-colors hover:text-muted-foreground hover:scale-[1.05] transition duration-120"
          aria-label="Scroll down"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
