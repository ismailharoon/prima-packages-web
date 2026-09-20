export function Icon({ name, className = '' }: { name: 'bag' | 'search' | 'arrow' | 'check' | 'box' | 'menu' | 'close'; className?: string }) {
  const paths = {
    bag: 'M5 7h14l1 14H4L5 7Zm3 0V6a4 4 0 0 1 8 0v1',
    search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    check: 'm5 12 4 4L19 6',
    box: 'm3 6 9-4 9 4v12l-9 4-9-4V6Zm0 0 9 4 9-4M12 10v12M7 4l10 4',
    menu: 'M4 6h16M4 12h16M4 18h16',
    close: 'm6 6 12 12M6 18 18 6',
  }
  return <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}
