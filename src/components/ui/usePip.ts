'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export type PipState = 'idle' | 'happy' | 'curious' | 'sleepy' | 'talking'
const pageMessages: Record<string, string> = {
  '/': 'Hi! Mein Pip hoon. Kuch dhoond rahe ho?',
  '/products/woven-labels': 'Labels! Sirf 100 pieces se start. Size choose karein.',
  '/products/zipper-bags': 'Zipper bags! Ye mera favourite hai. Apna logo lagwayein?',
  '/cart': 'Apni selection check kar lein. Logo WhatsApp par bhejna mat bhoolna!',
}

export function usePip(expanded: boolean) {
  const pathname = usePathname()
  const [mood, setMood] = useState<PipState>('idle')
  const [paused, setPaused] = useState(false)
  const [message, setMessage] = useState('')
  const [typing, setTyping] = useState(false)
  const [gesture, setGesture] = useState('enter')
  const [reactionKey, setReactionKey] = useState(0)
  const face = useRef<HTMLButtonElement>(null)
  const pupilL = useRef<SVGCircleElement>(null)
  const pupilR = useRef<SVGCircleElement>(null)
  const dismissed = useRef(new Set<string>())
  const welcomed = useRef(false)
  const scrollHints = useRef(new Set<string>())
  const lastSpoken = useRef(0)
  const dismissCurrent = useRef<() => void>(() => {})

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let activity = Date.now(), reactionUntil = 0, lastPeek = 0, previousY = window.scrollY
    let frame = 0, turn = 0
    let typingTimer: ReturnType<typeof setTimeout> | undefined
    let messageTimer: ReturnType<typeof setTimeout> | undefined
    let gestureTimer: ReturnType<typeof setTimeout> | undefined
    let currentKind = 'page'
    const key = `prima:pip-dismissed:${pathname}`
    try { if (sessionStorage.getItem(key)) dismissed.current.add(pathname) } catch { /* Session memory is the fallback. */ }
    setMessage(''); setTyping(false); setMood(expanded ? 'talking' : 'idle')
    function pupils(x: number, y: number) {
      for (const pupil of [pupilL.current, pupilR.current]) pupil?.setAttribute('transform', `translate(${x} ${y})`)
    }
    function react(state: PipState, duration = 2400) {
      if (paused || expanded || document.hidden) return
      activity = Date.now(); reactionUntil = Date.now() + duration
      setMood(state); setReactionKey(value => value + 1)
    }
    function say(text: string, kind = 'page', state: PipState = 'talking') {
      if (paused || expanded || document.hidden || dismissed.current.has(`${pathname}:${kind}`) || (kind === 'page' && dismissed.current.has(pathname))) return false
      if (kind !== 'cart' && Date.now() - lastSpoken.current < 14000) return false
      currentKind = kind
      lastSpoken.current = Date.now()
      clearTimeout(typingTimer); clearTimeout(messageTimer)
      setTyping(true); setMessage(''); react(state, 7500)
      typingTimer = setTimeout(() => {
        setTyping(false); setMessage(text)
        messageTimer = setTimeout(() => setMessage(''), 6500)
      }, 1000)
      return true
    }
    dismissCurrent.current = () => {
      dismissed.current.add(`${pathname}:${currentKind}`)
      if (currentKind === 'page') {
        dismissed.current.add(pathname)
        try { sessionStorage.setItem(key, '1') } catch { /* Still dismissed in this mounted session. */ }
      }
      clearTimeout(typingTimer); clearTimeout(messageTimer)
      setMessage(''); setTyping(false); setMood('idle'); reactionUntil = 0
    }
    function wake() { activity = Date.now(); setMood(current => current === 'sleepy' ? 'idle' : current) }
    function follow(event: PointerEvent) {
      wake()
      if (paused || expanded || media.matches) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = face.current?.getBoundingClientRect()
        if (!box) return
        const angle = Math.atan2(event.clientY - box.top - box.height / 2, event.clientX - box.left - box.width / 2)
        pupils(Math.cos(angle) * 3, Math.sin(angle) * 3)
      })
    }
    function scroll() {
      wake()
      if (window.scrollY > 350 && !scrollHints.current.has(pathname) && say('Kya pack karna hai? Confused hain? WhatsApp par aa jayein!', 'scroll')) scrollHints.current.add(pathname)
      if (paused || expanded || media.matches) return
      pupils(0, window.scrollY > previousY ? 3 : -3); previousY = window.scrollY
      if (Date.now() - lastPeek > 14000 && Date.now() > reactionUntil) {
        lastPeek = Date.now(); setGesture('peek')
        clearTimeout(gestureTimer); gestureTimer = setTimeout(() => setGesture('rest'), 1500)
      }
    }
    function curious(event: Event) {
      if ((event.target as Element)?.closest?.('[data-pip-product]')) react('curious')
    }
    function added() { say('Great choice! Cart mein add ho gaya. Aur kya pack karein?', 'cart', 'happy'); react('happy') }
    function removed() { say('No problem! Apne brand ke liye aur options explore karein.', 'cart', 'curious'); react('curious') }
    function motionChange() { if (media.matches) { pupils(0, 0); setGesture('rest') } }
    const intro = setTimeout(() => setGesture('rest'), 1600)
    const welcomeAt = Date.now() + 1800
    const hintAt = Date.now() + 20000
    let hintShown = false
    const tick = setInterval(() => {
      if (paused || expanded || document.hidden) return
      if (!welcomed.current && Date.now() >= welcomeAt && say('Welcome to Prima Packages! 👋 Apne brand ke liye kuch special banayein.', 'welcome', 'happy')) welcomed.current = true
      if (!hintShown && Date.now() >= hintAt) {
        hintShown = say(pageMessages[pathname] || (pathname.startsWith('/products/') ? 'Size aur quantity choose karein. Packaging help chahiye?' : 'Kya pack karna hai? Pip se packaging options explore karein!'))
      }
      if (Date.now() - activity >= 30000) { setMood('sleepy'); setGesture('rest'); pupils(0, 0) }
      else if (Date.now() > reactionUntil) setMood('idle')
    }, 1000)
    const wander = setInterval(() => {
      if (paused || expanded || media.matches || document.hidden || Date.now() - activity >= 25000 || Date.now() < reactionUntil || face.current?.matches(':hover, :focus')) return
      setGesture(turn++ % 2 ? 'look' : 'stroll')
      clearTimeout(gestureTimer); gestureTimer = setTimeout(() => setGesture('rest'), 4000)
    }, 22000)
    window.addEventListener('pointermove', follow, { passive: true })
    window.addEventListener('pointerdown', follow, { passive: true })
    window.addEventListener('keydown', wake)
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('pointerover', curious)
    window.addEventListener('focusin', curious)
    window.addEventListener('prima:cart-added', added)
    window.addEventListener('prima:cart-removed', removed)
    media.addEventListener('change', motionChange)
    return () => {
      clearTimeout(intro); clearTimeout(typingTimer); clearTimeout(messageTimer); clearTimeout(gestureTimer)
      clearInterval(tick); clearInterval(wander); cancelAnimationFrame(frame); pupils(0, 0)
      window.removeEventListener('pointermove', follow); window.removeEventListener('pointerdown', follow)
      window.removeEventListener('keydown', wake); window.removeEventListener('scroll', scroll)
      window.removeEventListener('pointerover', curious); window.removeEventListener('focusin', curious)
      window.removeEventListener('prima:cart-added', added); window.removeEventListener('prima:cart-removed', removed)
      media.removeEventListener('change', motionChange)
    }
  }, [pathname, expanded, paused])
  return { mood: paused ? 'idle' : mood, paused, setPaused, message, typing, gesture, reactionKey, face, pupilL, pupilR, dismiss: () => dismissCurrent.current() }
}
