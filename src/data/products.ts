export interface ProductSize {
  label: string
  price: number
  originalPrice?: number
  quantity?: string
  printType?: string
  sizeCategory?: string
  popular?: boolean
}

export interface ConfigOption {
  label: string
  value: string
  popular?: boolean
}

export interface ConfigGroup {
  key: string
  label: string
  options: ConfigOption[]
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
  quoteOnly?: boolean
  configuratorGroups?: ConfigGroup[]
  moq?: string
  dispatchDays?: string
}

export const products: Product[] = [
  {
    slug: 'woven-labels',
    name: 'Polyester Woven Labels',
    category: 'Labels',
    discountBadge: '15% OFF',
    shortDescription: 'Durable custom polyester labels woven with your logo for clothing, apparel and textile brands.',
    longDescription: 'Our polyester woven labels are made for everyday garment branding. Your logo and brand details are woven directly into the label for a crisp, durable finish that holds up through regular wear and washing. Choose your size, quantity and preferred fold, then send us your artwork on WhatsApp for confirmation.',
    heroImage: '/images/products/woven-label-hero.jpeg',
    gallery: [
      '/images/products/woven-label-hero.jpeg',
      '/images/products/woven-label-1.jpeg',
      '/images/products/woven-label-2.jpeg',
      '/images/products/woven-label-3.jpg',
      '/images/products/woven-label-4.jpg',
      '/images/products/woven-label-5.jpg',
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
    materials: ['Durable Polyester Yarn'],
    finishes: ['Straight Cut', 'Center Fold', 'End Fold', 'Heat Cut'],
    customizable: true,
    icon: '🏷️',
    moq: 'Min. 100 PCS',
    dispatchDays: '7-8 Days',
    configuratorGroups: [
      {
        key: 'foldStyle',
        label: 'Fold Style',
        options: [
          { label: 'Center Fold', value: 'Center Fold', popular: true },
          { label: 'End Fold', value: 'End Fold' },
          { label: 'Mitre Fold', value: 'Mitre Fold' },
          { label: 'Flat / Heat Cut', value: 'Flat Cut (Heat-Sealed)' },
        ],
      },
    ],
  },
  {
    slug: 'zipper-bags',
    name: 'Custom Zipper Bags',
    category: 'Packaging',
    shortDescription: 'Reusable frosted zipper bags printed with your logo for clothing and ecommerce orders.',
    longDescription: 'Give garments and ecommerce products a clean, reusable outer package with custom frosted zipper bags. Available in multiple sizes with your logo printed on the front. Final pricing depends on bag dimensions, material thickness, print colors and order quantity, so share your requirements for an accurate wholesale quote.',
    heroImage: '/images/products/zipper-bags-hero-v2.png',
    gallery: [
      '/images/products/zipper-bags-hero-v2.png',
      '/images/products/zipper-bags-1.png',
      '/images/products/zipper-bags-2.png',
    ],
    sizes: [
      { label: 'Custom Size', price: 0 },
    ],
    materials: ['Frosted PE / PEVA'],
    finishes: ['Custom Logo Print', 'Slider Zip Closure', 'Multiple Sizes'],
    customizable: true,
    quoteOnly: true,
    icon: '♻️',
    moq: 'Min. 500 PCS',
    dispatchDays: '10-12 Days',
    configuratorGroups: [
      {
        key: 'material',
        label: 'Material Type',
        options: [
          { label: 'Frosted Matte', value: 'Frosted Matte (Premium)', popular: true },
          { label: 'Clear Transparent', value: 'Clear Transparent' },
        ],
      },
      {
        key: 'closure',
        label: 'Closure Style',
        options: [
          { label: 'Zip Slider Clip', value: 'Zip Slider Clip', popular: true },
          { label: 'Press-to-Lock', value: 'Press-to-Lock Ziplock' },
        ],
      },
      {
        key: 'size',
        label: 'Garment Size',
        options: [
          { label: '8×10 in', value: '8x10 in (Accessories)' },
          { label: '10×12 in', value: '10x12 in (T-Shirts)', popular: true },
          { label: '12×16 in', value: '12x16 in (Hoodies/Suits)' },
          { label: '14×18 in', value: '14x18 in (Overcoats)' },
        ],
      },
    ],
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
    moq: 'Min. 100 PCS',
    dispatchDays: '5-7 Days',
    configuratorGroups: [
      {
        key: 'cardStock',
        label: 'Card Stock',
        options: [
          { label: '350 GSM Art Card', value: '350 GSM Art Card', popular: true },
          { label: 'Kraft Board', value: 'Kraft Rustic Board' },
          { label: 'Matte Laminated', value: 'Matte Laminated' },
          { label: 'Velvet Soft-Touch', value: 'Velvet Soft-Touch' },
        ],
      },
      {
        key: 'finishing',
        label: 'Finishing / Foiling',
        options: [
          { label: 'Standard CMYK', value: 'Standard CMYK Print', popular: true },
          { label: 'Gold Foil', value: 'Gold Foil Stamping' },
          { label: 'Silver Foil', value: 'Silver Foil' },
          { label: 'Embossed Logo', value: 'Embossed Logo' },
        ],
      },
      {
        key: 'cordType',
        label: 'Cord / String',
        options: [
          { label: 'Nylon Snap Lock', value: 'Pre-Threaded Nylon Snap Lock', popular: true },
          { label: 'Jute Cord', value: 'Rustic Jute Cord' },
          { label: 'Without String', value: 'Without String' },
        ],
      },
    ],
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
    moq: 'Min. 100 PCS',
    dispatchDays: '5-7 Days',
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
    moq: 'Min. 100 PCS',
    dispatchDays: '3-5 Days',
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
    moq: 'Min. 100 PCS',
    dispatchDays: '7-10 Days',
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
    moq: 'Min. 100 PCS',
    dispatchDays: '10-12 Days',
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
    moq: 'Min. 100 PCS',
    dispatchDays: '5-7 Days',
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
    moq: 'Min. 100 Sheets',
    dispatchDays: '7-10 Days',
  },
  {
    slug: 'ribbon-tags',
    name: 'Custom Ribbon Tags',
    category: 'Ribbons',
    shortDescription: 'Customized satin ribbon rolls with 1 base color and 1 text color, minimum 1 roll (~90 yards).',
    longDescription: 'Add a luxury touch to your packaging and garment presentation with custom printed satin ribbon rolls. Each roll contains approximately 90 ghaz (yards) of premium satin ribbon, fully customized with your brand logo in 1 base color and 1 text color. Available with minimum order of just 1 roll.',
    heroImage: '/images/products/ribbin-tag-hero.png',
    gallery: [
      '/images/products/ribbin-tag-hero.png',
      '/images/products/ribbin-tag-1.png',
      '/images/products/ribbin-tag-2.png',
    ],
    sizes: [
      {
        label: '1 Roll (~90 Ghaz)',
        sizeCategory: '~90 Ghaz (Yards) Roll',
        quantity: '1 Roll (Minimum)',
        printType: '1 Base Color + 1 Text Color',
        price: 3500,
      },
      {
        label: '2 Rolls (~180 Ghaz)',
        sizeCategory: '~90 Ghaz (Yards) Roll',
        quantity: '2 Rolls',
        printType: '1 Base Color + 1 Text Color',
        price: 7000,
      },
      {
        label: '3 Rolls (~270 Ghaz)',
        sizeCategory: '~90 Ghaz (Yards) Roll',
        quantity: '3 Rolls',
        printType: '1 Base Color + 1 Text Color',
        price: 10500,
      },
      {
        label: '5 Rolls (~450 Ghaz)',
        sizeCategory: '~90 Ghaz (Yards) Roll',
        quantity: '5 Rolls',
        printType: '1 Base Color + 1 Text Color',
        price: 17500,
      },
    ],
    materials: ['Premium Satin Silk Ribbon', 'Woven Edge Finish'],
    finishes: ['Custom 1 Base Color + 1 Text Color', 'High-Density Print', 'Roll Packaging (~90 Ghaz)'],
    customizable: true,
    icon: '🎀',
    moq: 'Min. 1 Roll',
    dispatchDays: '7-10 Days',
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
