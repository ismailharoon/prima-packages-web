export interface FAQ {
  question: string
  answer: string
}

export const homeFaqs: FAQ[] = [
  {
    question: 'What quantities can I order?',
    answer:
      'We cater to both emerging fashion labels and large manufacturers. Polyester woven labels start from 100 PCS, hang tags from 100 pcs, ribbon tags from 1 roll (~90 yards), and carry bags from 100 pcs. Larger volume orders receive tiered wholesale discounted pricing.',
  },
  {
    question: 'Can I print my own custom logo and design?',
    answer:
      'Yes, all packaging items are custom made with your brand name, logo, colors, and layout. Nothing is generic.',
  },
  {
    question: 'How do I share my artwork or design?',
    answer:
      'You can share your logo file in PDF, AI, CDR, or high-resolution PNG/JPG directly on WhatsApp (+92 323 3231712). Our design team reviews it for production clarity before processing.',
  },
  {
    question: 'Do you deliver custom packaging across Pakistan?',
    answer:
      'Yes. While our workshop is based in Saddar, Karachi, we dispatch orders nationwide to Lahore, Islamabad, Rawalpindi, Faisalabad, Sialkot, Peshawar, Multan, and all other cities through tracked courier services.',
  },
  {
    question: 'How can I get bulk pricing?',
    answer:
      'For wholesale quantities (1,000, 2,000, 5,000+ units), share your required product specifications, dimensions, and target quantity on WhatsApp, and we will calculate a tiered volume quotation.',
  },
  {
    question: 'Can I order multiple packaging products together?',
    answer:
      'Yes. Many brands order a complete packaging bundle (woven labels + hang tags + zipper bags + courier flyers) together to maintain consistent brand colors and reduce separate shipping costs.',
  },
]

