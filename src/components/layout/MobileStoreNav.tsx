'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useCart} from '@/components/store/CartProvider'
import {Icon} from '@/components/store/Icon'
export function MobileStoreNav(){
 const path=usePathname(),{lines}=useCart()
 if(path.startsWith('/products/'))return null
 return <nav className="mobile-shop-nav" aria-label="Mobile shop navigation">{([
  ['Home','/','home'],['Shop','/catalog','box'],['Cart','/cart','bag'],['Help','/contact','help'],
 ] as const).map(([label,href,icon])=><Link href={href} key={href} aria-current={path===href?'page':undefined}><span className="mobile-nav-icon"><Icon name={icon}/>{label==='Cart'&&lines.length>0&&<b>{lines.length}</b>}</span><span>{label}</span></Link>)}</nav>
}
