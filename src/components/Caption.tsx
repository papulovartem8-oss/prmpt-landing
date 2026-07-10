import { motion } from 'motion/react'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Caption() {
  return (
    <motion.div
      id="hero-caption"
      className="fixed pointer-events-none z-20 left-4 sm:left-8 top-[118px] sm:top-[160px] lg:top-[200px] w-[calc(100vw-32px)] sm:w-[calc(50vw-48px)] lg:w-[520px]"
      style={{
        mixBlendMode: 'exclusion',
        color: '#FFFFFF',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.3 }}
    >
      <div
        className="uppercase mb-4 lg:mb-6 text-[28px] sm:text-[36px] lg:text-[48px]"
        style={{ lineHeight: '100%', letterSpacing: '-0.04em' }}
      >
        ARCHIVE
        <br />
        COLLECTION
        <br />
        SS/26
      </div>
      <div
        className="mb-4 lg:mb-6"
        style={{ fontSize: '13px', lineHeight: '160%', letterSpacing: '-0.02em', opacity: 0.7 }}
      >
        Each piece is hand-selected from deadstock fabrics and archival patterns
        sourced across Tokyo, Seoul and Paris. We don't do trends — we preserve
        what was meant to last. Limited to 120 pieces worldwide, each garment
        comes with a numbered certificate of authenticity.
      </div>
      <div
        className="flex flex-row gap-6 items-center"
        style={{ fontSize: '11px', letterSpacing: '0.08em', opacity: 0.5 }}
      >
        <span className="uppercase">Deadstock fabrics</span>
        <span style={{ opacity: 0.3 }}>/</span>
        <span className="uppercase">120 pieces</span>
        <span style={{ opacity: 0.3 }}>/</span>
        <span className="uppercase">Numbered</span>
      </div>
    </motion.div>
  )
}
