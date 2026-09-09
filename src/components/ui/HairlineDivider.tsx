import { cn } from '@/lib/utils'

interface HairlineDividerProps {
  className?: string
  ornament?: boolean
  dark?: boolean
}

export function HairlineDivider({
  className,
  ornament = false,
  dark = false,
}: HairlineDividerProps) {
  if (ornament) {
    return (
      <div
        className={cn(
          'flex items-center gap-4 my-8',
          className
        )}
      >
        <div
          className={cn(
            'h-px flex-1',
            dark ? 'bg-cream/20' : 'bg-sage/20'
          )}
        />
        <span
          className={cn(
            'text-xs tracking-[0.3em] uppercase font-medium',
            dark ? 'text-cream/40' : 'text-sage/40'
          )}
        >
          ✦
        </span>
        <div
          className={cn(
            'h-px flex-1',
            dark ? 'bg-cream/20' : 'bg-sage/20'
          )}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'h-px my-8',
        dark ? 'bg-cream/15' : 'bg-sage/15',
        className
      )}
    />
  )
}
