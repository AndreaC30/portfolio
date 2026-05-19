"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, Terminal } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Sobre mí" },
  { href: "/experience", label: "Experiencia" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Proyectos" },
  { href: "/contact", label: "Contacto" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Terminal className="h-5 w-5 text-primary transition-colors group-hover:text-primary/80" />
          <span className="font-mono text-sm font-medium tracking-tight">
            andrea<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
          {open && (
            <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm">
              <nav className="flex flex-col gap-2 p-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 text-base font-medium transition-colors rounded-md",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
