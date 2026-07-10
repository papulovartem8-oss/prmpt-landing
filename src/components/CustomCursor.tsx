import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-50 hidden lg:block"
      style={{ transform: 'translate(-50%, -50%)', mixBlendMode: 'exclusion' }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22.75" stroke="white" strokeWidth="2.5" />
        <path
          d="M24 14C24 14 20 18 20 24C20 30 24 34 24 34C24 34 28 30 28 24C28 18 24 14 24 14Z"
          fill="white"
        />
        <line x1="16" y1="24" x2="32" y2="24" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  )
}
