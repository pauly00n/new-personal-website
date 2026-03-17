import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import { ScrollReset } from "@/components/scroll-reset"

export default function Page() {
  return (
    <>
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
