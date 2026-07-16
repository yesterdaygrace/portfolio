'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  text: string
  delay?: number
  className?: string
  showCursor?: boolean
  speed?: number
}

export default function TerminalLine({ text, delay = 0, className, showCursor = false, speed = 40 }: Props) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      setDone(true)
      return
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [started, displayed, text, speed])

  return (
    <span className={cn('font-mono', className)}>
      {displayed}
      {showCursor && !done && <span className="animate-pulse text-indigo-400">|</span>}
    </span>
  )
}
