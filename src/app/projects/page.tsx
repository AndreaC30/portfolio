import Image from "next/image"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data"
import { cn } from "@/lib/utils"
import {
  Lightbulb,
  Sparkles,
  Code2,
  TrendingUp,
  GraduationCap,
  FolderGit2,
  Monitor,
  ArrowRight,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { ShineBorder } from "@/components/effects/ShineBorder"
import { AuroraText } from "@/components/effects/AuroraText"
import FadeIn from "@/components/fade-in"

const sectionConfig = [
  { key: "problem" as const, icon: Lightbulb, label: "PROBLEMA", color: "text-chart-2", bg: "bg-chart-2/10" },
  { key: "solution" as const, icon: Sparkles, label: "SOLUCION", color: "text-primary", bg: "bg-primary/10" },
  { key: "implementation" as const, icon: Code2, label: "IMPLEMENTACION", color: "text-chart-5", bg: "bg-chart-5/10" },
  { key: "result" as const, icon: TrendingUp, label: "RESULTADO", color: "text-chart-3", bg: "bg-chart-3/10" },
]

export default function ProjectsPage() {
  return (
    <div className="relative">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute top-[0] right-[0] w-[700px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[0] left-[0] w-[400px] h-[300px] rounded-full bg-[#00E5FF]/[0.04] blur-[100px]" />
      </div>

      <section className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <FolderGit2 className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight heading-balanced">
                <AuroraText speed="slow">Proyectos</AuroraText>
              </h1>
            </div>
            <div className="divider-fade max-w-[200px]" />
            <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
              Proyectos personales y profesionales. Unos son publicos, otros son privados porque
              pertenecen a la empresa donde trabajo. En todos he aprendido algo nuevo.
            </p>
          </div>
        </FadeIn>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={0.1 + i * 0.08}>
              <ShineBorder speed="slow" className="h-full">
                <Card
                  className={cn(
                    "group h-full flex flex-col border-0 bg-card card-lift"
                  )}
                >
                  <CardHeader className="relative z-10 pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {project.title}
                      </CardTitle>
                      {project.professional && (
                        <span className="inline-flex items-center gap-1 shrink-0 rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 text-[#2DD4BF] text-[0.6rem] px-2 py-0.5 font-semibold uppercase tracking-wider">
                          <Building2 className="w-2.5 h-2.5" />
                          Profesional
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  {project.image && (
                    <div className="relative z-10 px-6 pb-4">
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/[0.06] bg-muted/30">
                        <Image
                          src={project.image}
                          alt={`Captura de ${project.title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  )}

                  <CardContent className="flex-1 space-y-4 relative z-10">
                    {sectionConfig.map(({ key, icon: Icon, label, color, bg }) => {
                      const text = project[key]
                      if (key === "implementation") {
                        return (
                          <div
                            key={key}
                            className="rounded-lg bg-muted/50 border border-white/[0.04] p-4 transition-colors duration-300 group-hover:border-primary/20"
                          >
                            <div className="flex items-start gap-3">
                              <div className={cn("p-1.5 rounded-md shrink-0 mt-0.5", bg)}>
                                <Icon className={cn("h-4 w-4", color)} />
                              </div>
                              <div className="min-w-0">
                                <span className={cn("text-xs font-semibold tracking-wider", color)}>
                                  {label}
                                </span>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {project.stack.slice(0, 5).map((tech) => (
                                    <span
                                      key={tech}
                                      className="inline-flex items-center rounded-full border border-transparent bg-secondary text-secondary-foreground text-xs font-mono px-2.5 py-0.5 font-semibold cursor-default"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return (
                        <div
                          key={key}
                          className="rounded-lg bg-muted/50 border border-white/[0.04] p-4 transition-colors duration-300 group-hover:border-primary/20"
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn("p-1.5 rounded-md shrink-0 mt-0.5", bg)}>
                              <Icon className={cn("h-4 w-4", color)} />
                            </div>
                            <div>
                              <span className={cn("text-xs font-semibold tracking-wider", color)}>
                                {label}
                              </span>
                              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                {text}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {/* Aprendizajes */}
                    {project.aprendizajes && (
                      <div className="rounded-lg bg-muted/50 border border-white/[0.04] p-4 transition-colors duration-300 group-hover:border-primary/20">
                        <div className="flex items-start gap-3">
                          <div className="p-1.5 rounded-md shrink-0 mt-0.5 bg-primary/10">
                            <GraduationCap className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold tracking-wider text-primary">
                              QUE APRENDI
                            </span>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                              {project.aprendizajes}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="relative z-10 flex flex-wrap gap-2">
                    {project.github && (
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="group/btn border-primary/30 transition-colors duration-200 active:scale-[0.97] hover:border-primary/60 hover:bg-primary/5"
                        >
                          <FolderGit2 className="h-4 w-4 mr-2" />
                          Ver codigo
                          <ArrowRight className="h-3 w-3 ml-2 opacity-0 -translate-x-1 transition-all duration-200 ease-[0.23,1,0.32,1] group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                        </Button>
                      </Link>
                    )}
                    {project.demo ? (
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="group/btn border-white/[0.06] transition-colors duration-200 active:scale-[0.97] hover:border-primary/40 hover:bg-primary/5"
                        >
                          <Monitor className="h-4 w-4 mr-2" />
                          Ver demo
                        </Button>
                      </Link>
                    ) : project.professional ? (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="border-white/[0.04] text-muted-foreground/40 cursor-not-allowed"
                      >
                        <Building2 className="h-4 w-4 mr-2" />
                        Codigo privado
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="border-white/[0.04] text-muted-foreground/50 cursor-not-allowed"
                      >
                        <Monitor className="h-4 w-4 mr-2" />
                        Demo proximamente
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </ShineBorder>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  )
}
