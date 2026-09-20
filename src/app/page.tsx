import { PackagingHero } from '@/components/store/PackagingHero'
import { RecentWork } from '@/components/store/RecentWork'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import Link from 'next/link'
import Image from 'next/image'
import { ProductCard } from '@/components/ui/ProductCard'
import { FAQSection } from '@/components/ui/FAQSection'
import { Icon } from '@/components/store/Icon'
import { products } from '@/data/products'

const shortcuts = [
  { name: 'Woven labels', slug: 'woven-labels' }, { name: 'Hang tags', slug: 'hang-tags' },
  { name: 'Zipper bags', slug: 'zipper-bags' }, { name: 'Carry bags', slug: 'carry-bags' },
  { name: 'Thank you cards', slug: 'thank-you-cards' }, { name: 'Stickers', slug: 'round-stickers' },
]
const faqs = [
  { question: 'How do I place a custom order?', answer: 'Choose your products, sizes and quantities, then add them to your cart. Enter your contact details and open your request in WhatsApp. Tap Send there and our team will help finalize the design and quotation.' },
  { question: 'When do I pay for my order?', answer: 'After your specifications and final price are confirmed, a 50% advance is required. Production starts after design approval and advance verification. The remaining balance is payable before dispatch.' },
  { question: 'Can I use my own logo?', answer: 'Yes. Share your logo or artwork with our team on WhatsApp. We will review the file and arrange a design proof for your approval before production.' },
  { question: 'Do you deliver across Pakistan?', answer: 'Yes, we dispatch from Karachi to cities across Pakistan. Delivery charges and the production timeline are confirmed with your final quotation.' },
]
export default function HomePage() {
  return <>
    <PackagingHero />
    <div className="store-shell service-strip"><span><Icon name="box" /> Nationwide delivery</span><span><Icon name="check" /> Design approval first</span><span><Icon name="bag" /> 50% advance to start</span></div>
    <RecentWork />
    <section className="store-shell shop-section category-section"><div className="section-heading"><div><p className="eyebrow">FIND YOUR PERFECT FIT</p><h2>What are you packing?</h2></div><Link href="/catalog">Explore all</Link></div><div className="category-tiles">{shortcuts.map(item => { const product = products.find(p => p.slug === item.slug)!; return <Link href={`/products/${item.slug}`} key={item.slug}><div><Image src={product.heroImage} alt="" fill sizes="(max-width: 700px) 100px, 170px" className="object-cover" /></div><span>{item.name}</span></Link> })}</div></section>
    <section className="store-shell shop-section"><div className="section-heading"><div><p className="eyebrow">THE EVERYDAY BRAND ESSENTIALS</p><h2>Make it yours.</h2><p>Pick your product. Choose your options. We’ll take care of the print.</p></div><Link href="/catalog">Shop all products</Link></div><div className="store-grid">{products.slice(0, 8).map(product => <ProductCard key={product.slug} product={product} />)}</div></section>
      {/* 3. TOTAL PACKAGING SUCCESS - 360 APPROACH (Inspired by PakFactory) */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-14 lg:px-20">
          {/* Rounded Island Container with side padding (PakFactory layout) */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#F5F6F8] px-5 py-8 sm:px-16 sm:py-16 lg:px-24 lg:py-20">
            {/* Centered Floating Packaging Suite Visual */}
            <ScrollReveal>
              <div className="relative mx-auto max-w-3xl lg:max-w-4xl w-full aspect-[1536/1024] select-none pointer-events-none">
                <Image
                  src="/images/products/new-hero.png"
                  alt="Prima Packages complete brand packaging and custom suite"
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-contain"
                  priority={false}
                />
              </div>
            </ScrollReveal>

            {/* Heading */}
            <ScrollReveal delay={0.08}>
              <div className="mt-8 sm:mt-12 text-center max-w-3xl mx-auto">
                <p className="text-sm sm:text-base font-semibold text-emerald-600">
                  Total packaging success
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight">
                  with 360° Prima Packages approach
                </h2>
                <p className="mt-3 text-sm sm:text-base text-charcoal/70 max-w-2xl mx-auto">
                  Everything your business needs from one specialized packaging manufacturer. Coordinated labels, tags, bags, and print essentials delivered across Pakistan.
                </p>
              </div>
            </ScrollReveal>

            {/* 4 Clean Benefit Pillars (PakFactory minimal open layout) */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              <ScrollReveal delay={0.1}>
                <div className="flex flex-col">
                  <div className="text-emerald-600 mb-3.5">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-charcoal">Save cost &amp; time</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal/65">
                    Combine all your packaging items with one direct supplier to eliminate multiple vendor markups, coordination delays, and extra courier fees.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="flex flex-col">
                  <div className="text-emerald-600 mb-3.5">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-charcoal">More reliability</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal/65">
                    Direct production with confirmed digital mockups and WhatsApp approvals before machine setup ensures consistent colors and zero surprises.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="flex flex-col">
                  <div className="text-emerald-600 mb-3.5">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.007.99-4.148.99-6.132A8 8 0 004 12a7.96 7.96 0 00.413 2.542m7.027 5.424A17.95 17.95 0 0112 20c-1.36 0-2.67-.153-3.92-.444" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-charcoal">More brand impact</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal/65">
                    Matching woven labels, hang tags, frosted zipper bags, and tissue wrap deliver a unified, premium unboxing experience that customers remember.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="flex flex-col">
                  <div className="text-emerald-600 mb-3.5">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-charcoal">Flexible quantities</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal/65">
                    Accessible minimum orders starting from 100 pcs or 1 roll for new collections, with wholesale volume discounts for 10,000+ unit runs.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="mt-12 text-center">
              <a
                href={`https://wa.me/923233231712?text=${encodeURIComponent('Hi, I need packaging for my brand.\nProduct: Complete Packaging Bundle\nQuantity: \nCity: ')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sage px-8 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-sage-dark transition-all shadow-md shadow-sage/20"
              >
                Ask for a packaging bundle
              </a>
            </div>
          </div>
        </div>
      </section>


    <section className="store-shell shop-section"><div className="section-heading"><div><p className="eyebrow">CUSTOM DOESN’T HAVE TO BE COMPLICATED</p><h2>Your idea. Our craft.</h2></div></div><div className="order-steps">{[['01', 'Choose your essentials', 'Add your preferred sizes and quantities to your cart.'], ['02', 'Make it your own', 'Send your request on WhatsApp. We’ll finalize your design and price together.'], ['03', 'Approve. Print. Deliver.', 'Approve your design and pay 50% advance. Clear the balance when it’s ready to dispatch.']].map(([n, title, text]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
    <FAQSection faqs={faqs} heading="A little clarity before you order." />
    <section className="store-shell home-final"><p className="eyebrow">CRAFTED IN KARACHI. SHIPPED ACROSS PAKISTAN.</p><h2>Let’s put your name on it.</h2><Link href="/catalog" className="store-button">Explore the collection</Link></section>
  </>
}
