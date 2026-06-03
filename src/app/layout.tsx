import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { TooltipProvider } from "@/components/ui/tooltip"
import { keywords, personalInfo } from "@/lib/data"
import JsonLd from "./json-ld"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const BASE_URL = "https://resume.andreacruz.es"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Andrea Cruz. Full Stack Developer",
    template: "%s | Andrea Cruz",
  },
  description:
    "Construyo aplicaciones web y automatizaciones que resuelven problemas reales. Desarrollo full stack con Python, React y FastAPI, desplegado en infraestructura self-hosted.",
  keywords: keywords.join(", "),
  authors: [{ name: "Andrea Guadalupe Cruz Hernández", url: BASE_URL }],
  creator: "Andrea Guadalupe Cruz Hernández",
  publisher: "Andrea Guadalupe Cruz Hernández",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Andrea Cruz. Portfolio",
    title: "Andrea Cruz. Full Stack Developer",
    description:
      "Construyo aplicaciones web y automatizaciones que resuelven problemas reales. Desarrollo full stack con Python, React y FastAPI.",
    url: BASE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Andrea Cruz. Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrea Cruz. Full Stack Developer",
    description:
      "Construyo aplicaciones web y automatizaciones que resuelven problemas reales. Python, React, FastAPI.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-[100dvh] flex flex-col antialiased">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </TooltipProvider>
        <JsonLd />
      </body>
    </html>
  )
}
