import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GALLERY_IMAGES } from '../constants'

const SIZES = ['S', 'M', 'L', 'XL']

const STEPS = [
  { key: 'name', question: 'HOW SHOULD\nWE CALL YOU?', placeholder: 'Your full name', type: 'text', hint: 'We’ll use this for shipping' },
  { key: 'email', question: 'WHERE DO WE\nREACH YOU?', placeholder: 'your@email.com', type: 'email', hint: 'Order confirmation goes here' },
  { key: 'phone', question: 'YOUR\nPHONE', placeholder: '+7 (000) 000-00-00', type: 'tel', hint: 'In case we need to reach you about delivery' },
  { key: 'country', question: 'WHICH\nCOUNTRY?', placeholder: 'Country', type: 'text', hint: 'Free shipping worldwide' },
  { key: 'city', question: 'WHICH\nCITY?', placeholder: 'City', type: 'text', hint: '' },
  { key: 'address', question: 'DELIVERY\nADDRESS', placeholder: 'Street, building, apartment', type: 'text', hint: 'Full address for the courier' },
  { key: 'zip', question: 'POSTAL\nCODE', placeholder: '000000', type: 'text', hint: '' },
  { key: 'size', question: 'PICK\nYOUR SIZE', placeholder: '', type: 'size', hint: 'Oversized fit — we recommend sizing down' },
] as const

type FormData = Record<string, string>

