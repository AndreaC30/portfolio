import Link from "next/link"
import { personalInfo, skillCategories, aboutText } from "@/lib/data"
import {
  CaretRight,
  DownloadSimple,
  Monitor,
  HardDrives,
  Terminal,
  Gear,
  FileTs,
  Code,
  Database,
  Cloud,
  GitBranch,
} from "@phosphor-icons/react/dist/ssr"
import { AuroraText } from "@/components/effects/AuroraText"
import { Marquee } from "@/components/effects/Marquee"
import { Particles } from "@/components/effects/Particles"
import { OrbitingCircles } from "@/components/effects/OrbitingCircles"
import { SparklesText } from "@/components/effects/SparklesText"
import DisplayCards from "@/components/effects/DisplayCards"

const categoryIcons: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-5 h-5" />,
  server: <HardDrives className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  workflow: <Gear className="w-5 h-5" />,
}

// Tech icons for the orbiting circles
const orbitIcons = [
  { icon: <FileTs className="w-5 h-5" />, color: "text-[#3178C6]" },
  { icon: <Code className="w-5 h-5" />, color: "text-[#61DAFB]" },
  { icon: <Database className="w-5 h-5" />, color: "text-[#336791]" },
  { icon: <Cloud className="w-5 h-5" />, color: "text-[#FF9900]" },
  { icon: <GitBranch className="w-5 h-5" />, color: "text-[#F05032]" },
  { icon: <Terminal className="w-5 h-5" />, color: "text-[#4AF626]" },
]

export default function Home() {
  const aboutPreview = aboutText.split("\n\n")[0]
  const allSkills = skillCategories.flatMap((cat) => cat.skills)

  return (
    <>
      {/* Hero — with Particles background, OrbitingCircles, SparklesText */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-dot-grid">
        {/* Ambient orbs */}
        <div className="absolute top-[-10%] -right-40 w-[40rem] h-[40rem] rounded-full bg-[#2563EB]/[0.04] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-20%] -left-40 w-[35rem] h-[35rem] rounded-full bg-[#7C3AED]/[0.03] blur-[130px] pointer-events-none" />

        {/* Particles canvas — behind everything */}
        <Particles
          className="absolute inset-0 z-0"
          quantity={80}
          staticity={30}
          ease={40}
          color="#2563EB"
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 py-16 md:py-0">
          <div className="md:max-w-[65%]">
            {/* Badge with orbiting circles */}
            <div className="relative inline-flex mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border text-muted-foreground text-xs sm:text-sm bg-background/60 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-subtle-pulse" />
                <span>disponible para proyectos</span>
              </div>
              {/* Orbiting tech icons around the badge */}
              <OrbitingCircles
                radius={100}
                duration={25}
                iconSize={36}
                speed={0.8}
                path={false}
              >
                {orbitIcons.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center w-9 h-9 rounded-full bg-card border border-border/50 ${item.color}`}
                  >
                    {item.icon}
                  </div>
                ))}
              </OrbitingCircles>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-4 md:mb-5 heading-balanced">
              <AuroraText speed="slow">Andrea Cruz</AuroraText>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mt-2">
                <SparklesText
                  className="text-inherit"
                  sparklesCount={12}
                  colors={{ first: "#2563EB", second: "#00E5FF" }}
                >
                  {personalInfo.title}
                </SparklesText>
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mb-8 md:mb-10">
              {personalInfo.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="sheen inline-flex items-center gap-2 rounded-xl px-7 h-12 text-sm font-semibold btn-gradient active:scale-[0.97]"
              >
                <CaretRight className="w-4 h-4" />
                Ver Proyectos
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg px-6 h-11 text-sm border border-primary/30 text-primary transition-colors duration-200 hover:border-primary/50 active:scale-[0.97]"
              >
                <DownloadSimple className="w-4 h-4" />
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
              Sobre mi
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto text-center mb-6">
            {aboutPreview}
          </p>

          <div className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group py-2"
            >
              Leer mas sobre mi
              <CaretRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack — horizontal marquee */}
      <section className="py-16 md:py-24 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Con que trabajo
            </h2>
            <p className="text-sm text-muted-foreground">
              Tecnologias que uso en mi dia a dia
            </p>
          </div>

          <Marquee speed="slower" pauseOnHover className="py-4">
            {allSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border/50 text-sm font-medium text-foreground whitespace-nowrap hover:border-primary/30 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </Marquee>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {skillCategories.map((cat) => (
              <span
                key={cat.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary/40 text-xs text-muted-foreground border border-border/30"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects — stacked DisplayCards */}
      <section className="py-16 md:py-24 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
              Proyectos Destacados
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-10">
            Pasa el raton por encima para explorar
          </p>

          <div className="flex justify-center">
            <DisplayCards />
          </div>

          <div className="mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group py-2"
            >
              Ver todos los proyectos
              <CaretRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
