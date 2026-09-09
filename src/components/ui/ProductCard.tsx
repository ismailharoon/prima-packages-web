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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block"
      >
        <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-cream">
          <AnimatePresence initial={false}>
            <motion.div
              key={images[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`${product.name} - view ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          {/* Elegant pagination dots if more than 1 image */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
              {images.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={cn(
                    'h-1 rounded-full transition-all duration-500',
                    dotIdx === currentImageIndex
                      ? 'w-5 bg-warm-white shadow-md'
                      : 'w-1.5 bg-warm-white/50'
                  )}
                />
              ))}
            </div>
          )}

          {/* Discount badge */}
          {product.discountBadge && (
            <div className="absolute top-3 left-3 z-20 bg-charcoal/90 text-gold text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 backdrop-blur-sm border border-gold/40 shadow-sm">
              {product.discountBadge}
            </div>
          )}

          <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/10 pointer-events-none" />
        </div>

        <div className="mt-3 sm:mt-5 space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-xl text-charcoal group-hover:text-sage transition-colors duration-300">
              {product.name}
            </h3>
            {product.discountBadge && (
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-gold/15 text-gold border border-gold/40 shrink-0">
                {product.discountBadge}
              </span>
            )}
          </div>
          <p className="text-sm text-muted leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
          <div className="flex items-baseline gap-2 pt-0.5">
            {product.sizes[0]?.originalPrice && (
              <span className="text-xs text-charcoal/40 line-through font-serif">
                {formatPrice(product.sizes[0].originalPrice)}
              </span>
            )}
            <p className="text-sm text-gold font-semibold tracking-wide">
              From {formatPrice(product.sizes[0].price)}
              {!product.sizes[0]?.quantity && '/pc'}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
