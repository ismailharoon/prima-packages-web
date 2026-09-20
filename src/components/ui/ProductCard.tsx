import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/data/products'

export function ProductCard({ product }: { product: Product; index?: number }) {
  const size = product.sizes.reduce((lowest, current) => current.price < lowest.price ? current : lowest, product.sizes[0])
  return <article className="shop-card">
    <Link href={`/products/${product.slug}`} className="shop-card-photo" tabIndex={-1} aria-hidden="true">
      <Image src={product.heroImage} alt="" fill sizes="(max-width: 600px) 46vw, (max-width: 1000px) 30vw, 280px" className="object-cover" />
      {product.discountBadge && <span className="shop-badge">{product.discountBadge}</span>}
      {product.quoteOnly && <span className="shop-badge neutral">Made to size</span>}
    </Link>
    <div className="shop-card-body"><span className="eyebrow">{product.category}</span><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><p className="card-moq">{product.moq || 'Custom printed for your brand'}</p>
      <div className="card-price">{product.quoteOnly ? <strong>Custom quote</strong> : <><span className="from-label">From </span><strong>{formatPrice(size.price)}</strong><span className="price-unit"> / {size.quantity || 'piece'}</span></>}</div>
      <Link className="card-button" href={`/products/${product.slug}`}>{product.quoteOnly ? 'Customize & enquire' : 'Choose options'}</Link>
    </div>
  </article>
}
