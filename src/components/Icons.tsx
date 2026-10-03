import type { SVGProps } from 'react'

const base = (p: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> => ({
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  ...p,
})

export const DownloadIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
  </svg>
)
export const ExternalIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
)
export const GitHubIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M9 19c-4 1.3-4-2-6-2.5m12 4.5v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.5 2.9 5.5 3.2 5.5 3.2a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.6c0 4.7 2.8 5.7 5.5 6a2.8 2.8 0 0 0-.8 2.2V21" />
  </svg>
)
export const MenuIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)
export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
export const ChevronIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)
export const CloudIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 22, height: 22, ...p })}>
    <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.5a4.75 4.75 0 0 1 0 9.5H7Z" />
  </svg>
)
export const CodeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 22, height: 22, ...p })}>
    <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2.5-10-3 12" />
  </svg>
)
export const ChartIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 22, height: 22, ...p })}>
    <path d="M4 20V10m6 10V4m6 16v-7m4 7H3" />
  </svg>
)
