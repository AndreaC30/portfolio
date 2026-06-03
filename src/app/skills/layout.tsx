import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Stack tecnológico de Andrea Cruz: React, Next.js, TypeScript, Python, FastAPI, Elasticsearch, Node-RED, Docker y más. Frontend, Backend, IoT industrial y DevOps.",
  openGraph: {
    title: "Skills | Andrea Cruz",
    description:
      "Stack tecnológico: React, Next.js, TypeScript, Python, FastAPI, Elasticsearch, Node-RED, Docker. Frontend, Backend, IoT y DevOps.",
  },
}

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
