import { motion } from 'motion/react'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function ProductInfo({ onOrder }: { onOrder: () => void }) {
  return (
    <motion.div
      id="outro-info"
      className="fixed pointer-events-none z-20
        left-0 right-0 bottom-12 flex flex-col items-center
        lg:right-8 lg:left-auto lg:bottom-20 lg:w-[330px]"
      style={{ mixBlendMode: 'exclusion' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease, delay: 0.45 }}
    >
      <div className="flex flex-col items-start w-[252px] lg:w-full mb-3 lg:mb-6">
        <div className="relative w-5 h-5 lg:w-[30px] lg:h-[30px] mb-2">
          <svg viewBox="0 0 40 40" fill="none" className="absolute inset-0 w-full h-full">
            <circle cx="20" cy="20" r="18.75" stroke="white" strokeWidth="2.5" />
          </svg>
          <span
            id="circle-symbol"
            className="absolute inset-0 flex items-center justify-center text-white uppercase text-[10px] lg:text-[15px]"
            style={{ letterSpacing: '-0.04em' }}
          >
            8
          </span>
        </div>
        <div
          className="text-white uppercase text-center lg:text-left text-[20px] lg:text-[30px]"
          style={{ lineHeight: '100%', letterSpacing: '-0.04em' }}
        >
          ARCHIVE COLLECTION
          <br />
          &ldquo;PROMPT&rdquo;
        </div>
        <div
          className="text-white mt-2 lg:mt-3 text-center lg:text-left"
          style={{ fontSize: '11px', lineHeight: '150%', letterSpacing: '-0.01em', opacity: 0.5 }}
        >
          Oversized silhouette / Japanese cotton
          <br />
          Available sizes: S M L XL
        </div>
      </div>
      <div
        className="text-white text-center text-[60px] lg:text-[80px] mb-3 lg:mb-4"
        style={{ lineHeight: '100%', letterSpacing: '-0.04em' }}
      >
        $97
      </div>
      <button
        onClick={onOrder}
        className="pointer-events-auto uppercase text-black bg-white px-8 lg:px-12 py-3 lg:py-4 w-[252px] lg:w-full"
        style={{
          fontSize: '13px',
          letterSpacing: '0.1em',
          borderRadius: '100px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Inter Tight, sans-serif',
          fontWeight: 500,
          mixBlendMode: 'exclusion',
        }}
      >
        ADD TO CART
      </button>
    </motion.div>
  )
}
