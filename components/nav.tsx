"use client"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import GlassPillAuto from "@/components/ui/glasspill-auto";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume.pdf" },
]

export function Nav() {
  const pathname = usePathname()
  const [overProjects, setOverProjects] = useState(false)

  useEffect(() => {
    function check() {
      const projects = document.getElementById('projects')
      if (!projects) { setOverProjects(false); return }
      const { top, bottom } = projects.getBoundingClientRect()
      setOverProjects(top < 74 && bottom > 0)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center bg-transparent">
      <style>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 200ms ease;
        }
        .nav-link:hover::after,
        .nav-link-active::after {
          transform: scaleX(1);
        }
      `}</style>
      <GlassPillAuto
        className="flex items-center gap-6 px-6 py-3"
        tintOpacity={overProjects ? 40 : 16}
      >
        <Image
            src="/icon-light.png"
            className="text-sm font-semibold tracking-tight text-foreground"
            alt="PY Logo"
            width={20}
            height={20}
        />
        <div className="h-4 w-px bg-foreground/10" />
        {navLinks.map((link) => (
          <a
            key={link.href + link.label}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            className={`nav-link text-sm transition-colors ${pathname === link.href ? "text-black nav-link-active" : "text-black/70 hover:text-black"}`}
          >
            {link.label}
          </a>
        ))}
      </GlassPillAuto>
    </header>
  )
}
