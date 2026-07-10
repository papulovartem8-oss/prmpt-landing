import { motion } from 'motion/react'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function HeaderNav() {
  return (
    <motion.div
      id="hero-nav"
      className="fixed z-20 pointer-events-none top-4 right-4 sm:top-8 sm:right-8 h-[30px] w-auto lg:w-auto"
      style={{ mixBlendMode: 'exclusion' }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.15 }}
    >
      <div className="flex flex-row items-center h-full gap-6 lg:gap-10">
        <span
          className="hidden lg:block uppercase text-white"
          style={{ fontSize: '13px', letterSpacing: '0.05em' }}
        >
          COLLECTION
        </span>
        <span
          className="hidden lg:block uppercase text-white"
          style={{ fontSize: '13px', letterSpacing: '0.05em' }}
        >
          LOOKBOOK
        </span>
        <span
          className="hidden lg:block uppercase text-white"
          style={{ fontSize: '13px', letterSpacing: '0.05em' }}
        >
          ABOUT
        </span>
        <div className="flex flex-row gap-5 lg:gap-8 items-center">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            className="w-6 h-6 lg:w-[28px] lg:h-[28px]"
          >
            <path d="M0 14H40" stroke="white" strokeWidth="2.5" />
            <path d="M0 26H40" stroke="white" strokeWidth="2.5" />
          </svg>
          <span
            className="text-white uppercase text-[13px] sm:text-[13px]"
            style={{ letterSpacing: '0.05em' }}
          >
            CART (0)
          </span>
        </div>
      </div>
    </motion.div>
  )
}
