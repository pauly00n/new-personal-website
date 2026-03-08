import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import { ScrollReset } from "@/components/scroll-reset"
import { HeroBackground } from "@/components/hero-background"

export default function Page() {
  return (
    <>
      <div style={{ position: 'fixed', top: '-300px', bottom: '-300px', left: 0, right: 0, zIndex: -10 }}>
        <HeroBackground />
      </div>
      <ScrollReset />
      <main>
        <Hero />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </>
  )
}