export const productFaqs: Record<string, FAQ[]> = {
  'woven-labels': [
    { question: 'What is the MOQ for custom woven labels?', answer: 'The minimum order quantity (MOQ) for our custom woven labels is just 100 pieces, making it ideal for both emerging clothing brands and large-scale manufacturers.' },
    { question: 'What fold styles are available?', answer: 'We offer straight cut, center fold (for neck seams), end fold (left and right folded edges), and heat cut (flat cut with sealed edges to prevent fraying).' },
    { question: 'How long does production take?', answer: 'Standard production time for woven labels is typically 7-8 working days after design approval.' },
    { question: 'Can I get a sample before bulk order?', answer: 'We share a confirmed digital mockup before production begins to ensure your design, layout, and colors are accurate.' },
    { question: 'What file format do I need for my logo?', answer: 'We recommend sharing high-resolution PDF, AI (Adobe Illustrator), CDR (CorelDRAW), or high-quality PNG/JPG files via WhatsApp.' }
  ],
  'hang-tags': [
    { question: 'What paper stock do you use for hang tags?', answer: 'Our standard hang tags are printed on premium 350 GSM Art Card. We also offer Kraft Board, Matte Laminated, and Velvet Soft-Touch finishes depending on your brand aesthetic.' },
    { question: 'Can I get gold foil stamping?', answer: 'Yes! We offer premium finishing options including gold foil, silver foil, embossing, and spot UV for an elevated look.' },
    { question: 'Do you provide string/cord with hang tags?', answer: 'Yes, we provide string options including pre-threaded nylon snap locks and rustic jute cords. You can also order tags without strings.' },
    { question: 'What is the minimum order for hang tags?', answer: 'The minimum order quantity for custom printed hang tags is 100 pieces.' }
  ],
  'zipper-bags': [
    { question: 'What materials are used for your zipper bags?', answer: 'We use high-quality Frosted PE / PEVA for our premium frosted matte zipper bags. Clear transparent options are also available.' },
    { question: 'Are these zipper bags reusable?', answer: 'Absolutely. Our custom frosted zipper bags feature a durable zip slider clip or press-to-lock closure, making them reusable and perfect for storing garments.' },
    { question: 'What sizes are available for clothing packaging?', answer: 'Popular sizes include 8x10 inches (accessories), 10x12 inches (t-shirts), 12x16 inches (hoodies/suits), and 14x18 inches (overcoats). We can also do custom sizes.' },
    { question: 'What is the MOQ for custom zipper bags?', answer: 'The minimum order quantity for custom printed frosted zipper bags is 500 pieces.' }
  ],
  'courier-flyer-bags': [
    { question: 'Are the courier bags tear-resistant?', answer: 'Yes, our courier bags are made from durable 60 to 80-micron polyethylene that is waterproof and tear-resistant, ensuring safe transit.' },
    { question: 'Do the bags have a self-sealing adhesive?', answer: 'Yes, all our courier flyer bags come with a strong self-sealing adhesive strip for secure packing.' },
    { question: 'Can I print my logo in full color on the flyer bag?', answer: 'Yes, we offer custom printing options including single-color and full-color prints to match your brand identity.' },
    { question: 'What is the minimum order for printed courier flyers?', answer: 'The minimum order quantity is 100 pieces for custom-printed courier bags.' }
  ],
  'carry-bags': [
    { question: 'What material are the carry bags made from?', answer: 'Our premium custom carry bags are crafted from thick 250 GSM Bleach Card with a reinforced card base for added durability.' },
    { question: 'Do the bags come with handles?', answer: 'Yes, our carry bags feature sturdy rope handles for a premium feel and comfortable carrying.' },
    { question: 'What is the MOQ for custom carry bags?', answer: 'The minimum order quantity for custom bleach card carry bags is 100 pieces.' },
    { question: 'How long does it take to manufacture carry bags?', answer: 'Production time for custom printed carry bags is generally 10 to 12 working days.' }
  ],
  'round-stickers': [
    { question: 'Are your round stickers self-adhesive?', answer: 'Yes, our stickers feature a strong self-adhesive backing that sticks securely to boxes, tissue paper, and jars without peeling off.' },
    { question: 'What sizes are available?', answer: 'Our most popular size is the 2-inch round sticker, but we can customize the dimensions to suit your specific packaging needs.' },
    { question: 'What finishes can I choose for stickers?', answer: 'We offer die-cut circle stickers in both matte and gloss vinyl/art paper finishes.' },
    { question: 'What is the MOQ for custom round stickers?', answer: 'The minimum order quantity for custom printed round stickers is 100 pieces.' }
  ],
  'butter-paper': [
    { question: 'What thickness is the butter paper?', answer: 'We offer custom printed butter paper in 30 GSM and 40 GSM thicknesses for a premium, translucent wrapping experience.' },
    { question: 'What sizes are the butter paper sheets?', answer: 'Our standard sheet sizes are 11x17 inches and 17x23 inches, perfect for wrapping apparel and accessories.' },
    { question: 'How many colors can be printed on butter paper?', answer: 'We typically use a crisp one-color print (e.g., your logo pattern) to maintain the elegant, minimalist look of the tissue paper.' },
    { question: 'What is the minimum order for custom butter paper?', answer: 'The minimum order quantity is 100 sheets.' }
  ],
  'ribbon-tags': [
    { question: 'What material is used for the custom ribbons?', answer: 'Our ribbons are made from premium satin silk with a woven edge finish for a luxurious look and feel.' },
    { question: 'How much ribbon is in one roll?', answer: 'Each custom printed ribbon roll contains approximately 90 Ghaz (yards) of continuous ribbon.' },
    { question: 'Can I choose the ribbon and print color?', answer: 'Yes, the customization includes 1 base color for the ribbon and 1 color for your text/logo print.' },
    { question: 'What is the minimum order quantity for ribbons?', answer: 'You can order custom printed satin ribbons starting from just 1 roll (~90 yards).' }
  ],
  'thank-you-cards': [
    { question: 'What paper is used for thank you cards?', answer: 'We print thank you cards on premium 300 GSM and 350 GSM Art Card for a sturdy, high-quality feel.' },
    { question: 'Can I print on both sides of the card?', answer: 'Yes, we offer both single-sided and double-sided printing options for your custom messages and branding.' },
    { question: 'Can you add a QR code to the thank you card?', answer: 'Absolutely! We can easily incorporate your social media or website QR codes into the design.' },
    { question: 'What is the MOQ for thank you cards?', answer: 'The minimum order quantity for custom thank you cards is 100 pieces.' }
  ],
  'business-cards': [
    { question: 'What makes your business cards premium?', answer: 'Our business cards are crafted on heavyweight 350 GSM Art Card or 400 GSM Textured Card, ensuring a professional and refined first impression.' },
    { question: 'Do you offer matte and gloss laminations?', answer: 'Yes, we offer matte lamination, gloss lamination, as well as premium finishes like spot UV and foil stamping.' },
    { question: 'How long does it take to print business cards?', answer: 'Standard production for business cards takes 3 to 5 working days.' },
    { question: 'What is the MOQ for custom business cards?', answer: 'The minimum order quantity for custom printed business cards is 100 pieces.' }
  ]
}

