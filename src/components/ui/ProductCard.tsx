'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, formatPrice } from '@/lib/utils'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.heroImage]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [images.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex flex-col h-full rounded-2xl border border-charcoal/10 bg-warm-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {/* Top Image Area with light, airy backdrop */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F6F8] border-b border-charcoal/6">
          <AnimatePresence initial={false}>
            <motion.div
              key={images[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`${product.name} - view ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          {/* Elegant pagination dots if more than 1 image */}
          {images.length > 1 && (
            <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
              {images.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={cn(
                    'h-1 rounded-full transition-all duration-500',
                    dotIdx === currentImageIndex
                      ? 'w-4 bg-charcoal/80 shadow-sm'
                      : 'w-1 bg-charcoal/30'
                  )}
                />
              ))}
            </div>
          )}

          {/* Discount badge */}
          {product.discountBadge && (
            <div className="absolute top-3 left-3 z-20 bg-charcoal/90 text-gold text-[10px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 backdrop-blur-sm border border-gold/40 shadow-sm rounded-md">
              {product.discountBadge}
            </div>
          )}
        </div>

        {/* Bottom Content Area */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-warm-white">
          <div>
            <h3 className="font-bold text-sm sm:text-base leading-snug text-charcoal group-hover:text-sage transition-colors duration-200">
              {product.name}
            </h3>
            <p className="mt-1.5 text-xs text-charcoal/65 leading-relaxed line-clamp-2">
              {product.shortDescription}
            </p>
          </div>

          <div className="mt-3.5 pt-3 border-t border-charcoal/8 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              {!product.quoteOnly && product.sizes[0]?.originalPrice && (
                <span className="text-[11px] text-charcoal/40 line-through">
                  {formatPrice(product.sizes[0].originalPrice)}
                </span>
              )}
              <span className="text-xs font-semibold text-sage-dark">
                {product.quoteOnly ? 'Custom quote' : `From ${formatPrice(product.sizes[0].price)}${!product.sizes[0]?.quantity ? '/pc' : ''}`}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
