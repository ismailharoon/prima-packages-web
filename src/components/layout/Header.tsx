'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/components/store/CartProvider'
import { PHONE_NUMBER, WHATSAPP_NUMBER, NAV_ITEMS } from '@/lib/constants'
import { Icon } from '@/components/store/Icon'

export function Header() {
  const { lines } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  return <header className="store-header">
    <div className="header-utility"><div className="store-shell"><a href={`tel:+${WHATSAPP_NUMBER}`}>Call us: {PHONE_NUMBER}</a><nav aria-label="Main navigation">{NAV_ITEMS.map(item => <Link href={item.href} key={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}</nav></div></div><div className="announcement">Made for your brand. Delivered across Pakistan. <span>50% advance · Balance before dispatch</span></div>
    <div className="store-shell header-main">
      <Link href="/" aria-label="Prima Packages home" className="store-logo"><Image src="/images/prima-logo-horizontal.png" alt="Prima Packages" width={155} height={54} preload sizes="155px" /></Link>
      <form action="/catalog" role="search" className="header-search"><input name="q" aria-label="Search packaging" placeholder="Search labels, bags, tags & more…" maxLength={80} /><button type="submit" aria-label="Search"><Icon name="search" /></button></form>
      <div className="header-actions"><Link className="header-help" href="/contact">Need a hand?<strong>Talk to our team</strong></Link><Link href="/cart" className="cart-link" aria-label={`View cart, ${lines.length} selections`}><Icon name="bag" /><span className="cart-word">Cart</span><span className="cart-count">{lines.length}</span></Link><button className="mobile-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-store-menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button></div>
    </div>
    {menuOpen && <nav id="mobile-store-menu" className="mobile-store-menu" aria-label="Mobile navigation" onKeyDown={event => { if (event.key === "Escape") setMenuOpen(false) }}>{NAV_ITEMS.map(item => <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}<Link href="/products/woven-labels" onClick={() => setMenuOpen(false)}>Woven labels</Link><Link href="/products/hang-tags" onClick={() => setMenuOpen(false)}>Hang tags</Link><Link href="/products/zipper-bags" onClick={() => setMenuOpen(false)}>Zipper bags</Link><form action="/catalog" role="search"><input name="q" aria-label="Search packaging in menu" placeholder="Search packaging" /><button type="submit">Search</button></form></nav>}
    <nav className="store-shell category-nav" aria-label="Shop navigation">
      {[['Shop all', '/catalog'], ['Woven labels', '/products/woven-labels'], ['Hang tags', '/products/hang-tags'], ['Zipper bags', '/products/zipper-bags'], ['Carry bags', '/products/carry-bags'], ['Cards', '/catalog?category=Cards'], ['Stickers', '/catalog?category=Stickers'], ['Our story', '/about']].map(([label, href]) => <Link key={label} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}
    </nav>
  </header>
}

