export interface Review {
  id: string
  productSlug: string
  productName: string
  author: string
  brandName?: string
  city?: string
  rating: number // 1 to 5
  comment: string
  date: string // e.g. "2026-09-28"
  verified: boolean
}

export const seedReviews: Review[] = [
  {
    id: 'rev-01',
    productSlug: 'woven-labels',
    productName: 'Polyester Woven Labels',
    author: 'Hamza Malik',
    brandName: 'Zaryab Apparel',
    city: 'Lahore',
    rating: 5,
    comment: 'The damask weave quality is outstanding. High thread density, soft edges that don’t cause any neck irritation, and the colors matched our vector logo 100%. Dispatched in 7 days.',
    date: '2026-09-24',
    verified: true,
  },
  {
    id: 'rev-02',
    productSlug: 'woven-labels',
    productName: 'Polyester Woven Labels',
    author: 'Sara Qureshi',
    brandName: 'Studio Bloom',
    city: 'Karachi',
    rating: 5,
    comment: 'Ordered 1,000 woven labels for our summer pret launch. Beautiful center fold stitching and pristine text clarity. Recommending Prima Packages to everyone in our fashion circle.',
    date: '2026-09-20',
    verified: true,
  },
  {
    id: 'rev-03',
    productSlug: 'zipper-bags',
    productName: 'Custom Zipper Bags',
    author: 'Daniyal Raza',
    brandName: 'Urban Fit',
    city: 'Karachi',
    rating: 5,
    comment: 'These frosted zipper bags leveled up our customer unboxing instantly. The slider zip is smooth and the single-color logo print is super crisp without any smudging.',
    date: '2026-09-22',
    verified: true,
  },
  {
    id: 'rev-04',
    productSlug: 'zipper-bags',
    productName: 'Custom Zipper Bags',
    author: 'Ayesha Tariq',
    brandName: 'Modest Touch',
    city: 'Islamabad',
    rating: 5,
    comment: 'Our abaya collections look so luxurious in these frosted bags. Customers frequently compliment the reusable zip packaging. 10/10 quality and responsive WhatsApp team.',
    date: '2026-09-18',
    verified: true,
  },
  {
    id: 'rev-05',
    productSlug: 'hang-tags',
    productName: 'Custom Hang Tags',
    author: 'Mahnoor Sheikh',
    brandName: 'Noor Pret',
    city: 'Lahore',
    rating: 5,
    comment: 'Heavy 350gsm cardstock with velvety matte lamination. Clean die-cut holes and spotless foil stamping. Exactly what we needed for our luxury lawn collection.',
    date: '2026-09-25',
    verified: true,
  },
  {
    id: 'rev-06',
    productSlug: 'hang-tags',
    productName: 'Custom Hang Tags',
    author: 'Fahad Mustafa',
    brandName: 'ActiveGear',
    city: 'Sialkot',
    rating: 5,
    comment: 'The tag thickness and sharp corner finish reflect export-grade quality. Color consistency across all 2,000 tags was impressive.',
    date: '2026-09-15',
    verified: true,
  },
  {
    id: 'rev-07',
    productSlug: 'thank-you-cards',
    productName: 'Custom Thank You Cards',
    author: 'Hira Siddiqui',
    brandName: 'Little Charms',
    city: 'Karachi',
    rating: 5,
    comment: 'These cards add such a warm, personalized touch to each delivery parcel. Rich color saturation, thick card, and flawless double-sided printing.',
    date: '2026-09-21',
    verified: true,
  },
  {
    id: 'rev-08',
    productSlug: 'butter-paper',
    productName: 'Custom Butter Paper',
    author: 'Zeeshan Ali',
    brandName: 'Classic Heritage',
    city: 'Rawalpindi',
    rating: 5,
    comment: 'Repeated watermark pattern was razor sharp and grease-resistant. Wrapping our kurtas in this branded butter paper made the parcel unboxing feel truly bespoke.',
    date: '2026-09-19',
    verified: true,
  },
  {
    id: 'rev-09',
    productSlug: 'tag-card-string',
    productName: 'Tag Card String',
    author: 'Rashid Mehmood',
    brandName: 'Elite Attire',
    city: 'Faisalabad',
    rating: 5,
    comment: 'Lock pin snap is very firm and secure — once closed by hand, it cannot be pulled apart without scissors. The black braided cord gives a sleek boutique finish.',
    date: '2026-09-27',
    verified: true,
  },
  {
    id: 'rev-10',
    productSlug: 'size-labels',
    productName: 'Size Labels (Roll)',
    author: 'Naveed Akhtar',
    brandName: 'StitchCraft Units',
    city: 'Lahore',
    rating: 5,
    comment: 'Roll format makes it effortless for our stitching unit to cut and attach sizes. Clear lettering that doesn’t fade after repeated washing.',
    date: '2026-09-26',
    verified: true,
  },
  {
    id: 'rev-11',
    productSlug: 'courier-flyer-bags',
    productName: 'Courier Flyer Bags',
    author: 'Taimoor Shah',
    brandName: 'SwiftCart Ecom',
    city: 'Peshawar',
    rating: 5,
    comment: 'Tamper-evident adhesive strip is incredibly strong. Our clothing parcels arrived safely through courier services across Pakistan with zero tears.',
    date: '2026-09-17',
    verified: true,
  },
  {
    id: 'rev-12',
    productSlug: 'round-stickers',
    productName: 'Custom Round Stickers',
    author: 'Khadija Khan',
    brandName: 'K-Aroma & Home',
    city: 'Karachi',
    rating: 5,
    comment: 'Matte vinyl stickers peeled off effortlessly and stuck firmly onto our tissue wrap and outer cartons. Colors are very rich and premium.',
    date: '2026-09-23',
    verified: true,
  },
  {
    id: 'rev-13',
    productSlug: 'ribbon-tags',
    productName: 'Custom Ribbon Tags',
    author: 'Alizeh Bokhari',
    brandName: 'Couture Studio',
    city: 'Islamabad',
    rating: 5,
    comment: 'Silky smooth satin ribbon with high-density gold text. Perfect for luxury gift boxes and retail shopping bag handles.',
    date: '2026-09-16',
    verified: true,
  },
  {
    id: 'rev-14',
    productSlug: 'business-cards',
    productName: 'Custom Business Cards',
    author: 'Omer Farooq',
    brandName: 'Studio 9',
    city: 'Lahore',
    rating: 5,
    comment: 'Velvet touch lamination is exceptional. Everyone I handed our cards to commented on the texture. Will definitely reorder.',
    date: '2026-09-14',
    verified: true,
  },
  {
    id: 'rev-15',
    productSlug: 'carry-bags',
    productName: 'Custom Carry Bags',
    author: 'Usman Ghani',
    brandName: 'Prestige Formalwear',
    city: 'Karachi',
    rating: 5,
    comment: 'Sturdy 250gsm bleach board and robust rope handles. Can easily hold 3-4 heavy suits without stretching or tearing.',
    date: '2026-09-12',
    verified: true,
  },
  {
    id: 'rev-16',
    productSlug: 'woven-labels',
    productName: 'Polyester Woven Labels',
    author: 'Bilal Chaudhry',
    brandName: 'Denim Lab',
    city: 'Faisalabad',
    rating: 5,
    comment: 'Center fold tags stitched onto our denim waistbands look retail-ready. Wash tests were 100% successful with zero color run.',
    date: '2026-09-10',
    verified: true,
  },
  {
    id: 'rev-17',
    productSlug: 'zipper-bags',
    productName: 'Custom Zipper Bags',
    author: 'Saad Aslam',
    brandName: 'Apex Athleisure',
    city: 'Sialkot',
    rating: 5,
    comment: 'Our overseas clients love these reusable matte frosted zipper bags. Excellent thickness and pristine screen printing.',
    date: '2026-09-08',
    verified: true,
  },
  {
    id: 'rev-18',
    productSlug: 'hang-tags',
    productName: 'Custom Hang Tags',
    author: 'Maryam Khalid',
    brandName: 'Silk & Linen',
    city: 'Lahore',
    rating: 5,
    comment: 'Spot UV finish and gold foil stamping turned out even sharper than the mockup preview. Dispatched right on schedule.',
    date: '2026-09-05',
    verified: true,
  },
  {
    id: 'rev-19',
    productSlug: 'butter-paper',
    productName: 'Custom Butter Paper',
    author: 'Nimra Khan',
    brandName: 'Bake & Bliss',
    city: 'Islamabad',
    rating: 5,
    comment: 'Food-safe, greaseproof translucent sheets with our pattern repeated seamlessly. elevated our confectionary gift boxes.',
    date: '2026-09-03',
    verified: true,
  },
  {
    id: 'rev-20',
    productSlug: 'round-stickers',
    productName: 'Custom Round Stickers',
    author: 'Shahzaib Raza',
    brandName: 'Craft Organics',
    city: 'Karachi',
    rating: 5,
    comment: 'Circle cut is precise with clean peel edges. Very sticky adhesive that holds tightly on both glass jars and paper sacks.',
    date: '2026-09-01',
    verified: true,
  },
  {
    id: 'rev-21',
    productSlug: 'courier-flyer-bags',
    productName: 'Courier Flyer Bags',
    author: 'Haris Abbasi',
    brandName: 'Urban Drop',
    city: 'Rawalpindi',
    rating: 5,
    comment: 'The POD pouch on the back is so convenient for courier slips. Tough poly material that protects clothing parcels in transit.',
    date: '2026-08-28',
    verified: true,
  },
  {
    id: 'rev-22',
    productSlug: 'ribbon-tags',
    productName: 'Custom Ribbon Tags',
    author: 'Zainab Noor',
    brandName: 'Noor Gifting',
    city: 'Gujranwala',
    rating: 5,
    comment: 'The 1-roll MOQ was a lifesaver for our boutique launch. 90 yards of continuous high quality branded satin ribbon.',
    date: '2026-08-25',
    verified: true,
  },
  {
    id: 'rev-23',
    productSlug: 'tag-card-string',
    productName: 'Tag Card String',
    author: 'Adeel Murtaza',
    brandName: 'Prime Stitch',
    city: 'Karachi',
    rating: 5,
    comment: 'Snaps easily without needing any tagging gun or tools. Speeds up our packing line significantly.',
    date: '2026-08-22',
    verified: true,
  },
  {
    id: 'rev-24',
    productSlug: 'size-labels',
    productName: 'Size Labels (Roll)',
    author: 'Khurram Shehzad',
    brandName: 'K-Wear Garments',
    city: 'Faisalabad',
    rating: 5,
    comment: 'Continuous woven roll with S, M, L, XL markers clearly separated. Saves a ton of time during bulk garment production.',
    date: '2026-08-18',
    verified: true,
  },
]

