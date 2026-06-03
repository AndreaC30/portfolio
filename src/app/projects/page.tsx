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
  FolderGit2,
  Monitor,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const sectionConfig = [
  { key: "problem" as const, icon: Lightbulb, label: "PROBLEMA", color: "text-chart-2", bg: "bg-chart-2/10" },
  { key: "solution" as const, icon: Sparkles, label: "SOLUCIÓN", color: "text-primary", bg: "bg-primary/10" },
  { key: "implementation" as const, icon: Code2, label: "IMPLEMENTACIÓN", color: "text-chart-5", bg: "bg-chart-5/10" },
  { key: "result" as const, icon: TrendingUp, label: "RESULTADO", color: "text-chart-3", bg: "bg-chart-3/10" },
]

export default function ProjectsPage() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <FolderGit2 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight heading-balanced">
            Proyectos
          </h1>
        </div>
        <div className="h-px w-[200px] bg-primary/30 max-w-[200px]" />
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
          Cada proyecto empieza con un problema real y termina con una solución en producción.
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.title} className="h-full">
            <Card
              className={cn(
                "group h-full flex flex-col border-border/50 bg-card card-lift",
                "hover:border-primary/25"
              )}
            >
              <CardHeader className="relative z-10 pb-3">
                <CardTitle className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 space-y-4 relative z-10">
                {/* Problem → Solution → Implementation → Result */}
                {sectionConfig.map(({ key, icon: Icon, label, color, bg }) => {
                  const text = project[key]
                  if (key === "implementation") {
                    return (
                      <div
                        key={key}
                        className="rounded-lg bg-muted/50 border border-border/40 p-4 transition-colors duration-300 group-hover:border-primary/20"
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn("p-1.5 rounded-md shrink-0 mt-0.5", bg)}>
                            <Icon className={cn("h-4 w-4", color)} />
                          </div>
                          <div className="min-w-0">
                            <span
                              className={cn(
                                "text-xs font-semibold uppercase tracking-wider",
                                color
                              )}
                            >
                              {label}
                            </span>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {project.stack.slice(0, 4).map((tech) => (
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
                      className="rounded-lg bg-muted/50 border border-border/40 p-4 transition-colors duration-300 group-hover:border-primary/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn("p-1.5 rounded-md shrink-0 mt-0.5", bg)}>
                          <Icon className={cn("h-4 w-4", color)} />
                        </div>
                        <div>
                          <span
                            className={cn(
                              "text-xs font-semibold uppercase tracking-wider",
                              color
                            )}
                          >
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
              </CardContent>

              <CardFooter className="relative z-10 flex flex-wrap gap-2">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/btn border-primary/30 transition-colors duration-200 active:scale-[0.97] hover:border-primary/60 hover:bg-primary/5"
                    >
                      <FolderGit2 className="h-4 w-4 mr-2" />
                      Ver código
                      <ArrowRight className="h-3 w-3 ml-2 opacity-0 -translate-x-1 transition-all duration-200 ease-[0.23,1,0.32,1] group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                    </Button>
                  </Link>
                )}
                {project.demo ? (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/btn border-border/50 transition-colors duration-200 active:scale-[0.97] hover:border-primary/40 hover:bg-primary/5"
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      Ver demo
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="border-border/30 text-muted-foreground/50 cursor-not-allowed"
                  >
                    <Monitor className="h-4 w-4 mr-2" />
                    Demo próximamente
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
