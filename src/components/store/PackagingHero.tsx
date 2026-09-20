import Image from 'next/image'
import Link from 'next/link'

export function PackagingHero() {
  return <section className="store-shell packaging-hero" aria-label="Explore custom packaging">
    <article className="hero-tile hero-tile-main">
      <Image src="/images/hero/prima-suite-v1.png" alt="Prima boutique carry bag, clothing pouch, hang tags and labels in a coordinated packaging set" fill preload sizes="(max-width: 700px) 100vw, (max-width: 1100px) 65vw, 50vw" />
      <div className="tile-copy"><p className="tile-kicker">YOUR BRAND. BEAUTIFULLY PACKED.</p><h1>Small details.<br /><em>Big brand<br />energy.</em></h1><p className="tile-description">Custom packaging for<br />your next big moment.</p><Link href="/catalog" className="tile-button">Build your packaging</Link></div>
      <span className="tile-footnote">Your logo · Your colors · Made for you</span>
    </article>
    <article className="hero-tile hero-tile-zipper">
      <Image src="/images/hero/prima-zipper-v1.png" alt="Frosted Prima Packages slider zipper bag with folded clothing" fill sizes="(max-width: 700px) 100vw, 30vw" />
      <div className="tile-copy"><p className="tile-kicker">MADE TO FIT YOUR BRAND</p><h2>Zipper bags.<br />A better unboxing.</h2><Link href="/products/zipper-bags" className="tile-button">Customize your bags</Link></div>
    </article>
    <article className="hero-tile hero-tile-labels">
      <Image src="/images/recent-work/minikins-label-detail.jpg" alt="Minikins woven labels made by Prima Packages" fill sizes="(max-width: 700px) 50vw, 25vw" />
      <div className="tile-copy"><p className="tile-kicker">WOVEN WITH YOUR NAME</p><h2>Labels that<br />feel like you.</h2><Link href="/products/woven-labels" className="tile-button">Shop woven labels</Link></div>
    </article>
    <article className="hero-tile hero-tile-tags">
      <Image src="/images/recent-work/minikins-hang-cards.jpg" alt="Custom pink and cream Minikins hang cards made by Prima Packages" fill sizes="(max-width: 700px) 50vw, 25vw" />
      <div className="tile-copy"><p className="tile-kicker">THE FINISHING TOUCH</p><h2>Hang tags.<br />Stand out.</h2><Link href="/products/hang-tags" className="tile-button">Create your tags</Link></div>
    </article>
  </section>
}
