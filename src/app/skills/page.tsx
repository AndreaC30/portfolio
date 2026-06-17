import { Monitor, Server, Terminal, Workflow } from "lucide-react"
import { skillCategories } from "@/lib/data"
import { AuroraText } from "@/components/effects/AuroraText"
import { Marquee } from "@/components/effects/Marquee"
import FadeIn from "@/components/fade-in"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  server: Server,
  terminal: Terminal,
  workflow: Workflow,
}

export default function SkillsPage() {
  const allSkills = skillCategories.flatMap((cat) => cat.skills)

  return (
    <div className="relative">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] rounded-full bg-[#00E5FF]/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Terminal className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight heading-balanced">
                <AuroraText speed="slow">Skills</AuroraText>
              </h1>
            </div>
            <div className="divider-fade my-6" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Tecnologías organizadas por área de especialización.
            </p>
          </div>
        </FadeIn>

        {/* Tech tags marquee — decorative */}
        <FadeIn delay={0.05}>
          <Marquee speed="slower" pauseOnHover className="py-4 mb-12">
            {allSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm font-medium text-white/60 whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </Marquee>
        </FadeIn>

        {/* Skill category cards — grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => {
            const IconComponent = iconMap[category.icon] || Terminal
            return (
              <FadeIn key={category.name} delay={0.1 + i * 0.05}>
                <div
                  className="group relative rounded-xl bg-card border border-white/[0.06] p-6 sheen card-lift"
                >
                  <div className="relative">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center
                          transition-colors duration-300 group-hover:bg-primary/15"
                      >
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {category.name}
                      </h3>
                    </div>

                    {/* Skill badges */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium
                            bg-secondary/60 text-secondary-foreground border border-white/[0.06]
                            transition-colors duration-200 cursor-default
                            hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>

        {/* Bottom decorative element */}
        <FadeIn delay={0.3}>
          <div className="flex justify-center mt-16">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="divider-fade w-8" />
              <span>tech stack</span>
              <div className="divider-fade w-8" />
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
