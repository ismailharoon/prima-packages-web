'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './PrimaMascot.module.css'

type Mood = 'waking' | 'idle' | 'happy' | 'sleeping'

/** Original Prima packaging character. SVG artwork and motion are owned by this project. */
export function PrimaMascot({ onHelp, expanded }: { onHelp: () => void; expanded: boolean }) {
  const id = useId().replace(/:/g, '')
  const [mood, setMood] = useState<Mood>('waking')
  const [paused, setPaused] = useState(false)
  const pathname = usePathname()
  const [message, setMessage] = useState('')
  const welcomed = useRef(false)
  const lastMessage = useRef(0)
  const gaze = useRef<SVGGElement>(null)
  const face = useRef<HTMLButtonElement>(null)
  const [reactionKey, setReactionKey] = useState(0)
  const [gesture, setGesture] = useState('enter')
  const lastPeek = useRef(0)
  useEffect(() => {
    if (paused || expanded || message || mood === 'sleeping') { setGesture('rest'); return }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let settle: ReturnType<typeof setTimeout> | undefined
    let turn = 0
    function perform(next: string, duration: number) {
      if (media.matches || document.hidden || face.current?.matches(':hover, :focus')) return
      setGesture(next)
      clearTimeout(settle)
      settle = setTimeout(() => setGesture('rest'), duration)
    }
    function peek() {
      if (Date.now() - lastPeek.current < 14000) return
      lastPeek.current = Date.now()
      perform('peek', 1500)
    }
    const wander = setInterval(() => {
      if (mood !== 'idle') return
      perform(turn++ % 2 === 0 ? 'stroll' : 'look', 4000)
    }, 22000)
    window.addEventListener('scroll', peek, { passive: true })
    return () => { clearInterval(wander); clearTimeout(settle); window.removeEventListener('scroll', peek) }
  }, [paused, expanded, message, mood])
  function greet() {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setMood('happy'); setReactionKey(value => value + 1)
    if (reaction.current) clearTimeout(reaction.current)
    reaction.current = setTimeout(() => setMood('idle'), 2400)
  }
  const reaction = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    setMessage('')
    if (expanded || paused) return
    let clearMessage: ReturnType<typeof setTimeout> | undefined
    let scrolled = false
    function say(text: string, priority = false) {
      if (document.hidden || (!priority && Date.now() - lastMessage.current < 18000)) return false
      lastMessage.current = Date.now()
      setMessage(text)
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setMood('happy')
        setReactionKey(value => value + 1)
        if (reaction.current) clearTimeout(reaction.current)
        reaction.current = setTimeout(() => setMood('idle'), 2400)
      }
      clearTimeout(clearMessage)
      clearMessage = setTimeout(() => setMessage(''), 6500)
      return true
    }
    const intro = setTimeout(() => {
      if (!welcomed.current) {
        welcomed.current = true
        say('Welcome to Prima Packages! 👋 Apne brand ke liye kuch special banayein.', true)
      } else if (pathname.startsWith('/products/')) {
        say('Size aur quantity choose karein. Help chahiye? Main yahin hoon!')
      } else if (pathname === '/cart') {
        say('Apni selection check kar lein. Design hum WhatsApp par final kar lenge.')
      }
    }, 1800)
    function scrollHelp() {
      if (!scrolled && window.scrollY > 350) {
        scrolled = say('Kya pack karna hai? Confused hain? WhatsApp par aa jayein!')
      }
    }
    function added() { say('Great choice! Cart mein add ho gaya. Aur kya pack karein?', true) }
    function removed() { say('No problem! Apne brand ke liye aur options explore karein.', true) }
    window.addEventListener('scroll', scrollHelp, { passive: true })
    window.addEventListener('prima:cart-added', added)
    window.addEventListener('prima:cart-removed', removed)
    return () => {
      clearTimeout(intro)
      clearTimeout(clearMessage)
      window.removeEventListener('scroll', scrollHelp)
      window.removeEventListener('prima:cart-added', added)
      window.removeEventListener('prima:cart-removed', removed)
    }
  }, [pathname, expanded, paused])
  useEffect(() => {
    if (paused) return
    let lastActivity = Date.now()
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    function settle() { setMood('idle') }
    function celebrate() {
      lastActivity = Date.now()
      if (media.matches) return
      setMood('happy'); setReactionKey(value => value + 1)
      if (reaction.current) clearTimeout(reaction.current)
      reaction.current = setTimeout(settle, 2200)
    }
    function wake() {
      lastActivity = Date.now()
      setMood(current => current === 'sleeping' ? 'idle' : current)
    }
    let frame = 0
    function follow(event: PointerEvent) {
      if (media.matches || event.pointerType === 'touch') return
      lastActivity = Date.now()
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = face.current?.getBoundingClientRect()
        if (!box) return
        const x = Math.max(-5, Math.min(5, (event.clientX - box.left - box.width / 2) / 45))
        const y = Math.max(-4, Math.min(4, (event.clientY - box.top - box.height / 2) / 60))
        gaze.current?.setAttribute('transform', `translate(${x} ${y})`)
        setMood(current => current === 'sleeping' ? 'idle' : current)
      })
    }
    window.addEventListener('pointermove', follow, { passive: true })
    const intro = setTimeout(settle, 1600)
    const sleep = setInterval(() => {
      if (!media.matches && Date.now() - lastActivity > 30000) setMood('sleeping')
    }, 5000)
    window.addEventListener('prima:cart-added', celebrate)
    window.addEventListener('pointerdown', wake, { passive: true })
    window.addEventListener('keydown', wake)
    window.addEventListener('scroll', wake, { passive: true })
    return () => {
      clearTimeout(intro); clearInterval(sleep); cancelAnimationFrame(frame); window.removeEventListener('pointermove', follow); gaze.current?.removeAttribute('transform')
      if (reaction.current) clearTimeout(reaction.current)
      window.removeEventListener('prima:cart-added', celebrate)
      window.removeEventListener('pointerdown', wake)
      window.removeEventListener('keydown', wake)
      window.removeEventListener('scroll', wake)
    }
  }, [paused])

  return <div className={styles.mascot} data-gesture={gesture} data-mood={paused ? 'idle' : mood} data-paused={paused} data-open={expanded}>
    <button type="button" ref={face} className={styles.character} onPointerEnter={greet} onFocus={greet} onClick={() => { greet(); onHelp() }} aria-label="Pip, your Prima packaging helper. Reveal or hide WhatsApp" aria-expanded={expanded} aria-controls="pip-whatsapp">
      <svg viewBox="0 0 160 164" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${id}-front`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b6c5a6"/><stop offset="1" stopColor="#829574"/></linearGradient>
          <linearGradient id={`${id}-side`}><stop stopColor="#6e8566"/><stop offset="1" stopColor="#4c674f"/></linearGradient>
        </defs>
        <ellipse className={styles.shadow} cx="80" cy="149" rx="43" ry="7" fill="#203a2b" opacity=".16"/>
        <g key={reactionKey} className={styles.body}>
          <path className={styles.arm} d="M30 91Q12 83 15 70" fill="none" stroke="#6e8566" strokeWidth="9" strokeLinecap="round"/>
          <path d="M130 89q17-2 15-17" fill="none" stroke="#4c674f" strokeWidth="9" strokeLinecap="round"/>
          <path d="m33 47 64-17 34 20-64 19Z" fill="#d5dec8"/>
          <path d="m33 47 64-17 1-18-45 9Z" fill="#bdcaaa" stroke="#8c9e7f" strokeWidth="1.5"/>
          <path className={styles.flap} d="m97 30 34 20 13-22-37-15Z" fill="#e1e7d8" stroke="#a9b99c" strokeWidth="1.5"/>
          <path d="m32 47 65 16v76l-55-11q-10-2-10-13Z" fill={`url(#${id}-front)`}/>
          <path d="m97 63 34-13v68q0 10-9 13l-25 8Z" fill={`url(#${id}-side)`}/>
          <path d="m61 54 13 3v25l-6-4-7 2Z" fill="#f4e6c6"/>
          <g ref={gaze} className={styles.gaze}><g className={styles.eyes} fill="#203a2b"><rect x="45" y="85" width="9" height="16" rx="4.5"/><rect x="76" y="90" width="9" height="16" rx="4.5"/></g>
          <g className={styles.happyEyes} fill="none" stroke="#203a2b" strokeWidth="4" strokeLinecap="round"><path d="M43 96q6-12 12 2M74 101q6-12 12 2"/></g>
          </g><ellipse cx="41" cy="104" rx="6" ry="3" fill="#efd2b3" opacity=".8"/><ellipse cx="88" cy="110" rx="6" ry="3" fill="#efd2b3" opacity=".8"/>
          <g transform="translate(105 85) rotate(-19)"><rect width="20" height="30" rx="3" fill="#fff6df"/><circle cx="10" cy="5" r="2" fill="#839473"/><path d="M6 23V11h5q7 0 0 7H6" fill="none" stroke="#4c674f" strokeWidth="2"/></g>
        </g>
        <g className={styles.sparkles} fill="#c9a35a"><path d="m23 30 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/><path d="m139 51 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/></g>
        <text className={styles.sleep} x="120" y="22" fill="#4c674f" fontSize="18" fontWeight="700">z<tspan x="138" y="12" fontSize="12">z</tspan></text>
      </svg>
      <span className={styles.tip} role="status" aria-live="polite">{message || (!paused && mood === 'sleeping' ? 'Zzz… tap to wake me' : expanded ? 'Tap WhatsApp to chat' : 'Click me to chat')}</span>
    </button>
    <button type="button" className={styles.pause} aria-label={paused ? 'Resume Pip animations' : 'Pause Pip animations'} aria-pressed={paused} onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span></button>
  </div>
}
