import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
  className?: string
}

const variantClasses = {
  default: 'bg-[#111] border border-[#2a2a2a] text-neutral-400',
  accent: 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400',
  success: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400',
  warning: 'bg-amber-500/10 border border-amber-500/20 text-amber-400',
  outline: 'border border-[#2a2a2a] text-neutral-500 bg-transparent',
  ghost: 'text-neutral-500 bg-transparent',
}

const sizeClasses = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2 py-0.5',
}

export default function Badge({ children, variant = 'default', size = 'md', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono rounded-md font-medium leading-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}
