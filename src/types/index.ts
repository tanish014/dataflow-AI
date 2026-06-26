/* ============================================================
 * Type Definitions — Shared types for the landing page
 * ============================================================ */

/* ---------- Navigation ---------- */

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

/* ---------- Features ---------- */

export interface Feature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: FeatureIconType;
  readonly gradient: string;
  readonly isDarkTheme?: boolean;
  readonly span?: 'wide' | 'tall' | 'default';
}

export type FeatureIconType =
  | 'automation'
  | 'analytics'
  | 'integration'
  | 'security'
  | 'speed'
  | 'collaboration';

/* ---------- Pricing ---------- */

export type Currency = 'USD' | 'EUR' | 'INR';
export type BillingCycle = 'monthly' | 'yearly';
export type PlanTier = 'starter' | 'pro' | 'enterprise';

export interface PlanFeature {
  readonly text: string;
  readonly included: boolean;
}

export interface PlanDetails {
  readonly tier: PlanTier;
  readonly name: string;
  readonly description: string;
  readonly features: readonly PlanFeature[];
  readonly isPopular?: boolean;
  readonly ctaLabel: string;
}

export interface CurrencyConfig {
  readonly rate: number;
  readonly symbol: string;
  readonly locale: string;
  readonly code: Currency;
}

/* ---------- Testimonials ---------- */

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
  readonly avatarInitials: string;
}

/* ---------- FAQ ---------- */

export interface FAQItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

/* ---------- Stats ---------- */

export interface HeroStat {
  readonly label: string;
  readonly value: number;
  readonly suffix: string;
  readonly prefix?: string;
}

/* ---------- Workflow ---------- */

export interface WorkflowStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

/* ---------- Footer ---------- */

export interface FooterLinkGroup {
  readonly title: string;
  readonly links: readonly NavLink[];
}

/* ---------- Trusted By ---------- */

export interface TrustedCompany {
  readonly name: string;
  readonly logoSvg: string;
}
