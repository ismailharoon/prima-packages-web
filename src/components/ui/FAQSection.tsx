'use client'

import React from 'react'
import type { FAQ } from '@/data/faqs'
import { cn } from '@/lib/utils'

interface FAQSectionProps {
  faqs: FAQ[]
  heading?: string
  className?: string
}

export function FAQSection({ faqs, heading = 'Frequently Asked Questions', className }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null

  return (
    <section className={cn('bg-warm-white py-14 sm:py-20 lg:py-24 border-t border-charcoal/10', className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      
      <div className="mx-auto max-w-7xl px-5 sm:px-14 lg:px-20">
        <div className="mb-10 max-w-3xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-tight">
            {heading}
          </h2>
        </div>
        
        <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5 sm:py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg sm:text-xl text-charcoal">
                {faq.question}
                <span className="text-sage text-xl transition-transform group-open:rotate-45 font-sans">+</span>
              </summary>
              <p className="max-w-2xl pr-8 pt-3 text-xs sm:text-sm leading-relaxed text-charcoal/70">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
