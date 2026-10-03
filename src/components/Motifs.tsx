import type { MotifKind } from '../data/resume'

const C = '#d8c7b0' // champagne
const U = '#6f8cff' // ultramarine

/** Corner brackets, the visual language of an object-detection bounding box. */
function Brackets({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const l = 9
  return (
    <path
      d={`M${x} ${y + l}V${y}H${x + l} M${x + w - l} ${y}H${x + w}V${y + l} M${x + w} ${y + h - l}V${y + h}H${x + w - l} M${x + l} ${y + h}H${x}V${y + h - l}`}
      stroke={U}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  )
}

function Fish({ x, y, s, box = true }: { x: number; y: number; s: number; box?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0C18-15 50-15 68 0C50 15 18 15 0 0Z" fill={C} fillOpacity=".14" stroke={C} strokeOpacity=".55" />
      <path d="M68 0 90-13v26Z" fill={C} fillOpacity=".14" stroke={C} strokeOpacity=".55" strokeLinejoin="round" />
      <circle cx="14" cy="-2" r="2" fill={C} />
      {box && (
        <>
          <Brackets x={-10} y={-24} w={110} h={48} />
          <rect x={-10} y={-33} width={38} height={7} rx={3.5} fill={U} fillOpacity=".55" />
        </>
      )}
    </g>
  )
}

const svgProps = {
  viewBox: '0 0 400 220',
  preserveAspectRatio: 'xMidYMid slice',
  className: 'absolute inset-0 h-full w-full',
  'aria-hidden': true,
} as const

function FishMotif() {
  return (
    <svg {...svgProps}>
      <defs>
        <pattern id="m-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill={C} fillOpacity=".18" />
        </pattern>
        <linearGradient id="m-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={U} stopOpacity=".0" />
          <stop offset="1" stopColor={U} stopOpacity=".18" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#m-dots)" />
      <rect width="400" height="220" fill="url(#m-water)" />
      <Fish x={48} y={88} s={1.1} />
      <Fish x={200} y={150} s={0.8} />
      <Fish x={262} y={62} s={0.95} />
      <path d="M0 196q25-10 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0" stroke={U} strokeOpacity=".35" fill="none" />
      <path d="M0 208q25-10 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0" stroke={C} strokeOpacity=".18" fill="none" />
    </svg>
  )
}

function CompanioMotif() {
  const pins: [number, number][] = [
    [146, 78],
    [258, 66],
    [274, 142],
    [138, 152],
    [212, 172],
  ]
  return (
    <svg {...svgProps}>
      <g stroke={C} strokeOpacity=".1" fill="none">
        <path d="M0 60C90 70 150 40 400 90M0 150C120 130 220 190 400 140M120 0C140 80 100 150 130 220M300 0C280 70 320 150 290 220" />
      </g>
      {[96, 64, 32].map((r) => (
        <circle key={r} cx="200" cy="112" r={r} fill={U} fillOpacity={0.03} stroke={U} strokeOpacity={0.4} strokeDasharray="3 5" />
      ))}
      {pins.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="14" fill={U} fillOpacity=".12" />
          <circle cx={x} cy={y} r="4.5" fill={U} />
        </g>
      ))}
      <circle cx="200" cy="112" r="14" fill={C} fillOpacity=".15" />
      <circle cx="200" cy="112" r="5" fill={C} />
    </svg>
  )
}

function GymMotif() {
  const on = new Set(['0-0', '2-0', '4-1', '1-2', '5-2', '3-3', '6-3', '2-1'])
  const cells = []
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 7; c++) {
      const active = on.has(`${c}-${r}`)
      cells.push(
        <rect
          key={`${c}-${r}`}
          x={36 + c * 48}
          y={34 + r * 34}
          width="40"
          height="26"
          rx="7"
          fill={active ? U : C}
          fillOpacity={active ? 0.55 : 0.07}
        />,
      )
    }
  }
  return (
    <svg {...svgProps}>
      {cells}
      <g stroke={C} strokeOpacity=".7" strokeWidth="3" strokeLinecap="round">
        <path d="M120 190H280" />
        <path d="M112 176v28M102 180v20M288 176v28M298 180v20" />
      </g>
    </svg>
  )
}

function LoanMotif() {
  const low: [number, number][] = [[52, 168], [78, 174], [104, 166], [130, 172], [156, 164], [90, 158], [140, 178], [66, 180]]
  const high: [number, number][] = [[250, 54], [278, 46], [306, 56], [334, 48], [362, 54], [292, 66], [322, 40], [266, 62]]
  return (
    <svg {...svgProps}>
      <g stroke={C} strokeOpacity=".25" fill="none">
        <path d="M30 20V190H380" />
        <path d="M205 20V190M30 110H380" strokeDasharray="3 5" strokeOpacity=".3" />
      </g>
      <path d="M30 172C150 172 190 166 216 112 240 60 300 50 380 50" stroke={U} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {low.map(([x, y]) => (
        <circle key={`l${x}`} cx={x} cy={y} r="4" fill={C} fillOpacity=".7" />
      ))}
      {high.map(([x, y]) => (
        <circle key={`h${x}`} cx={x} cy={y} r="4" fill={U} />
      ))}
    </svg>
  )
}

