'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/constants'

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_WHATSAPP_MESSAGE
  )}`

  return (
    <div className="whatsapp-widget fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Popup Chat Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            id="whatsapp-help-card" className="absolute bottom-full right-0 mb-3 w-[calc(100vw-48px)] sm:w-80 rounded-2xl bg-warm-white shadow-2xl border border-stone-200/80 overflow-hidden text-left"
          >
            {/* Card Header */}
            <div className="bg-charcoal px-4 py-3.5 flex items-center justify-between text-warm-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-cream/15 p-1 flex items-center justify-center border border-white/20">
                    <Image
                      src="/images/prima-logo-sage-transparent.png"
                      alt="Prima Packages"
                      width={28}
                      height={28}
                      className="h-6 w-auto object-contain brightness-0 invert"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-charcoal" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-cream">
                    Prima Packages
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-cream/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    <span>Custom packaging support</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-cream/60 hover:text-cream transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
                aria-label="Close WhatsApp popup"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Message Body */}
            <div className="p-4 bg-[#F8F6F2] space-y-3">
              <div className="bg-warm-white p-3.5 rounded-xl shadow-xs border border-cream/80 text-xs text-charcoal/85 leading-relaxed">
                <p className="font-medium text-charcoal mb-1">Hi there! 👋</p>
                <p>
                  Looking for custom-printed boxes, woven labels, foil hang tags, or courier flyer bags? Chat with our packaging team on WhatsApp for instant pricing &amp; samples.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md shadow-green-600/20 transition-all duration-300 active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Start WhatsApp Chat</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <div className="relative group">
        {/* Soft pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 blur-xs animate-ping pointer-events-none" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close WhatsApp chat popup" : "Open WhatsApp chat popup"}
          aria-expanded={isOpen}
          aria-controls="whatsapp-help-card"
          className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-green-900/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Notification online dot */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-300 border-2 border-white" />

          <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>

        {/* Hover Tooltip if closed */}
        {!isOpen && (
          <span className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 bg-charcoal text-cream text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat on WhatsApp
          </span>
        )}
      </div>
    </div>
  )
}
