import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { TooltipProvider } from "@/components/ui/tooltip"
import { keywords } from "@/lib/data"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://resume.andreacruz.es"),
  title: {
    default: "Andrea Cruz | Full Stack Developer",
    template: "%s | Andrea Cruz",
  },
  description:
    "Full Stack Developer especializada en observabilidad industrial, automatización e IA. React, FastAPI, Odoo, Node-RED, Elasticsearch.",
  keywords: keywords.join(", "),
  authors: [{ name: "Andrea Guadalupe Cruz Hernández" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Andrea Cruz Portfolio",
    title: "Andrea Cruz | Full Stack Developer",
    description:
      "Full Stack Developer especializada en observabilidad industrial, automatización e IA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrea Cruz | Full Stack Developer",
    description:
      "Full Stack Developer especializada en observabilidad industrial, automatización e IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  )
}