function ParserMotif() {
  return (
    <svg {...svgProps}>
      <path d="M52 34H128L156 62V186H52Z" fill={C} fillOpacity=".06" stroke={C} strokeOpacity=".5" strokeLinejoin="round" />
      <path d="M128 34V62H156" fill="none" stroke={C} strokeOpacity=".5" />
      {[80, 98, 116, 134, 152, 168].map((y, i) => (
        <rect key={y} x="68" y={y} width={i % 2 ? 56 : 72} height="5" rx="2.5" fill={C} fillOpacity=".3" />
      ))}
      <path d="M176 110H222m0 0-8-8m8 8-8 8" stroke={U} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[62, 92, 122, 152].map((y, i) => (
        <g key={y}>
          <rect x="242" y={y} width="122" height="22" rx="7" fill={C} fillOpacity=".05" stroke={C} strokeOpacity=".2" />
          <rect x="252" y={y + 8} width="30" height="5" rx="2.5" fill={C} fillOpacity=".4" />
          <rect x="298" y={y + 8} width={[52, 40, 46, 34][i]} height="5" rx="2.5" fill={U} fillOpacity=".8" />
        </g>
      ))}
    </svg>
  )
}

function EdithMotif() {
  const agents: [number, number][] = [[80, 50], [200, 30], [320, 50], [340, 150], [200, 190], [60, 150]]
  return (
    <svg {...svgProps}>
      {agents.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <path d={`M200 110L${x} ${y}`} stroke={C} strokeOpacity=".25" strokeDasharray="3 5" />
          <rect x={x - 18} y={y - 12} width="36" height="24" rx="7" fill={U} fillOpacity=".18" stroke={U} strokeOpacity=".6" />
        </g>
      ))}
      <circle cx="200" cy="110" r="26" fill={C} fillOpacity=".12" stroke={C} strokeOpacity=".6" />
      <circle cx="200" cy="110" r="6" fill={C} />
    </svg>
  )
}

function RagMotif() {
  return (
    <svg {...svgProps}>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={50 + i * 10} y={40 + i * 10} width="90" height="120" rx="6" fill={C} fillOpacity=".06" stroke={C} strokeOpacity=".4" />
      ))}
      {[78, 96, 114, 132].map((y, i) => (
        <rect key={y} x="82" y={y} width={i === 1 ? 64 : 48} height="8" rx="3" fill={i === 1 ? U : C} fillOpacity={i === 1 ? 0.8 : 0.3} />
      ))}
      <path d="M176 110H222m0 0-8-8m8 8-8 8" stroke={U} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="240" y="60" width="120" height="34" rx="12" fill={C} fillOpacity=".08" stroke={C} strokeOpacity=".3" />
      <rect x="260" y="112" width="110" height="46" rx="12" fill={U} fillOpacity=".15" stroke={U} strokeOpacity=".6" />
      <rect x="274" y="126" width="60" height="5" rx="2.5" fill={C} fillOpacity=".5" />
      <rect x="274" y="138" width="40" height="5" rx="2.5" fill={U} />
    </svg>
  )
}

function TradeMotif() {
  const candles: [number, number, number, boolean][] = [
    [140, 160, 120, false], [130, 150, 110, true], [120, 140, 95, true], [115, 128, 100, false],
    [105, 120, 80, true], [90, 110, 70, true], [85, 100, 72, false], [75, 92, 55, true], [60, 80, 45, true],
  ]
  return (
    <svg {...svgProps}>
      <path d="M30 190H380" stroke={C} strokeOpacity=".25" />
      {candles.map(([mid, low, high, up], i) => {
        const x = 60 + i * 36
        return (
          <g key={x} stroke={up ? U : C} strokeOpacity=".8">
            <path d={`M${x} ${high}V${low}`} />
            <rect x={x - 8} y={mid - 14} width="16" height="28" rx="2" fill={up ? U : C} fillOpacity={up ? 0.6 : 0.2} />          </g>
        )
      })}
      <path d="M40 160C140 150 220 110 380 50" stroke={C} strokeOpacity=".5" strokeDasharray="4 6" fill="none" />
    </svg>
  )
}

export function Motif({ kind }: { kind: MotifKind }) {
  switch (kind) {
    case 'fish':
      return <FishMotif />
    case 'companio':
      return <CompanioMotif />
    case 'gym':
      return <GymMotif />
    case 'loan':
      return <LoanMotif />
    case 'parser':
      return <ParserMotif />
    case 'edith':
      return <EdithMotif />
    case 'rag':
      return <RagMotif />
    case 'trade':
      return <TradeMotif />
  }
}
