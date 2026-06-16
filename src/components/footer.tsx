"use client"

import { motion } from "framer-motion"
import { FolderGit2, ExternalLink, Mail, Terminal } from "lucide-react"
import Link from "next/link"
import { personalInfo } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 py-1">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">
              andrea<span className="text-primary">.dev</span>
            </span>
          </Link>

          <div className="flex items-center gap-5">
            {[
              { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
              { icon: FolderGit2, href: personalInfo.github, label: "GitHub" },
              { icon: ExternalLink, href: personalInfo.linkedin, label: "LinkedIn" },
            ].map((item) => (
              <motion.a
                key={item.label}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                href={item.href}
                target={item.label !== "Email" ? "_blank" : undefined}
                rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Andrea Cruz
          </p>
        </div>
      </div>
    </footer>
  )
}
