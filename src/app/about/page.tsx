import { aboutText, skillCategories, journey } from "@/lib/data"
import { Monitor, Server, Terminal, Workflow, Calendar, ArrowRight } from "lucide-react"
import SectionWithMockup from "@/components/effects/SectionWithMockup"
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
      {/* Atmospheric background */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="absolute top-[-100px] left-[10%] w-[600px] h-[400px] rounded-full bg-primary/6 blur-[120px]" />
          <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[300px] rounded-full bg-[#00E5FF]/[0.03] blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-24">
          {/* Section with Mockup */}
          <SectionWithMockup
            title={
              <>
                De becaria a
                <br />
                desarrolladora
              </>
            }
            description={
              <>
                Empece en el mundo del desarrollo con una FP y una beca en CIVIR.
                En poco mas de un ano pase de no saber que era Docker a gestionar
                servidores, automatizar procesos con n8n y montar Odoo 19 desde cero.
                Aprendi de companeros con mas experiencia y de cada proyecto que cayo
                en mis manos.
              </>
            }
            primaryImageSrc="/projects/n8n-workflow.png"
            secondaryImageSrc="/projects/hermes-panel.png"
          />

          {/* About text — the real story */}
          <FadeIn delay={0.1}>
            <section className="mb-12 p-8 sm:p-10 rounded-xl bg-card border border-white/[0.06] sheen card-lift">
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* Journey Timeline */}
          <FadeIn delay={0.15}>
            <section className="mb-12 p-8 sm:p-10 rounded-xl bg-card border border-white/[0.06] sheen card-lift">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-semibold">Mi viaje</h2>
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/[0.06]" />

                <div className="space-y-8">
                  {journey.map((step, i) => (
                    <div key={i} className="relative flex gap-5">
                      {/* Dot */}
                      <div className="relative z-10 mt-1.5 flex-shrink-0 w-[10px] h-[10px] rounded-full bg-primary ring-4 ring-primary/15" />

                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-2">
                        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-mono text-primary/70 tabular-nums">
                            {step.year}
                          </span>
                          <h3 className="text-base font-semibold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
                <h2 className="text-2xl font-semibold">Tecnologias</h2>
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
