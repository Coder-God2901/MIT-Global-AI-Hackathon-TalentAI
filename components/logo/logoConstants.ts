export const LOGO_SIZES = {
  sm: {
    container: 'w-8 h-8',
    text: 'text-lg',
    nodeRadius: '2'
  },
  md: {
    container: 'w-10 h-10',
    text: 'text-xl',
    nodeRadius: '2.5'
  },
  lg: {
    container: 'w-12 h-12',
    text: 'text-2xl',
    nodeRadius: '3'
  },
  xl: {
    container: 'w-16 h-16',
    text: 'text-3xl',
    nodeRadius: '4'
  }
} as const;

export const NEURAL_NETWORK_NODES = {
  input: [
    { cx: 8, cy: 12, delay: '0s' },
    { cx: 8, cy: 28, delay: '0.6s' }
  ],
  hidden: [
    { cx: 20, cy: 8, delay: '1.2s' },
    { cx: 20, cy: 20, delay: '1.8s', opacity: '0.9' },
    { cx: 20, cy: 32, delay: '2.4s' }
  ],
  output: [
    { cx: 32, cy: 16, delay: '3s' },
    { cx: 32, cy: 24, delay: '3.6s' }
  ]
} as const;

export const CONNECTION_LINES = [
  // Layer 1 to Layer 2
  { x1: 8, y1: 12, x2: 20, y2: 8, delay: '0.1s' },
  { x1: 8, y1: 12, x2: 20, y2: 20, delay: '0.3s' },
  { x1: 8, y1: 12, x2: 20, y2: 32, delay: '0.5s' },
  { x1: 8, y1: 28, x2: 20, y2: 8, delay: '0.7s' },
  { x1: 8, y1: 28, x2: 20, y2: 20, delay: '0.9s' },
  { x1: 8, y1: 28, x2: 20, y2: 32, delay: '1.1s' },
  // Layer 2 to Layer 3
  { x1: 20, y1: 8, x2: 32, y2: 16, delay: '1.3s' },
  { x1: 20, y1: 8, x2: 32, y2: 24, delay: '1.5s' },
  { x1: 20, y1: 20, x2: 32, y2: 16, delay: '1.7s' },
  { x1: 20, y1: 20, x2: 32, y2: 24, delay: '1.9s' },
  { x1: 20, y1: 32, x2: 32, y2: 16, delay: '2.1s' },
  { x1: 20, y1: 32, x2: 32, y2: 24, delay: '2.3s' }
] as const;

export const DATA_FLOW_INDICATORS = [
  { cx: 14, cy: 10, delay: '0.8s' },
  { cx: 14, cy: 30, delay: '1.4s' },
  { cx: 26, cy: 14, delay: '2.6s' },
  { cx: 26, cy: 26, delay: '3.2s' }
] as const;