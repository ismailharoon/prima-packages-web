import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'
import { HairlineDivider } from '@/components/ui/HairlineDivider'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact Our Packaging Team in Karachi',
  description: 'Contact Prima Packages in Saddar, Karachi for custom woven labels, hang tags, zipper bags, courier flyers and branded packaging quotes.',
  keywords: [
    'packaging supplier Saddar Karachi',
    'custom packaging quote Pakistan',
    'Prima Packages contact',
    'woven labels Karachi contact',
  ],
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                Get in Touch
              </span>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">
                Let&apos;s Create Something Together
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Have a project in mind? We&apos;d love to hear about it. Reach out and let&apos;s start crafting your perfect packaging.
              </p>
            </div>
          </ScrollReveal>
          <HairlineDivider className="mt-10" />
        </div>
      </section>

      {/* Contact Content */}
      <Section className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Primary CTA + Contact Info */}
          <ScrollReveal>
            <div className="space-y-10">
              {/* WhatsApp Primary */}
              <div className="bg-cream/50 border border-sage/10 p-8">
                <h2 className="font-serif text-2xl text-charcoal mb-3">
                  The fastest way to reach us
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  We&apos;re most responsive on WhatsApp. Send us a message and we&apos;ll get back to you within a few hours.
                </p>
                <WhatsAppCTA className="w-full justify-center">
                  Message Us on WhatsApp
                </WhatsAppCTA>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-sage text-lg mt-0.5">✉</span>
                    <div>
                      <p className="text-sm font-medium text-charcoal">Email</p>
                      <a href="mailto:hello@primapackages.pk" className="text-sm text-muted hover:text-sage transition-colors">
                        hello@primapackages.pk
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-sage text-lg mt-0.5">✆</span>
                    <div>
                      <p className="text-sm font-medium text-charcoal">Phone</p>
                      <a href="tel:+923233231712" className="text-sm text-muted hover:text-sage transition-colors">
                        +92 323 3231712
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-sage text-lg mt-0.5">◎</span>
                    <div>
                      <p className="text-sm font-medium text-charcoal">Location</p>
                      <p className="text-sm text-muted">Shop # B-52, Ground Floor, Karim Center, Saddar, Karachi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact Form */}
          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-6">
                Send a Message
              </h3>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  )
}
