'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, SOCIAL_LINKS, PHONE_NUMBER } from '@/lib/constants'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* 1. Top Announcement Bar */}
        <div className="w-full bg-charcoal px-3 py-1.5 text-center text-[10px] tracking-wide text-cream sm:px-4 sm:text-xs flex items-center justify-center gap-2">
          <span>Custom packaging delivered across Pakistan.</span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <a
            href="tel:+923233231712"
            className="font-medium text-gold hover:text-gold-light transition-colors"
          >
            Call: {PHONE_NUMBER}
          </a>
        </div>

        {/* 2. Main Header */}
        <div
          className={cn(
            'w-full transition-all duration-300',
            isScrolled
              ? 'bg-warm-white/95 backdrop-blur-md shadow-sm border-b border-cream/90'
              : 'bg-warm-white border-b border-cream/70'
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-[68px] items-center justify-between gap-4 sm:h-[76px]">
              {/* Logo */}
              <Link href="/" className="relative z-10 flex items-center gap-3 sm:gap-3.5 group shrink-0">
                <Image
                  src="/images/prima-logo-sage-transparent.png"
                  alt="Prima Packages"
                  width={56}
                  height={56}
                  priority
                  className="h-10 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-12"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-[15px] font-medium uppercase leading-none tracking-[0.14em] text-charcoal transition-colors duration-300 group-hover:text-sage sm:text-lg sm:tracking-[0.2em]">
                    Prima Packages
                  </span>
                  <span className="mt-1 hidden text-[9px] font-medium uppercase tracking-[0.22em] text-muted sm:block">
                    Custom Print &amp; Packaging
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden items-center gap-6 md:flex lg:gap-8">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:text-sage relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-sage after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3 sm:gap-4">
                {/* PakFactory-style Phone / WhatsApp Contact Info */}
                <div className="hidden lg:flex flex-col items-end text-right">
                  <span className="text-[10px] font-semibold tracking-wider text-charcoal/60 uppercase">
                    Call / WhatsApp
                  </span>
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-sm font-bold tracking-tight text-charcoal hover:text-sage transition-colors leading-tight"
                  >
                    {PHONE_NUMBER}
                  </a>
                  <span className="text-[9px] text-charcoal/50 leading-none">
                    Mon - Sat 10am - 8pm
                  </span>
                </div>

                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden min-h-10 items-center gap-2 rounded-full bg-sage px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark md:inline-flex"
                  aria-label="Contact on WhatsApp"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Get a quote
                </a>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative z-10 md:hidden p-2 text-charcoal transition-colors duration-300"
                  aria-label="Toggle menu"
                >
                  <div className="flex flex-col gap-1.5 w-6">
                    <span
                      className={cn(
                        'block h-px bg-current transition-all duration-300 origin-center',
                        isMobileMenuOpen && 'rotate-45 translate-y-[3.5px]'
                      )}
                    />
                    <span
                      className={cn(
                        'block h-px bg-current transition-all duration-300',
                        isMobileMenuOpen && 'opacity-0'
                      )}
                    />
                    <span
                      className={cn(
                        'block h-px bg-current transition-all duration-300 origin-center',
                        isMobileMenuOpen && '-rotate-45 -translate-y-[3.5px]'
                      )}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
