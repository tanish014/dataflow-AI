/* ============================================================
 * Design Tokens — Single source of truth for all design values.
 * Used by components via Tailwind classes that reference
 * the CSS custom properties defined in globals.css.
 * ============================================================ */

export const COLORS = {
  background: '#F1F6F4',
  secondary: '#D9E8E2',
  accent: '#FFC801',
  accentSecondary: '#FF9932',
  darkBlue: '#114C5A',
  darkest: '#172B36',
  white: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.65)',
  glassBorder: 'rgba(255, 255, 255, 0.35)',
} as const;

export const TIMING = {
  hover: '180ms',
  layout: '350ms',
  entrance: '450ms',
} as const;

export const EASING = {
  hover: 'ease-out',
  layout: 'ease-in-out',
  entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const FONT_FAMILIES = {
  heading: 'var(--font-jetbrains)',
  body: 'var(--font-inter)',
} as const;

export const BREAKPOINTS = {
  xs: 320,
  sm: 375,
  md: 425,
  tablet: 640,
  ipad: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1440,
  ultrawide: 1920,
} as const;

export type ColorKey = keyof typeof COLORS;
export type TimingKey = keyof typeof TIMING;
export type EasingKey = keyof typeof EASING;
