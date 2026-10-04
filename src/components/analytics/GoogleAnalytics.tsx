'use client'

import { useEffect, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import {
  GA_MEASUREMENT_ID,
  trackPageView,
  trackWhatsAppClick,
  trackContactClick,
  type TrackWhatsAppClickParams,
} from '@/lib/analytics'

function RouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTrackedUrl = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname) return
    const queryString = searchParams?.toString()
    const fullUrl = queryString ? `${pathname}?${queryString}` : pathname

    // Avoid duplicate firing if URL hasn't changed
    if (lastTrackedUrl.current === fullUrl) return
    lastTrackedUrl.current = fullUrl

    trackPageView(fullUrl)
  }, [pathname, searchParams])

  return null
}

export function GoogleAnalytics() {
  useEffect(() => {
    // Global safety listener for untracked WhatsApp, tel, and mailto links
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return

      // If the link has explicit component tracking, avoid duplicate event
      if (anchor.getAttribute('data-ga-tracked') === 'true') return

      const href = anchor.getAttribute('href') || ''
      const location = (anchor.getAttribute('data-ga-location') as TrackWhatsAppClickParams['buttonLocation']) || 'global_link'
      const productName = anchor.getAttribute('data-ga-product') || undefined
      const productId = anchor.getAttribute('data-ga-product-id') || undefined

      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        trackWhatsAppClick({
          buttonLocation: location,
          productName,
          productId,
          pagePath: window.location.pathname,
        })
      } else if (href.startsWith('tel:')) {
        trackContactClick({
          type: 'phone',
          value: href.replace('tel:', ''),
          buttonLocation: location,
        })
      } else if (href.startsWith('mailto:')) {
        trackContactClick({
          type: 'email',
          value: href.replace('mailto:', ''),
          buttonLocation: location,
        })
      }
    }

    document.addEventListener('click', handleGlobalClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true })
    }
  }, [])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <RouteTracker />
      </Suspense>
    </>
  )
}
