import { cn } from '@/lib/utils'

interface PlaceholderImageProps {
  icon?: string
  label?: string
  className?: string
  variant?: 'default' | 'hero' | 'card'
}

export function PlaceholderImage({
  icon = '📦',
  label,
  className,
  variant = 'default',
}: PlaceholderImageProps) {
  const gradients = {
    default: 'from-cream via-ivory to-sage/10',
    hero: 'from-sage/20 via-cream to-ivory',
    card: 'from-cream to-ivory',
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center bg-gradient-to-br',
        gradients[variant],
        className
      )}
    >
      <span className="text-5xl mb-3 opacity-40" role="img" aria-label={label}>
        {icon}
      </span>
      {label && (
        <span className="text-xs uppercase tracking-[0.2em] text-sage/50 font-medium">
          {label}
        </span>
      )}
    </div>
  )
}
