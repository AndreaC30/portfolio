"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, Terminal, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Sobre mí" },
  { href: "/experience", label: "Experiencia" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Proyectos" },
  { href: "/ai-labs", label: "AI Labs" },
  { href: "/contact", label: "Contacto" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Terminal className="h-5 w-5 text-primary transition-colors duration-200 group-hover:text-primary/80" />
          <span className="font-mono text-sm font-medium tracking-tight">
            andrea<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md active:scale-[0.97]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="fixed inset-0 top-14 z-50 bg-[#0B0F19] border-t border-border/50"
              >
                <nav className="flex flex-col gap-1 p-6 pt-8">
                  {navItems.map((item, i) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg active:scale-[0.98]",
                            isActive
                              ? "text-primary bg-primary/10"
                              : "text-foreground/80 hover:text-foreground hover:bg-white/5"
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