export function getReviewsByProduct(productSlug: string, customReviews: Review[] = []): Review[] {
  const combined = [...customReviews, ...seedReviews]
  // Deduplicate by ID
  const map = new Map<string, Review>()
  for (const r of combined) {
    if (!map.has(r.id)) map.set(r.id, r)
  }
  return Array.from(map.values()).filter((r) => r.productSlug === productSlug)
}

export function getAllReviews(customReviews: Review[] = []): Review[] {
  const combined = [...customReviews, ...seedReviews]
  const map = new Map<string, Review>()
  for (const r of combined) {
    if (!map.has(r.id)) map.set(r.id, r)
  }
  return Array.from(map.values())
}

export function calculateRatingSummary(reviews: Review[]) {
  if (!reviews.length) {
    return { average: 5, total: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }
  }
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  let sum = 0
  for (const r of reviews) {
    const star = Math.max(1, Math.min(5, Math.round(r.rating)))
    breakdown[star] = (breakdown[star] || 0) + 1
    sum += r.rating
  }
  const average = Number((sum / reviews.length).toFixed(1))
  return { average, total: reviews.length, breakdown }
}

export function getProductRatingSummary(productSlug: string, customReviews: Review[] = []) {
  const reviews = getReviewsByProduct(productSlug, customReviews)
  return calculateRatingSummary(reviews)
}
