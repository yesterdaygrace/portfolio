import { cn } from '@/lib/utils'

interface Props {
  index: string
  title: string
  comment?: string
  className?: string
}

export default function SectionHeader({ index, title, comment, className }: Props) {
  return (
    <div className={cn('flex items-center gap-3 mb-12', className)}>
      <span className="font-mono text-xs text-indigo-400 select-none">{index}</span>
      <h2 className="text-base font-semibold text-neutral-100 tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-[#1e1e1e]" />
      {comment && (
        <span className="font-mono text-xs text-neutral-600 hidden sm:block">// {comment}</span>
      )}
    </div>
  )
}
