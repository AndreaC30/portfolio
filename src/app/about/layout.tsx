import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conoce más sobre Andrea Cruz, Full Stack Developer especializada en observabilidad industrial, automatización e integración de sistemas. Trayectoria, filosofía de trabajo y stack tecnológico.",
  openGraph: {
    title: "Sobre mí | Andrea Cruz",
    description:
      "Conoce más sobre Andrea Cruz, Full Stack Developer especializada en observabilidad industrial, automatización e integración de sistemas.",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
