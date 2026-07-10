export default function ViewButton({ onOrder }: { onOrder: () => void }) {
  return (
    <div
      id="outro-buy"
      className="fixed z-20
        left-4 right-4 bottom-[60px] h-[100px]
        lg:right-8 lg:left-auto lg:bottom-8 lg:w-[330px] lg:h-[174px]
        flex items-center justify-center"
      style={{
        transformOrigin: 'right bottom',
        transform: 'scale(0)',
        background: '#000',
        borderRadius: '1335px',
        cursor: 'pointer',
        pointerEvents: 'none',
      }}
      onClick={onOrder}
    >
      <span
        className="lg:text-[100px] text-[64px] uppercase text-white"
        style={{
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        order
      </span>
    </div>
  )
}
