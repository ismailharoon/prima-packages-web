export interface RegionalCity {
  slug: string
  cityName: string
  province: string
  heroBadge: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  subheadline: string
  heroDescription: string
  targetAudience: string[]
  highlightFeatures: {
    title: string
    description: string
    icon: string
  }[]
  featuredProductSlugs: string[]
  localHubContext: string
  localDeliveryTime: string
  schemaLocality: string
}

export const REGIONAL_CITIES: Record<string, RegionalCity> = {
  karachi: {
    slug: 'custom-packaging-karachi',
    cityName: 'Karachi',
    province: 'Sindh',
    heroBadge: 'Direct Factory & Shop in Saddar, Karachi',
    title: 'Custom Packaging & Woven Labels in Karachi',
    metaTitle: 'Custom Packaging & Woven Labels Karachi | Factory Direct | Prima Packages',
    metaDescription: 'Direct packaging manufacturer in Saddar, Karachi. Custom woven neck labels, frosted zipper bags, hang tags & luxury boxes for Karachi garment exporters & DHA/Clifton boutiques. Instant WhatsApp quote!',
    keywords: [
      'custom packaging Karachi',
      'woven labels Karachi',
      'clothing packaging Karachi',
      'zipper bags Saddar Karachi',
      'hang tags printing Karachi',
      'packaging supplier Karim Center',
      'garment labels SITE Korangi',
      'boutique bags DHA Clifton',
    ],
    subheadline: 'Serving Karachi’s Fashion & Garment Exporters across DHA, Clifton, Tariq Road, Saddar, SITE & Korangi.',
    heroDescription: 'Manufactured right here in Karachi. Visit our shop at Karim Center, Saddar, or order online with same-day digital mockups and prompt citywide doorstep delivery.',
    targetAudience: [
      'Apparel Exporters & Garment Units in SITE & Korangi',
      'Fashion Boutiques in Clifton, DHA & Tariq Road',
      'Daraz & Shopify Ecommerce Brands across Karachi',
      'Pret Designers & Bridal Wear Ateliers',
    ],
    highlightFeatures: [
      {
        title: 'Karachi Central Facility',
        description: 'Shop B-52, Karim Center, Saddar. Touch physical samples, discuss specs in person, or pick up orders directly.',
        icon: '📍',
      },
      {
        title: 'Express Doorstep Delivery',
        description: 'Swift delivery via rider or local cargo anywhere in Karachi within 24–48 hours of production completion.',
        icon: '⚡',
      },
      {
        title: 'Low MOQ for Growing Brands',
        description: 'Start with as few as 100 pcs for labels and tags. Scale seamlessly to 50,000+ pcs with wholesale factory rates.',
        icon: '📦',
      },
    ],
    featuredProductSlugs: ['woven-labels', 'zipper-bags', 'hang-tags', 'carry-bags', 'thank-you-cards'],
    localHubContext: 'Saddar, Karim Center, SITE, Korangi, DHA, Clifton, Tariq Road',
    localDeliveryTime: 'Same-day or next-day delivery across Karachi once manufactured',
    schemaLocality: 'Karachi',
  },

  lahore: {
    slug: 'custom-packaging-lahore',
    cityName: 'Lahore',
    province: 'Punjab',
    heroBadge: 'Express Cargo Dispatch to Lahore',
    title: 'Custom Packaging & Apparel Labels in Lahore',
    metaTitle: 'Custom Packaging & Clothing Labels Lahore | Pret & Apparel | Prima Packages',
    metaDescription: 'Premium packaging solutions for Lahore fashion designers, Pret brands, Shah Alam Market wholesalers & Gulberg boutiques. Custom woven labels, hang tags, and printed zipper bags.',
    keywords: [
      'custom packaging Lahore',
      'woven labels Lahore',
      'clothing tags Lahore',
      'zipper bags Gulberg Lahore',
      'Shah Alam Market packaging',
      'pret clothing labels Lahore',
      'custom boxes MM Alam Road',
      'hang tag printing Lahore',
    ],
    subheadline: 'Trusted by luxury pret labels, high-street brands, and boutiques across Gulberg, MM Alam Road, DHA Lahore & Shah Alam Market.',
    heroDescription: 'High-definition damask woven labels, custom frosted zipper bags, and luxury foil-stamped hang tags engineered to give Lahore’s fashion houses an elite edge.',
    targetAudience: [
      'Pret & Luxury Fashion Designers in Gulberg & DHA Lahore',
      'Commercial Wholesalers & Retailers in Shah Alam Market',
      'D2C Apparel Brands on Instagram & TikTok',
      'Eastern Wear & Kurti Manufacturers',
    ],
    highlightFeatures: [
      {
        title: 'Overnight Lahore Dispatch',
        description: 'Direct priority cargo via Daewoo Express, Faisal Movers, and TCS directly to your doorstep or cargo terminal in Lahore.',
        icon: '🚚',
      },
      {
        title: 'High-Density Damask Weave',
        description: 'Ultra-soft edges, fine yarn count, and zero-fray ultrasonic cuts tailored for high-end pret and couture garments.',
        icon: '🧵',
      },
      {
        title: '100% Free Digital Mockup',
        description: 'Send your vector or high-res logo on WhatsApp. Our design team produces visual proofs before taking anything to the loom.',
        icon: '🎨',
      },
    ],
    featuredProductSlugs: ['woven-labels', 'hang-tags', 'zipper-bags', 'butter-paper', 'ribbon-tags'],
    localHubContext: 'Gulberg, DHA Lahore, MM Alam Road, Shah Alam Market, Mall Road, Model Town',
    localDeliveryTime: '24–48 hours express cargo to Lahore upon production completion',
    schemaLocality: 'Lahore',
  },

  faisalabad: {
    slug: 'custom-packaging-faisalabad',
    cityName: 'Faisalabad',
    province: 'Punjab',
    heroBadge: 'Bulk Wholesale Factory Pricing',
    title: 'Wholesale Custom Packaging & Textile Labels in Faisalabad',
    metaTitle: 'Custom Packaging & Textile Labels Faisalabad | Wholesale Rates | Prima Packages',
    metaDescription: 'High-volume custom packaging for Faisalabad textile mills, lawn suit brands, wholesale bedding, and garment factories. Courier mailer flyers, zipper bags & bulk woven tags. Get wholesale quote!',
    keywords: [
      'custom packaging Faisalabad',
      'textile labels Faisalabad',
      'lawn suit packaging Faisalabad',
      'courier bags Faisalabad wholesale',
      'woven labels Faisalabad factory',
      'zipper bags wholesale Faisalabad',
      'bedding packaging Pakistan',
    ],
    subheadline: 'Industrial-grade packaging partner for textile mills, unstitched lawn brands, bedding manufacturers & wholesale traders across Faisalabad.',
    heroDescription: 'From high-run woven neck labels to tamper-evident courier flyer bags and garment zipper bags, we supply Faisalabad’s textile powerhouses with factory-direct rates and uncompromising consistency.',
    targetAudience: [
      'Textile Mills & Weaving Units in Faisalabad Industrial Estates',
      'Lawn & Pret Apparel Brands in Clock Tower Bazaars',
      'Wholesale Home Textile & Bedding Exporters',
      'High-Volume Daraz & Social Commerce Shippers',
    ],
    highlightFeatures: [
      {
        title: 'High-Run Tier Discounts',
        description: 'Significant cost reductions on 5,000 to 50,000+ unit runs, giving wholesale mills the maximum profit margin per garment.',
        icon: '🏭',
      },
      {
        title: 'Heavy-Gauge Durability',
        description: 'Extra-strong frosted PE zipper bags and tear-proof courier flyers that survive rigorous intercity transport without scuffs.',
        icon: '🛡️',
      },
      {
        title: 'Textile-Optimized Sizing',
        description: 'Special dimensions built specifically for 2-piece & 3-piece lawn suits, bedsheet sets, and heavy winter shawls.',
        icon: '📐',
      },
    ],
    featuredProductSlugs: ['zipper-bags', 'courier-flyer-bags', 'woven-labels', 'hang-tags'],
    localHubContext: 'Faisalabad Textile City, Clock Tower Bazaars, Small Industrial Estate, Jaranwala Road',
    localDeliveryTime: 'Direct heavy cargo dispatch to Faisalabad wholesale hubs',
    schemaLocality: 'Faisalabad',
  },

  sialkot: {
    slug: 'custom-packaging-sialkot',
    cityName: 'Sialkot',
    province: 'Punjab',
    heroBadge: 'Export-Quality Standards',
    title: 'Export-Grade Custom Labels & Packaging in Sialkot',
    metaTitle: 'Custom Packaging & Sportswear Labels Sialkot | Export Quality | Prima Packages',
    metaDescription: 'Export-grade woven labels, sublimation tags, and poly mailer bags for Sialkot sportswear, gym wear, martial arts & apparel exporters. Zero-fray laser-cut edges. WhatsApp quotation!',
    keywords: [
      'custom packaging Sialkot',
      'sportswear labels Sialkot',
      'gym wear tags Sialkot',
      'woven labels Sialkot export',
      'martial arts uniform labels',
      'custom poly bags Sialkot',
      'athletic wear packaging Pakistan',
    ],
    subheadline: 'Engineered for Sialkot’s athletic wear, activewear brands, gym apparel exporters, and martial arts uniform manufacturers.',
    heroDescription: 'Labels and packaging that meet stringent European and North American export criteria: sweat-resistant dyes, laser-sealed anti-chafing borders, and eco-friendly recyclable frosted zipper bags.',
    targetAudience: [
      'Sportswear & Gym Wear Exporters in Sialkot',
      'Martial Arts & Combat Sports Uniform Makers',
      'Activewear & Fitness Apparel Brands',
      'Leather Goods & Moto Apparel Manufacturers',
    ],
    highlightFeatures: [
      {
        title: 'Anti-Fray Laser Cut & Ultrasonic Borders',
        description: 'Smooth, skin-friendly borders that prevent collar itch and meet athletic performance specifications.',
        icon: '✂️',
      },
      {
        title: 'Export Compliance Ready',
        description: 'Wash-resistant, non-bleed reactive dyed threads that sustain 50+ wash cycles without color fading.',
        icon: '🏅',
      },
      {
        title: 'Full Export Packaging Suite',
        description: 'Pair your woven neck labels with frosted zip-lock slider bags and custom barcoded hang tags for zero-touch international distribution.',
        icon: '🌐',
      },
    ],
    featuredProductSlugs: ['woven-labels', 'zipper-bags', 'hang-tags', 'courier-flyer-bags'],
    localHubContext: 'Sialkot Export Zone, Daska Road, Sambrial, Wazirabad Road industrial clusters',
    localDeliveryTime: 'Dedicated express cargo dispatch to Sialkot industrial hubs',
    schemaLocality: 'Sialkot',
  },
}
