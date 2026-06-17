import { aboutText, skillCategories } from "@/lib/data"
import { Monitor, Server, Terminal, Workflow } from "lucide-react"
import SectionWithMockup from "@/components/effects/SectionWithMockup"
import { AuroraText } from "@/components/effects/AuroraText"
import FadeIn from "@/components/fade-in"

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  workflow: <Workflow className="w-5 h-5" />,
}

export default function AboutPage() {
  const paragraphs = aboutText.split("\n\n")

  return (
    <>
      {/* Section with Mockup — Full Stack Development */}
      <SectionWithMockup
        title={
          <>
            Desarrollo Full Stack
            <br />
            con propósito
          </>
        }
        description={
          <>
            Construyo aplicaciones web completas desde el frontend con React y Next.js hasta el
            backend con Python, FastAPI y PostgreSQL. Cada proyecto lo despliego con Docker en mi
            propia infraestructura Linux, automatizando procesos con n8n y manteniendo todo bajo
            control con Git. Me apasiona crear soluciones que realmente funcionan en producción,
            optimizadas, seguras y mantenibles.
          </>
        }
        primaryImageSrc="/projects/n8n-workflow.png"
        secondaryImageSrc="/projects/hermes-panel.png"
      />

      {/* Atmospheric background */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] rounded-full bg-[#00E5FF]/[0.04] blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-24">
          {/* Header */}
          <FadeIn delay={0}>
            <div className="mb-16 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 heading-balanced">
                <AuroraText speed="slow">Sobre mí</AuroraText>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Construyo aplicaciones web y automatizaciones que resuelven problemas reales
              </p>
            </div>
          </FadeIn>

          {/* About text */}
          <FadeIn delay={0.1}>
            <section className="mb-12 p-8 sm:p-10 rounded-xl bg-card border border-white/[0.06] sheen card-lift">
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* Skills */}
          <FadeIn delay={0.2}>
            <section className="p-8 sm:p-10 rounded-xl bg-card border border-white/[0.06] sheen card-lift">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Terminal className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-semibold">Tecnologías</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {skillCategories.map((cat) => (
                  <div
                    key={cat.name}
                    className="p-4 rounded-xl bg-secondary/50 border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-2 mb-3 text-foreground font-medium">
                      <span className="text-primary">
                        {iconMap[cat.icon] || <Terminal className="w-4 h-4" />}
                      </span>
                      {cat.name}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex px-2 py-0.5 text-xs rounded-md border border-primary/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
