import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/ui/ProductCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { HomeHeroSlider } from '@/components/ui/HomeHeroSlider'
import { products } from '@/data/products'
import { SOCIAL_LINKS } from '@/lib/constants'

const faqs = [
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

export default function HomePage() {
  return (
    <>
      {/* HERO SLIDER SECTION (4 Auto-Playing Slides with Touch Swipe) */}
      <HomeHeroSlider />

      {/* 1. TRUST STRIP */}
      <section className="border-y border-charcoal/10 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-14 sm:py-6 lg:px-20">
          <div className="grid grid-cols-1 gap-3 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:gap-5 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
            <div className="flex items-center gap-3 pt-2 sm:pt-0 lg:px-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <div>
                <p className="font-serif text-sm font-semibold text-cream sm:text-base">Custom Sizes &amp; Printing</p>
                <p className="text-[11px] text-cream/60">Tailored to your brand specs</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:pl-4 lg:px-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <p className="font-serif text-sm font-semibold text-cream sm:text-base">Bulk Pricing Available</p>
                <p className="text-[11px] text-cream/60">Tiered savings on volume orders</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:pl-4 lg:px-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <p className="font-serif text-sm font-semibold text-cream sm:text-base">Nationwide Delivery</p>
                <p className="text-[11px] text-cream/60">Karachi, Lahore &amp; across Pakistan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:pl-4 lg:px-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-serif text-sm font-semibold text-cream sm:text-base">For Growing Brands</p>
                <p className="text-[11px] text-cream/60">One supplier for all packaging</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <section className="bg-warm-white py-10 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-14 lg:px-20">
          <ScrollReveal>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:mb-12">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-dark">
                  Commercial Catalog
                </p>
                <h2 className="mt-2 font-serif text-3xl tracking-tight text-charcoal sm:text-5xl">
                  Explore Our Packaging Products
                </h2>
                <p className="mt-2 text-sm sm:text-base text-charcoal/70 max-w-2xl">
                  One-stop custom printed packaging for Pakistani clothing, retail and ecommerce brands. All items custom branded with your logo.
                </p>
              </div>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-full border border-charcoal/20 bg-warm-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal hover:bg-charcoal hover:text-white transition-all shrink-0"
              >
                Browse full catalog →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
            {products.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}

            {/* Looking for something else? We can help. (Inspired by PakFactory Image 1) */}
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-charcoal/10 bg-[#ECEEF1] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-charcoal leading-snug">
                    Looking for something else? We can help.
                  </h3>
                  <p className="mt-2 text-xs text-charcoal/65 leading-relaxed">
                    Custom sizes, special finishes, rigid boxes, or bulk industrial packaging tailored to your brand.
                  </p>
                </div>

                <div className="relative my-4 aspect-[4/3] w-full select-none pointer-events-none">
                  <Image
                    src="/images/products/hero-suite-transparent-bg.png"
                    alt="Custom packaging solutions"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain drop-shadow-sm"
                  />
                </div>

                <div>
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full min-h-11 items-center justify-center rounded-xl border border-charcoal/30 bg-white/80 px-4 py-2 text-xs sm:text-sm font-semibold text-charcoal hover:bg-white hover:border-charcoal/50 transition-all shadow-sm text-center"
                  >
                    Request a custom quote
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/catalog"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-charcoal px-8 text-xs font-semibold uppercase tracking-[0.16em] text-cream hover:bg-charcoal/90 transition-colors shadow-sm"
            >
              View All Products in Catalog
            </Link>
          </div>
        </div>
      </section>

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

      {/* 4. DIRECT PACKAGING & LABEL MANUFACTURER (Inspired by PakFactory Image 3) */}
      <section className="bg-white py-10 sm:py-20 lg:py-24 border-t border-charcoal/8">
        <div className="mx-auto max-w-7xl px-5 sm:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-charcoal tracking-tight leading-tight">
                  Your direct packaging &amp; label manufacturer
                </h2>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-charcoal/75">
                  Prima Packages is your direct production partner for custom woven labels, printed hang tags, zipper bags, and apparel packaging in Saddar, Karachi. By managing every step of production in-house, our clients achieve premium, color-consistent brand packaging with ease.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-charcoal/10">
                  <div>
                    <h4 className="font-bold text-base text-charcoal">In-House Loom Weaving</h4>
                    <p className="mt-1.5 text-xs text-charcoal/65 leading-relaxed">
                      High-density electronic jacquard looms for crisp polyester labels with heat-sealed non-fraying edges.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-charcoal">Factory Direct Rates</h4>
                    <p className="mt-1.5 text-xs text-charcoal/65 leading-relaxed">
                      Zero broker or middleman margins. Transparent wholesale rates from 100 pcs up to 10,000+ units.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <h4 className="font-bold text-base text-charcoal">Manufacturing Excellence</h4>
                    <p className="mt-1.5 text-xs text-charcoal/65 leading-relaxed">
                      Strict quality inspection, confirmed digital mockups, and reliable courier delivery across Pakistan.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3.5">
                  <a
                    href={`https://wa.me/923233231712?text=${encodeURIComponent('Hi, I need packaging for my brand.\nProduct: Manufacturing Order\nQuantity: \nCity: ')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-charcoal px-7 text-xs font-semibold uppercase tracking-[0.14em] text-cream hover:bg-charcoal/90 transition-colors shadow-sm"
                  >
                    Discuss manufacturing order
                  </a>
                  <Link
                    href="/about"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-charcoal/20 bg-warm-white px-6 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal hover:bg-charcoal hover:text-white transition-all"
                  >
                    About our workshop
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Manufacturing Photo - Clean rounded image without any outer card or border (Matching PakFactory Image) */}
            <div className="lg:col-span-6">
              <ScrollReveal delay={0.12}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-sm">
                  <Image
                    src="/images/products/label-manufacturing-loom.jpg"
                    alt="Prima Packages electronic jacquard loom weaving custom labels in Karachi"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOP BY BUSINESS NEED */}
      <section className="bg-cream py-10 sm:py-20 lg:py-24 border-t border-charcoal/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-14 lg:px-20">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-dark">
                  Tailored Packaging
                </p>
                <h2 className="mt-2 font-serif text-3xl tracking-tight text-charcoal sm:text-5xl">
                  Shop Packaging by Business Need
                </h2>
                <p className="mt-2 text-sm sm:text-base text-charcoal/70 max-w-2xl">
                  Whether you are launching an apparel brand, shipping ecommerce parcels, or running a boutique, we have the right packaging combination.
                </p>
              </div>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-dark hover:text-sage transition-colors shrink-0"
              >
                Ask packaging expert →
              </a>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Clothing Brands */}
            <ScrollReveal delay={0.05}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-charcoal/10 bg-warm-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-dark">
                    Apparel &amp; Fashion
                  </p>
                  <h3 className="mt-3 font-serif text-xl text-charcoal">Clothing Brands</h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                    Essential branding elements for shirts, suits, abayas, and streetwear collections.
                  </p>
                  <div className="mt-4 space-y-1.5 border-t border-charcoal/10 pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/60">Recommended:</p>
                    <ul className="text-xs text-charcoal/85 space-y-1">
                      <li>• Polyester Woven Labels</li>
                      <li>• Custom Hang Tags</li>
                      <li>• Frosted Zipper Bags</li>
                      <li>• Custom Ribbon Tags</li>
                    </ul>
                  </div>
                </div>
                <Link
                  href="/catalog?category=Labels"
                  className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-sage-dark hover:text-sage transition-colors"
                >
                  Explore apparel packaging →
                </Link>
              </div>
            </ScrollReveal>

            {/* Ecommerce Stores */}
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-charcoal/10 bg-warm-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/75">
                    Online Sellers
                  </p>
                  <h3 className="mt-3 font-serif text-xl text-charcoal">Ecommerce Stores</h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                    Safe transit, weather resistance, and branded unboxing that drives repeat customer orders.
                  </p>
                  <div className="mt-4 space-y-1.5 border-t border-charcoal/10 pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/60">Recommended:</p>
                    <ul className="text-xs text-charcoal/85 space-y-1">
                      <li>• Printed Courier Flyer Bags</li>
                      <li>• Frosted Reusable Zipper Bags</li>
                      <li>• Thank You Cards</li>
                      <li>• Round Sealing Stickers</li>
                    </ul>
                  </div>
                </div>
                <Link
                  href="/catalog?category=Packaging"
                  className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-sage-dark hover:text-sage transition-colors"
                >
                  Explore ecommerce bags →
                </Link>
              </div>
            </ScrollReveal>

            {/* Boutiques & Retail */}
            <ScrollReveal delay={0.15}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-charcoal/10 bg-warm-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-dark">
                    Physical Stores
                  </p>
                  <h3 className="mt-3 font-serif text-xl text-charcoal">Boutiques &amp; Retail</h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                    Memorable in-store handoffs that make customers feel they bought from a luxury shop.
                  </p>
                  <div className="mt-4 space-y-1.5 border-t border-charcoal/10 pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/60">Recommended:</p>
                    <ul className="text-xs text-charcoal/85 space-y-1">
                      <li>• 250 GSM Bleach Card Carry Bags</li>
                      <li>• Printed Butter Paper</li>
                      <li>• Custom Hang Tags</li>
                      <li>• 350 GSM Business Cards</li>
                    </ul>
                  </div>
                </div>
                <Link
                  href="/catalog"
                  className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-sage-dark hover:text-sage transition-colors"
                >
                  Explore retail items →
                </Link>
              </div>
            </ScrollReveal>

            {/* Manufacturers & Bulk Buyers */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-charcoal/10 bg-warm-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/75">
                    High Volume
                  </p>
                  <h3 className="mt-3 font-serif text-xl text-charcoal">Manufacturers &amp; Bulk Buyers</h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                    High-volume production runs with dependable delivery schedules and tiered wholesale rates.
                  </p>
                  <div className="mt-4 space-y-1.5 border-t border-charcoal/10 pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/60">Recommended:</p>
                    <ul className="text-xs text-charcoal/85 space-y-1">
                      <li>• Bulk Woven Labels (1,000 to 10,000+ PCS)</li>
                      <li>• Wholesale Zipper Bags</li>
                      <li>• Custom Ribbon Rolls (Bulk)</li>
                      <li>• Bulk Courier Shipping Flyers</li>
                    </ul>
                  </div>
                </div>
                <a
                  href={`https://wa.me/923233231712?text=${encodeURIComponent('Hi, I need packaging for my brand.\nProduct: Wholesale / Bulk Packaging\nQuantity: \nCity: ')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-sage-dark hover:text-sage transition-colors"
                >
                  Get wholesale quote →
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. FEATURED POLYESTER WOVEN LABELS */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-14 lg:px-20">
          <div className="overflow-hidden rounded-3xl bg-sage text-white shadow-md grid lg:grid-cols-2">
            <div className="relative min-h-[340px] sm:min-h-[460px] lg:min-h-[560px]">
              <Image
                src="/images/products/woven-label-home-hero.png"
                alt="Custom polyester woven labels for clothing brands in Pakistan"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-6 left-6 z-10 bg-charcoal/90 text-gold text-xs font-bold uppercase tracking-[0.18em] px-3.5 py-1.5 border border-gold/40 shadow-md">
                15% OFF Current Rates
              </div>
            </div>
            <div className="flex items-center px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
              <ScrollReveal>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/70">
                  Core Garment Branding
                </p>
                <h2 className="mt-3 max-w-xl font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
                  Custom Polyester Woven Labels for Clothing Brands
                </h2>
                <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-white/80">
                  Durable polyester yarn woven directly with your custom logo for garments, neck branding, and apparel tags. Crisp finish that holds up to repeated washing and wearing.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs sm:text-sm text-white/90">
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5">
                    <span className="font-semibold text-gold block">Straight Cut</span>
                    <span className="text-[11px] text-white/70">Sewn around all 4 sides</span>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5">
                    <span className="font-semibold text-gold block">Center Fold</span>
                    <span className="text-[11px] text-white/70">Folded in center for neck seams</span>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5">
                    <span className="font-semibold text-gold block">End Fold</span>
                    <span className="text-[11px] text-white/70">Left &amp; right folded edges</span>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5">
                    <span className="font-semibold text-gold block">Heat Cut / Custom</span>
                    <span className="text-[11px] text-white/70">Sealed edges, no fraying</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/products/woven-labels"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-cream px-7 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal hover:bg-white transition-colors"
                  >
                    View sizes &amp; pricing
                  </Link>
                  <a
                    href={`https://wa.me/923233231712?text=${encodeURIComponent('Hi, I need packaging for my brand.\nProduct: Custom Polyester Woven Labels\nQuantity: \nCity: ')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-white hover:text-charcoal transition-all"
                  >
                    Get WhatsApp quote
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SIMPLE ORDERING PROCESS */}
      <section className="bg-warm-white py-10 sm:py-20 lg:py-24 border-t border-charcoal/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-14 lg:px-20">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-dark">
                How It Works
              </p>
              <h2 className="mt-2 font-serif text-3xl tracking-tight text-charcoal sm:text-5xl">
                Simple 4-Step Ordering Process
              </h2>
              <p className="mt-2 text-sm sm:text-base text-charcoal/70">
                No complex forms or delays. From product selection to doorstep delivery in four easy steps.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ScrollReveal delay={0.05}>
              <div className="h-full rounded-2xl border border-charcoal/8 bg-cream/70 p-6 shadow-sm relative">
                <span className="font-serif text-3xl font-bold text-gold">01</span>
                <h3 className="mt-4 font-serif text-xl text-charcoal">Choose Your Product</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal/70">
                  Select your desired packaging item, required size, and quantity from our catalog or request a custom bundle.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="h-full rounded-2xl border border-charcoal/8 bg-cream/70 p-6 shadow-sm relative">
                <span className="font-serif text-3xl font-bold text-gold">02</span>
                <h3 className="mt-4 font-serif text-xl text-charcoal">Share Size &amp; Logo</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal/70">
                  Send your logo artwork (PDF, AI, PNG) and dimensions directly to our team on WhatsApp for quick review.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="h-full rounded-2xl border border-charcoal/8 bg-cream/70 p-6 shadow-sm relative">
                <span className="font-serif text-3xl font-bold text-gold">03</span>
                <h3 className="mt-4 font-serif text-xl text-charcoal">Confirm Quotation &amp; Mockup</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal/70">
                  We confirm exact pricing, layout proof, and finish specs before machine setup so everything is 100% verified.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="h-full rounded-2xl border border-charcoal/8 bg-cream/70 p-6 shadow-sm relative">
                <span className="font-serif text-3xl font-bold text-gold">04</span>
                <h3 className="mt-4 font-serif text-xl text-charcoal">Production &amp; Delivery</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal/70">
                  Your order is crafted with careful quality checks and delivered straight to your door across Pakistan.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM WORK SHOWCASE (Inspired by PakFactory Image 2) */}
      <section className="bg-white py-10 sm:py-20 lg:py-24 border-t border-charcoal/8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-14 lg:px-20">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight leading-snug max-w-3xl">
              Find our works on{' '}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-2 decoration-charcoal hover:text-sage hover:decoration-sage transition-colors"
              >
                Instagram
              </a>{' '}
              or tag us{' '}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-2 decoration-charcoal hover:text-sage hover:decoration-sage transition-colors"
              >
                @primapackages.pk
              </a>{' '}
              to inspire others.
            </h2>
          </ScrollReveal>
        </div>

        {/* Instagram Post Showcase Track (Peek Carousel: First & Last cards cut in half matching reference) */}
        <div className="mt-6 sm:mt-12 relative w-full overflow-x-auto scrollbar-hide py-3">
          <div className="flex items-center justify-start lg:justify-center gap-3 sm:gap-6 min-w-max mx-auto -translate-x-[60px] sm:-translate-x-[130px] md:-translate-x-[140px] lg:translate-x-0 px-4 sm:px-0">
            {[
              {
                image: '/images/products/woven-label-1.jpeg',
                alt: 'Custom polyester woven labels on clothing',
                tag: '@primapackages.pk',
              },
              {
                image: '/images/products/zipper-bags-hero-v2.png',
                alt: 'Frosted zipper garment bags with custom branding',
                tag: '@primapackages.pk',
              },
              {
                image: '/images/products/hang-tags-hero.jpeg',
                alt: 'Custom apparel hang tags with foil stamping',
                tag: '@primapackages.pk',
              },
              {
                image: '/images/products/thank-you-cards-hero.jpeg',
                alt: 'Custom thank you cards and unboxing inserts',
                tag: '@primapackages.pk',
              },
              {
                image: '/images/products/carry-bags-hero.jpeg',
                alt: 'Custom printed bleach card shopping carry bags',
                tag: '@primapackages.pk',
              },
              {
                image: '/images/products/ribbin-tag-hero.png',
                alt: 'Custom printed satin ribbon tag rolls',
                tag: '@primapackages.pk',
              },
              {
                image: '/images/products/round-stickers-hero.jpeg',
                alt: 'Custom branded round sealing stickers',
                tag: '@primapackages.pk',
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[160px] sm:w-[250px] md:w-[270px] lg:w-[290px] xl:w-[310px] aspect-square shrink-0 block rounded-xl sm:rounded-2xl overflow-hidden border border-charcoal/10 bg-[#F6F7F9] shadow-sm hover:shadow-md transition-all"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="310px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                  <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-charcoal shadow-sm backdrop-blur-sm">
                    <span>{item.tag}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="bg-warm-white py-14 sm:py-20 lg:py-24 border-t border-charcoal/10">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:gap-9 sm:px-14 lg:px-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <ScrollReveal>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-dark">
                Frequently asked questions
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-charcoal">
                Custom packaging in Pakistan, answered clearly.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-charcoal/70">
                Have questions about minimum orders, artwork requirements, bulk discounts or delivery? Here is everything you need to know.
              </p>
              <div className="mt-8 rounded-2xl border border-charcoal/10 bg-cream p-5">
                <p className="font-serif text-base font-semibold text-charcoal">Need quick help?</p>
                <p className="text-xs text-charcoal/70 mt-1">Talk to our packaging specialists on WhatsApp for immediate guidance.</p>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-sage-dark hover:text-sage"
                >
                  Chat with us on WhatsApp →
                </a>
              </div>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5 sm:py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg sm:text-xl text-charcoal">
                  {faq.question}
                  <span className="text-sage text-xl transition-transform group-open:rotate-45 font-sans">+</span>
                </summary>
                <p className="max-w-2xl pr-8 pt-3 text-xs sm:text-sm leading-relaxed text-charcoal/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL WHATSAPP CTA */}
      <section className="bg-charcoal px-5 py-10 text-center sm:py-20 lg:py-24 border-t border-charcoal/20">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Start Your Project
            </p>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-cream">
              Ready to Create Packaging for Your Brand?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
              Share your product, required dimensions, quantity, and city on WhatsApp. Our team will guide you with an accurate, no-obligation quotation.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sage px-8 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-sage-dark transition-colors shadow-md shadow-sage/20"
              >
                Get quote on WhatsApp
              </a>
              <Link
                href="/catalog"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-cream/30 bg-white/10 px-8 text-xs font-semibold uppercase tracking-[0.14em] text-cream hover:bg-cream hover:text-charcoal transition-all"
              >
                Browse all products
              </Link>
            </div>
            <p className="mt-4 text-[11px] text-cream/50">
              Direct response · Karachi &amp; Nationwide shipping
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
