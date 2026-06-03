import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experiencia",
  description:
    "Trayectoria profesional de Andrea Cruz: Full Stack Developer en CIVIR, especializada en observabilidad industrial, automatización IT/OT, React, FastAPI, Odoo y Elasticsearch.",
  openGraph: {
    title: "Experiencia | Andrea Cruz",
    description:
      "Trayectoria profesional de Andrea Cruz: Full Stack Developer en CIVIR, especializada en observabilidad industrial y automatización IT/OT.",
  },
}

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
