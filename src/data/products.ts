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
    discountBadge: '15% OFF',
    shortDescription: 'Durable custom polyester labels woven with your logo for clothing, apparel and textile brands.',
    longDescription: 'Our premium polyester woven labels are the ultimate choice for everyday garment branding, tailored specifically for clothing brands across Pakistan. Using advanced damask weaving techniques, your logo, sizing, and brand details are woven directly into the high-density polyester yarn, ensuring a crisp, luxurious, and highly durable finish. These labels are designed to withstand regular wear and intense washing without fading or fraying. We offer multiple fold styles including center fold, end fold, mitre fold, and heat cut to suit your specific stitching requirements. Whether you are a startup boutique in Karachi or a nationwide retail brand, Prima Packages provides top-quality labels with precise detailing. Our custom woven labels offer exceptional value with minimum order quantities designed to support growing businesses. Experience fast production and seamless nationwide delivery across Pakistan. Send us your artwork on WhatsApp, and our design team will guide you through the process, from selecting the right dimensions to confirming the final digital proof before production.',
    seoContentBlock: 'Looking for the best custom clothing brand labels in Pakistan? Our high-density polyester damask woven labels provide a professional finishing touch to garments, apparel, and textiles. Technical specifications include custom sizing, standard 50-denier high-definition yarn, and durable heat-sealed edges to prevent unravelling. Available with center fold, end fold, or flat cut options for easy sewing. The ordering process is simple: share your vector logo on WhatsApp, choose your required dimensions and fold type, and we\'ll provide a digital proof and wholesale quote. We manufacture and supply premium woven tags in Karachi, Lahore, Islamabad, and deliver nationwide. Perfect for neck labels, hem tags, and care labels with fast 7-8 days dispatch.',
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
    longDescription: 'Give your garments and ecommerce products a clean, professional, and reusable outer package with our custom frosted zipper bags. Made from premium frosted PE (Polyethylene) and PEVA materials, these bags offer a luxurious semi-transparent matte finish that elevates the unboxing experience. Featuring a smooth slider zip closure, they provide secure, airtight protection against dust and moisture during transit. These versatile packaging bags are ideal for clothing, accessories, cosmetics, and retail items. At Prima Packages, we customize every detail to align with your brand identity. We offer customized sizing and high-quality screen printing of your brand logo and details directly on the front. As a leading packaging supplier in Karachi, we ensure top-notch quality and offer reliable nationwide delivery across Pakistan. Enhance your brand\'s perceived value and promote sustainability, as customers love to repurpose these durable zipper bags for travel and storage. Contact our team to discuss your dimensions, material thickness, and print colors for a tailored wholesale quote.',
    seoContentBlock: 'Custom printed frosted zipper bags are essential for premium garment packaging and ecommerce shipping in Pakistan. Our frosted PE and PEVA bags feature a durable slider zip closure, providing a reusable and stylish storage solution for shirts, hoodies, suits, and accessories. Technical specs include flexible micron thickness, waterproof matte finish, and high-quality single or multi-color logo printing. To place an order, send us your bag dimensions (e.g., 10x12 or 12x16 inches) and artwork via WhatsApp. We cater to wholesale packaging needs for clothing brands in Karachi and nationwide. Upgrade your retail presentation with high-quality ziplock slider bags designed to protect products and leave a lasting brand impression.',
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
    longDescription: 'Custom hang tags are more than just price labels; they are a vital branding tool that tells your story before the product is even unboxed. At Prima Packages, we craft high-quality hang tags printed on premium card stock, ranging from sturdy 350 GSM art card to rustic kraft and luxurious cotton boards. Elevate your clothing tags with our sophisticated finishing options, including eye-catching metallic foil stamping, elegant embossing, spot UV, and classic letterpress textures. Perfect for apparel, accessories, and boutique items, these tags convey quality and attention to detail. We offer complete customization in shape, size, and printing—available in single or double-sided designs. Pair your tags with custom grommets, nylon snap locks, or rustic jute cords for an extra tactile element. Trusted by clothing brands in Karachi and nationwide, Prima Packages delivers unmatched print quality, affordable pricing, and fast delivery across Pakistan. Let our beautifully crafted hang tags serve as a premium finishing touch for your fashion line or retail products.',
    seoContentBlock: 'Order custom printed hang tags for clothing brands in Pakistan. We specialize in manufacturing high-quality apparel tags, swing tags, and price tags using premium 350 GSM art card, kraft paper, and textured materials. Technical features include custom die-cut shapes, matte or gloss lamination, and premium add-ons like gold foil stamping, embossing, and spot UV. Ordering is easy: share your design on WhatsApp, select your preferred card stock, finishing, and cord type (nylon snap lock or cotton string), and receive a competitive quote. Based in Karachi, we supply bulk custom clothing tags and retail labeling solutions with fast nationwide delivery to help your brand stand out on the racks.',
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
    longDescription: 'Include a beautifully designed and printed thank-you card with every order to build lasting customer loyalty and turn a simple transaction into a meaningful relationship. In today\'s competitive ecommerce landscape, packaging inserts are a powerful way to show appreciation and encourage repeat business. At Prima Packages, we print premium custom thank-you cards on high-quality 300 GSM to 350 GSM art card stock, ensuring a substantial and professional feel. Whether you need single or double-sided printing, we can incorporate your unique brand messaging, social media handles, discount codes, and scannable QR codes. Choose from elegant finishes like matte or gloss lamination, spot UV, or metallic foil stamping to make your cards truly pop. We proudly serve businesses in Karachi and offer swift nationwide delivery across Pakistan. By choosing Prima Packages, you get exceptional print clarity, durable card stock, and fully customizable designs that perfectly align with your brand aesthetics, leaving a memorable impression on every customer.',
    seoContentBlock: 'Custom thank you cards and packaging inserts are perfect for ecommerce businesses and retail brands in Pakistan looking to boost customer retention. Our cards are printed on premium 300 GSM and 350 GSM card stock with vivid offset printing. Technical options include custom dimensions (e.g., 3.5x4 inches), double-sided CMYK printing, matte/gloss lamination, and foil accents. Add QR codes linking to your store or social media for increased engagement. To order, simply send your artwork or design requirements via WhatsApp. We provide wholesale printing services in Karachi with reliable delivery nationwide, offering high-quality promotional inserts, loyalty cards, and thank you notes to enhance your unboxing experience.',
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
    longDescription: 'First impressions matter, and a high-quality business card is an essential tool for networking and establishing professional credibility. At Prima Packages, we ensure that every introduction counts with custom business cards that are as refined as your brand. Crafted on heavyweight 350 GSM art card or 400 GSM textured card stock, our business cards offer a sturdy, premium feel that stands out in any wallet. We utilize crisp offset printing technology to deliver vibrant colors and sharp details, available in both single and double-sided formats. Customize your cards further with sleek matte or gloss lamination, and add luxurious touches like spot UV or foil stamping for a truly distinctive look. Whether you are an entrepreneur in Karachi or a corporate professional across Pakistan, we provide top-tier printing services with fast turnaround times. Choose Prima Packages for professional printing that perfectly captures your brand identity and leaves a lasting impact on your clients and partners.',
    seoContentBlock: 'Get premium custom business cards printed in Pakistan. We provide high-quality visiting card printing services for professionals, corporate clients, and businesses. Technical specifications feature heavy 350 GSM to 400 GSM card stock, precision offset printing, and standard 3.5x2 inch sizing. Enhance your brand identity with luxury finishes including matte/gloss lamination, metallic foiling, and spot UV coating. Our streamlined ordering process allows you to send your vector design files via WhatsApp for a quick digital proof and quote. Operating from Karachi, we offer bulk business card printing with fast 3-5 days dispatch and secure delivery nationwide, ensuring you always make a professional statement.',
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
    longDescription: 'Transform your standard shipping process into a memorable brand touchpoint with our custom-printed courier flyer bags. Designed specifically for ecommerce shipping and secure product delivery, these bags are manufactured from highly durable, tear-resistant, and waterproof polyethylene. Featuring a strong self-sealing adhesive strip, they guarantee tamper-evident protection for your products in transit. At Prima Packages, we help you elevate your unboxing experience by showcasing your brand logo and custom graphics in vibrant full-color or sleek single-color print, available on white or colored poly materials. We offer a range of sizes to accommodate everything from small accessories to bulky apparel. As ecommerce continues to grow in Pakistan, branded delivery is crucial for standing out. We proudly supply custom courier bags to businesses in Karachi and deliver nationwide, offering competitive factory rates, low minimum order quantities, and high-quality micron thickness to ensure your packages arrive safely and in style.',
    seoContentBlock: 'Custom printed courier flyer bags and mailer bags for ecommerce businesses in Pakistan. Our durable shipping bags are made from high-quality 60 to 80-micron polyethylene, providing tear-resistance, waterproofing, and a secure self-sealing adhesive closure. Technical options include custom dimensions (from 6x9 to 12x16 inches) and high-resolution flexographic printing in single or full color. Perfect for shipping apparel, cosmetics, and retail goods securely. To order, share your logo, preferred size, and quantity on WhatsApp for a custom quote. As a trusted packaging manufacturer in Karachi, we supply bulk branded courier bags with nationwide delivery, ensuring your ecommerce packaging is professional and protective.',
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
    longDescription: 'Turn your customers into walking brand ambassadors with our premium custom carry bags and hand bags. Crafted meticulously from robust 250 GSM Bleach Card, these bags feature a reinforced bottom and sturdy rope handles, providing a satisfying, premium feel that can carry substantial weight. Ideal for boutique shopping, elegant retail packaging, and corporate gifting, our carry bags are designed to make a statement. At Prima Packages, we offer comprehensive customization for every detail, including specific sizes, base colors, crisp one-color printing, and luxurious finishes like matte lamination or eye-catching foil stamping. Based in Karachi, we understand the specific needs of retail hubs and fashion brands across Pakistan. By choosing us, you benefit from direct factory rates, superior construction quality, and reliable nationwide delivery. Elevate your in-store experience and brand presentation with beautifully designed carry bags that reflect the true value of the products inside.',
    seoContentBlock: 'Premium custom paper carry bags and branded shopping bags in Pakistan. Ideal for clothing boutiques, retail stores, and luxury gifting. Technical specifications include heavy-duty 250 GSM bleach card construction, reinforced base boards, and durable rope or ribbon handles. Available with custom sizing (e.g., 11x15+4 inches), offset one-color or full-color printing, matte/gloss lamination, and foil stamping accents. To place an order, send your design requirements and dimensions via WhatsApp. We manufacture high-quality custom retail packaging bags in Karachi and offer wholesale pricing with secure delivery nationwide. Enhance your customer\'s shopping experience with sturdy, elegant, and fully customized branded hand bags.',
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
    longDescription: 'Custom round stickers are a highly versatile and cost-effective branding asset, perfect for sealing, labeling, and personalizing everything you touch. From securely sealing tissue paper and butter paper inside a box, to branding product jars, cosmetic containers, and courier packaging, these die-cut stickers seamlessly integrate into any packaging system. Printed on premium self-adhesive art paper or durable gloss/matte vinyl, our stickers feature a strong adhesive backing that ensures they hold firmly without peeling or curling at the edges. Prima Packages offers crisp, high-resolution printing with vibrant colors, customized exactly to your brand\'s specifications. Whether you need a small batch of 100 pieces for a startup or thousands for high-volume retail, we deliver consistent quality. Trusted by businesses in Karachi and across Pakistan, we provide fast production and nationwide delivery. Add a professional finishing touch to your products and unboxing experience with our custom die-cut round stickers.',
    seoContentBlock: 'Custom printed round stickers and die-cut brand labels in Pakistan. Perfect for product packaging, box sealing, and promotional use. Technical specs include high-quality self-adhesive art paper or durable vinyl material (matte or gloss finish), strong industrial-grade adhesive, and precision die-cutting (e.g., standard 2-inch round). We provide high-resolution CMYK printing for vibrant and accurate brand colors. The ordering process is simple: send your logo and required size/quantity via WhatsApp for a quick quote and digital proof. We supply bulk custom stickers and packaging labels to businesses in Karachi, Lahore, Islamabad, and nationwide, ensuring fast 5-7 days dispatch and exceptional print quality.',
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
    longDescription: 'Elevate your unboxing experience with the sophisticated touch of custom-printed butter paper. Perfect for wrapping high-end clothing, tailored suits, elegant abayas, delicate accessories, or premium food items, our butter paper adds a layer of branded elegance to every package. Manufactured from high-quality 30 GSM to 40 GSM translucent paper, it features a smooth, tissue-like quality that protects your products while subtly showcasing them. At Prima Packages, we print your brand logo and custom patterns in crisp, continuous one-color print, cut to your specific sheet dimensions. This lightweight yet durable wrapping solution demonstrates your commitment to quality and attention to detail. As a premier packaging provider in Karachi, we cater to fashion and retail brands across Pakistan, offering low minimum order quantities and direct factory pricing. Enhance the perceived value of your products and delight your customers with beautiful, custom-branded butter paper wrapping.',
    seoContentBlock: 'Custom printed butter paper and branded wrapping tissue for retail packaging in Pakistan. Ideal for clothing brands, bakeries, and luxury retail, providing a premium unboxing experience. Technical specifications include lightweight 30 GSM or 40 GSM translucent paper, custom sheet sizing (e.g., 11x17 or 17x23 inches), and crisp one-color flexographic pattern or logo printing. Ordering is straightforward: provide your logo and preferred sheet size on WhatsApp, and we will create a digital proof for your approval. Based in Karachi, we manufacture and supply bulk custom wrapping paper and printed tissue paper with reliable nationwide delivery, helping you protect and present your products with elegance.',
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
