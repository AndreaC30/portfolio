import { aboutText, skillCategories } from "@/lib/data"
import { Monitor, Server, Terminal, Workflow } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  workflow: <Workflow className="w-5 h-5" />,
}

export default function AboutPage() {
  const paragraphs = aboutText.split("\n\n")

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 heading-balanced">
          Sobre mí
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Construyo aplicaciones web y automatizaciones que resuelven problemas reales
        </p>
      </div>

      {/* About text */}
      <section className="mb-12 p-8 sm:p-10 rounded-xl bg-card border border-border/50">
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="p-8 sm:p-10 rounded-xl bg-card border border-border/50">
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
              className="p-4 rounded-xl bg-secondary/50 border border-border/30"
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
    </div>
  )
}
