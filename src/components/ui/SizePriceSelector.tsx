'use client'

import { useState, useEffect } from 'react'
import { cn, formatPrice } from '@/lib/utils'
import type { ProductSize } from '@/data/products'

interface SizePriceSelectorProps {
  sizes: ProductSize[]
  onSizeChange?: (size: ProductSize) => void
}

export function SizePriceSelector({
  sizes,
  onSizeChange,
}: SizePriceSelectorProps) {
  // Check if sizes have categories (e.g. Woven Labels: multiple sizes with quantities)
  const uniqueSizes = Array.from(
    new Set(sizes.map((s) => s.sizeCategory || s.label))
  )

  const hasMultipleSizeCategories =
    uniqueSizes.length > 1 && sizes.some((s) => s.quantity)
  // Default to popular size if exists, otherwise first
  const [selectedSizeCat, setSelectedSizeCat] = useState<string>(() => {
    const popular = uniqueSizes.find((s) => s.toLowerCase().includes('popular'))
    return popular || uniqueSizes[0] || ''
  })

  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(() => {
    // Default to the first popular item or first item
    const popIdx = sizes.findIndex((s) => s.popular)
    return popIdx !== -1 ? popIdx : 0
  })

  const currentSize = sizes[selectedTierIndex] || sizes[0]

  useEffect(() => {
    if (currentSize) {
      onSizeChange?.(currentSize)
    }
  }, [selectedTierIndex, currentSize, onSizeChange])

  // Simple standard product without quantity tiers
  if (!sizes.some((s) => s.quantity)) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          {sizes.map((size, index) => (
            <button
              key={size.label}
              type="button"
              onClick={() => {
                setSelectedTierIndex(index)
                onSizeChange?.(sizes[index])
              }}
              className={cn(
                'px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 border',
                selectedTierIndex === index
                  ? 'border-sage bg-sage text-warm-white'
                  : 'border-sage/30 text-charcoal hover:border-sage hover:bg-sage/5'
              )}
            >
              {size.label}
            </button>
          ))}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-serif text-charcoal">
            {formatPrice(sizes[selectedTierIndex]?.price || sizes[0].price)}
          </span>
          <span className="text-sm text-muted tracking-wide uppercase">
            per piece
          </span>
        </div>
      </div>
    )
  }

  // Multi-tier products (Woven Labels with Size + Quantity)
  if (hasMultipleSizeCategories) {
    const quantitiesForSize = sizes.filter(
      (s) => (s.sizeCategory || s.label) === selectedSizeCat
    )

    return (
      <div className="space-y-6 bg-cream/35 p-5 sm:p-6 border border-charcoal/10 rounded-xl shadow-sm">
        {/* Step 1: Select Size */}
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-muted font-medium mb-3">
            1. Select Size:
          </label>
          <div className="flex flex-wrap gap-2">
            {uniqueSizes.map((sizeName) => {
              const isPopular = sizeName.toLowerCase().includes('popular')
              const isSelected = selectedSizeCat === sizeName
              return (
                <button
                  key={sizeName}
                  type="button"
                  onClick={() => {
                    setSelectedSizeCat(sizeName)
                    // switch to first quantity in this size
                    const firstInSize = sizes.findIndex(
                      (s) => (s.sizeCategory || s.label) === sizeName
                    )
                    if (firstInSize !== -1) {
                      setSelectedTierIndex(firstInSize)
                    }
                  }}
                  className={cn(
                    'relative px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 border rounded-lg',
                    isSelected
                      ? 'border-charcoal bg-charcoal text-cream shadow-sm'
                      : 'border-charcoal/20 bg-warm-white text-charcoal hover:border-charcoal/50 hover:bg-cream/70'
                  )}
                >
                  <span>{sizeName}</span>
                  {isPopular && (
                    <span className="ml-1.5 text-[10px] text-gold font-bold">★</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2: Select Quantity */}
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-muted font-medium mb-3">
            2. Select Quantity:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {quantitiesForSize.map((tier) => {
              const globalIdx = sizes.findIndex((s) => s === tier)
              const isSelected = selectedTierIndex === globalIdx
              return (
                <button
                  key={tier.quantity}
                  type="button"
                  onClick={() => setSelectedTierIndex(globalIdx)}
                  className={cn(
                    'flex flex-col items-center justify-center py-3.5 px-3 border rounded-lg transition-all duration-200',
                    isSelected
                      ? 'border-sage bg-sage text-warm-white shadow-md'
                      : 'border-sage/30 bg-warm-white text-charcoal hover:border-sage hover:bg-sage/5'
                  )}
                >
                  <span className="text-sm font-semibold tracking-wider">
                    {tier.quantity}
                  </span>
                  <span
                    className={cn(
                      'text-xs mt-1 font-medium',
                      isSelected ? 'text-cream/90' : 'text-sage-dark'
                    )}
                  >
                    {formatPrice(tier.price)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Price Breakdown with Strikethrough & 15% Off Label */}
        <div className="pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            {currentSize.originalPrice && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/15 border border-gold/40 text-gold text-[11px] font-semibold uppercase tracking-wider rounded mb-2">
                <span>✦</span> 15% Discount Applied
              </div>
            )}
            
            {/* Old Price crossed out, New Price below */}
            <div className="space-y-0.5">
              {currentSize.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-muted font-medium">Original:</span>
                  <span className="text-base sm:text-lg text-charcoal/45 line-through font-serif decoration-1 decoration-charcoal/60">
                    {formatPrice(currentSize.originalPrice)}
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-charcoal tracking-tight">
                  {formatPrice(currentSize.price)}
                </span>
                <span className="text-xs text-sage font-medium uppercase tracking-wider">
                  Net Total
                </span>
              </div>
            </div>
            
            <p className="text-xs text-muted mt-1.5">
              Price for {currentSize.sizeCategory || currentSize.label} · {currentSize.quantity}
            </p>
          </div>

          {currentSize.originalPrice && (
            <div className="sm:text-right bg-warm-white sm:bg-transparent p-3 sm:p-0 rounded border sm:border-0 border-gold/20">
              <span className="text-xs text-charcoal/70 block">Special Savings</span>
              <span className="text-sm font-bold text-gold">
                Save {formatPrice(currentSize.originalPrice - currentSize.price)} (15% OFF)
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Single size with quantities / print types (Hang Tags)
  return (
    <div className="space-y-6 bg-cream/35 p-5 sm:p-6 border border-charcoal/10 rounded-xl shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-charcoal/10">
          <span className="text-xs uppercase tracking-[0.2em] text-muted font-medium">
            Standard Size:
          </span>
          <span className="text-xs font-semibold px-3 py-1 bg-charcoal text-cream rounded tracking-wide">
            {uniqueSizes[0] || '2 × 3.5 Inch'}
          </span>
        </div>

        <label className="block text-xs uppercase tracking-[0.2em] text-muted font-medium mb-3">
          Select Quantity & Print Type:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {sizes.map((tier, index) => {
            const isSelected = selectedTierIndex === index
            return (
              <button
                key={`${tier.quantity}-${tier.printType || index}`}
                type="button"
                onClick={() => setSelectedTierIndex(index)}
                className={cn(
                  'flex items-center justify-between p-3.5 border rounded-lg transition-all duration-200 text-left',
                  isSelected
                    ? 'border-sage bg-sage text-warm-white shadow-md'
                    : 'border-sage/30 bg-warm-white text-charcoal hover:border-sage hover:bg-sage/5'
                )}
              >
                <div>
                  <span className="block text-sm font-semibold tracking-wide">
                    {tier.quantity}
                  </span>
                  {tier.printType && (
                    <span
                      className={cn(
                        'block text-[11px] mt-0.5',
                        isSelected ? 'text-cream/85' : 'text-muted'
                      )}
                    >
                      {tier.printType}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  {tier.originalPrice && (
                    <span
                      className={cn(
                        'block text-xs line-through',
                        isSelected ? 'text-cream/60' : 'text-charcoal/40'
                      )}
                    >
                      {formatPrice(tier.originalPrice)}
                    </span>
                  )}
                  <span
                    className={cn(
                      'block text-sm font-bold',
                      isSelected ? 'text-warm-white' : 'text-charcoal'
                    )}
                  >
                    {formatPrice(tier.price)}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Price Breakdown with Strikethrough & 15% Off Label */}
      <div className="pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          {currentSize.originalPrice && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/15 border border-gold/40 text-gold text-[11px] font-semibold uppercase tracking-wider rounded mb-2">
              <span>✦</span> 15% Discount Applied
            </div>
          )}
          
          <div className="space-y-0.5">
            {currentSize.originalPrice && (
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-muted font-medium">Original:</span>
                <span className="text-base sm:text-lg text-charcoal/45 line-through font-serif decoration-1 decoration-charcoal/60">
                  {formatPrice(currentSize.originalPrice)}
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-charcoal tracking-tight">
                {formatPrice(currentSize.price)}
              </span>
              <span className="text-xs text-sage font-medium uppercase tracking-wider">
                Net Total
              </span>
            </div>
          </div>
          
          <p className="text-xs text-muted mt-1.5">
            Total for {currentSize.quantity} · {currentSize.printType || currentSize.label}
          </p>
        </div>

        {currentSize.originalPrice && (
          <div className="sm:text-right bg-warm-white sm:bg-transparent p-3 sm:p-0 rounded border sm:border-0 border-gold/20">
            <span className="text-xs text-charcoal/70 block">Special Savings</span>
            <span className="text-sm font-bold text-gold">
              Save {formatPrice(currentSize.originalPrice - currentSize.price)} (15% OFF)
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