export const regionalFaqs: Record<string, FAQ[]> = {
  'karachi': [
    { question: 'Can I visit your shop in Karachi?', answer: 'Yes! Our workshop is based at Shop # B-52, Ground Floor, Karim Center, Saddar, Karachi. You are welcome to visit us to check material samples.' },
    { question: 'How long is delivery within Karachi?', answer: 'For local Karachi orders, we offer fast delivery usually within 1-2 working days after the production is complete.' },
    { question: 'Do you offer cash on delivery in Karachi?', answer: 'We typically require an advance payment to begin custom manufacturing, but balance payments can be coordinated for local Karachi pickups.' },
    { question: 'Can I pick up my packaging order directly?', answer: 'Yes, you can collect your finished order directly from our Saddar, Karachi shop.' }
  ],
  'lahore': [
    { question: 'Do you deliver custom packaging to Lahore?', answer: 'Yes, we dispatch packaging orders to Lahore daily via tracked courier services (e.g., Leopard, TCS, or Trax).' },
    { question: 'How long does shipping to Lahore take?', answer: 'Once production is finished in Karachi, shipping to Lahore generally takes 2-3 working days.' },
    { question: 'How do I pay for my order from Lahore?', answer: 'We accept payments via direct Bank Transfer, EasyPaisa, or JazzCash before we begin the custom manufacturing process.' },
    { question: 'Will my packaging be safe during transit to Lahore?', answer: 'Absolutely. We securely pack all woven labels, tags, and bags in durable corrugated boxes to ensure they arrive in perfect condition.' }
  ],
  'faisalabad': [
    { question: 'Do you supply packaging to Faisalabad\'s textile brands?', answer: 'Yes! We supply custom woven labels, tags, and bags to many clothing manufacturers and textile brands based in Faisalabad.' },
    { question: 'How long does delivery to Faisalabad take?', answer: 'Shipping from our Karachi workshop to Faisalabad typically takes 2-4 working days via trusted courier networks.' },
    { question: 'Can I request bulk manufacturing for my Faisalabad factory?', answer: 'Yes, we specialize in bulk orders (5,000+ units) and offer tiered wholesale pricing for large textile and garment factories.' },
    { question: 'How do we coordinate designs from another city?', answer: 'We manage the entire design and approval process smoothly via WhatsApp. We will send digital mockups for your approval before printing.' }
  ],
  'sialkot': [
    { question: 'Do you provide labels and tags for Sialkot sportswear?', answer: 'Yes, we manufacture durable polyester woven labels and hang tags ideal for sportswear, activewear, and leather goods manufactured in Sialkot.' },
    { question: 'How fast is the delivery to Sialkot?', answer: 'Courier delivery to Sialkot usually takes about 3-4 working days after the production of your custom packaging is complete.' },
    { question: 'What payment methods are available for Sialkot clients?', answer: 'You can easily pay via Bank Transfer, EasyPaisa, or JazzCash to confirm your order.' },
    { question: 'Can I get a digital sample before confirming my Sialkot order?', answer: 'Yes, we always provide a digital mockup for your review and approval before we start the mass production process.' }
  ]
}
