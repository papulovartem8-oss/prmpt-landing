import { useEffect, useRef, useCallback, useState } from 'react'
import { VIDEO_LEFT, VIDEO_RIGHT } from '../constants'

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export default function VideoContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLVideoElement>(null)
  const rightRef = useRef<HTMLVideoElement>(null)
  const activeSideRef = useRef<'left' | 'right'>('right')
  const mouseXRef = useRef(0)
  const rafRef = useRef(0)
  const [loaded, setLoaded] = useState(false)
  const loadCountRef = useRef(0)

  const onVideoReady = useCallback(() => {
    loadCountRef.current++
    if (loadCountRef.current >= 2) setLoaded(true)
  }, [])

  useEffect(() => {
    const left = leftRef.current
    const right = rightRef.current
    if (!left || !right) return

    if (isTouchDevice()) {
      right.style.display = 'block'
      left.style.display = 'none'

      const onRightEnd = () => {
        right.style.display = 'none'
        left.style.display = 'block'
        left.currentTime = 0
        left.play()
      }
      const onLeftEnd = () => {
        left.style.display = 'none'
        right.style.display = 'block'
        right.currentTime = 0
        right.play()
      }

      right.addEventListener('ended', onRightEnd)
      left.addEventListener('ended', onLeftEnd)
      right.currentTime = 0
      right.play()

      return () => {
        right.removeEventListener('ended', onRightEnd)
        left.removeEventListener('ended', onLeftEnd)
      }
    }

    const onMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      const w = window.innerWidth
      const cx = w / 2
      const deadZone = Math.max(30, w * 0.05)
      const mx = mouseXRef.current

      if (mx < cx - deadZone) {
        activeSideRef.current = 'left'
        right.style.display = 'block'
        left.style.display = 'none'
        const range = cx - deadZone
        const dist = cx - deadZone - mx
        const progress = Math.max(0, Math.min(1, dist / range))
        if (!right.seeking) {
          right.currentTime = progress * (right.duration || 0)
        }
      } else if (mx > cx + deadZone) {
        activeSideRef.current = 'right'
        left.style.display = 'block'
        right.style.display = 'none'
        const range = w - (cx + deadZone)
        const dist = mx - (cx + deadZone)
        const progress = Math.max(0, Math.min(1, dist / range))
        if (!left.seeking) {
          left.currentTime = progress * (left.duration || 0)
        }
      } else {
        if (activeSideRef.current === 'left') {
          right.style.display = 'block'
          left.style.display = 'none'
          if (!right.seeking) right.currentTime = 0
        } else {
          left.style.display = 'block'
          right.style.display = 'none'
          if (!left.seeking) left.currentTime = 0
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      id="main-canvas"
      ref={containerRef}
      className="pointer-events-none fixed z-0 overflow-hidden
        left-0 top-[220px] w-screen h-[calc(100vh-220px)]
        lg:inset-0 lg:w-full lg:h-full"
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <video
        ref={leftRef}
        src={VIDEO_LEFT}
        muted
        playsInline
        preload="auto"
        onLoadedData={onVideoReady}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: 'none' }}
      />
      <video
        ref={rightRef}
        src={VIDEO_RIGHT}
        muted
        playsInline
        preload="auto"
        onLoadedData={onVideoReady}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: 'block' }}
      />
    </div>
  )
}
