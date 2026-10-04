export interface ProductSize {
  label: string
  price: number
  unitPrice?: number
  color?: string
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
  seoContentBlock?: string
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
    shortDescription: 'Durable custom polyester labels woven with your logo for clothing, apparel and textile brands.',
    longDescription: 'Our premium polyester woven labels are the ultimate choice for everyday garment branding, tailored specifically for clothing brands across Pakistan. Using advanced damask weaving techniques, your logo, sizing, and brand details are woven directly into the high-density polyester yarn, ensuring a crisp, luxurious, and highly durable finish. These labels are designed to withstand regular wear and intense washing without fading or fraying. We offer multiple fold styles including center fold, end fold, mitre fold, and heat cut to suit your specific stitching requirements. Whether you are a startup boutique in Karachi or a nationwide retail brand, Prima Packages provides top-quality labels with precise detailing. Our custom woven labels offer exceptional value with minimum order quantities designed to support growing businesses. Experience fast production and seamless nationwide delivery across Pakistan. Send us your artwork on WhatsApp, and our design team will guide you through the process, from selecting the right dimensions to confirming the final digital proof before production.',
    seoContentBlock: 'Looking for the best custom clothing brand labels in Pakistan? Our high-density polyester damask woven labels provide a professional finishing touch to garments, apparel, and textiles. Technical specifications include custom sizing, standard 50-denier high-definition yarn, and durable heat-sealed edges to prevent unravelling. Available with center fold, end fold, or flat cut options for easy sewing. The ordering process is simple: share your vector logo on WhatsApp, choose your required dimensions and fold type, and we\'ll provide a digital proof and wholesale quote. We manufacture and supply premium woven tags in Karachi, Lahore, Islamabad, and deliver nationwide. Perfect for neck labels, hem tags, and care labels with fast 5-7 days dispatch.',
    heroImage: '/images/products/woven-labels-nora.jpg',
    gallery: [
      '/images/products/woven-labels-nora.jpg',
      '/images/products/woven-labels-zahra.jpg',
      '/images/products/woven-labels-libaas.jpg',
      '/images/products/woven-labels-fiza.jpg',
      '/images/products/woven-labels-bitwearz.jpg',
    ],
    sizes: [
      {
        "label": "0.5 × 2 in",
        "sizeCategory": "0.5 × 2 in",
        "quantity": "100 pcs",
        "price": 1800
      },
      {
        "label": "0.5 × 2 in",
        "sizeCategory": "0.5 × 2 in",
        "quantity": "500 pcs",
        "price": 2500
      },
      {
        "label": "0.5 × 2 in",
        "sizeCategory": "0.5 × 2 in",
        "quantity": "1,000 pcs",
        "price": 3000
      },
      {
        "label": "0.5 × 2 in",
        "sizeCategory": "0.5 × 2 in",
        "quantity": "2,000 pcs",
        "price": 5000
      },
      {
        "label": "0.75 × 2 in",
        "sizeCategory": "0.75 × 2 in",
        "quantity": "100 pcs",
        "price": 1850
      },
      {
        "label": "0.75 × 2 in",
        "sizeCategory": "0.75 × 2 in",
        "quantity": "500 pcs",
        "price": 3000
      },
      {
        "label": "0.75 × 2 in",
        "sizeCategory": "0.75 × 2 in",
        "quantity": "1,000 pcs",
        "price": 3500
      },
      {
        "label": "0.75 × 2 in",
        "sizeCategory": "0.75 × 2 in",
        "quantity": "2,000 pcs",
        "price": 6000
      },
      {
        "label": "1 × 2 in",
        "sizeCategory": "1 × 2 in",
        "quantity": "100 pcs",
        "price": 1900
      },
      {
        "label": "1 × 2 in",
        "sizeCategory": "1 × 2 in",
        "quantity": "500 pcs",
        "price": 3200
      },
      {
        "label": "1 × 2 in",
        "sizeCategory": "1 × 2 in",
        "quantity": "1,000 pcs",
        "price": 3800
      },
      {
        "label": "1 × 2 in",
        "sizeCategory": "1 × 2 in",
        "quantity": "2,000 pcs",
        "price": 7000
      },
      {
        "label": "1 × 2.5 in",
        "sizeCategory": "1 × 2.5 in",
        "quantity": "100 pcs",
        "price": 2000
      },
      {
        "label": "1 × 2.5 in",
        "sizeCategory": "1 × 2.5 in",
        "quantity": "500 pcs",
        "price": 3300
      },
      {
        "label": "1 × 2.5 in",
        "sizeCategory": "1 × 2.5 in",
        "quantity": "1,000 pcs",
        "price": 4000
      },
      {
        "label": "1 × 2.5 in",
        "sizeCategory": "1 × 2.5 in",
        "quantity": "2,000 pcs",
        "price": 7500
      }
    ],
    materials: ['Durable Polyester Yarn'],
    finishes: ['Standard Weave Finish', 'Heat-Sealed Edges'],
    customizable: true,
    icon: '🏷️',
    moq: 'Min. 100 PCS',
    dispatchDays: '5-7 Days',
  },
  {
    slug: 'zipper-bags',
    name: 'Custom Zipper Bags',
    category: 'Packaging',
    shortDescription: 'White and black zipper bags with single-side, one-color printing. Choose your color, size and pack quantity.',
    longDescription: 'Give your garments and ecommerce products a clean, professional, and reusable outer package with our custom frosted zipper bags. Made from premium frosted PE (Polyethylene) and PEVA materials, these bags offer a luxurious semi-transparent matte finish that elevates the unboxing experience. Featuring a smooth slider zip closure, they provide secure, airtight protection against dust and moisture during transit. These versatile packaging bags are ideal for clothing, accessories, cosmetics, and retail items. At Prima Packages, we customize every detail to align with your brand identity. We offer customized sizing and high-quality screen printing of your brand logo and details directly on the front. As a leading packaging supplier in Karachi, we ensure top-notch quality and offer reliable nationwide delivery across Pakistan. Enhance your brand\'s perceived value and promote sustainability, as customers love to repurpose these durable zipper bags for travel and storage. Contact our team to discuss your dimensions, material thickness, and print colors for a tailored wholesale quote.',
    seoContentBlock: 'Custom printed frosted zipper bags are essential for premium garment packaging and ecommerce shipping in Pakistan. Our frosted PE and PEVA bags feature a durable slider zip closure, providing a reusable and stylish storage solution for shirts, hoodies, suits, and accessories. Technical specs include flexible micron thickness, waterproof matte finish, and high-quality single or multi-color logo printing. To place an order, send us your bag dimensions (e.g., 10x12 or 12x16 inches) and artwork via WhatsApp. We cater to wholesale packaging needs for clothing brands in Karachi and nationwide. Upgrade your retail presentation with high-quality ziplock slider bags designed to protect products and leave a lasting brand impression.',
    heroImage: '/images/products/zipper-bags-hero-v2.png',
    gallery: [
      '/images/products/zipper-bags-hero-v2.png',
      '/images/products/zipper-bags-1.png',
      '/images/products/zipper-bags-2.png',
    ],
    sizes: [
      {
            "label": "White \u00b7 8 × 10 in",
            "sizeCategory": "8 × 10 in",
            "color": "White",
            "quantity": "100 pcs",
            "price": 4000,
            "unitPrice": 40,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 8 × 10 in",
            "sizeCategory": "8 × 10 in",
            "color": "White",
            "quantity": "500 pcs",
            "price": 12500,
            "unitPrice": 25,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 10 × 12 in",
            "sizeCategory": "10 × 12 in",
            "color": "White",
            "quantity": "100 pcs",
            "price": 4200,
            "unitPrice": 42,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 10 × 12 in",
            "sizeCategory": "10 × 12 in",
            "color": "White",
            "quantity": "500 pcs",
            "price": 14000,
            "unitPrice": 28,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 11.5 × 13 in",
            "sizeCategory": "11.5 × 13 in",
            "color": "White",
            "quantity": "100 pcs",
            "price": 4500,
            "unitPrice": 45,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 11.5 × 13 in",
            "sizeCategory": "11.5 × 13 in",
            "color": "White",
            "quantity": "500 pcs",
            "price": 15000,
            "unitPrice": 30,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 12 × 14 in",
            "sizeCategory": "12 × 14 in",
            "color": "White",
            "quantity": "100 pcs",
            "price": 4700,
            "unitPrice": 47,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 12 × 14 in",
            "sizeCategory": "12 × 14 in",
            "color": "White",
            "quantity": "500 pcs",
            "price": 16000,
            "unitPrice": 32,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 12 × 16 in",
            "sizeCategory": "12 × 16 in",
            "color": "White",
            "quantity": "100 pcs",
            "price": 5000,
            "unitPrice": 50,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 12 × 16 in",
            "sizeCategory": "12 × 16 in",
            "color": "White",
            "quantity": "500 pcs",
            "price": 17000,
            "unitPrice": 34,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 14 × 16 in",
            "sizeCategory": "14 × 16 in",
            "color": "White",
            "quantity": "100 pcs",
            "price": 5500,
            "unitPrice": 55,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 14 × 16 in",
            "sizeCategory": "14 × 16 in",
            "color": "White",
            "quantity": "500 pcs",
            "price": 19000,
            "unitPrice": 38,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 14 × 18 in",
            "sizeCategory": "14 × 18 in",
            "color": "White",
            "quantity": "100 pcs",
            "price": 6000,
            "unitPrice": 60,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "White \u00b7 14 × 18 in",
            "sizeCategory": "14 × 18 in",
            "color": "White",
            "quantity": "500 pcs",
            "price": 20000,
            "unitPrice": 40,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "Black \u00b7 10 × 12 in",
            "sizeCategory": "10 × 12 in",
            "color": "Black",
            "quantity": "100 pcs",
            "price": 4800,
            "unitPrice": 48,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "Black \u00b7 10 × 12 in",
            "sizeCategory": "10 × 12 in",
            "color": "Black",
            "quantity": "500 pcs",
            "price": 16500,
            "unitPrice": 33,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "Black \u00b7 11.5 × 13 in",
            "sizeCategory": "11.5 × 13 in",
            "color": "Black",
            "quantity": "100 pcs",
            "price": 5000,
            "unitPrice": 50,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "Black \u00b7 11.5 × 13 in",
            "sizeCategory": "11.5 × 13 in",
            "color": "Black",
            "quantity": "500 pcs",
            "price": 18000,
            "unitPrice": 36,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "Black \u00b7 12 × 14 in",
            "sizeCategory": "12 × 14 in",
            "color": "Black",
            "quantity": "100 pcs",
            "price": 5200,
            "unitPrice": 52,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "Black \u00b7 12 × 14 in",
            "sizeCategory": "12 × 14 in",
            "color": "Black",
            "quantity": "500 pcs",
            "price": 19000,
            "unitPrice": 38,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "Black \u00b7 14 × 16 in",
            "sizeCategory": "14 × 16 in",
            "color": "Black",
            "quantity": "100 pcs",
            "price": 6000,
            "unitPrice": 60,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "Black \u00b7 14 × 16 in",
            "sizeCategory": "14 × 16 in",
            "color": "Black",
            "quantity": "500 pcs",
            "price": 21500,
            "unitPrice": 43,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "Black \u00b7 14 × 18 in",
            "sizeCategory": "14 × 18 in",
            "color": "Black",
            "quantity": "100 pcs",
            "price": 6500,
            "unitPrice": 65,
            "printType": "Single side \u00b7 1 color"
      },
      {
            "label": "Black \u00b7 14 × 18 in",
            "sizeCategory": "14 × 18 in",
            "color": "Black",
            "quantity": "500 pcs",
            "price": 23000,
            "unitPrice": 46,
            "printType": "Single side \u00b7 1 color"
      }

    ],
    materials: ['White / Black Zipper Bags'],
    finishes: ['Custom Logo Print', 'Slider Zip Closure', 'Multiple Sizes'],
    customizable: true,
    icon: '♻️',
    moq: 'Min. 100 PCS',
    dispatchDays: '5-7 Days',
  },
  {
    slug: 'hang-tags',
    name: 'Custom Hang Tags / Tag Cards',
    category: 'Tags',
    shortDescription: '350 GSM Bleach Card (2 × 3.5 in). Single or double side printed with optional Tag Card String.',
    longDescription: 'Our custom hang tags (tag cards) are printed on premium 350 GSM bleach card in standard 2 × 3.5 inch size with punch hole included. Perfect for clothing brands, boutique apparel, and retail items. Available in single and double-sided printing with optional matching tag card string (tag dori).',
    seoContentBlock: 'Order custom 350 GSM bleach card tag cards and hang tags in Pakistan. Size 2 × 3.5 inch with single or double side printing and optional tag card strings. Fast delivery nationwide.',
    heroImage: '/images/products/hang-tags-studio.jpg',
    gallery: [
      '/images/products/hang-tags-hero2.jpeg',
      '/images/products/hang-tags-white.jpg',
      '/images/products/hang-tags-hero.jpeg',
      '/images/products/hang-tag-1.jpeg',
      '/images/products/hang-tag-2.jpeg',
    ],
    sizes: [
      // One Side (Card Only)
      {
        label: 'One Side · 100 pcs',
        sizeCategory: 'One Side',
        quantity: '100 pcs',
        price: 2600,
        unitPrice: 26,
        printType: 'One Side Printed · 350 GSM Bleach Card (2 × 3.5 in)',
      },
      {
        label: 'One Side · 500 pcs',
        sizeCategory: 'One Side',
        quantity: '500 pcs',
        price: 3200,
        unitPrice: 6.4,
        printType: 'One Side Printed · 350 GSM Bleach Card (2 × 3.5 in)',
      },
      {
        label: 'One Side · 1,000 pcs',
        sizeCategory: 'One Side',
        quantity: '1,000 pcs',
        price: 3800,
        unitPrice: 3.8,
        printType: 'One Side Printed · 350 GSM Bleach Card (2 × 3.5 in)',
      },
      {
        label: 'One Side · 2,000 pcs',
        sizeCategory: 'One Side',
        quantity: '2,000 pcs',
        price: 6000,
        unitPrice: 3.0,
        printType: 'One Side Printed · 350 GSM Bleach Card (2 × 3.5 in)',
      },
      // Double Side (Card Only)
      {
        label: 'Double Side · 100 pcs',
        sizeCategory: 'Double Side',
        quantity: '100 pcs',
        price: 3600,
        unitPrice: 36,
        printType: 'Double Side Printed · 350 GSM Bleach Card (2 × 3.5 in)',
      },
      {
        label: 'Double Side · 500 pcs',
        sizeCategory: 'Double Side',
        quantity: '500 pcs',
        price: 4200,
        unitPrice: 8.4,
        printType: 'Double Side Printed · 350 GSM Bleach Card (2 × 3.5 in)',
      },
      {
        label: 'Double Side · 1,000 pcs',
        sizeCategory: 'Double Side',
        quantity: '1,000 pcs',
        price: 4800,
        unitPrice: 4.8,
        printType: 'Double Side Printed · 350 GSM Bleach Card (2 × 3.5 in)',
      },
      {
        label: 'Double Side · 2,000 pcs',
        sizeCategory: 'Double Side',
        quantity: '2,000 pcs',
        price: 7800,
        unitPrice: 3.9,
        printType: 'Double Side Printed · 350 GSM Bleach Card (2 × 3.5 in)',
      },
      // One Side + Tag Card String
      {
        label: 'One Side + Tag Card String · 100 pcs',
        sizeCategory: 'One Side + Tag Card String',
        quantity: '100 pcs',
        price: 2900,
        unitPrice: 29,
        printType: 'One Side Printed + Tag Card String (350 GSM Bleach Card)',
      },
      {
        label: 'One Side + Tag Card String · 500 pcs',
        sizeCategory: 'One Side + Tag Card String',
        quantity: '500 pcs',
        price: 3700,
        unitPrice: 7.4,
        printType: 'One Side Printed + Tag Card String (350 GSM Bleach Card)',
      },
      {
        label: 'One Side + Tag Card String · 1,000 pcs',
        sizeCategory: 'One Side + Tag Card String',
        quantity: '1,000 pcs',
        price: 4400,
        unitPrice: 4.4,
        printType: 'One Side Printed + Tag Card String (350 GSM Bleach Card)',
      },
      {
        label: 'One Side + Tag Card String · 2,000 pcs',
        sizeCategory: 'One Side + Tag Card String',
        quantity: '2,000 pcs',
        price: 7000,
        unitPrice: 3.5,
        printType: 'One Side Printed + Tag Card String (350 GSM Bleach Card)',
      },
      // Double Side + Tag Card String
      {
        label: 'Double Side + Tag Card String · 100 pcs',
        sizeCategory: 'Double Side + Tag Card String',
        quantity: '100 pcs',
        price: 3900,
        unitPrice: 39,
        printType: 'Double Side Printed + Tag Card String (350 GSM Bleach Card)',
      },
      {
        label: 'Double Side + Tag Card String · 500 pcs',
        sizeCategory: 'Double Side + Tag Card String',
        quantity: '500 pcs',
        price: 4700,
        unitPrice: 9.4,
        printType: 'Double Side Printed + Tag Card String (350 GSM Bleach Card)',
      },
      {
        label: 'Double Side + Tag Card String · 1,000 pcs',
        sizeCategory: 'Double Side + Tag Card String',
        quantity: '1,000 pcs',
        price: 5400,
        unitPrice: 5.4,
        printType: 'Double Side Printed + Tag Card String (350 GSM Bleach Card)',
      },
      {
        label: 'Double Side + Tag Card String · 2,000 pcs',
        sizeCategory: 'Double Side + Tag Card String',
        quantity: '2,000 pcs',
        price: 8800,
        unitPrice: 4.4,
        printType: 'Double Side Printed + Tag Card String (350 GSM Bleach Card)',
      },
    ],
    materials: ['350 GSM Bleach Card'],
    finishes: ['Punch Hole Included', 'Standard Matte Finish'],
    customizable: true,
    icon: '🔖',
    moq: 'Min. 100 PCS',
    dispatchDays: '5-7 Days',
  },
  {
    slug: 'thank-you-cards',
    name: 'Custom Thank You Cards',
    category: 'Cards',
    shortDescription: 'Thoughtful thank-you cards that turn a transaction into a relationship.',
    longDescription: 'Include a beautifully designed and printed thank-you card with every order to build lasting customer loyalty and turn a simple transaction into a meaningful relationship. In today\'s competitive ecommerce landscape, packaging inserts are a powerful way to show appreciation and encourage repeat business. At Prima Packages, we print premium custom thank-you cards on high-quality 300 GSM to 350 GSM art card stock, ensuring a substantial and professional feel. Whether you need single or double-sided printing, we can incorporate your unique brand messaging, social media handles, discount codes, and scannable QR codes. Choose from elegant finishes like matte or gloss lamination, spot UV, or metallic foil stamping to make your cards truly pop. We proudly serve businesses in Karachi and offer swift nationwide delivery across Pakistan. By choosing Prima Packages, you get exceptional print clarity, durable card stock, and fully customizable designs that perfectly align with your brand aesthetics, leaving a memorable impression on every customer.',
    seoContentBlock: 'Custom thank you cards and packaging inserts are perfect for ecommerce businesses and retail brands in Pakistan looking to boost customer retention. Our cards are printed on premium 300 GSM and 350 GSM card stock with vivid offset printing. Technical options include custom dimensions (e.g., 3.5x4 inches), double-sided CMYK printing, matte/gloss lamination, and foil accents. Add QR codes linking to your store or social media for increased engagement. To order, simply send your artwork or design requirements via WhatsApp. We provide wholesale printing services in Karachi with reliable delivery nationwide, offering high-quality promotional inserts, loyalty cards, and thank you notes to enhance your unboxing experience.',
    heroImage: '/images/products/thank-you-cards-1.jpeg',
    gallery: [
      '/images/products/thank-you-cards-hero.jpeg',
      '/images/products/thank-you-cards-1.jpeg',
      '/images/products/thank-you-cards-2.jpeg',
    ],
    sizes: [

      {
            "label": "3.5 × 4 in",
            "sizeCategory": "3.5 × 4 in (Single Side Print)",
            "quantity": "100 pcs",
            "printType": "350 GSM Bleach Card \u00b7 Single Side",
            "price": 4000,
            "unitPrice": 40
      },
      {
            "label": "3.5 × 4 in",
            "sizeCategory": "3.5 × 4 in (Single Side Print)",
            "quantity": "500 pcs",
            "printType": "350 GSM Bleach Card \u00b7 Single Side",
            "price": 4800,
            "unitPrice": 9.6
      },
      {
            "label": "3.5 × 4 in",
            "sizeCategory": "3.5 × 4 in (Single Side Print)",
            "quantity": "1,000 pcs",
            "printType": "350 GSM Bleach Card \u00b7 Single Side",
            "price": 5800,
            "unitPrice": 5.8
      },
      {
            "label": "3.5 × 4 in",
            "sizeCategory": "3.5 × 4 in (Double Side Print)",
            "quantity": "1,000 pcs",
            "printType": "350 GSM Bleach Card \u00b7 Double Side",
            "price": 7400,
            "unitPrice": 7.4
      }

    ],
    materials: ['350 GSM Bleach Card'],
    finishes: ['Precision Cut', 'Matte Lamination'],
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
    longDescription: 'First impressions matter, and a high-quality business card is an essential tool for networking and establishing professional credibility. At Prima Packages, we ensure that every introduction counts with custom business cards that are as refined as your brand. Crafted on heavyweight 350 GSM art card or 400 GSM textured card stock, our business cards offer a sturdy, premium feel that stands out in any wallet. We utilize crisp offset printing technology to deliver vibrant colors and sharp details, available in both single and double-sided formats. Customize your cards further with sleek matte or gloss lamination, and add luxurious touches like spot UV or foil stamping for a truly distinctive look. Whether you are an entrepreneur in Karachi or a corporate professional across Pakistan, we provide top-tier printing services with fast turnaround times. Choose Prima Packages for professional printing that perfectly captures your brand identity and leaves a lasting impact on your clients and partners.',
    seoContentBlock: 'Get premium custom business cards printed in Pakistan. We provide high-quality visiting card printing services for professionals, corporate clients, and businesses. Technical specifications feature heavy 350 GSM to 400 GSM card stock, precision offset printing, and standard 3.5x2 inch sizing. Enhance your brand identity with luxury finishes including matte/gloss lamination, metallic foiling, and spot UV coating. Our streamlined ordering process allows you to send your vector design files via WhatsApp for a quick digital proof and quote. Operating from Karachi, we offer bulk business card printing with fast 5-7 days dispatch and secure delivery nationwide, ensuring you always make a professional statement.',
    heroImage: '/images/products/business-cards-white.jpg',
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
    dispatchDays: '5-7 Days',
  },
  {
    slug: 'courier-flyer-bags',
    name: 'Courier Flyer Bags',
    category: 'Packaging',
    shortDescription: 'Branded courier bags that make every delivery a branded experience.',
    longDescription: 'Transform your standard shipping process into a memorable brand touchpoint with our custom-printed courier flyer bags. Designed specifically for ecommerce shipping and secure product delivery, these bags are manufactured from highly durable, tear-resistant, and waterproof polyethylene. Featuring a strong self-sealing adhesive strip, they guarantee tamper-evident protection for your products in transit. At Prima Packages, we help you elevate your unboxing experience by showcasing your brand logo and custom graphics in vibrant full-color or sleek single-color print, available on white or colored poly materials. We offer a range of sizes to accommodate everything from small accessories to bulky apparel. As ecommerce continues to grow in Pakistan, branded delivery is crucial for standing out. We proudly supply custom courier bags to businesses in Karachi and deliver nationwide, offering competitive factory rates, low minimum order quantities, and high-quality micron thickness to ensure your packages arrive safely and in style.',
    seoContentBlock: 'Custom printed courier flyer bags and mailer bags for ecommerce businesses in Pakistan. Our durable shipping bags are made from high-quality 60 to 80-micron polyethylene, providing tear-resistance, waterproofing, and a secure self-sealing adhesive closure. Technical options include custom dimensions (from 6x9 to 12x16 inches) and high-resolution flexographic printing in single or full color. Perfect for shipping apparel, cosmetics, and retail goods securely. To order, share your logo, preferred size, and quantity on WhatsApp for a custom quote. As a trusted packaging manufacturer in Karachi, we supply bulk branded courier bags with nationwide delivery, ensuring your ecommerce packaging is professional and protective.',
    heroImage: '/images/products/courier-bag-white.jpg',
    gallery: [
      '/images/products/courier-bag-hero.jpeg',
      '/images/products/courier-bag-1.jpeg',
      '/images/products/courier-bag-2.jpeg',
    ],
    sizes: [
      {
            "label": "6 × 9 + 2 in",
            "sizeCategory": "6 × 9 + 2 in",
            "quantity": "100 pcs",
            "price": 3000,
            "unitPrice": 30
      },
      {
            "label": "6 × 9 + 2 in",
            "sizeCategory": "6 × 9 + 2 in",
            "quantity": "500 pcs",
            "price": 8000,
            "unitPrice": 16
      },
      {
            "label": "8 × 11 + 2 in",
            "sizeCategory": "8 × 11 + 2 in",
            "quantity": "100 pcs",
            "price": 3500,
            "unitPrice": 35
      },
      {
            "label": "8 × 11 + 2 in",
            "sizeCategory": "8 × 11 + 2 in",
            "quantity": "500 pcs",
            "price": 10000,
            "unitPrice": 20
      },
      {
            "label": "10 × 12 + 2 in",
            "sizeCategory": "10 × 12 + 2 in",
            "quantity": "100 pcs",
            "price": 3800,
            "unitPrice": 38
      },
      {
            "label": "10 × 12 + 2 in",
            "sizeCategory": "10 × 12 + 2 in",
            "quantity": "500 pcs",
            "price": 11000,
            "unitPrice": 22
      },
      {
            "label": "10 × 14 + 2 in",
            "sizeCategory": "10 × 14 + 2 in",
            "quantity": "100 pcs",
            "price": 4000,
            "unitPrice": 40
      },
      {
            "label": "10 × 14 + 2 in",
            "sizeCategory": "10 × 14 + 2 in",
            "quantity": "500 pcs",
            "price": 12000,
            "unitPrice": 24
      },
      {
            "label": "12 × 16 + 2 in",
            "sizeCategory": "12 × 16 + 2 in",
            "quantity": "100 pcs",
            "price": 4200,
            "unitPrice": 42
      },
      {
            "label": "12 × 16 + 2 in",
            "sizeCategory": "12 × 16 + 2 in",
            "quantity": "500 pcs",
            "price": 14000,
            "unitPrice": 28
      },
      {
            "label": "14 × 19 + 2 in",
            "sizeCategory": "14 × 19 + 2 in",
            "quantity": "100 pcs",
            "price": 5500,
            "unitPrice": 55
      },
      {
            "label": "14 × 19 + 2 in",
            "sizeCategory": "14 × 19 + 2 in",
            "quantity": "500 pcs",
            "price": 16500,
            "unitPrice": 33
      }

    ],
    materials: ['60 Micron Poly', '80 Micron Poly'],
    finishes: ['Full-color print', 'Single-color print'],
    customizable: true,
    icon: '📦',
    moq: 'Min. 100 PCS',
    dispatchDays: '5-7 Days',
  },
  {
    slug: 'carry-bags',
    name: 'Custom Carry Bags / Hand Bags',
    category: 'Packaging',
    quoteOnly: true,
    shortDescription: 'Premium carry bags that turn your customers into walking brand ambassadors.',
    longDescription: 'Turn your customers into walking brand ambassadors with our premium custom carry bags and hand bags. Crafted meticulously from robust 250 GSM Bleach Card, these bags feature a reinforced bottom and sturdy rope handles, providing a satisfying, premium feel that can carry substantial weight. Ideal for boutique shopping, elegant retail packaging, and corporate gifting, our carry bags are designed to make a statement. At Prima Packages, we offer comprehensive customization for every detail, including specific sizes, base colors, crisp one-color printing, and luxurious finishes like matte lamination or eye-catching foil stamping. Based in Karachi, we understand the specific needs of retail hubs and fashion brands across Pakistan. By choosing us, you benefit from direct factory rates, superior construction quality, and reliable nationwide delivery. Elevate your in-store experience and brand presentation with beautifully designed carry bags that reflect the true value of the products inside.',
    seoContentBlock: 'Premium custom paper carry bags and branded shopping bags in Pakistan. Ideal for clothing boutiques, retail stores, and luxury gifting. Technical specifications include heavy-duty 250 GSM bleach card construction, reinforced base boards, and durable rope or ribbon handles. Available with custom sizing (e.g., 11x15+4 inches), offset one-color or full-color printing, matte/gloss lamination, and foil stamping accents. To place an order, send your design requirements and dimensions via WhatsApp. We manufacture high-quality custom retail packaging bags in Karachi and offer wholesale pricing with secure delivery nationwide. Enhance your customer\'s shopping experience with sturdy, elegant, and fully customized branded hand bags.',
    heroImage: '/images/products/carry-bag-white.jpg',
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
    dispatchDays: '5-7 Days',
  },
  {
    slug: 'round-stickers',
    name: 'Custom Round Stickers',
    category: 'Stickers',
    shortDescription: 'Versatile round stickers for sealing, labeling, and branding everything you touch.',
    longDescription: 'Custom round stickers are a highly versatile and cost-effective branding asset, perfect for sealing, labeling, and personalizing everything you touch. From securely sealing tissue paper and butter paper inside a box, to branding product jars, cosmetic containers, and courier packaging, these die-cut stickers seamlessly integrate into any packaging system. Printed on premium self-adhesive art paper or durable gloss/matte vinyl, our stickers feature a strong adhesive backing that ensures they hold firmly without peeling or curling at the edges. Prima Packages offers crisp, high-resolution printing with vibrant colors, customized exactly to your brand\'s specifications. Whether you need a small batch of 100 pieces for a startup or thousands for high-volume retail, we deliver consistent quality. Trusted by businesses in Karachi and across Pakistan, we provide fast production and nationwide delivery. Add a professional finishing touch to your products and unboxing experience with our custom die-cut round stickers.',
    seoContentBlock: 'Custom printed round stickers and die-cut brand labels in Pakistan. Perfect for product packaging, box sealing, and promotional use. Technical specs include high-quality self-adhesive art paper or durable vinyl material (matte or gloss finish), strong industrial-grade adhesive, and precision die-cutting (e.g., standard 2-inch round). We provide high-resolution CMYK printing for vibrant and accurate brand colors. The ordering process is simple: send your logo and required size/quantity via WhatsApp for a quick quote and digital proof. We supply bulk custom stickers and packaging labels to businesses in Karachi, Lahore, Islamabad, and nationwide, ensuring fast 5-7 days dispatch and exceptional print quality.',
    heroImage: '/images/products/round-stickers-white.jpg',
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
    shortDescription: 'Custom-printed butter paper (9×14, 14×18, 18×28 in) with your logo. 100 pcs MOQ, wholesale bulk quotes on WhatsApp.',
    longDescription: 'Elevate your unboxing experience with the sophisticated touch of custom-printed butter paper. Perfect for wrapping high-end clothing, tailored suits, elegant abayas, delicate accessories, or premium food items, our butter paper adds a layer of branded elegance to every package. Manufactured from high-quality 30 GSM to 40 GSM translucent paper, it features a smooth, tissue-like quality that protects your products while subtly showcasing them. At Prima Packages, we print your brand logo and custom patterns in crisp, continuous one-color print, cut to your specific sheet dimensions. This lightweight yet durable wrapping solution demonstrates your commitment to quality and attention to detail. As a premier packaging provider in Karachi, we cater to fashion and retail brands across Pakistan, offering low minimum order quantities and direct factory pricing. Enhance the perceived value of your products and delight your customers with beautiful, custom-branded butter paper wrapping.',
    seoContentBlock: 'Custom printed butter paper and branded wrapping tissue for retail packaging in Pakistan. Ideal for clothing brands, bakeries, and luxury retail, providing a premium unboxing experience. Technical specifications include lightweight 30 GSM or 40 GSM translucent paper, custom sheet sizing (e.g., 11x17 or 17x23 inches), and crisp one-color flexographic pattern or logo printing. Ordering is straightforward: provide your logo and preferred sheet size on WhatsApp, and we will create a digital proof for your approval. Based in Karachi, we manufacture and supply bulk custom wrapping paper and printed tissue paper with reliable nationwide delivery, helping you protect and present your products with elegance.',
    heroImage: '/images/products/butter-paper-studio-opt.jpg',
    gallery: [
      '/images/products/butter-paper-studio.jpg',
      '/images/products/butter-paper-white.jpg',
      '/images/products/butter-paper-hero.jpg',
    ],
        sizes: [
      {
        label: '9 × 14 in',
        sizeCategory: '9 × 14 in',
        quantity: '100 pcs',
        printType: 'One Color Print',
        price: 2500,
        unitPrice: 25,
      },
      {
        label: '14 × 18 in',
        sizeCategory: '14 × 18 in',
        quantity: '100 pcs',
        printType: 'One Color Print',
        price: 3000,
        unitPrice: 30,
      },
      {
        label: '18 × 28 in',
        sizeCategory: '18 × 28 in',
        quantity: '100 pcs',
        printType: 'One Color Print',
        price: 4000,
        unitPrice: 40,
      },
    ],
    materials: ['30 GSM Butter Paper', '40 GSM Butter Paper'],
    finishes: ['One Color Print', 'Sheet Cut'],
    customizable: true,
    icon: '📜',
    moq: 'Min. 100 Sheets',
    dispatchDays: '5-7 Days',
  },
  {
    slug: 'ribbon-tags',
    name: 'Custom Ribbon Tags',
    category: 'Ribbons',
    shortDescription: 'Customized satin ribbon rolls with 1 base color and 1 text color, minimum 1 roll (~90 yards).',
    longDescription: 'Add the ultimate luxury touch to your packaging, garment presentation, and corporate gifting with our custom printed satin ribbon rolls. Each roll contains approximately 90 ghaz (yards) of premium satin silk ribbon, meticulously customized with your brand logo or personalized message. We use high-density printing techniques to apply 1 text color over 1 base ribbon color, ensuring your branding stands out beautifully with a clean, woven edge finish. Perfect for tying gift boxes, wrapping retail purchases, or adding a signature flourish to apparel tags. At Prima Packages, we make luxury accessible by offering a minimum order quantity of just one roll, making it perfect for both emerging boutiques and established brands. Proudly serving the vibrant retail market in Karachi and delivering nationwide across Pakistan, we guarantee superior material quality and crisp printing. Elevate your brand\'s unboxing aesthetic with our elegant, fully customized satin ribbons.',
    seoContentBlock: 'Custom printed satin ribbon rolls for luxury packaging and gift wrapping in Pakistan. Our premium silk satin ribbons are perfect for clothing brands, florists, and corporate gifting. Technical details include ~90 yards (ghaz) per roll, woven edge finish to prevent fraying, and high-density printing featuring 1 base color and 1 custom text/logo color. Available in various widths to suit your packaging needs. To order, send your logo and color preferences via WhatsApp for a digital mockup and quote. We offer an exceptionally low MOQ of just 1 roll. Operating in Karachi with fast nationwide delivery, we supply top-quality branded ribbons to enhance your product presentation and unboxing experience.',
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
    dispatchDays: '5-7 Days',
  },
  {
    slug: 'tag-card-string',
    name: 'Tag Card String',
    category: 'Tags',
    shortDescription: 'Lock-pin tag card strings and cords for hang tags. Secure attachment for apparel, garments, and retail items.',
    longDescription: 'Our tag card strings (hang tag cords / lock pins) provide a sleek, secure, and professional way to attach hang tags to clothing and accessories without needing a tag gun. Featuring a snap-lock plastic fastener and durable braided string, they cannot be removed without cutting once snapped shut. Ideal for clothing brands and retail boutiques looking for a clean, damage-free presentation.',
    heroImage: '/images/products/hang-tags-white.jpg',
    gallery: [
      '/images/products/hang-tags-hero.jpeg',
      '/images/products/hang-tag-1.jpeg',
      '/images/products/hang-tag-2.jpeg',
    ],
    sizes: [
      {
        label: 'Black · 100 pcs',
        sizeCategory: 'Black',
        color: 'Black',
        quantity: '100 pcs',
        price: 300,
        unitPrice: 3.0,
      },
      {
        label: 'Black · 500 pcs',
        sizeCategory: 'Black',
        color: 'Black',
        quantity: '500 pcs',
        price: 500,
        unitPrice: 1.0,
      },
      {
        label: 'Black · 1,000 pcs',
        sizeCategory: 'Black',
        color: 'Black',
        quantity: '1,000 pcs',
        price: 600,
        unitPrice: 0.6,
        popular: true,
      },
      {
        label: 'Black · 2,000 pcs',
        sizeCategory: 'Black',
        color: 'Black',
        quantity: '2,000 pcs',
        price: 1000,
        unitPrice: 0.5,
      },
      {
        label: 'White · 100 pcs',
        sizeCategory: 'White',
        color: 'White',
        quantity: '100 pcs',
        price: 300,
        unitPrice: 3.0,
      },
      {
        label: 'White · 500 pcs',
        sizeCategory: 'White',
        color: 'White',
        quantity: '500 pcs',
        price: 500,
        unitPrice: 1.0,
      },
      {
        label: 'White · 1,000 pcs',
        sizeCategory: 'White',
        color: 'White',
        quantity: '1,000 pcs',
        price: 600,
        unitPrice: 0.6,
        popular: true,
      },
      {
        label: 'White · 2,000 pcs',
        sizeCategory: 'White',
        color: 'White',
        quantity: '2,000 pcs',
        price: 1000,
        unitPrice: 0.5,
      },
    ],
    materials: ['Braided Polyester Cord', 'Plastic Snap Lock'],
    finishes: ['Snap Lock Seal', 'Hand Fastened'],
    customizable: false,
    icon: '🧵',
    moq: 'Min. 100 PCS',
    dispatchDays: '5-7 Days',
  },
  {
    slug: 'size-labels',
    name: 'Size Labels (Roll)',
    category: 'Labels',
    shortDescription: 'Standard garment size labels in continuous rolls (XS, S, M, L, XL, XXL, Free Size). Easy to cut and stitch.',
    longDescription: 'High quality standard woven garment size labels supplied in convenient rolls. Perfect for inner collar, side-seam, or waistband stitching across shirts, hoodies, trousers, and ethnic wear. High contrast lettering ensures clear visibility, and skin-friendly soft woven edges prevent itching.',
    heroImage: '/images/products/size-labels-white.jpg',
    gallery: [
      '/images/products/size-labels-white.jpg',
    ],
    sizes: [
      {
        label: '1 Roll (approx. 500 pcs)',
        sizeCategory: '1 Roll',
        quantity: '1 Roll',
        price: 650,
        popular: true,
      },
      {
        label: '2 Rolls (approx. 1,000 pcs)',
        sizeCategory: '2 Rolls',
        quantity: '2 Rolls',
        price: 1200,
      },
      {
        label: '5 Rolls (approx. 2,500 pcs)',
        sizeCategory: '5 Rolls',
        quantity: '5 Rolls',
        price: 2800,
      },
      {
        label: '10 Rolls (approx. 5,000 pcs)',
        sizeCategory: '10 Rolls',
        quantity: '10 Rolls',
        price: 5200,
      },
    ],
    materials: ['Woven Damask Polyester'],
    finishes: ['Roll Form', 'Cold Cut'],
    customizable: false,
    icon: '📏',
    moq: 'Min. 1 Roll',
    dispatchDays: '5-7 Days',
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
