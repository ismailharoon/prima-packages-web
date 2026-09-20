'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface ProductMediaCarouselProps {
  images: string[]
  productName: string
  moq?: string
  dispatchDays?: string
}

export function ProductMediaCarousel({ images, productName, moq, dispatchDays }: ProductMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Use IntersectionObserver to track which slide is visible
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const slides = container.querySelectorAll('[data-slide]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.slide)
            setActiveIndex(index)
          }
        })
      },
      { root: container, threshold: 0.6 }
    )

    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [images.length])

  return (
    <div className="relative w-full">
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        {images.map((src, idx) => (
          <div
            key={src}
            data-slide={idx}
            className="relative shrink-0 w-full snap-center aspect-[4/5] lg:aspect-[4/3] bg-[#F5F6F8]"
          >
            <Image
              src={src}
              alt={`${productName} - view ${idx + 1}`}
              fill
              preload={idx === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              quality={75}
            />
          </div>
        ))}
      </div>

      {/* Floating Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between pointer-events-none">
        {moq && (
          <span className="bg-charcoal/80 text-cream text-[11px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
            {moq}
          </span>
        )}
        {dispatchDays && (
          <span className="bg-[#25D366]/90 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm ml-auto">
            ⚡ {dispatchDays}
          </span>
        )}
      </div>

      {/* Pagination Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-5 bg-charcoal/80 shadow-sm'
                  : 'w-1.5 bg-charcoal/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
