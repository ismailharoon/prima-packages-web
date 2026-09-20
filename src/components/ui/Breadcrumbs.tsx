import React from 'react'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null

  const schemaItems = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: item.href ? `${SITE_URL}${item.href}` : undefined,
  }))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems,
  }

  return (
    <nav aria-label="Breadcrumb" className={cn('py-4 text-xs sm:text-sm text-charcoal/60', className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-charcoal transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast && 'font-semibold text-charcoal')} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-charcoal/30 select-none">&gt;</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
