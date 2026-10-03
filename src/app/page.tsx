import { PackagingHero } from '@/components/store/PackagingHero'
import { RecentWork } from '@/components/store/RecentWork'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import Link from 'next/link'
import Image from 'next/image'
import { ProductCard } from '@/components/ui/ProductCard'
import { FAQSection } from '@/components/ui/FAQSection'
import { Icon } from '@/components/store/Icon'
import { HomeReviewsMarquee } from '@/components/reviews/HomeReviewsMarquee'
import { products } from '@/data/products'

const shortcuts = [
  { name: 'Woven labels', slug: 'woven-labels' }, { name: 'Hang tags', slug: 'hang-tags' },
  { name: 'Zipper bags', slug: 'zipper-bags' }, { name: 'Carry bags', slug: 'carry-bags' },
  { name: 'Thank you cards', slug: 'thank-you-cards' }, { name: 'Stickers', slug: 'round-stickers' },
]
const faqs = [
  {
    question: 'How do I check prices and place a custom order?',
    answer: 'Select your preferred product, size and quantity directly on the website to see instant transparent pricing for 100, 500, or 1000+ pieces. Tap "Shop Now" or WhatsApp to send your logo file, and our team will guide you.'
  },
  {
    question: 'What is the delivery timeline across Pakistan?',
    answer: 'Standard production and dispatch takes 5-7 working days from Karachi. We deliver via reliable courier services to Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Sialkot, Peshawar, and all towns across Pakistan.'
  },
  {
    question: 'Can I print my own brand logo and custom colors?',
    answer: 'Yes, 100%! Share your brand logo in PDF, AI, CDR, PNG or image format on WhatsApp (+92 323 3231712). Our design team prepares a free digital mockup for your approval before machine production begins.'
  },
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer: 'Our accessible MOQ starts from just 100 pieces for hang tags, cards, stickers, and butter paper, and 1 roll for size labels. You do not need to order thousands of pieces to get premium branded packaging.'
  },
]

export default function HomePage() {
  return <>
    <PackagingHero />
    <div className="store-shell service-strip">
      <span><Icon name="box" /> Nationwide Delivery (5-7 Days)</span>
      <span><Icon name="check" /> Free Design Mockup</span>
      <span><Icon name="bag" /> Low 100 Pcs MOQ</span>
      <span><Icon name="shield" /> 50% Advance to Start</span>
    </div>
    <RecentWork />
    <section className="store-shell shop-section category-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PACKAGING ESSENTIALS</p>
          <h2>What are you packing?</h2>
        </div>
        <Link href="/catalog">Explore all</Link>
      </div>
      <div className="category-tiles">
        {shortcuts.map(item => {
          const product = products.find(p => p.slug === item.slug)!;
          return (
            <Link href={`/products/${item.slug}`} key={item.slug}>
              <div>
                <Image src={product.heroImage} alt={item.name} fill sizes="(max-width: 700px) 100px, 170px" className="object-cover" />
              </div>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </section>

    <HomeReviewsMarquee />

    <section className="store-shell shop-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">CUSTOM PACKAGING WITH YOUR LOGO</p>
          <h2>Ready to order? Pick your products</h2>
          <p>Instant pricing for 100, 500 &amp; 1000 pcs. Choose sizes and customize directly.</p>
        </div>
        <Link href="/catalog">Shop all products</Link>
      </div>
      <div className="store-grid">
        {products.slice(0, 10).map(product => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>

    {/* Clean, Lightweight Trust Highlights - Perfect for Ad Visitors */}
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-14 lg:px-20">
        <div className="rounded-2xl sm:rounded-3xl bg-[#F6F7F5] border border-charcoal/5 p-6 sm:p-12 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            DIRECT PACKAGING MANUFACTURER
          </p>
          <h2 className="mt-1.5 text-xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
            Why 500+ Pakistani Brands Trust Prima
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-charcoal/70 max-w-xl mx-auto">
            Everything your clothing brand needs from one reliable manufacturer in Karachi with nationwide dispatch.
          </p>

          <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-left">
            <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-charcoal/5">
              <span className="text-xl sm:text-2xl">⚡</span>
              <h3 className="font-bold text-xs sm:text-base text-charcoal mt-1.5">100 Pcs Low MOQ</h3>
              <p className="text-[11px] sm:text-xs text-charcoal/65 mt-1">Start small without heavy upfront investment.</p>
            </div>
            <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-charcoal/5">
              <span className="text-xl sm:text-2xl">🚚</span>
              <h3 className="font-bold text-xs sm:text-base text-charcoal mt-1.5">5-7 Days Dispatch</h3>
              <p className="text-[11px] sm:text-xs text-charcoal/65 mt-1">Nationwide courier delivery across Pakistan.</p>
            </div>
            <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-charcoal/5">
              <span className="text-xl sm:text-2xl">🎨</span>
              <h3 className="font-bold text-xs sm:text-base text-charcoal mt-1.5">Free Digital Proof</h3>
              <p className="text-[11px] sm:text-xs text-charcoal/65 mt-1">Mockup approved on WhatsApp before payment.</p>
            </div>
            <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-charcoal/5">
              <span className="text-xl sm:text-2xl">💰</span>
              <h3 className="font-bold text-xs sm:text-base text-charcoal mt-1.5">Factory-Direct Rates</h3>
              <p className="text-[11px] sm:text-xs text-charcoal/65 mt-1">Transparent prices without vendor markups.</p>
            </div>
          </div>

          <div className="mt-6">
            <a
              href={`https://wa.me/923233231712?text=${encodeURIComponent('Hi, I saw your ad on Instagram. I need custom packaging for my brand.\nProduct: \nRequired Quantity: \nCity: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-sage px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-sage-dark transition-all shadow-sm"
            >
              <span>Chat on WhatsApp (+92 323 3231712)</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <FAQSection faqs={faqs} heading="Frequently Asked Questions Before Ordering" />
    <section className="store-shell home-final">
      <p className="eyebrow">CRAFTED IN KARACHI. SHIPPED ACROSS PAKISTAN.</p>
      <h2>Let’s put your name on it.</h2>
      <Link href="/catalog" className="store-button">Explore the full collection</Link>
    </section>
  </>
}
