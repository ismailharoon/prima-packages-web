'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SOCIAL_LINKS } from '@/lib/constants'

export interface HeroSlide {
  id: string
  badge: string
  title: string
  description: string
  image: string
  primaryCtaText: string
  primaryCtaLink: string
  whatsappText: string
  objectPositionDesktop?: string
  objectPositionMobile?: string
}

const SLIDES: HeroSlide[] = [
  {
    id: 'packaging-suite',
    badge: 'Complete Packaging Suite',
    title: 'Custom packaging that makes your brand look established.',
    description: 'Custom polyester woven labels, hang tags, zipper bags, courier flyers and print essentials for clothing and ecommerce businesses.',
    image: '/images/products/new-hero-2.png',
    primaryCtaText: 'Explore Products',
    primaryCtaLink: '/catalog',
    whatsappText: 'Salam Prima Packages team, I want to inquire about your complete custom packaging suite for my brand.',
    objectPositionDesktop: 'center',
    objectPositionMobile: 'right center',
  },
  {
    id: 'woven-labels',
    badge: 'Direct Label Manufacturer',
    title: 'High-Density Damask Woven Labels for Apparel Brands.',
    description: 'Ultra-crisp weaving, laser-sealed edges, zero-fray center folds, and skin-friendly softness. Low MOQs starting from 100 pcs.',
    image: '/images/products/woven-label-3.jpg',
    primaryCtaText: 'View Woven Labels',
    primaryCtaLink: '/products/woven-labels',
    whatsappText: 'Salam Prima Packages team, I want to get a quote for custom woven neck labels for my clothing line.',
    objectPositionDesktop: 'center',
    objectPositionMobile: 'center',
  },
  {
    id: 'zipper-bags',
    badge: 'Apparel & Ecommerce Bags',
    title: 'Custom Printed Frosted Zipper Bags & Slider Pouches.',
    description: 'Elevate your clothing unboxing with premium frosted zip bags. Custom sizes for t-shirts, lawn suits, hoodies, and jackets.',
    image: '/images/products/zipper-bags-hero-v2.png',
    primaryCtaText: 'View Zipper Bags',
    primaryCtaLink: '/products/zipper-bags',
    whatsappText: 'Salam Prima Packages team, I want to get a quote for custom printed frosted zipper packaging bags.',
    objectPositionDesktop: 'center',
    objectPositionMobile: 'center',
  },
  {
    id: 'carry-bags',
    badge: 'Boutiques & Retail Stores',
    title: 'Custom Bleach Card & Kraft Shopping Carry Bags.',
    description: 'High-durability boutique shopping bags with twisted paper or ribbon handles, paired with luxury foil-stamped hang tags.',
    image: '/images/products/carry-bags-hero.jpeg',
    primaryCtaText: 'View Carry Bags',
    primaryCtaLink: '/products/carry-bags',
    whatsappText: 'Salam Prima Packages team, I want to inquire about custom shopping carry bags for my retail brand.',
    objectPositionDesktop: 'center',
    objectPositionMobile: 'center',
  },
]

const AUTOPLAY_INTERVAL = 5500

