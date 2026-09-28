'use client'
import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  if (path === '/admin' || path.startsWith('/admin/')) return <main id="main-content">{children}</main>
  return <><Header /><main id="main-content" className="flex-1">{children}</main><Footer /><FloatingWhatsApp /></>
}
