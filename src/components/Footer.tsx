export default function Footer() {
  return (
    <div
      id="outro-footer"
      className="fixed pointer-events-none left-4 right-4 bottom-6 lg:bottom-8 flex flex-row justify-between"
      style={{
        mixBlendMode: 'exclusion',
        opacity: 0,
      }}
    >
      <div className="flex flex-row gap-4 sm:gap-10">
        <span
          className="text-white uppercase text-[11px] lg:text-[13px]"
          style={{ letterSpacing: '-0.02em' }}
        >
          PRMPT (R) 2026
        </span>
        <span
          className="text-white uppercase text-[11px] lg:text-[13px]"
          style={{ letterSpacing: '-0.02em' }}
        >
          PRIVACY POLICY
        </span>
      </div>
      <div className="flex flex-row gap-4 sm:gap-10">
        <span
          className="hidden sm:block text-white uppercase text-[11px] lg:text-[13px]"
          style={{ letterSpacing: '-0.02em' }}
        >
          INSTAGRAM
        </span>
        <span
          className="hidden sm:block text-white uppercase text-[11px] lg:text-[13px]"
          style={{ letterSpacing: '-0.02em' }}
        >
          TELEGRAM
        </span>
        <span
          className="text-white uppercase text-[11px] lg:text-[13px]"
          style={{ letterSpacing: '-0.02em' }}
        >
          CONTACT
        </span>
      </div>
    </div>
  )
}
