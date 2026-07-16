'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  glowColor?: string
  hover?: boolean
}

export default function GlowCard({ children, className, glowColor = 'rgba(99,102,241,0.08)', hover = true }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn(
        'relative bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl transition-colors duration-200',
        hover && 'hover:border-[#2a2a2a] cursor-default',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered && hover ? `0 0 30px ${glowColor}` : '0 0 0px transparent',
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
