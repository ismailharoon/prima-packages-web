import Link from 'next/link'
import { ProductCard } from '@/components/ui/ProductCard'
import { Icon } from '@/components/store/Icon'
import type { Product } from '@/data/products'

export function CatalogClient({ products, categories, activeCategory, query = '' }: { products: Product[]; categories: string[]; activeCategory: string | null; query?: string }) {
  function categoryHref(category: string | null) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (query) params.set('q', query)
    return `/catalog${params.size ? `?${params.toString()}` : ''}`
  }
  return <div className="store-shell catalog-page"><div className="catalog-heading"><p className="eyebrow">THE PRIMA COLLECTION</p><h1>Packaging with your name on it.</h1><p>Labels, bags and little details. Find everything your brand needs, all in one place.</p></div><form action="/catalog" role="search" className="catalog-search"><Icon name="search" /><input name="q" defaultValue={query} key={query} placeholder="Find your packaging…" aria-label="Search the catalog" maxLength={80} />{activeCategory && <input type="hidden" name="category" value={activeCategory} />}<button type="submit">Search</button></form><nav className="catalog-filters" aria-label="Filter by category">{[null, ...categories].map(category => <Link href={categoryHref(category)} key={category || 'all'} scroll={false} aria-current={activeCategory === category ? 'page' : undefined}>{category || 'All products'}</Link>)}</nav><div className="catalog-result"><h2>{query ? `Results for “${query}”` : activeCategory || 'All packaging'}</h2><span>{products.length} products</span></div>{products.length ? <div className="store-grid">{products.map(product => <ProductCard key={product.slug} product={product} />)}</div> : <div className="empty-cart"><Icon name="search" /><h2>No packaging found just yet.</h2><p>Try “labels”, “bags” or browse the full collection.</p><Link href="/catalog" className="store-button">See all products</Link></div>}</div>
}
