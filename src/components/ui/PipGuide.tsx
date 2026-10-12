'use client'

import { useEffect, useRef, useState } from 'react'
import { PrimaMascot } from './PrimaMascot'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { trackWhatsAppClick } from '@/lib/analytics'

const suggestions: Record<string, string> = {
  Clothing: 'Woven labels + hang tags', Jewelry: 'Hang tags + thank you cards',
  Bakery: 'Round stickers + thank you cards', Other: 'Packaging advice from our team',
}
const chip = 'min-h-11 rounded-xl border border-sage/40 bg-white px-4 py-2 text-sm font-semibold text-charcoal hover:bg-sage/15 focus-visible:outline-2 focus-visible:outline-sage-dark'

export function PipGuide() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const [answers, setAnswers] = useState({ type: '', product: '', qty: '', logo: '', city: '' })
  const panel = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  function go(next: number) { setTyping(true); setStep(next) }
  function close() { setOpen(false); opener.current?.focus() }
  useEffect(() => {
    if (!open) return
    heading.current?.focus()
    setTyping(true)
    const timer = setTimeout(() => setTyping(false), 1000)
    return () => clearTimeout(timer)
  }, [open, step])
  const summary = `Hi, mujhe packaging chahiye.\nBusiness: ${answers.type}\nProduct: ${answers.product}\nQuantity: ${answers.qty}\nLogo: ${answers.logo}\nCity: ${answers.city.trim()}`
  return <div className="whatsapp-widget fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
    {open && <div ref={panel} id="pip-guide" role="dialog" aria-labelledby="pip-guide-title"
      className="absolute bottom-full right-0 mb-3 w-[min(360px,calc(100vw-32px))] max-h-[calc(100dvh-210px)] overflow-y-auto rounded-2xl border border-sage/30 bg-warm-white p-4 text-charcoal shadow-2xl"
      onKeyDown={event => {
        if (event.key === 'Escape') { event.stopPropagation(); close() }
        if (event.key !== 'Tab') return
        const nodes = panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input,a[href]')
        if (!nodes?.length) return
        const first = nodes[0], last = nodes[nodes.length - 1]
        if (event.shiftKey && (document.activeElement === first || document.activeElement === heading.current)) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }}>
      <div className="flex items-center justify-between gap-2">
        <h2 ref={heading} tabIndex={-1} id="pip-guide-title" className="text-lg font-bold">Let’s pack your brand!</h2>
        <button type="button" className={chip} aria-label="Close packaging guide" onClick={close}>×</button>
      </div>
      <p className="mb-4 text-xs text-charcoal/70">Pip’s packaging guide · Step {step + 1} of 5</p>
      <div role="status" aria-live="polite" className="mb-3 text-sm font-semibold">
        {typing ? 'Pip is typing…' : ['Aap kya bech rahe hain?', `Suggested: ${answers.product}. Kitne pieces chahiye?`, 'Logo ready hai?', 'Delivery kis city mein chahiye?', 'Sab theek hai? Apni request check kar lein.'][step]}
      </div>
      {!typing && <>
        {step === 0 && <div className="flex flex-wrap gap-2">{Object.keys(suggestions).map(type => <button className={chip} key={type} onClick={() => { setAnswers(value => ({ ...value, type, product: suggestions[type] })); go(1) }}>{type}</button>)}</div>}
        {step === 1 && <><p className="mb-3 text-xs">Final sizes, quantities aur price hamari team confirm karegi.</p><div className="flex flex-wrap gap-2">{['100', '500', '1000'].map(qty => <button className={chip} key={qty} onClick={() => { setAnswers(value => ({ ...value, qty })); go(2) }}>{qty}</button>)}</div></>}
        {step === 2 && <div className="flex flex-wrap gap-2">{['Haan, bhejta hoon', 'Abhi nahi'].map(logo => <button className={chip} key={logo} onClick={() => { setAnswers(value => ({ ...value, logo })); go(3) }}>{logo}</button>)}</div>}
        {step === 3 && <form onSubmit={event => { event.preventDefault(); if (answers.city.trim()) go(4) }}>
          <label htmlFor="pip-city" className="block text-sm font-semibold">City</label>
          <input id="pip-city" required maxLength={80} value={answers.city} onChange={event => setAnswers(value => ({ ...value, city: event.target.value }))} placeholder="e.g. Karachi" className="my-2 w-full rounded-lg border border-sage p-3 text-base"/>
          <button className={chip} disabled={!answers.city.trim()}>View summary</button>
        </form>}
        {step === 4 && <>
          <dl className="space-y-2 rounded-xl bg-sage/10 p-3 text-sm">{[['Business', answers.type], ['Products', answers.product], ['Quantity', answers.qty], ['Logo', answers.logo], ['City', answers.city]].map(([label, value]) => <div key={label}><dt className="font-bold">{label}</dt><dd className="break-words">{value}</dd></div>)}</dl>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`} target="_blank" rel="noopener noreferrer" data-ga-tracked="true" onClick={() => trackWhatsAppClick({ buttonLocation: 'pip_guided_chat' })} className="mt-3 block rounded-xl bg-[#167c42] px-4 py-3 text-center font-bold text-white">WhatsApp pe bhejo</a>
          <p className="mt-2 text-xs">WhatsApp par summary khulegi. Send aap khud karein.</p>
        </>}
      </>}
      {step > 0 && <button type="button" className="mt-3 min-h-11 text-sm font-semibold underline" onClick={() => go(step - 1)}>Back</button>}
    </div>}
    <PrimaMascot expanded={open} onHelp={() => { if (open) close(); else { opener.current = document.activeElement as HTMLElement; setTyping(true); setOpen(true) } }}/>
  </div>
}
