import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from '../components/CustomCursor'
import Logo from '../components/Logo'
import Caption from '../components/Caption'
import HeaderNav from '../components/HeaderNav'
import ProductInfo from '../components/ProductInfo'
import ViewButton from '../components/ViewButton'
import VideoContainer from '../components/VideoContainer'
import BlackPanel from '../components/BlackPanel'
import Footer from '../components/Footer'
import { CIRCLE_SYMBOLS } from '../constants'

gsap.registerPlugin(ScrollTrigger)

export default function Landing({ onOrder }: { onOrder: () => void }) {
  const spacerRef = useRef<HTMLDivElement>(null)
  const lastSymbolTime = useRef(0)

  useEffect(() => {
    window.scrollTo(0, 0)

    const vh = window.innerHeight
    const panel = document.getElementById('black-panel')!
    const inner = document.getElementById('panel-inner')!
    const canvas = document.getElementById('main-canvas')!
    const overlay = document.getElementById('outro-overlay')!
    const info = document.getElementById('outro-info')!
    const buy = document.getElementById('outro-buy')!
    const footer = document.getElementById('outro-footer')!
    const circleSymbol = document.getElementById('circle-symbol')!
    const cards = document.querySelectorAll<HTMLElement>('.bp-card')

    const heroCaption = document.getElementById('hero-caption')!
    const heroLogo = document.getElementById('hero-logo')!
    const heroNav = document.getElementById('hero-nav')!
    const outroContent = document.getElementById('outro-content')!

    gsap.to(panel, {
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: spacerRef.current,
        start: 'top top',
        end: `+=${vh}`,
        scrub: true,
      },
    })

    const wrapScrollHeight = inner.scrollHeight
    const maxScroll = Math.max(0, wrapScrollHeight - vh)
    const totalHeight = vh + maxScroll + 2 * vh

    if (spacerRef.current) {
      spacerRef.current.style.height = `${totalHeight}px`
    }

    ScrollTrigger.refresh()

    const tick = () => {
      const scrollY = window.scrollY
      const now = performance.now()

      if (scrollY > vh) {
        canvas.style.visibility = 'hidden'
      } else {
        canvas.style.visibility = 'visible'
      }

      const heroFade = 1 - Math.min(1, scrollY / (vh * 0.4))
      heroCaption.style.opacity = String(heroFade)
      heroLogo.style.opacity = String(heroFade)
      heroNav.style.opacity = String(heroFade)
      info.style.opacity = String(heroFade)

      if (now - lastSymbolTime.current > 80 && scrollY > 0) {
        lastSymbolTime.current = now
        circleSymbol.textContent =
          CIRCLE_SYMBOLS[Math.floor(Math.random() * CIRCLE_SYMBOLS.length)]
      }

      if (scrollY <= vh) {
        const panelOffset = vh - scrollY
        inner.style.transform = 'translateY(0)'

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect()
          const top = rect.top - panelOffset
          const bottom = rect.bottom - panelOffset

          if (bottom <= 0 || top >= vh) {
            card.style.transform = 'scale(0)'
            return
          }
          const enter = Math.min(1, (vh - top) / (vh * 0.6))
          const exit = Math.min(1, bottom / (vh * 0.4))
          const s = Math.max(0, Math.min(enter, exit))
          card.style.transform = `scale(${s})`
        })
      } else {
        const phase2Scroll = scrollY - vh
        inner.style.transform = `translateY(${-phase2Scroll}px)`

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect()
          if (rect.bottom <= 0 || rect.top >= vh) {
            card.style.transform = 'scale(0)'
            return
          }
          const enter = Math.min(1, (vh - rect.top) / (vh * 0.6))
          const exit = Math.min(1, rect.bottom / (vh * 0.4))
          const s = Math.max(0, Math.min(enter, exit))
          card.style.transform = `scale(${s})`
        })

        if (phase2Scroll > maxScroll) {
          const outroProgress = Math.min(
            1,
            (phase2Scroll - maxScroll) / (vh - 100)
          )
          overlay.style.opacity = String(outroProgress)
          buy.style.transform = `scale(${outroProgress})`
          buy.style.pointerEvents = outroProgress > 0.8 ? 'auto' : 'none'
          outroContent.style.opacity = String(outroProgress)
          footer.style.opacity = String(outroProgress)
        } else {
          overlay.style.opacity = '0'
          buy.style.transform = 'scale(0)'
          buy.style.pointerEvents = 'none'
          outroContent.style.opacity = '0'
          footer.style.opacity = '0'
        }
      }

      requestAnimationFrame(tick)
    }

    const raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div
      id="scroll-spacer"
      ref={spacerRef}
      className="relative select-none bg-white lg:cursor-none"
      style={{ height: '500vh' }}
    >
      <CustomCursor />
      <Logo />
      <Caption />
      <HeaderNav />
      <ProductInfo onOrder={onOrder} />
      <ViewButton onOrder={onOrder} />
      <VideoContainer />

      <div
        id="outro-overlay"
        className="fixed inset-0 pointer-events-none"
        style={{ background: '#fff', opacity: 0, zIndex: 12 }}
      />

      {/* Outro screen content — appears with the white overlay */}
      <div
        id="outro-content"
        className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="text-center px-4">
          <div
            className="uppercase mb-3 text-[11px]"
            style={{ letterSpacing: '0.15em', opacity: 0.35, color: '#000' }}
          >
            PRMPT (R) ARCHIVE COLLECTION
          </div>
          <div
            className="uppercase text-[36px] sm:text-[56px] lg:text-[80px] mb-4 lg:mb-6"
            style={{ lineHeight: '95%', letterSpacing: '-0.04em', color: '#000' }}
          >
            YOUR NEXT
            <br />
            ARCHIVE PIECE
          </div>
          <div
            className="mx-auto max-w-[420px] mb-2"
            style={{
              fontSize: '13px',
              lineHeight: '170%',
              letterSpacing: '-0.01em',
              color: '#000',
              opacity: 0.45,
            }}
          >
            120 numbered garments. Free worldwide shipping.
            <br />
            14-day returns. Made to order in 5-7 days.
          </div>
        </div>
      </div>

      <BlackPanel onOrder={onOrder} />
      <Footer />
    </div>
  )
}
