import { GALLERY_IMAGES } from '../constants'

function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = []
  let placed = 0
  let r = 0
  while (placed < count) {
    const row = new Array(cols).fill(-1)
    const a = (r * 2 + (r % 2)) % cols
    row[a] = placed++
    if (r % 3 === 0 && placed < count) {
      let b = (a + 2) % cols
      if (b === a) b = (a + 1) % cols
      row[b] = placed++
    }
    rows.push(row)
    r++
  }
  return rows
}

const TEXT_BLOCKS = [
  {
    after: 1,
    title: 'THE ARCHIVE',
    body: 'Reconstructed from forgotten patterns — each garment is a dialogue between decades. We source deadstock fabrics from closed ateliers in Tokyo, Seoul, and the outskirts of Paris. Nothing is reproduced. Nothing is replicated.',
  },
  {
    after: 3,
    title: 'MATERIALS',
    body: 'Japanese raw cotton. Italian washed linen. Reinforced double-stitched seams built for years, not seasons. Every detail is intentional — from the weight of the fabric to the fall of the hem.',
  },
  {
    after: 5,
    title: 'LIMITED RUN',
    body: '120 numbered pieces per drop. No restocks. No second runs. When it\'s gone, it becomes part of someone else\'s archive. Each piece ships with a hand-stamped certificate and a cloth dust bag.',
  },
  {
    after: 7,
    title: 'PHILOSOPHY',
    body: 'We believe fashion should outlive its moment. PRMPT exists at the intersection of archival research and contemporary silhouette — clothing that references history without living in it.',
  },
]

export default function BlackPanel({ onOrder }: { onOrder: () => void }) {
  const getCols = () => {
    if (typeof window === 'undefined') return 4
    if (window.innerWidth < 640) return 2
    if (window.innerWidth < 1024) return 3
    return 4
  }

  const cols = getCols()
  const layout = buildLayout(GALLERY_IMAGES.length, cols)

  let globalImgCount = 0

  return (
    <div
      id="black-panel"
      className="fixed inset-0 z-10"
      style={{
        background: 'black',
        transform: 'translateY(100vh)',
      }}
    >
      <div
        id="panel-inner"
        className="w-full"
        style={{ paddingTop: 'min(400px, 40vh)' }}
      >
        {layout.map((row, ri) => {
          const rowImgCount = row.filter((v) => v !== -1).length
          const prevCount = globalImgCount
          globalImgCount += rowImgCount

          const textBlock = TEXT_BLOCKS.find(
            (tb) => prevCount < tb.after && globalImgCount >= tb.after
          )

          return (
            <div key={`row-${ri}`}>
              <div
                className="grid w-full"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
              >
                {row.map((imgIdx, ci) => {
                  if (imgIdx === -1) {
                    return (
                      <div
                        key={`empty-${ri}-${ci}`}
                        style={{ aspectRatio: '2/3' }}
                      />
                    )
                  }
                  const isLeftHalf = ci < cols / 2
                  return (
                    <div
                      key={`card-${imgIdx}`}
                      className="bp-card"
                      style={{
                        aspectRatio: '2/3',
                        transform: 'scale(0)',
                        transformOrigin: isLeftHalf
                          ? 'right bottom'
                          : 'left bottom',
                      }}
                    >
                      <img
                        src={GALLERY_IMAGES[imgIdx]}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )
                })}
              </div>

              {textBlock && (
                <div className="w-full px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-32">
                  <div className="max-w-[600px] mx-auto lg:mx-0 lg:ml-[16.67%]">
                    <div
                      className="text-white uppercase mb-4 text-[11px]"
                      style={{ letterSpacing: '0.15em', opacity: 0.4 }}
                    >
                      {textBlock.title}
                    </div>
                    <div
                      className="text-white text-[18px] sm:text-[22px] lg:text-[28px]"
                      style={{
                        lineHeight: '140%',
                        letterSpacing: '-0.03em',
                        opacity: 0.85,
                      }}
                    >
                      {textBlock.body}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        <div className="w-full px-4 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-36">
          <div className="max-w-[800px] mx-auto text-center">
            <div
              className="text-white uppercase mb-6 text-[11px]"
              style={{ letterSpacing: '0.15em', opacity: 0.4 }}
            >
              PRMPT (R) ARCHIVE
            </div>
            <div
              className="text-white text-[32px] sm:text-[48px] lg:text-[64px] uppercase mb-8"
              style={{ lineHeight: '100%', letterSpacing: '-0.04em' }}
            >
              BUILT TO
              <br />
              OUTLAST
            </div>
            <div
              className="text-white mb-10 mx-auto max-w-[500px]"
              style={{
                fontSize: '14px',
                lineHeight: '170%',
                letterSpacing: '-0.01em',
                opacity: 0.5,
              }}
            >
              Free worldwide shipping on all orders. 14-day returns.
              Every garment is made to order &mdash; please allow 5-7 business
              days for production before dispatch.
            </div>
            <button
              onClick={onOrder}
              className="pointer-events-auto uppercase text-black bg-white px-12 py-4"
              style={{
                fontSize: '14px',
                letterSpacing: '0.1em',
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 500,
              }}
            >
              ORDER NOW &mdash; $97
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
