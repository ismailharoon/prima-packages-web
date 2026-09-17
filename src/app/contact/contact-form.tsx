'use client'

import { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Static form: no backend wiring yet
    // In future, this can be connected to Formspree, EmailJS, etc.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-16 bg-cream/50 border border-sage/10">
        <span className="text-4xl mb-4 block">✓</span>
        <h3 className="font-serif text-2xl text-charcoal mb-2">
          Message Received
        </h3>
        <p className="text-muted">
          Thank you for reaching out. We&apos;ll get back to you soon!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-xs uppercase tracking-[0.15em] text-charcoal font-medium mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-sage/20 bg-transparent px-4 py-3 text-sm text-charcoal placeholder:text-muted/50 focus:border-sage focus:outline-none transition-colors"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xs uppercase tracking-[0.15em] text-charcoal font-medium mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-sage/20 bg-transparent px-4 py-3 text-sm text-charcoal placeholder:text-muted/50 focus:border-sage focus:outline-none transition-colors"
          placeholder="jane@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-[0.15em] text-charcoal font-medium mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full border border-sage/20 bg-transparent px-4 py-3 text-sm text-charcoal placeholder:text-muted/50 focus:border-sage focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your project..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-sage text-warm-white py-3.5 text-sm font-medium uppercase tracking-[0.15em] hover:bg-sage-dark transition-colors duration-300"
      >
        Send Message
      </button>
    </form>
  )
}
