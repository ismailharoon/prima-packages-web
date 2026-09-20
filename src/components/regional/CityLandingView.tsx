'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { HairlineDivider } from '@/components/ui/HairlineDivider'
import { ProductCard } from '@/components/ui/ProductCard'
import { SOCIAL_LINKS, PHONE_NUMBER, SITE_URL } from '@/lib/constants'
import type { RegionalCity } from '@/data/regional'
import type { Product } from '@/data/products'

interface CityLandingViewProps {
  city: RegionalCity
  products: Product[]
}

export function CityLandingView({ city, products }: CityLandingViewProps) {
  const whatsappUrl = `${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(
    `Salam Prima Packages team,\nI am reaching out from ${city.cityName} regarding custom packaging and labels for my business.\n\nPlease share your product catalog, minimum order quantities, and delivery times for ${city.cityName}.`
  )}`

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Catalog",
        "item": `${SITE_URL}/catalog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": city.cityName,
        "item": `${SITE_URL}/${city.slug}`
      }
    ]
  };

  const isKarachi = city.cityName.toLowerCase() === 'karachi';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the delivery time to ${city.cityName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We offer ${city.localDeliveryTime.toLowerCase()} to ${city.cityName}. Please confirm your exact location when placing the order for accurate tracking.`
        }
      },
      {
        "@type": "Question",
        "name": `What products can I order for my ${city.cityName} brand?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can order our complete range of packaging products including custom woven labels, zipper bags, hang tags, butter paper, carry bags, and more. All are customized for ${city.cityName} based businesses.`
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum order quantity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our minimum order quantity starts from just 100 pieces for most labels and tags, designed specifically to support emerging and growing brands."
        }
      },
      isKarachi ? {
        "@type": "Question",
        "name": "Can I visit your shop in Karachi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can visit our shop at Karim Center, Saddar, Karachi to check physical samples and discuss your packaging requirements."
        }
      } : {
        "@type": "Question",
        "name": `Do you deliver to ${city.cityName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, we provide secure and fast delivery to ${city.cityName} using reliable nationwide courier services.`
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* 1. Regional Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-[#F6E7D5] border-b border-charcoal/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-charcoal/60 mb-5">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-charcoal transition-colors">Catalog</Link>
            <span>/</span>
            <span className="text-charcoal font-semibold">{city.cityName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal text-cream px-3.5 py-1 text-[11px] font-semibold tracking-wide uppercase shadow-sm">
                📍 {city.heroBadge}
              </span>

              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-charcoal">
                {city.title}
              </h1>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-charcoal/80 max-w-2xl">
                {city.subheadline} {city.heroDescription}
              </p>

              {/* Fast Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-6 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-[0.97]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Get {city.cityName} Quote on WhatsApp
                </a>
                <Link
                  href="/catalog"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-charcoal/20 bg-warm-white/90 px-6 text-xs font-semibold uppercase tracking-wider text-charcoal hover:bg-warm-white transition-colors"
                >
                  Explore Catalog
                </Link>
              </div>

              {/* Local Logistics Callout */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-charcoal/70 border-t border-charcoal/15 pt-4">
                <span>✓ Direct Factory Rates</span>
                <span>✓ Free Digital Artwork Proof</span>
                <span>✓ {city.localDeliveryTime}</span>
              </div>
            </div>

            {/* Right: Suite Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 shadow-lg bg-warm-white">
                <Image
                  src="/images/products/hero-suite.jpg"
                  alt={`Custom packaging manufactured for ${city.cityName} apparel brands`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. City Highlights & Advantages */}
      <section className="bg-warm-white py-12 sm:py-16 border-b border-charcoal/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
              Built for {city.cityName} Garment &amp; Retail Hubs
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              Why Brands in {city.cityName} Choose Prima Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {city.highlightFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-charcoal/10 bg-[#FAF8F4] p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-4 font-serif text-lg font-bold text-charcoal">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Industry Hubs Served */}
          <div className="mt-10 rounded-2xl bg-cream border border-charcoal/10 p-6">
            <h4 className="font-serif text-base font-bold text-charcoal mb-3">
              Key Sectors &amp; Districts We Supply in {city.cityName}:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {city.targetAudience.map((target, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-charcoal/80 bg-warm-white p-3 rounded-xl border border-charcoal/6">
                  <span className="text-sage font-bold">✔</span>
                  <span>{target}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products for this city */}
      <Section className="py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
              Recommended Packaging
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              Top Products for {city.cityName} Clients
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-semibold uppercase tracking-wider text-sage-dark hover:text-sage transition-colors"
          >
            View all 10 products
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
          {products.map((product, idx) => (
            <ProductCard key={product.slug} product={product} index={idx} />
          ))}
        </div>
      </Section>

      {/* 4. Local Bottom WhatsApp Conversion Banner */}
      <section className="bg-charcoal px-5 py-12 sm:py-16 text-center text-cream border-t border-charcoal/20">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {city.cityName} Packaging Inquiries
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight text-cream">
            Ready to Elevate Your Brand in {city.cityName}?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-cream/75">
            Share your requirements, required quantities, and artwork on WhatsApp. We provide prompt quotes and free digital mockups for {city.cityName} businesses.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-sage px-8 text-xs font-bold uppercase tracking-wider text-white hover:bg-sage-dark transition-colors shadow-md"
            >
              Contact on WhatsApp ({PHONE_NUMBER})
            </a>
            <Link
              href="/catalog"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-cream/30 bg-white/10 px-8 text-xs font-semibold uppercase tracking-wider text-cream hover:bg-cream hover:text-charcoal transition-all"
            >
              Browse Complete Catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
