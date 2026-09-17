'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CategoryHero } from '@/components/ui/CategoryHero'
import { SizePriceSelector } from '@/components/ui/SizePriceSelector'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'
import { HairlineDivider } from '@/components/ui/HairlineDivider'
import { RelatedProducts } from '@/components/ui/RelatedProducts'
import { generateWhatsAppUrl } from '@/lib/utils'
import type { Product, ProductSize } from '@/data/products'

interface ProductDetailProps {
  product: Product
  allProducts: Product[]
}

export function ProductDetail({ product, allProducts }: ProductDetailProps) {
  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.heroImage]

  const [selectedSize, setSelectedSize] = useState<ProductSize>(() => {
    const pop = product.sizes.find((s) => s.popular)
    return pop || product.sizes[0]
  })

  return (
    <>
      {/* Hero */}
      <div className="pt-[96px] sm:pt-[108px]">
        <CategoryHero product={product} />
      </div>

      {/* Product Details */}
      <Section className="pb-24 pt-10 sm:pt-16 lg:pb-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: 3-Image Collage */}
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Image 1: Main Top View (woven-label-hero) */}
              <div className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl border border-sage/15 bg-cream shadow-sm">
                <Image
                  src={images[0]}
                  alt={`${product.name} main view`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Image 2: Bottom-Left (woven-label-1) */}
              {images[1] && (
                <div className="group relative col-span-1 aspect-square overflow-hidden rounded-xl border border-sage/15 bg-cream shadow-sm">
                  <Image
                    src={images[1]}
                    alt={`${product.name} detail view 1`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Image 3: Bottom-Right (woven-label-2) */}
              {images[2] && (
                <div className="group relative col-span-1 aspect-square overflow-hidden rounded-xl border border-sage/15 bg-cream shadow-sm">
                  <Image
                    src={images[2]}
                    alt={`${product.name} detail view 2`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Right: Details */}
          <div className="space-y-8">
            {!product.quoteOnly && (
              <ScrollReveal delay={0.1}>
                <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h2 className="font-serif text-3xl text-charcoal">
                    Select Size &amp; Pricing
                  </h2>
                  {product.discountBadge && (
                    <span className="text-xs font-bold uppercase tracking-wider text-gold">
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

            {product.quoteOnly && (
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-sage/20 bg-cream p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">Made to your specification</p>
                  <h2 className="mt-3 font-serif text-3xl text-charcoal">Request a custom quote</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">Final price depends on size, material thickness, printing colors and order quantity. Send these details on WhatsApp for an accurate rate.</p>
                  <div className="mt-5 grid grid-cols-2 gap-2 text-sm text-charcoal/75">
                    <span className="rounded-lg bg-warm-white px-3 py-2">Bag size</span>
                    <span className="rounded-lg bg-warm-white px-3 py-2">Quantity</span>
                    <span className="rounded-lg bg-warm-white px-3 py-2">Print colors</span>
                    <span className="rounded-lg bg-warm-white px-3 py-2">Delivery city</span>
                  </div>
                </div>
              </ScrollReveal>
            )}

            <HairlineDivider />

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3">
                    About This Product
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>

                {product.materials && product.materials.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3">
                      Materials
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map((material) => (
                        <span
                          key={material}
                          className="px-3 py-1.5 bg-cream text-sm text-charcoal"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.finishes && product.finishes.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3">
                      Finishes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.finishes.map((finish) => (
                        <span
                          key={finish}
                          className="px-3 py-1.5 bg-cream text-sm text-charcoal"
                        >
                          {finish}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-cream/50 border border-sage/10 p-6">
                  <p className="text-sm text-charcoal leading-relaxed">
                    <span className="font-medium">✦ Fully Customizable:</span> Every{' '}
                    {product.name.toLowerCase()} is fully customizable with your logo, brand colors, and copy. Tell us your vision and we&apos;ll bring it to life.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <WhatsAppCTA
                productName={product.name}
                size={product.quoteOnly ? 'Custom size and quantity' : `${selectedSize.sizeCategory || selectedSize.label}${selectedSize.quantity ? ` (${selectedSize.quantity}${selectedSize.printType ? ` - ${selectedSize.printType}` : ''})` : ''} - Rs. ${selectedSize.price.toLocaleString('en-PK')}`}
                className="w-full justify-center rounded-full py-4"
              >
                {product.quoteOnly ? 'Request Custom Quote' : 'Get This Made'}
              </WhatsAppCTA>
            </ScrollReveal>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts
          products={allProducts}
          currentSlug={product.slug}
        />
      </Section>

      {/* Sticky Mobile WhatsApp Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-warm-white/95 backdrop-blur-md border-t border-sage/20 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 safe-area-pb">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted truncate">{product.name}</p>
            <p className="font-serif text-lg font-bold tracking-tight text-charcoal">
              {product.quoteOnly ? 'Custom pricing' : selectedSize.price.toLocaleString('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 })}
            </p>
          </div>
          <a
            href={generateWhatsAppUrl(
              product.name,
              product.quoteOnly
                ? undefined
                : `${selectedSize.sizeCategory || selectedSize.label}${selectedSize.quantity ? ` (${selectedSize.quantity})` : ''} - Rs. ${selectedSize.price.toLocaleString('en-PK')}`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all duration-300 active:scale-[0.97]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {product.quoteOnly ? 'Get Quote' : 'Enquire Now'}
          </a>
        </div>
      </div>
    </>
  )
}
