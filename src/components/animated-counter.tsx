"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  if (!hasAnimated) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {from.toFixed(decimals)}
        {suffix}
      </span>
    )
  }

  return <CounterInner from={from} to={to} duration={duration} suffix={suffix} prefix={prefix} className={className} decimals={decimals} />
}

interface CounterInnerProps {
  from: number
  to: number
  duration: number
  suffix: string
  prefix: string
  className: string
  decimals: number
}

function CounterInner({ from, to, duration, suffix, prefix, className, decimals }: CounterInnerProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest: number) => latest.toFixed(decimals))

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
    })
    return controls.stop
  }, [count, to, duration])

  return (
    <motion.span className={className}>
      {prefix}
      {rounded as unknown as React.ReactNode}
      {suffix}
    </motion.span>
  )
}
