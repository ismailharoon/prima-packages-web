import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/ui/ProductCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'
import { products } from '@/data/products'

const featuredSlugs = [
  'woven-labels',
  'zipper-bags',
  'hang-tags',
  'courier-flyer-bags',
]

const featuredProducts = featuredSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is (typeof products)[number] => Boolean(product))

const steps = [
  {
    number: '01',
    title: 'Choose your packaging',
    copy: 'Pick a product, size and quantity, or ask us for a bulk recommendation.',
  },
  {
    number: '02',
    title: 'Send your logo',
    copy: 'Share your artwork and requirements directly with our team on WhatsApp.',
  },
  {
    number: '03',
    title: 'Approve & produce',
    copy: 'Confirm the final details, then we prepare and deliver your custom order.',
  },
]

const faqs = [
  {
    question: 'Which custom packaging products do you make?',
    answer:
      'We supply polyester woven labels, hang tags, zipper bags, courier flyer bags, carry bags, butter paper, thank you cards, business cards and round stickers for clothing, retail and ecommerce brands.',
  },
  {
    question: 'Do you deliver custom packaging outside Karachi?',
    answer:
      'Yes. Prima Packages is based in Saddar, Karachi and delivers custom packaging orders to customers across Pakistan.',
  },
  {
    question: 'Can I order custom sizes and bulk quantities?',
    answer:
      'Yes. Available sizes and quantities are shown on product pages. For custom dimensions or larger wholesale quantities, request a tailored quote on WhatsApp.',
  },
  {
    question: 'How do I place a custom packaging order?',
    answer:
      'Choose a product, share the required size and quantity, send your logo or artwork on WhatsApp, and confirm the final details before production.',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-[118px] sm:pt-[132px] lg:pt-[150px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(122,139,114,0.18),transparent_32%),radial-gradient(circle_at_5%_90%,rgba(184,151,126,0.16),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-9 px-5 pb-12 sm:px-6 sm:pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-8 lg:pb-24">
          <div className="order-2 lg:order-1">
            <ScrollReveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sage/25 bg-warm-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-dark backdrop-blur-sm sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                Custom packaging in Karachi, delivered across Pakistan
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h1 className="max-w-3xl font-serif text-[2.55rem] leading-[1.02] tracking-[-0.035em] text-charcoal sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                Custom packaging that makes your brand look established.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="mt-5 max-w-xl text-base leading-7 text-charcoal/68 sm:text-lg sm:leading-8">
                Custom polyester woven labels, hang tags, zipper bags, courier flyers and print essentials for clothing and ecommerce businesses.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
                <Link
                  href="/catalog"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-charcoal px-7 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-transform hover:-translate-y-0.5"
                >
                  Explore products
                </Link>
                <a
                  href="https://wa.me/923233231712?text=Hi%20Prima%20Packages%2C%20I%20need%20custom%20packaging%20for%20my%20brand.%20Please%20guide%20me."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-sage/40 bg-warm-white px-7 text-xs font-semibold uppercase tracking-[0.16em] text-sage-dark transition-colors hover:bg-sage hover:text-white"
                >
                  Get a WhatsApp quote
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-charcoal/10 pt-5 text-xs font-medium text-charcoal/65 sm:text-sm">
                <span>✓ Custom sizes</span>
                <span>✓ Bulk quantities</span>
                <span>✓ Delivery across Pakistan</span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08} className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[620px] overflow-hidden rounded-[1.75rem] bg-[#e9e4d9] shadow-[0_28px_80px_rgba(26,26,26,0.13)] sm:aspect-square lg:aspect-[4/5]">
              <Image
                src="/images/products/hero-suite-transparent-bg.png"
                alt="Custom packaging in Pakistan including woven labels, hang tags, zipper bags, courier flyers, carry bags, cards, stickers and butter paper"
                fill
                priority
                sizes="(max-width: 1024px) 94vw, 48vw"
                className="object-contain p-3 sm:p-5"
              />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-warm-white/88 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal shadow-sm backdrop-blur-md sm:bottom-6 sm:left-6 sm:text-xs">
                Labels · Tags · Bags · Print
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-charcoal/8 bg-charcoal text-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-white/10 px-4 sm:px-6 lg:px-8">
          {[
            ['One supplier', 'For complete packaging'],
            ['Made custom', 'With your branding'],
            ['Bulk-ready', 'For growing businesses'],
          ].map(([title, copy]) => (
            <div key={title} className="px-2 py-4 text-center sm:px-6 sm:py-5">
              <p className="font-serif text-sm text-cream sm:text-lg">{title}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-cream/50 sm:text-[11px]">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-warm-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-dark">
                  Start here
                </p>
                <h2 className="mt-2 font-serif text-3xl tracking-tight text-charcoal sm:text-5xl">
                  Packaging bestsellers
                </h2>
              </div>
              <Link
                href="/catalog"
                className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-sage-dark sm:inline-flex"
              >
                View all products →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4 lg:gap-7">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>

          <Link
            href="/catalog"
            className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-charcoal/15 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal sm:hidden"
          >
            View all products
          </Link>
        </div>
      </section>

      <section className="overflow-hidden bg-sage text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative min-h-[340px] sm:min-h-[500px] lg:min-h-[650px]">
            <Image
              src="/images/products/woven-label-home-hero.png"
              alt="Custom polyester woven labels for clothing brands"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/70">
                Our most requested product
              </p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                Polyester woven labels made for real clothing brands.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/72 sm:text-lg">
                Clear logo detail, durable polyester yarn and practical fold options. Select your size and quantity online, then send your artwork for confirmation.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3 text-sm text-white/85">
                <span className="rounded-xl border border-white/15 bg-white/8 px-4 py-3">Straight cut</span>
                <span className="rounded-xl border border-white/15 bg-white/8 px-4 py-3">Center fold</span>
                <span className="rounded-xl border border-white/15 bg-white/8 px-4 py-3">End fold</span>
                <span className="rounded-xl border border-white/15 bg-white/8 px-4 py-3">Custom colors</span>
              </div>
              <Link
                href="/products/woven-labels"
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-cream px-7 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal"
              >
                View sizes & pricing
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-dark">
                Simple ordering
              </p>
              <h2 className="mt-2 font-serif text-3xl tracking-tight text-charcoal sm:text-5xl">
                From idea to finished packaging
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-9 grid gap-4 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-[0_14px_40px_rgba(26,26,26,0.05)] sm:p-8">
                  <span className="font-serif text-3xl text-gold">{step.number}</span>
                  <h3 className="mt-8 font-serif text-2xl text-charcoal">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-charcoal/62">{step.copy}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-dark">
              One supplier, complete look
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-charcoal sm:text-5xl">
              Don&apos;t order every packaging item from a different vendor.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-charcoal/65">
              Match your labels, tags, cards, bags and shipping materials through one team. It saves coordination time and keeps your branding consistent.
            </p>
            <WhatsAppCTA className="mt-7 rounded-full px-7 py-4">
              Ask for a packaging bundle
            </WhatsAppCTA>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-cream shadow-[0_28px_70px_rgba(26,26,26,0.1)]">
              <Image
                src="/images/products/hero-suite.jpg"
                alt="Complete custom brand packaging set"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-charcoal/8 bg-cream py-14 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8">
          <ScrollReveal>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-dark">
                Frequently asked questions
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-charcoal sm:text-5xl">
                Custom packaging in Pakistan, explained simply.
              </h2>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5 sm:py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl text-charcoal sm:text-2xl">
                  {faq.question}
                  <span className="text-sage transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pr-8 pt-3 text-sm leading-7 text-charcoal/65 sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-5 py-14 text-center sm:py-20">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Planning a new collection?
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Tell us what you need. We&apos;ll help you choose the right packaging.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-cream/60 sm:text-base">
              Share your product, required quantity and city for a clear custom quote on WhatsApp.
            </p>
            <WhatsAppCTA variant="secondary" className="mt-8 rounded-full px-8 py-4">
              Get a custom quote
            </WhatsAppCTA>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
