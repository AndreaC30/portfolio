import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Andrea Cruz, Full Stack Developer. ¿Tienes un proyecto de desarrollo web, automatización industrial u observabilidad? Hablemos.",
  openGraph: {
    title: "Contacto | Andrea Cruz",
    description:
      "Contacta con Andrea Cruz para proyectos de desarrollo web, automatización industrial u observabilidad.",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
