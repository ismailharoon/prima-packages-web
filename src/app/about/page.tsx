import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { HairlineDivider } from '@/components/ui/HairlineDivider'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'

export const metadata: Metadata = {
  title: 'About Our Custom Packaging Company Karachi',
  description: 'Learn about Prima Packages, a Karachi custom packaging supplier serving clothing, retail and ecommerce brands across Pakistan.',
  keywords: [
    'custom packaging company Karachi',
    'packaging supplier Pakistan',
    'Prima Packages Karachi',
    'clothing brand packaging supplier',
  ],
  alternates: {
    canonical: '/about',
  },
}

const processSteps = [
  {
    number: '01',
    title: 'Consult',
    description: 'Tell us about your brand, your products, and your packaging vision. We\'ll guide you through material, finish, and design options.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Our team creates artwork proofs tailored to your specifications. We iterate until every detail is perfect.',
  },
  {
    number: '03',
    title: 'Craft',
    description: 'Your packaging goes into production using premium materials and precision printing techniques.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Quality-checked and carefully packed, your custom packaging is delivered to your doorstep.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                Our Story
              </span>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.1]">
                The Story Behind the Craft
              </h1>
              <HairlineDivider className="my-8" />
              <p className="text-lg text-muted leading-relaxed">
                Prima Packages was born from a simple belief: the way you package your product should be just as thoughtful as the product itself.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Brand Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="relative aspect-[4/5] overflow-hidden border border-sage/20 shadow-lg">
              <Image
                src="/images/products/hero-suite.jpg"
                alt="Prima Packages Craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                Crafted for brands that care
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  We serve boutiques, Instagram and Shopify sellers, fashion houses, retail brands, and anyone in Pakistan who believes their packaging should make a statement.
                </p>
                <p>
                  From woven labels stitched into garments to hang tags that tell your brand story, from thank-you cards that build loyalty to courier bags that turn every delivery into a branded experience. We craft every piece with precision and care.
                </p>
                <p>
                  Our commitment is simple: premium materials, meticulous craftsmanship, and the flexibility to make every product truly yours. No shortcuts, no compromises.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-cream">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              How It Works
            </span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl text-charcoal">
              Our Process
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {processSteps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.1}>
              <div>
                <span className="font-serif text-5xl text-sage/20">
                  {step.number}
                </span>
                <h3 className="mt-2 font-serif text-xl text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark className="bg-dark">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">
              Ready to elevate your packaging?
            </h2>
            <p className="text-cream/60 mb-10 leading-relaxed">
              Browse our catalog or reach out directly, we&apos;d love to help you create something beautiful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalog"
                className="inline-block border-2 border-cream/30 text-cream px-10 py-3.5 text-sm font-medium uppercase tracking-[0.15em] hover:bg-cream hover:text-charcoal transition-all duration-300"
              >
                Browse Catalog
              </Link>
              <WhatsAppCTA variant="secondary">
                Chat With Us
              </WhatsAppCTA>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </>
  )
}