export default function Order({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [direction, setDirection] = useState(1)
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', country: '',
    city: '', address: '', zip: '', size: 'M',
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const pieceNumber = useRef(String(Math.floor(Math.random() * 120) + 1).padStart(3, '0'))

  const current = STEPS[step]
  const progress = Math.round(((step + 1) / STEPS.length) * 100)

  useEffect(() => {
    if (!submitted && current?.type !== 'size') {
      setTimeout(() => inputRef.current?.focus(), 400)
    }
  }, [step, submitted, current?.type])

  const canProceed = current?.type === 'size' || (form[current?.key] || '').trim().length > 0

  const next = () => {
    if (!canProceed) return
    if (step < STEPS.length - 1) {
      setDirection(1)
      setStep(step + 1)
    } else {
      setSubmitted(true)
    }
  }

  const prev = () => {
    if (step > 0) {
      setDirection(-1)
      setStep(step - 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      next()
    }
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 60 : -60 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -60 : 60 }),
  }

  if (submitted) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src={GALLERY_IMAGES[2]}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)' }} />
        <motion.div
          style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 600 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 48px' }}>
            <motion.svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M5 13L9 17L19 7"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            </motion.svg>
          </div>
          <div style={{ color: '#fff', textTransform: 'uppercase', fontSize: 'clamp(36px, 8vw, 72px)', lineHeight: '95%', letterSpacing: '-0.04em', marginBottom: 24 }}>
            ORDER<br />CONFIRMED
          </div>
          <div style={{ color: '#fff', fontSize: 15, lineHeight: '170%', opacity: 0.6, marginBottom: 12 }}>
            Thank you, {form.name}. Your archive piece
          </div>
          <div style={{ color: '#fff', fontSize: 'clamp(28px, 5vw, 42px)', letterSpacing: '-0.03em', opacity: 0.9, marginBottom: 32 }}>
            #{pieceNumber.current} / 120
          </div>
          <div style={{ color: '#fff', fontSize: 13, lineHeight: '180%', opacity: 0.4, marginBottom: 48, maxWidth: 400, margin: '0 auto 48px' }}>
            Confirmation sent to {form.email}.<br />
            Production: 5-7 business days.<br />
            Free worldwide shipping.
          </div>
          <button
            onClick={onBack}
            style={{
              textTransform: 'uppercase', color: '#000', background: '#fff',
              padding: '16px 48px', fontSize: 13, letterSpacing: '0.1em',
              borderRadius: 100, border: 'none', cursor: 'pointer',
              fontFamily: 'Inter Tight, sans-serif', fontWeight: 500,
            }}
          >
            BACK TO COLLECTION
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', overflow: 'hidden' }}>
      {/* Background photo */}
      <motion.img
        src={GALLERY_IMAGES[1]}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* Gradient overlay for readability */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)' }} />

      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, padding: '24px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <button
            onClick={step === 0 ? onBack : prev}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              textTransform: 'uppercase', color: '#fff', fontSize: 13,
              letterSpacing: '0.05em', background: 'none', border: 'none',
              cursor: 'pointer', fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 500, opacity: 0.5,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="white" strokeWidth="1.5" />
            </svg>
            {step === 0 ? 'BACK' : 'PREV'}
          </button>

          <div style={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.05em', opacity: 0.4 }}>
            CHECKOUT
          </div>

          <div style={{ color: '#fff', fontSize: 14, letterSpacing: '0.02em', opacity: 0.6, minWidth: 50, textAlign: 'right' as const, fontVariantNumeric: 'tabular-nums' }}>
            {progress}%
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', height: 2, background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: '#fff' }}
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
      </div>

      {/* Main content area */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10, padding: '100px 24px 140px' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}
          >
            {/* Step counter */}
            <div style={{ color: '#fff', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.15em', opacity: 0.3, marginBottom: 16 }}>
              {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
            </div>

            {/* Question — big */}
            <div style={{
              color: '#fff', textTransform: 'uppercase',
              fontSize: 'clamp(32px, 7vw, 72px)',
              lineHeight: '100%', letterSpacing: '-0.04em',
              marginBottom: current.type === 'size' ? 40 : 48,
              whiteSpace: 'pre-line',
            }}>
              {current.question}
            </div>

            {/* Hint text */}
            {current.hint && (
              <div style={{ color: '#fff', fontSize: 13, opacity: 0.3, marginBottom: current.type === 'size' ? 24 : 32, letterSpacing: '-0.01em' }}>
                {current.hint}
              </div>
            )}

            {/* Input or size picker */}
            {current.type === 'size' ? (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
                  {SIZES.map((s) => {
                    const active = form.size === s
                    return (
                      <button
                        key={s}
                        onClick={() => setForm((p) => ({ ...p, size: s }))}
                        style={{
                          width: 'clamp(72px, 12vw, 120px)',
                          height: 'clamp(72px, 12vw, 120px)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          textTransform: 'uppercase', fontSize: 22, letterSpacing: '0.05em',
                          borderRadius: 16,
                          border: active ? '2px solid #fff' : '1px solid rgba(255,255,255,0.15)',
                          background: active ? '#fff' : 'rgba(255,255,255,0.05)',
                          color: active ? '#000' : '#fff',
                          cursor: 'pointer',
                          fontFamily: 'Inter Tight, sans-serif', fontWeight: 500,
                          transition: 'all 0.25s ease',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={next}
                  style={{
                    textTransform: 'uppercase', color: '#000', background: '#fff',
                    padding: '20px 48px', fontSize: 14, letterSpacing: '0.1em',
                    borderRadius: 100, border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter Tight, sans-serif', fontWeight: 500,
                    width: '100%', maxWidth: 400,
                  }}
                >
                  PLACE ORDER — $97
                </button>
              </div>
            ) : (
              <div>
                <input
                  ref={inputRef}
                  type={current.type}
                  value={form[current.key] || ''}
                  onChange={(e) => setForm((p) => ({ ...p, [current.key]: e.target.value }))}
                  onKeyDown={handleKeyDown}
                  placeholder={current.placeholder}
                  autoComplete="off"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    color: '#fff',
                    border: 'none',
                    borderBottom: '2px solid rgba(255,255,255,0.2)',
                    outline: 'none',
                    paddingBottom: 16,
                    fontSize: 'clamp(22px, 4vw, 40px)',
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    caretColor: '#fff',
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32 }}>
                  <button
                    onClick={next}
                    disabled={!canProceed}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      textTransform: 'uppercase', color: '#000', background: '#fff',
                      padding: '16px 40px', fontSize: 14, letterSpacing: '0.1em',
                      borderRadius: 100, border: 'none',
                      cursor: canProceed ? 'pointer' : 'default',
                      fontFamily: 'Inter Tight, sans-serif', fontWeight: 500,
                      opacity: canProceed ? 1 : 0.25,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    NEXT
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>

                  <div style={{ color: '#fff', fontSize: 13, opacity: 0.2 }}>
                    press Enter &#x23CE;
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20, padding: '0 24px 24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ color: '#fff', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.05em', opacity: 0.2 }}>
          PRMPT (R) 2026
        </div>
        <div style={{ textAlign: 'right' as const }}>
          <div style={{ color: '#fff', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em', opacity: 0.25, marginBottom: 4 }}>
            ARCHIVE COLLECTION
          </div>
          <div style={{ color: '#fff', fontSize: 24, letterSpacing: '-0.03em', opacity: 0.4 }}>
            $97
          </div>
        </div>
      </div>
    </div>
  )
}
