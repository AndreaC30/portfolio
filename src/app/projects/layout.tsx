import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos de Andrea Cruz: Observabilidad Industrial, Integración PLC + Node-RED, Odoo Custom Development y FastAPI REST API. Soluciones que conectan el mundo industrial con desarrollo web moderno.",
  openGraph: {
    title: "Proyectos | Andrea Cruz",
    description:
      "Proyectos destacados: Observabilidad Industrial, Integración PLC + Node-RED, Odoo Custom Development y FastAPI REST API.",
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
