export const WHATSAPP_NUMBER = '923233231712'
export const PHONE_NUMBER = '+92 323 3231712'
export const ADDRESS = 'Shop # B-52, Ground Floor, Karim Center, Saddar, Karachi'
export const SITE_URL = 'https://primapackages.pk'
export const SITE_NAME = 'Prima Packages'
export const SITE_TAGLINE = 'Custom Labels. Tags. Print. Packaging.'

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/primapackages.pk?stkn=MTJybGNheG51d2p2Nw==',
  facebook: 'https://www.facebook.com/share/1LzGth2pcf/',
  tiktok: 'https://www.tiktok.com/@primapackages.pk?_r=1&_t=ZS-99al5tmNmD7',
  whatsapp: 'https://wa.me/923233231712',
}

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const ANIMATION = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.1 } },
  },
}
