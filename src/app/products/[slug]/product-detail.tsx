'use client'

import { useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CategoryHero } from '@/components/ui/CategoryHero'
import { SizePriceSelector } from '@/components/ui/SizePriceSelector'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'
import { HairlineDivider } from '@/components/ui/HairlineDivider'
import { RelatedProducts } from '@/components/ui/RelatedProducts'
import { ProductMediaCarousel } from '@/components/ui/ProductMediaCarousel'
import { ProductConfigurator } from '@/components/ui/ProductConfigurator'
import { generateWhatsAppUrl } from '@/lib/utils'
import type { Product, ProductSize } from '@/data/products'

interface ProductDetailProps {
  product: Product
  allProducts: Product[]
}

const WHATSAPP_NUMBER = '923233231712'

export function ProductDetail({ product, allProducts }: ProductDetailProps) {
  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.heroImage]

  const hasConfigurator = product.configuratorGroups && product.configuratorGroups.length > 0

  const [selectedSize, setSelectedSize] = useState<ProductSize>(() => {
    const pop = product.sizes.find((s) => s.popular)
    return pop || product.sizes[0]
  })

  const [configSelections, setConfigSelections] = useState<Record<string, string>>({})

  // Build dynamic WhatsApp message based on configurator or size selection
  const whatsappUrl = useMemo(() => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://www.primapackages.pk/products/${product.slug}`

    if (hasConfigurator) {
      // Format configurator selections into WhatsApp message
      const configLines = Object.entries(configSelections)
        .map(([key, value]) => {
          const group = product.configuratorGroups?.find(g => g.key === key)
          const label = group?.label || key
          return `• ${label}: ${value}`
        })
        .join('\n')

      const sizeInfo = product.quoteOnly
        ? ''
        : `\n💵 *Selected:* ${selectedSize.sizeCategory || selectedSize.label}${selectedSize.quantity ? ` (${selectedSize.quantity})` : ''} - Rs. ${selectedSize.price.toLocaleString('en-PK')}`

      const message = `Salam Prima Packages team,\nI want to place an order / get a final quote for:\n\n📦 *Product:* ${product.name}\n${configLines}${sizeInfo}\n🔗 *Product URL:* ${pageUrl}\n\nI have my logo/artwork file ready. Please confirm pricing and delivery time.`

      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    }

    // Standard product (no configurator)
    return generateWhatsAppUrl(
      product.name,
      product.quoteOnly
        ? undefined
        : `${selectedSize.sizeCategory || selectedSize.label}${selectedSize.quantity ? ` (${selectedSize.quantity})` : ''} - Rs. ${selectedSize.price.toLocaleString('en-PK')}`
    )
  }, [product, selectedSize, configSelections, hasConfigurator])

  const handleConfigChange = useCallback((selections: Record<string, string>) => {
    setConfigSelections(selections)
  }, [])

  // Format price for sticky bar
  const displayPrice = product.quoteOnly
    ? 'Custom pricing'
    : selectedSize.price.toLocaleString('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 })

  const unitPriceText = !product.quoteOnly && selectedSize.quantity
    ? `${selectedSize.quantity}`
    : ''

  return (
    <>
      {/* Hero */}
      <div className="pt-[96px] sm:pt-[108px]">
        <CategoryHero product={product} />
      </div>

      {/* Product Details */}
      <Section className="pb-28 pt-0 sm:pt-10 lg:pb-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-16">

          {/* Left: Media — Carousel on mobile, Grid on desktop */}
          <div>
            {/* Mobile: Swipeable 4:5 Carousel */}
            <div className="lg:hidden -mx-5 sm:-mx-8">
              <ProductMediaCarousel
                images={images}
                productName={product.name}
                moq={product.moq}
                dispatchDays={product.dispatchDays}
              />
            </div>

            {/* Desktop: 3-Image Grid (unchanged) */}
            <ScrollReveal className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4 sticky top-[120px]">
                <div className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl border border-sage/15 bg-cream shadow-sm">
                  <Image
                    src={images[0]}
                    alt={`${product.name} main view`}
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {images[1] && (
                  <div className="group relative col-span-1 aspect-square overflow-hidden rounded-xl border border-sage/15 bg-cream shadow-sm">
                    <Image
                      src={images[1]}
                      alt={`${product.name} detail view 1`}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                {images[2] && (
                  <div className="group relative col-span-1 aspect-square overflow-hidden rounded-xl border border-sage/15 bg-cream shadow-sm">
                    <Image
                      src={images[2]}
                      alt={`${product.name} detail view 2`}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Product Info + Configurator + Pricing */}
          <div className="px-5 sm:px-8 lg:px-0 space-y-6 pt-6 lg:pt-0">

            {/* Mobile: Product Title + Starting Price (shown only on mobile, hero handles desktop) */}
            <div className="lg:hidden">
              <h1 className="font-serif text-[22px] sm:text-3xl font-bold leading-tight tracking-[-0.01em] text-charcoal">
                {product.name}
              </h1>
              <p className="mt-1.5 text-[13px] sm:text-sm leading-relaxed text-muted">
                {product.shortDescription}
              </p>
              {!product.quoteOnly && (
                <p className="mt-2 text-base font-semibold text-sage-dark">
                  From {selectedSize.price.toLocaleString('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 })}
                  {product.discountBadge && (
                    <span className="ml-2 text-xs font-bold uppercase tracking-wider text-gold">
                      ✦ {product.discountBadge}
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Interactive Configurator (for woven-labels, zipper-bags, hang-tags) */}
            {hasConfigurator && product.configuratorGroups && (
              <ScrollReveal delay={0.05}>
                <div className="rounded-2xl border border-charcoal/8 bg-[#FAFAF8] p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-dark mb-4">
                    Customize Your Order
                  </p>
                  <ProductConfigurator
                    groups={product.configuratorGroups}
                    productName={product.name}
                    onSelectionChange={handleConfigChange}
                  />
                </div>
              </ScrollReveal>
            )}

            {/* Size & Pricing Selector (existing component) */}
            {!product.quoteOnly && (
              <ScrollReveal delay={0.1}>
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">
                      Select Size &amp; Pricing
                    </h2>
                    {product.discountBadge && (
                      <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider text-gold">
                        ✦ {product.discountBadge}
                      </span>
                    )}
                  </div>
                  <SizePriceSelector
                    sizes={product.sizes}
                    onSizeChange={setSelectedSize}
                  />
                </div>
              </ScrollReveal>
            )}

            {/* Quote-Only Box (for zipper-bags etc.) */}
            {product.quoteOnly && (
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-sage/20 bg-cream p-5 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">Made to your specification</p>
                  <h2 className="mt-3 font-serif text-2xl sm:text-3xl text-charcoal">Request a custom quote</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">Final price depends on size, material thickness, printing colors and order quantity. Send these details on WhatsApp for an accurate rate.</p>
                  <div className="mt-5 grid grid-cols-2 gap-2 text-sm text-charcoal/75">
                    <span className="rounded-lg bg-warm-white px-3 py-2.5 text-center">Bag size</span>
                    <span className="rounded-lg bg-warm-white px-3 py-2.5 text-center">Quantity</span>
                    <span className="rounded-lg bg-warm-white px-3 py-2.5 text-center">Print colors</span>
                    <span className="rounded-lg bg-warm-white px-3 py-2.5 text-center">Delivery city</span>
                  </div>
                </div>
              </ScrollReveal>
            )}

            <HairlineDivider />

            {/* About + Materials + Finishes — Collapsible on mobile */}
            <ScrollReveal delay={0.15}>
              <div className="space-y-4">
                {/* About This Product */}
                <details className="group" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 border-b border-charcoal/8">
                    <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-medium">About This Product</h3>
                    <span className="text-sage text-lg transition-transform group-open:rotate-45 font-sans shrink-0">+</span>
                  </summary>
                  <div className="pt-3 pb-1">
                    <p className="text-sm text-muted leading-relaxed">{product.longDescription}</p>
                  </div>
                </details>

                {/* Materials */}
                {product.materials && product.materials.length > 0 && (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 border-b border-charcoal/8">
                      <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Materials</h3>
                      <span className="text-sage text-lg transition-transform group-open:rotate-45 font-sans shrink-0">+</span>
                    </summary>
                    <div className="pt-3 pb-1 flex flex-wrap gap-2">
                      {product.materials.map((material) => (
                        <span key={material} className="px-3 py-1.5 bg-cream text-sm text-charcoal rounded-lg">{material}</span>
                      ))}
                    </div>
                  </details>
                )}

                {/* Finishes */}
                {product.finishes && product.finishes.length > 0 && (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 border-b border-charcoal/8">
                      <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Finishes & Options</h3>
                      <span className="text-sage text-lg transition-transform group-open:rotate-45 font-sans shrink-0">+</span>
                    </summary>
                    <div className="pt-3 pb-1 flex flex-wrap gap-2">
                      {product.finishes.map((finish) => (
                        <span key={finish} className="px-3 py-1.5 bg-cream text-sm text-charcoal rounded-lg">{finish}</span>
                      ))}
                    </div>
                  </details>
                )}

                {/* Customizable Callout */}
                <div className="bg-cream/50 border border-sage/10 p-5 rounded-xl">
                  <p className="text-sm text-charcoal leading-relaxed">
                    <span className="font-medium">✦ Fully Customizable:</span> Every{' '}
                    {product.name.toLowerCase()} is fully customizable with your logo, brand colors, and copy. Tell us your vision and we&apos;ll bring it to life.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Inline WhatsApp CTA (desktop) */}
            <ScrollReveal delay={0.2} className="hidden lg:block">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-md transition-all active:scale-[0.97]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {product.quoteOnly ? 'Request Custom Quote on WhatsApp' : 'Order on WhatsApp'}
              </a>
            </ScrollReveal>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts
          products={allProducts}
          currentSlug={product.slug}
        />
      </Section>

      {/* Sticky Mobile WhatsApp Bar — Redesigned with dynamic pricing */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] lg:hidden bg-white/98 backdrop-blur-md border-t border-charcoal/10 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] safe-area-pb">
        <div className="flex items-center justify-between gap-3 px-4 h-[68px]">
          {/* Left: Dynamic Pricing */}
          <div className="min-w-0 flex-[0.4]">
            <p className="font-serif text-lg font-bold tracking-tight text-charcoal leading-tight truncate">
              {displayPrice}
            </p>
            {unitPriceText && (
              <p className="text-[11px] text-muted truncate">{unitPriceText}</p>
            )}
            {!unitPriceText && (
              <p className="text-[11px] text-muted truncate">{product.name}</p>
            )}
          </div>

          {/* Right: WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex-[0.6] flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white h-[48px] text-[13px] font-bold uppercase tracking-wider rounded-xl shadow-md transition-all duration-200 active:scale-[0.97]"
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {product.quoteOnly ? 'Get Quote' : 'Order on WhatsApp'}
          </a>
        </div>
        {/* Micro-text below */}
        <p className="text-center text-[10px] text-muted/60 pb-1 -mt-1">
          Instant Mockup • Fast Reply • Mon–Sat 10AM–8PM
        </p>
      </div>
    </>
  )
}
