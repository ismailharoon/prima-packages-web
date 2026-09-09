import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'
import { ProductCard } from '@/components/ui/ProductCard'
import { HairlineDivider } from '@/components/ui/HairlineDivider'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { products } from '@/data/products'
import { siteConfig } from '@/data/site'

const valueIcons: Record<string, string> = {
  materials: '✦',
  sizing: '◇',
  branding: '❋',
  turnaround: '→',
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center pt-36 sm:pt-40 pb-16 lg:pt-40 lg:pb-20 overflow-hidden bg-cream border-b border-gold/15">
        {/* Subtle Ambient Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,151,126,0.14),transparent_65%)] pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-sage/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 xl:gap-6 items-center">
            
            {/* Left Column: Heading, Subtitle, CTAs */}
            <div className="lg:col-span-6 xl:col-span-6 text-left">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-gold/40 bg-warm-white/90 backdrop-blur-sm mb-6">
                  <span className="text-gold text-xs">✦</span>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-sage-dark font-medium">
                    Bespoke Print &amp; Packaging Atelier
                  </span>
                  <span className="text-gold text-xs">✦</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-normal text-charcoal leading-[1.14] mb-6 tracking-tight">
                  Bespoke packaging, labels &amp; tags crafted to define your brand
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-charcoal/75 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
                  Your single-source partner for custom-branded packaging in Pakistan. From custom-dimension rigid boxes and courier flyer bags to foil-stamped hang tags, woven labels, and cards, tailored precisely with your logo, colors, and premium finishes.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/catalog"
                    className="inline-flex items-center justify-center w-full sm:w-auto bg-charcoal hover:bg-charcoal/90 text-cream px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 shadow-md shadow-charcoal/10 active:scale-[0.98]"
                  >
                    Browse the Catalog
                  </Link>
                  <a
                    href="https://wa.me/923233231712?text=Hi%20Prima%20Packages%2C%20I%20would%20like%20to%20enquire%20about%20custom%20packaging%20for%20my%20brand."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto border border-charcoal/30 bg-transparent text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-cream px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98]"
                  >
                    Enquire via WhatsApp
                  </a>
                </div>
              </ScrollReveal>

              {/* Trust highlights */}
              <ScrollReveal delay={0.4}>
                <div className="mt-8 pt-6 border-t border-charcoal/10 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-charcoal/70 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-gold">✦</span> Bespoke Sizing &amp; Finishes
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold">✦</span> Crafted for Pakistani Brands
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold">✦</span> Direct WhatsApp Consultation
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Transparent Packaging Suite Showcase (Larger and balanced) */}
            <div className="order-first lg:order-none lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-start">
              <ScrollReveal delay={0.2} className="w-full flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[450px] sm:max-w-[520px] lg:max-w-[580px] xl:max-w-[640px] aspect-square flex items-center justify-center lg:ml-2 xl:ml-4">
                  <Image
                    src="/images/products/hero-suite-transparent-bg.png"
                    alt="Prima Packages - Custom Branded Packaging Suite"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, (max-width: 1280px) 580px, 640px"
                    className="object-contain object-center drop-shadow-2xl transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Intro Strip */}
      <Section className="bg-cream">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <HairlineDivider ornament />
            <p className="text-lg md:text-xl leading-relaxed text-charcoal/80 font-light">
              At Prima Packages, we believe that packaging isn&apos;t just a wrapper, it&apos;s your brand&apos;s first handshake. We craft premium labels, tags, cards, and packaging for businesses that refuse to compromise on quality.
            </p>
            <HairlineDivider ornament />
          </div>
        </ScrollReveal>
      </Section>

      {/* Featured Specialty: Custom Woven Labels Showcase */}
      <section className="relative w-full py-16 sm:py-24 bg-cream border-y border-gold/15 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-sage-dark bg-sage/10 border border-sage/20 mb-3">
                  <span className="text-gold">✦</span>
                  <span>Our Master Craft</span>
                  <span className="text-gold">✦</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight">
                  Custom Woven Labels
                </h2>
                <p className="mt-3 text-sm sm:text-base text-charcoal/70 font-light leading-relaxed">
                  High-density damask weaves with razor-sharp lettering, soft edges, and durable finishes. The signature tactile detail stitched into every luxury garment.
                </p>
              </div>

              <Link
                href="/products/woven-labels"
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-charcoal hover:text-sage transition-colors duration-300 group shrink-0"
              >
                <span>Explore Woven Labels</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* 1. Main Wide Hero Image (covering full width of the container) */}
          <ScrollReveal delay={0.15}>
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-cream/90 bg-warm-white group">
              <Image
                src="/images/products/woven-label-home-hero.png"
                alt="Prima Packages - Custom Woven Labels Production & Flatlay"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8 flex items-end justify-between text-warm-white">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium block mb-1">
                    Signature High-Density Weave
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl text-cream font-normal">
                    Precision Damask &amp; Satin Stitching
                  </h3>
                </div>
                <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.15em] text-cream/90 border border-white/25 px-3 py-1 bg-charcoal/60 backdrop-blur-sm rounded-full">
                  100% Bespoke Yarn
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* 2. Three Side-by-Side Images Below */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mt-4 sm:mt-8">
            <ScrollReveal delay={0.2}>
              <div className="group relative aspect-square w-full rounded-xl overflow-hidden bg-warm-white shadow-md border border-cream/90">
                <Image
                  src="/images/products/woven-label-home-1.jpeg"
                  alt="Custom Woven Labels - Damask Multi-Tone Grid"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-4 right-4 text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[11px] uppercase tracking-wider font-medium">Multi-Tone Damask</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="group relative aspect-square w-full rounded-xl overflow-hidden bg-warm-white shadow-md border border-cream/90">
                <Image
                  src="/images/products/woven-label-home-2.jpeg"
                  alt="Custom Woven Labels - End-Fold Fabric Labels"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-4 right-4 text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[11px] uppercase tracking-wider font-medium">End-Fold Finish</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="group relative aspect-square w-full rounded-xl overflow-hidden bg-warm-white shadow-md border border-cream/90">
                <Image
                  src="/images/products/woven-label-home-3.jpeg"
                  alt="Custom Woven Labels - Custom Dyed Brand Colors"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-4 right-4 text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[11px] uppercase tracking-wider font-medium">Custom Brand Palette</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <Section>
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              Our Products
            </span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal">
              The Catalog
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 sm:mt-16 text-center">
            <Link
              href="/catalog"
              className="inline-block border border-sage text-sage px-10 py-3.5 text-sm font-medium uppercase tracking-[0.15em] hover:bg-sage hover:text-warm-white transition-all duration-300"
            >
              View All Products
            </Link>
          </div>
        </ScrollReveal>
      </Section>

      {/* Why Prima Packages */}
      <Section className="bg-cream">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              Why Choose Us
            </span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl text-charcoal">
              Why Prima Packages
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {siteConfig.valueProps.map((prop, index) => (
            <ScrollReveal key={prop.title} delay={index * 0.1}>
              <div className="text-center">
                <span className="inline-flex items-center justify-center w-14 h-14 text-2xl text-gold mb-5">
                  {valueIcons[prop.icon] || '✦'}
                </span>
                <h3 className="font-serif text-xl text-charcoal mb-3">
                  {prop.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Social Proof / Trust */}
      <Section>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <HairlineDivider ornament />
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-charcoal italic leading-snug">
              &ldquo;The packaging you choose says everything about the brand you&apos;re building.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-muted uppercase tracking-[0.2em]">
              Prima Packages
            </p>
            <HairlineDivider ornament />
          </div>
        </ScrollReveal>
      </Section>

      {/* Closing CTA */}
      <Section dark className="bg-dark">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight mb-6">
              Have a product in mind? Let&apos;s build your packaging.
            </h2>
            <p className="text-cream/60 mb-8 sm:mb-10 leading-relaxed">
              Tell us about your brand and we&apos;ll help you create packaging that makes a lasting impression.
            </p>
            <WhatsAppCTA variant="secondary">
              Let&apos;s Talk on WhatsApp
            </WhatsAppCTA>
          </div>
        </ScrollReveal>
      </Section>
    </>
  )
}
