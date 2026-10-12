'use client'

import { useId } from 'react'
import { usePip } from './usePip'
import styles from './PrimaMascot.module.css'

export function PrimaMascot({ onHelp, expanded }: { onHelp: () => void; expanded: boolean }) {
  const id = useId().replace(/:/g, '')
  const { mood, paused, setPaused, message, typing, gesture, reactionKey, face, pupilL, pupilR, dismiss } = usePip(expanded)
  return <div className={styles.mascot} data-gesture={gesture} data-mood={paused ? 'idle' : mood} data-paused={paused} data-open={expanded}>
    <button type="button" ref={face} className={styles.character} onClick={onHelp} aria-label="Pip, open packaging guide" aria-expanded={expanded} aria-controls="pip-guide">
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
          <g className={styles.brows} fill="none" stroke="#203a2b" strokeWidth="3.5" strokeLinecap="round">
            <path className={styles.browLeft} d="M42 77Q49 73 56 78"/>
            <path className={styles.browRight} d="M73 82Q80 78 87 83"/>
          </g>
          <g><g className={styles.eyes}><ellipse cx="49" cy="93" rx="8" ry="11" fill="#fff6df"/><ellipse cx="80" cy="98" rx="8" ry="11" fill="#fff6df"/><circle ref={pupilL} data-pupil="left" cx="49" cy="93" r="4" fill="#203a2b"/><circle ref={pupilR} data-pupil="right" cx="80" cy="98" r="4" fill="#203a2b"/></g>
          <g className={styles.happyEyes} fill="none" stroke="#203a2b" strokeWidth="4" strokeLinecap="round"><path d="M43 96q6-12 12 2M74 101q6-12 12 2"/></g>
          </g><ellipse cx="41" cy="104" rx="6" ry="3" fill="#efd2b3" opacity=".8"/><ellipse cx="88" cy="110" rx="6" ry="3" fill="#efd2b3" opacity=".8"/>
          <g transform="translate(105 85) rotate(-19)"><rect width="20" height="30" rx="3" fill="#fff6df"/><circle cx="10" cy="5" r="2" fill="#839473"/><path d="M6 23V11h5q7 0 0 7H6" fill="none" stroke="#4c674f" strokeWidth="2"/></g>
        </g>
        <g className={styles.sparkles} fill="#c9a35a"><path d="m23 30 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/><path d="m139 51 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/></g>
        <text className={styles.sleep} x="120" y="22" fill="#4c674f" fontSize="18" fontWeight="700">z<tspan x="138" y="12" fontSize="12">z</tspan></text>
      </svg>
    </button>
    {!expanded && <div className={styles.tip} role="status" aria-live="polite">
      {typing ? <span aria-label="Pip is typing" className={styles.typing}>•••</span> : message || (mood === 'sleepy' ? 'Zzz… tap to wake me' : 'Click me to chat')}
      {(message || typing) && <button type="button" className={styles.dismiss} onClick={dismiss} aria-label="Dismiss Pip hint">×</button>}
    </div>}
    <button type="button" className={styles.pause} aria-label={paused ? 'Resume Pip animations' : 'Pause Pip animations'} aria-pressed={paused} onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span></button>
  </div>
}
