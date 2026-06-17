import { Calendar, CheckCircle2, Briefcase } from "lucide-react"
import { experience } from "@/lib/data"
import { cn } from "@/lib/utils"
import { AuroraText } from "@/components/effects/AuroraText"
import FadeIn from "@/components/fade-in"

function TimelineDot() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute w-7 h-7 rounded-full bg-primary/15" />
      <div className="relative w-5 h-5 rounded-full bg-background ring-2 ring-primary/50 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
    </div>
  )
}

export default function ExperiencePage() {
  return (
    <div className="relative">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] rounded-full bg-[#00E5FF]/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Briefcase className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight heading-balanced">
                <AuroraText speed="slow">Experiencia</AuroraText>
              </h1>
            </div>
            <div className="divider-fade my-6" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Dónde he trabajado y qué resultados he conseguido.
            </p>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line - visible on md+ */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.06] hidden md:block" />

          {/* Timeline line - left side on mobile */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/[0.06] md:hidden" />

          <div className="space-y-16 md:space-y-20">
            {experience.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <FadeIn key={index} delay={0.1 + index * 0.1}>
                  <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-4 md:gap-8">
                    {/* Content column (alternates sides on desktop) */}
                    <div
                      className={cn(
                        "relative",
                        isEven
                          ? "md:col-start-3 md:col-end-4"
                          : "md:col-start-1 md:col-end-2 md:text-right"
                      )}
                    >
                      {/* Card */}
                      <div
                        className={cn(
                          "ml-12 md:ml-0 relative group",
                          "p-6 rounded-xl bg-card border border-white/[0.06] sheen card-lift"
                        )}
                      >
                        {/* Current badge */}
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-foreground">
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/20 text-primary text-[0.65rem] px-2 py-0 font-semibold">
                              Actual
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-medium text-primary mb-2">
                          {exp.company}
                        </p>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>{exp.period}</span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Highlights */}
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Timeline node (center column) - only on md+ */}
                    <div className="hidden md:flex md:col-start-2 md:col-end-3 items-start justify-center pt-2">
                      <TimelineDot />
                    </div>

                    {/* Timeline node - mobile */}
                    <div className="absolute left-0 top-2 md:hidden">
                      <TimelineDot />
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>

          {/* Timeline endpoint */}
          <FadeIn delay={0.5}>
            <div className="flex justify-center mt-8">
              <div className="w-2.5 h-2.5 rounded-full bg-primary/35" />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
