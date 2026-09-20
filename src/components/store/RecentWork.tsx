'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

const labels = [
  { image: 'woven-label-3.jpg', brand: 'I.M.C', color: 'Cream & black', detail: 'A signature, woven in.', alt: 'Cream IMC woven clothing labels' },
  { image: 'woven-label-4.jpg', brand: 'Rabilyn’s Maison', color: 'Black & white', detail: 'Small label. Lasting impression.', alt: 'Rabilyn’s Maison black and white woven labels' },
  { image: 'woven-label-5.jpg', brand: 'dba.', color: 'Ivory & black', detail: 'The detail that makes it yours.', alt: 'Design by Ambreen ivory woven labels' },
]

export function RecentWork() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  function show(index: number) {
    const element = track.current
    if (!element) return
    const next = (index + labels.length) % labels.length
    element.scrollTo({ left: next * element.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <section className="store-shell label-spotlight" aria-label="Woven label collection" aria-roledescription="carousel">
    <div className="label-spotlight-track" ref={track} tabIndex={0}
      aria-label="Swipe to explore woven labels, or use left and right arrow keys"
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); show(active + (event.key === 'ArrowRight' ? 1 : -1)) } }}
      onScroll={() => { const element = track.current; if (element) setActive(Math.round(element.scrollLeft / element.clientWidth)) }}>
      {labels.map((label, index) => <article className="label-spotlight-slide" key={label.image} aria-label={`${index + 1} of 3: ${label.brand}`} aria-roledescription="slide" inert={active !== index}>
        <div className="label-spotlight-intro">
          <p className="label-spotlight-eyebrow">THE WOVEN COLLECTION</p>
          <h2>Your brand.<br /><em>In every</em><br />thread.</h2>
          <p className="label-spotlight-tagline">{label.detail}</p>
          <Link href="/products/woven-labels" className="label-spotlight-cta">Make it yours</Link>
        </div>
        <div className="label-spotlight-visual">
          <div className="label-spotlight-arch"><Image src={`/images/products/${label.image}`} alt={label.alt} fill sizes="(max-width: 700px) 85vw, 42vw" draggable={false} /></div>
          <span className="label-spotlight-seal">WOVEN<br />FOR YOU</span>
        </div>
        <div className="label-spotlight-detail"><span className="label-spotlight-number">0{index + 1} / 03</span><h3>{label.brand}</h3><p>Custom woven labels</p><dl><div><dt>Palette</dt><dd>{label.color}</dd></div><div><dt>Personalise</dt><dd>Your logo & size</dd></div></dl></div>
      </article>)}
    </div>
    <div className="label-spotlight-controls"><span>Swipe to discover</span><div className="label-spotlight-dots">{labels.map((label, index) => <button key={label.image} type="button" aria-label={`Show ${label.brand} labels`} aria-current={active === index ? 'true' : undefined} onClick={() => show(index)}><span /></button>)}</div><span aria-live="polite" className="sr-only">Showing {labels[active]?.brand} labels</span></div>
  </section>
}
