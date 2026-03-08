import { Hero } from "@/components/hero"
import { Work } from "@/components/work"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ScrollReset } from "@/components/scroll-reset"
import { HeroBackground } from "@/components/hero-background"

export default function Page() {
  return (
    <>
      {/* Extended fixed background — extra 300px above/below covers Safari rubber-band overscroll */}
      <div style={{ position: 'fixed', top: '-300px', bottom: '-300px', left: 0, right: 0, zIndex: -10 }}>
        <HeroBackground />
      </div>
      {/* Footer overscroll fill — sits behind page content (zIndex -1) at bottom of viewport.
          Normally covered by the footer. During bottom overscroll the footer bounces away and this shows. */}
      <div>
        <ScrollReset />
        <main>
          <Hero />
          <Projects />
          <Skills />
        </main>
        <Footer />
      </div>
    </>
  )
}
