"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

// Emil Kowalski ease-out
const easeOut = [0.23, 1, 0.32, 1] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
      when: "beforeChildren",
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: easeOut,
    },
  },
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  once?: boolean
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  className,
  once = true,
  staggerDelay,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-80px" })

  const variants = staggerDelay
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
            when: "beforeChildren",
          },
        },
      }
    : containerVariants

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

const slideRightVariants = {
  hidden: { opacity: 0, x: -16, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: easeOut },
  },
}

export function StaggerItemRight({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={slideRightVariants} className={className}>
      {children}
    </motion.div>
  )
}
