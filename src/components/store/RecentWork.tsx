'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

const collection = [
  {
    slug: 'woven-labels',
    image: 'woven-labels-zahra.jpg',
    name: 'Woven labels',
    headline: 'Small detail.',
    accent: 'Signature style.',
    detail: 'Your logo, woven into every piece.',
    tone: 'sage',
    alt: 'Zahra couture custom woven clothing labels',
  },
  {
    slug: 'zipper-bags',
    image: 'zipper-bags-hero-v2.png',
    name: 'Slider bags',
    headline: 'Zip it.',
    accent: 'Make it yours.',
    detail: 'A beautiful first look for your brand.',
    tone: 'peach',
    alt: 'Custom printed slider zipper packaging bags',
  },
  {
    slug: 'courier-flyer-bags',
    image: 'courier-bag-hero.jpeg',
    name: 'Courier flyers',
    headline: 'Pack it.',
    accent: 'Send your brand.',
    detail: 'Custom packaging, all the way to their door.',
    tone: 'lilac',
    alt: 'Custom branded courier flyer bags',
  },
]

export function RecentWork() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  function show(index: number) {
    const element = track.current
    if (!element) return
    const next = (index + collection.length) % collection.length
    element.scrollTo({
      left: next * element.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }

  return (
    <section
      className="store-shell label-spotlight collection-promo"
      aria-label="Custom packaging from 100 pieces"
      aria-roledescription="carousel"
    >
      <div
        className="label-spotlight-track"
        ref={track}
        tabIndex={0}
        aria-label="Swipe to explore packaging, or use left and right arrow keys"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            show(active + (event.key === 'ArrowRight' ? 1 : -1))
          }
        }}
        onScroll={() => {
          const element = track.current
          if (element)
            setActive(
              Math.max(
                0,
                Math.min(
                  collection.length - 1,
                  Math.round(element.scrollLeft / element.clientWidth)
                )
              )
            )
        }}
      >
        {collection.map((item, index) => (
          <article
            className={`label-spotlight-slide promo-${item.tone}`}
            key={item.slug}
            aria-label={`${index + 1} of 3: ${item.name}`}
            aria-roledescription="slide"
            inert={active !== index}
          >
            <div className="label-spotlight-intro">
              <p className="label-spotlight-eyebrow">YOUR BRAND. YOUR PACKAGING.</p>
              <h2>
                {item.headline}{' '}
                <br />
                <em>{item.accent}</em>
              </h2>
              <p className="label-spotlight-tagline">{item.detail}</p>
              <span className="promo-minimum">MOQ 100 Pieces</span>
              <Link
                href={`/products/${item.slug}`}
                className="label-spotlight-cta"
              >
                Customize {item.name.toLowerCase()}
              </Link>
            </div>

            <div className="label-spotlight-visual">
              <div className="label-spotlight-arch">
                <Image
                  src={`/images/products/${item.image}`}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 700px) 85vw, 42vw"
                  draggable={false}
                />
              </div>
              {/* Zigzag Starburst Stamp Seal */}
              <div className="label-spotlight-seal" aria-label="MOQ 100 Pieces">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg select-none">
                  <polygon
                    points="99.0,50.0 89.2,57.8 95.3,68.8 83.3,72.2 84.6,84.6 72.2,83.3 68.8,95.3 57.8,89.2 50.0,99.0 42.2,89.2 31.2,95.3 27.8,83.3 15.4,84.6 16.7,72.2 4.7,68.8 10.8,57.8 1.0,50.0 10.8,42.2 4.7,31.2 16.7,27.8 15.4,15.4 27.8,16.7 31.2,4.7 42.2,10.8 50.0,1.0 57.8,10.8 68.8,4.7 72.2,16.7 84.6,15.4 83.3,27.8 95.3,31.2 89.2,42.2"
                    fill="#1e3524"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="34"
                    fill="none"
                    stroke="#e5eca1"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    opacity="0.6"
                  />
                  <text
                    x="50"
                    y="43"
                    textAnchor="middle"
                    fill="#e5eca1"
                    fontSize="11"
                    fontWeight="800"
                    letterSpacing="2"
                  >
                    MOQ
                  </text>
                  <text
                    x="50"
                    y="69"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="22"
                    fontWeight="900"
                    letterSpacing="-1"
                  >
                    100
                  </text>
                </svg>
              </div>
            </div>

            <div className="label-spotlight-detail">
              <span className="label-spotlight-number">0{index + 1} / 03</span>
              <h3>{item.name}</h3>
              <p>Made with your logo</p>
              <dl>
                <div>
                  <dt>Minimum order</dt>
                  <dd>100 pieces</dd>
                </div>
                <div>
                  <dt>Personalise</dt>
                  <dd>Your logo & size</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>

      <div className="label-spotlight-controls">
        <span>Swipe to discover</span>
        <div className="label-spotlight-dots">
          {collection.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`Show ${item.name}`}
              aria-current={active === index ? 'true' : undefined}
              onClick={() => show(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <span aria-live="polite" className="sr-only">
          Showing {collection[active].name}
        </span>
      </div>
    </section>
  )
}
