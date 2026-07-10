import { motion } from 'motion/react'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Logo() {
  return (
    <motion.div
      id="hero-logo"
      className="fixed pointer-events-none z-20"
      style={{ mixBlendMode: 'exclusion' }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0 }}
    >
      <div className="top-4 left-4 sm:top-8 sm:left-8 fixed">
        <svg
          viewBox="0 0 355 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[124px] sm:w-[266px] lg:w-[355px]"
        >
          <path
            d="M0 109.5V0.5H37.5C55.5 0.5 67.5 12.5 67.5 30C67.5 47.5 55.5 59.5 37.5 59.5H20V109.5H0ZM20 43H34C41 43 47 37 47 30C47 23 41 17 34 17H20V43Z"
            fill="white"
          />
          <path
            d="M75 109.5V0.5H112.5C130.5 0.5 142.5 12.5 142.5 30C142.5 42 135.5 52 124.5 56.5L148 109.5H126L104 59.5H95V109.5H75ZM95 43H109C116 43 122 37 122 30C122 23 116 17 109 17H95V43Z"
            fill="white"
          />
          <path
            d="M155 109.5V0.5H181L205 72L229 0.5H255V109.5H235V32L213 97H197L175 32V109.5H155Z"
            fill="white"
          />
          <path
            d="M268 109.5V0.5H305.5C323.5 0.5 335.5 12.5 335.5 30C335.5 47.5 323.5 59.5 305.5 59.5H288V109.5H268ZM288 43H302C309 43 315 37 315 30C315 23 309 17 302 17H288V43Z"
            fill="white"
          />
          <circle cx="345" cy="10" r="9" stroke="white" strokeWidth="2" />
          <path
            d="M341 13V7H344C346 7 347.5 8.5 347.5 10C347.5 11 347 11.8 346 12.3L349 16H346L343.5 12.5H343V13H341ZM343 11H344C345.1 11 345.8 10.4 345.8 10C345.8 9.6 345.1 9 344 9H343V11Z"
            fill="white"
          />
        </svg>
      </div>
    </motion.div>
  )
}
