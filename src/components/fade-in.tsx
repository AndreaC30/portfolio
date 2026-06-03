"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  scale?: boolean
  duration?: number
}

const directionOffset = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
}

// Emil Kowalski recommended easing: ease-out expo
const easeOut = [0.23, 1, 0.32, 1] as const

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  scale = false,
  duration = 0.5,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          scale: scale ? 0.96 : 1,
          ...directionOffset[direction],
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0, scale: 1 }
            : { opacity: 0, ...directionOffset[direction], scale: scale ? 0.96 : 1 }
        }
        transition={{
          duration,
          delay,
          ease: easeOut,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function ScaleFadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.95, y: 12 }
        }
        transition={{
          duration: 0.45,
          delay,
          ease: easeOut,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Page transition with subtle blur (emil-design-eng § blur technique)
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}
