import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  id?: string
  dark?: boolean
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  dark = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24 lg:py-32',
        dark ? 'bg-dark text-cream' : 'bg-warm-white text-charcoal',
        className
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-7xl px-6 lg:px-8',
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}
