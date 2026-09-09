export interface ProductSize {
  label: string
  price: number
  originalPrice?: number
  quantity?: string
  printType?: string
  sizeCategory?: string
  popular?: boolean
}

export interface Product {
  slug: string
  name: string
  category: string
  shortDescription: string
  longDescription: string
  heroImage: string
  gallery: string[]
  sizes: ProductSize[]
  discountBadge?: string
  materials?: string[]
  finishes?: string[]
  customizable: boolean
  icon: string
}

export const products: Product[] = [
  {
    slug: 'woven-labels',
    name: 'Custom Woven Labels',
    category: 'Labels',
    discountBadge: '15% OFF',
    shortDescription: 'Premium woven labels stitched into every garment, the finishing touch your brand deserves.',
    longDescription: 'Our woven labels are crafted with precision using high-density weaving techniques. Each label features crisp, detailed artwork that won\'t fade with washing. Available in damask, satin, and taffeta weaves, these labels elevate your garments with a tactile mark of quality. Every label is fully customizable with your logo, brand colors, and care instructions.',
    heroImage: '/images/products/woven-label-hero.jpeg',
    gallery: [
      '/images/products/woven-label-hero.jpeg',
      '/images/products/woven-label-1.jpeg',
      '/images/products/woven-label-2.jpeg',
    ],
    sizes: [
      // 0.5 × 2 inch
      { label: '0.5 × 2 in', sizeCategory: '0.5 × 2 inch', quantity: '100 PCS', originalPrice: 2000, price: 1700 },
      { label: '0.5 × 2 in', sizeCategory: '0.5 × 2 inch', quantity: '500 PCS', originalPrice: 2500, price: 2125 },
      { label: '0.5 × 2 in', sizeCategory: '0.5 × 2 inch', quantity: '1,000 PCS', originalPrice: 3000, price: 2550 },
      // 0.75 × 2.0 inch (Most Popular)
      { label: '0.75 × 2.0 in', sizeCategory: '0.75 × 2.0 inch (Most Popular)', quantity: '100 PCS', originalPrice: 2200, price: 1870, popular: true },
      { label: '0.75 × 2.0 in', sizeCategory: '0.75 × 2.0 inch (Most Popular)', quantity: '500 PCS', originalPrice: 3000, price: 2550, popular: true },
      { label: '0.75 × 2.0 in', sizeCategory: '0.75 × 2.0 inch (Most Popular)', quantity: '1,000 PCS', originalPrice: 3500, price: 2975, popular: true },
      // 1.0 × 2.5 inch
      { label: '1.0 × 2.5 in', sizeCategory: '1.0 × 2.5 inch', quantity: '100 PCS', originalPrice: 2300, price: 1955 },
      { label: '1.0 × 2.5 in', sizeCategory: '1.0 × 2.5 inch', quantity: '500 PCS', originalPrice: 3300, price: 2805 },
      { label: '1.0 × 2.5 in', sizeCategory: '1.0 × 2.5 inch', quantity: '1,000 PCS', originalPrice: 4000, price: 3400 },
    ],
    materials: ['Damask High-Density', 'Satin', 'Taffeta'],
    finishes: ['Center-fold', 'End-fold', 'Heat-cut', 'Laser-cut', 'Mitre-fold'],
    customizable: true,
    icon: '🏷️',
  },
  {
    slug: 'hang-tags',
    name: 'Custom Hang Tags',
    category: 'Tags',
    discountBadge: '15% OFF',
    shortDescription: 'Custom hang tags that tell your brand story before the product is even unboxed.',
    longDescription: 'Our hang tags are printed on premium card stock with options for foil stamping, embossing, spot UV, and letterpress finishes. From minimalist kraft tags to luxurious textured cards, each tag is designed to make a lasting first impression. Add grommets, ribbons, or cotton strings for an extra tactile element.',
    heroImage: '/images/products/hang-tags-hero.jpeg',
    gallery: [
      '/images/products/hang-tags-hero.jpeg',
      '/images/products/hang-tag-1.jpeg',
      '/images/products/hang-tag-2.jpeg',
    ],
    sizes: [
      { label: '2 × 3.5 in', sizeCategory: '2 × 3.5 Inch', quantity: '100 pcs', printType: 'Single Side Print', originalPrice: 3000, price: 2550 },
      { label: '2 × 3.5 in', sizeCategory: '2 × 3.5 Inch', quantity: '500 pcs', printType: 'Single Side Print', originalPrice: 3600, price: 3060 },
      { label: '2 × 3.5 in', sizeCategory: '2 × 3.5 Inch', quantity: '1,000 pcs', printType: 'Single Side Print', originalPrice: 4000, price: 3400 },
      { label: '2 × 3.5 in', sizeCategory: '2 × 3.5 Inch', quantity: '1,000 pcs', printType: 'Double Side Print', originalPrice: 5200, price: 4420 },
    ],
    materials: ['350 GSM Art Card', '300 GSM Kraft', '400 GSM Cotton'],
    finishes: ['Matte Lamination', 'Spot UV', 'Foil Stamping', 'Embossing', 'Letterpress'],
    customizable: true,
    icon: '🔖',
  },
  {
    slug: 'thank-you-cards',
    name: 'Custom Thank You Cards',
    category: 'Cards',
    shortDescription: 'Thoughtful thank-you cards that turn a transaction into a relationship.',
    longDescription: 'Include a beautifully printed thank-you card with every order to build customer loyalty. Our cards are printed on premium card stock with options for single or double-side printing, custom brand messaging, and QR codes.',
    heroImage: '/images/products/thank-you-cards-hero.jpeg',
    gallery: [
      '/images/products/thank-you-cards-hero.jpeg',
      '/images/products/thank-you-cards-1.jpeg',
      '/images/products/thank-you-cards-2.jpeg',
    ],
    sizes: [
      { label: '3.5 × 4 in', sizeCategory: '3.5 × 4 Inch', quantity: '1,000 pcs', printType: 'Single Side Print | 300 GSM', price: 5000 },
      { label: '3.5 × 4 in', sizeCategory: '3.5 × 4 Inch', quantity: '1,000 pcs', printType: 'Double Side Print | 350 GSM', price: 7000 },
    ],
    materials: ['300 GSM Art Card', '350 GSM Art Card'],
    finishes: ['Matte Lamination', 'Gloss Lamination', 'Spot UV', 'Foil Stamping'],
    customizable: true,
    icon: '💌',
  },
  {
    slug: 'business-cards',
    name: 'Custom Business Cards',
    category: 'Cards',
    shortDescription: 'Make every introduction count with cards as refined as your brand.',
    longDescription: 'First impressions matter. Our business cards are crafted on heavyweight 350 GSM card stock with crisp offset printing, matte lamination, and sharp finish. Available in single and double-sided printing.',
    heroImage: '/images/products/business-cards-hero.jpeg',
    gallery: [
      '/images/products/business-cards-hero.jpeg',
      '/images/products/business-card-1.jpeg',
      '/images/products/business-card-2.jpeg',
    ],
    sizes: [
      { label: '3.5 × 2 in', sizeCategory: '3.5 × 2 Inch', quantity: '100 pcs', printType: 'Single Side Print', price: 3000 },
      { label: '3.5 × 2 in', sizeCategory: '3.5 × 2 Inch', quantity: '500 pcs', printType: 'Single Side Print', price: 3600 },
      { label: '3.5 × 2 in', sizeCategory: '3.5 × 2 Inch', quantity: '1,000 pcs', printType: 'Single Side Print', price: 4000 },
      { label: '3.5 × 2 in', sizeCategory: '3.5 × 2 Inch', quantity: '1,000 pcs', printType: 'Double Side Print', price: 5200 },
    ],
    materials: ['350 GSM Art Card', '400 GSM Textured Card'],
    finishes: ['Matte Lamination', 'Gloss Lamination', 'Spot UV', 'Foil Stamping'],
    customizable: true,
    icon: '💼',
  },
  {
    slug: 'courier-flyer-bags',
    name: 'Courier Flyer Bags',
    category: 'Packaging',
    shortDescription: 'Branded courier bags that make every delivery a branded experience.',
    longDescription: 'Transform your shipping into a brand touchpoint with custom-printed courier flyer bags. Made from durable, tear-resistant polyethylene with a self-sealing adhesive strip, these bags protect your products while showcasing your brand. Available in multiple sizes with options for full-color printing on white or colored poly.',
    heroImage: '/images/products/courier-bag-hero.jpeg',
    gallery: [
      '/images/products/courier-bag-hero.jpeg',
      '/images/products/courier-bag-1.jpeg',
      '/images/products/courier-bag-2.jpeg',
    ],
    sizes: [
      { label: '6 x 9 in', price: 12 },
      { label: '9 x 12 in', price: 16 },
      { label: '10 x 14 in', price: 20 },
      { label: '12 x 16 in', price: 25 },
    ],
    materials: ['60 Micron Poly', '80 Micron Poly'],
    finishes: ['Full-color print', 'Single-color print'],
    customizable: true,
    icon: '📦',
  },
  {
    slug: 'carry-bags',
    name: 'Custom Carry Bags / Hand Bags',
    category: 'Packaging',
    shortDescription: 'Premium carry bags that turn your customers into walking brand ambassadors.',
    longDescription: 'Our carry bags are crafted from 250 GSM Bleach Card with reinforced bottom and handles for a satisfying, sturdy feel. Whether you need elegant bags for a boutique or premium retail packaging, we customize every detail: size, color, one-color print, and finish.',
    heroImage: '/images/products/carry-bags-hero.jpeg',
    gallery: [
      '/images/products/carry-bags-hero.jpeg',
      '/images/products/carry-bag-1.jpeg',
      '/images/products/carry-bag-2.jpeg',
    ],
    sizes: [
      { label: '11 × 15 + 4 in', sizeCategory: '11 × 15 + 4 Inch', quantity: '100 pcs', printType: '250 GSM Bleach Card · One Color Print', price: 20000 },
      { label: '11 × 15 + 4 in', sizeCategory: '11 × 15 + 4 Inch', quantity: '200 pcs', printType: '250 GSM Bleach Card · One Color Print', price: 30000 },
      { label: '11 × 15 + 4 in', sizeCategory: '11 × 15 + 4 Inch', quantity: '500 pcs', printType: '250 GSM Bleach Card · One Color Print', price: 50000 },
    ],
    materials: ['250 GSM Bleach Card', 'Reinforced Card Base', 'Rope Handles'],
    finishes: ['One Color Printing', 'Matte Lamination', 'Foil Stamping'],
    customizable: true,
    icon: '🛍️',
  },
  {
    slug: 'round-stickers',
    name: 'Custom Round Stickers',
    category: 'Stickers',
    shortDescription: 'Versatile round stickers for sealing, labeling, and branding everything you touch.',
    longDescription: 'From sealing tissue paper to branding product jars and courier boxes, our round stickers are a versatile addition to any packaging system. Printed on premium sticker stock with strong self-adhesive backing that holds without peeling.',
    heroImage: '/images/products/round-stickers-hero.jpeg',
    gallery: [
      '/images/products/round-stickers-hero.jpeg',
      '/images/products/round-sticker-1.jpeg',
      '/images/products/round-stickers-2.jpeg',
    ],
    sizes: [
      { label: '2 in Round', sizeCategory: '2 inch Round', quantity: '100 pcs', price: 2800 },
      { label: '2 in Round', sizeCategory: '2 inch Round', quantity: '500 pcs', price: 4000 },
      { label: '2 in Round', sizeCategory: '2 inch Round', quantity: '1,000 pcs', price: 4500 },
      { label: '2 in Round', sizeCategory: '2 inch Round', quantity: '2,000 pcs', price: 7000 },
    ],
    materials: ['Self-Adhesive Art Paper', 'Vinyl Gloss / Matte'],
    finishes: ['Die-cut Circle', 'Matte', 'Gloss'],
    customizable: true,
    icon: '⭕',
  },
  {
    slug: 'butter-paper',
    name: 'Custom Butter Paper',
    category: 'Wrapping',
    shortDescription: 'Custom-printed butter paper that wraps your products in branded elegance.',
    longDescription: 'Elevate your unboxing experience with custom-printed butter paper. Perfect for wrapping clothing, suits, abayas, accessories, or food items, our butter paper features your branding in crisp one-color print. The translucent, tissue-like quality adds a layer of sophistication to every package.',
    heroImage: '/images/products/butter-paper-hero.jpg',
    gallery: ['/images/products/butter-paper-hero.jpg'],
    sizes: [
      // 11 × 17 Inch
      { label: '11 × 17 in', sizeCategory: '11 × 17 Inch', quantity: '500 pcs', printType: 'One Color Print', price: 8500 },
      { label: '11 × 17 in', sizeCategory: '11 × 17 Inch', quantity: '1,000 pcs', printType: 'One Color Print', price: 12000 },
      // 17 × 23 Inch
      { label: '17 × 23 in', sizeCategory: '17 × 23 Inch', quantity: '500 pcs', printType: 'One Color Print', price: 10000 },
      { label: '17 × 23 in', sizeCategory: '17 × 23 Inch', quantity: '1,000 pcs', printType: 'One Color Print', price: 15000 },
    ],
    materials: ['30 GSM Butter Paper', '40 GSM Butter Paper'],
    finishes: ['One Color Print', 'Sheet Cut'],
    customizable: true,
    icon: '📜',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getAllCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category)))
}
