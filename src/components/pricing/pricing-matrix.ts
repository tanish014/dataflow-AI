/* ============================================================
 * Pricing Matrix — All prices derived from base + currency + billing.
 * No hardcoded displayed values anywhere.
 * ============================================================ */

import type { Currency, BillingCycle, PlanTier, PlanDetails, CurrencyConfig } from '@/types';

const YEARLY_DISCOUNT = 0.20;

const BASE_MONTHLY_PRICES: Record<PlanTier, number> = {
  starter: 29,
  pro: 79,
  enterprise: 199,
};

export const CURRENCY_CONFIG: Record<Currency, CurrencyConfig> = {
  USD: { rate: 1, symbol: '$', locale: 'en-US', code: 'USD' },
  EUR: { rate: 0.92, symbol: '€', locale: 'de-DE', code: 'EUR' },
  INR: { rate: 83.5, symbol: '₹', locale: 'en-IN', code: 'INR' },
};

export const CURRENCIES: readonly Currency[] = ['USD', 'EUR', 'INR'] as const;
export const BILLING_CYCLES: readonly BillingCycle[] = ['monthly', 'yearly'] as const;

/**
 * Compute the displayed price for a given plan, currency, and billing cycle.
 * Yearly billing receives exactly 20% discount.
 */
export function computePrice(
  plan: PlanTier,
  currency: Currency,
  billing: BillingCycle
): number {
  const base = BASE_MONTHLY_PRICES[plan];
  const { rate } = CURRENCY_CONFIG[currency];
  const converted = base * rate;
  return billing === 'yearly' ? converted * (1 - YEARLY_DISCOUNT) : converted;
}

/**
 * Format a price for display using Intl.NumberFormat.
 */
export function formatPrice(amount: number, currency: Currency): string {
  const config = CURRENCY_CONFIG[currency];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export const PLAN_DETAILS: readonly PlanDetails[] = [
  {
    tier: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams getting started with data automation.',
    ctaLabel: 'Start Free Trial',
    features: [
      { text: '5 automated pipelines', included: true },
      { text: '10,000 records/month', included: true },
      { text: '5 integrations', included: true },
      { text: 'Email support', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Custom models', included: false },
      { text: 'SSO & RBAC', included: false },
      { text: 'Dedicated support', included: false },
    ],
  },
  {
    tier: 'pro',
    name: 'Pro',
    description: 'For growing teams that need advanced AI capabilities.',
    ctaLabel: 'Start Free Trial',
    isPopular: true,
    features: [
      { text: 'Unlimited pipelines', included: true },
      { text: '1M records/month', included: true },
      { text: '50 integrations', included: true },
      { text: 'Priority support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom AI models', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'Dedicated support', included: false },
    ],
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations that demand enterprise-grade reliability.',
    ctaLabel: 'Contact Sales',
    features: [
      { text: 'Unlimited everything', included: true },
      { text: 'Unlimited records', included: true },
      { text: '200+ integrations', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'Custom dashboards', included: true },
      { text: 'Custom AI models', included: true },
      { text: 'SSO & RBAC', included: true },
      { text: 'SLA guarantee', included: true },
    ],
  },
] as const;
