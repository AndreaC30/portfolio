"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Wrench,
  Robot,
  Database,
  Gear,
} from "@phosphor-icons/react"

/* ───────────────────────────────────────────
   DisplayCard — single stacked card
   ─────────────────────────────────────────── */

interface DisplayCardProps {
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
  date?: string
  iconClassName?: string
  titleClassName?: string
}

function DisplayCard({
  className,
  icon = <Wrench className="size-4 text-blue-300" weight="bold" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']",
        "hover:border-white/20 hover:bg-muted",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className,
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  )
}

/* ───────────────────────────────────────────
   DisplayCards — stacked container
   ─────────────────────────────────────────── */

interface DisplayCardsProps {
  cards?: DisplayCardProps[]
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      icon: <Robot className="size-4 text-blue-300" weight="bold" />,
      title: "Hermes Agent",
      description: "Agentes de IA autónomos para dev",
      date: "Python · Docker · Linux",
      iconClassName: "text-[#00E5FF]",
      titleClassName: "text-[#00E5FF]",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Database className="size-4 text-blue-300" weight="bold" />,
      title: "Infraestructura Self-Hosted",
      description: "Servidor Linux con apps aisladas",
      date: "Nginx · Docker · SSL",
      iconClassName: "text-chart-2",
      titleClassName: "text-chart-2",
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Gear className="size-4 text-blue-300" weight="bold" />,
      title: "n8n Automatización",
      description: "Flujos que conectan APIs y sistemas",
      date: "n8n · FastAPI · Docker",
      iconClassName: "text-chart-5",
      titleClassName: "text-chart-5",
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ]

  const displayCards = cards || defaultCards

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="grid [grid-template-areas:'stack'] place-items-center opacity-100"
    >
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </motion.div>
  )
}
