import Link from "next/link"
import { personalInfo, skillCategories, aboutText } from "@/lib/data"
import { ChevronRight, Download, Send, Monitor, Server, Terminal, Workflow } from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  workflow: <Workflow className="w-5 h-5" />,
}

export default function Home() {
  const aboutPreview = aboutText.split("\n\n")[0]

  return (
    <>
      {/* Hero — static, no typing, no blobs */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-dot-grid">
        {/* Single subtle ambient orb — CSS only, no framer-motion */}
        <div className="absolute top-[-10%] -right-40 w-[40rem] h-[40rem] rounded-full bg-primary/[0.03] blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 py-16 md:py-0">
          <div className="md:max-w-[65%]">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border text-muted-foreground text-xs sm:text-sm mb-6 md:mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-subtle-pulse" />
              <span>disponible para proyectos</span>
            </div>

            {/* Static heading — no typing effect */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-4 md:mb-5 heading-balanced">
              {personalInfo.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mb-8 md:mb-10">
              {personalInfo.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="sheen inline-flex items-center gap-2 rounded-xl px-7 h-12 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 ease-out active:scale-[0.97] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_32px_-12px_rgba(0,0,0,0.55)]"
              >
                <ChevronRight className="w-4 h-4" />
                Ver Proyectos
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg px-6 h-11 text-sm border border-primary/30 text-primary transition-colors duration-200 hover:border-primary/50 active:scale-[0.97]"
              >
                <Download className="w-4 h-4" />
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
              Sobre mí
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto text-center mb-6">
            {aboutPreview}
          </p>

          <div className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              Leer más sobre mí
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack — category cards */}
      <section className="py-16 md:py-24 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Con qué trabajo</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skillCategories.map((cat) => (
              <div
                key={cat.name}
                className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors duration-200 text-center"
              >
                <div className="text-primary mb-2 flex justify-center">
                  {categoryIcons[cat.icon] || <Terminal className="w-5 h-5" />}
                </div>
                <h3 className="text-sm font-semibold mb-2">{cat.name}</h3>
                <div className="flex flex-wrap justify-center gap-1">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex px-2 py-0.5 text-xs rounded-md bg-secondary/60 text-secondary-foreground border border-border/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
