import { personalInfo } from "@/lib/data"

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrea Guadalupe Cruz Hernández",
    alternateName: "Andrea Cruz",
    jobTitle: "Full Stack Developer | AI Automation & AI Video Generation",
    description:
      "Full Stack Developer especializada en automatización con IA, generación de video con inteligencia artificial, n8n, Odoo 19 y desarrollo asistido por Cursor IDE. React, FastAPI, Docker, Python.",
    url: "https://resume.andreacruz.es",
    sameAs: [
      personalInfo.github,
      personalInfo.linkedin,
    ],
    email: personalInfo.email,
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Python",
      "FastAPI",
      "Django",
      "n8n",
      "Odoo 19",
      "Cursor IDE",
      "AI Video Generation",
      "Runway",
      "HeyGen",
      "Synthesia",
      "MCPs",
      "Docker",
      "Node-RED",
      "Process Automation",
    ],
    worksFor: {
      "@type": "Organization",
      name: "CIVIR",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