export function HomeHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      goToNext()
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(timer)
  }, [isPaused, goToNext])

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true)
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false)
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }
    touchStartX.current = null
  }

  const currentSlide = SLIDES[currentIndex]
  const whatsappUrl = `${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(currentSlide.whatsappText)}`

  return (
    <section
      className="relative overflow-hidden bg-[#F6E7D5] pt-[96px] sm:pt-[105px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Packaging Showcase"
    >
      {/* ========================================================= */}
      {/* 1. DESKTOP & LAPTOP LAYOUT (lg: and up): EXACT ORIGINAL  */}
      {/* ========================================================= */}
      <div className="hidden lg:block relative w-full aspect-[1916/821]">
        {/* Full Panoramic Image: 100% visible, zero cropping on any edge, flush with edges */}
        <Image
          src="/images/products/new-hero-2.png"
          alt="Prima Packages - Custom packaging suite in Pakistan"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Text positioned strictly over the left empty space (0% to 39% width) */}
        <div className="absolute inset-0 z-10 w-full flex items-center pl-8 sm:pl-12 lg:pl-16 xl:pl-20 2xl:pl-28">
          <div className="w-full max-w-[38%] xl:max-w-[39%] 2xl:max-w-[40%] flex flex-col justify-center">
            <h1 className="font-serif font-bold text-[2.1rem] xl:text-[2.65rem] 2xl:text-[3.15rem] leading-[1.1] tracking-[-0.02em] text-charcoal">
              Custom packaging that makes your brand look established.
            </h1>

            <p className="mt-3 xl:mt-4 text-[13.5px] xl:text-[15.5px] 2xl:text-[17px] leading-relaxed text-charcoal/85 font-normal">
              Custom polyester woven labels, hang tags, zipper bags, courier flyers and print essentials for clothing and ecommerce businesses.
            </p>

            <div className="mt-5 xl:mt-6 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="inline-flex min-h-11 xl:min-h-12 items-center justify-center rounded-full bg-charcoal px-6 xl:px-7 text-xs xl:text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5 shadow-md shadow-charcoal/15"
              >
                Explore products
              </Link>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 xl:min-h-12 items-center justify-center gap-2 rounded-full border border-charcoal/20 bg-warm-white/95 backdrop-blur-sm px-6 xl:px-7 text-xs xl:text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition-all hover:bg-charcoal hover:text-white shadow-sm"
              >
                Get WhatsApp quote
              </a>
            </div>

            <div className="mt-4 xl:mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-charcoal/15 pt-3.5 xl:pt-4 text-[11px] xl:text-xs font-medium text-charcoal/80">
              <span>✓ Custom sizes</span>
              <span>✓ Bulk quantities</span>
              <span>✓ Delivery across Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE & TABLET LAYOUT (< lg)                          */}
      {/* ========================================================= */}
      <div className="lg:hidden flex flex-col">
        {/* Mobile Slide Image View */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F6E7D5]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                priority
                quality={92}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: currentSlide.objectPositionMobile || 'center' }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Slide Count Pill */}
          <div className="absolute top-3 right-3 z-10 rounded-full bg-charcoal/80 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
            0{currentIndex + 1} / 0{SLIDES.length}
          </div>
        </div>

        {/* Mobile Content + CTAs */}
        <div className="px-5 pt-5 pb-8 sm:px-8 sm:pt-7 sm:pb-10 bg-[#F6E7D5]">
          <div className="mx-auto max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Badge */}
                <span className="inline-flex items-center gap-1 rounded-full bg-charcoal/10 text-charcoal px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  ✦ {currentSlide.badge}
                </span>

                {/* Heading */}
                <h1 className="mt-2.5 font-serif font-bold text-[24px] sm:text-3xl leading-[1.14] tracking-[-0.01em] text-charcoal">
                  {currentSlide.title}
                </h1>

                {/* Description */}
                <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-charcoal/75">
                  {currentSlide.description}
                </p>

                {/* Mobile CTAs */}
                <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                  <Link
                    href={currentSlide.primaryCtaLink}
                    className="inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-charcoal px-6 text-xs font-semibold uppercase tracking-[0.14em] text-cream shadow-md shadow-charcoal/15 active:scale-[0.97] transition-transform"
                  >
                    {currentSlide.primaryCtaText}
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-charcoal/20 bg-warm-white/95 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal active:scale-[0.97] transition-transform"
                  >
                    Get WhatsApp Quote
                  </a>
                </div>

                {/* Trust Points */}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-charcoal/15 pt-3 text-[11px] font-medium text-charcoal/75">
                  <span>✓ Low MOQs</span>
                  <span>✓ Custom sizes</span>
                  <span>✓ Delivery all Pakistan</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Dots & Swipe Hint */}
            <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-4">
              <div className="flex items-center gap-2">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-7 bg-charcoal'
                        : 'w-2 bg-charcoal/30'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrev}
                  aria-label="Previous"
                  className="grid h-8 w-8 place-items-center rounded-full border border-charcoal/20 bg-white/60 text-charcoal text-xs"
                >
                  ←
                </button>
                <button
                  onClick={goToNext}
                  aria-label="Next"
                  className="grid h-8 w-8 place-items-center rounded-full border border-charcoal/20 bg-white/60 text-charcoal text-xs"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
