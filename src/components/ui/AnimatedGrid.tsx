'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  variant?: 'dots' | 'lines'
  opacity?: number
}

export default function AnimatedGrid({ className, variant = 'lines', opacity = 0.03 }: Props) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      {variant === 'lines' ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity * 3}) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      )}
      {/* Radial fade: content visible in center, fades toward edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 0%, transparent 60%, #000 100%)',
        }}
      />
    </div>
  )
}
