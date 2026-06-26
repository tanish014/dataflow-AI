'use client';

import React, { useState, memo, useCallback } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import {
  computePrice,
  formatPrice,
  CURRENCIES,
  PLAN_DETAILS,
} from '@/components/pricing/pricing-matrix';
import type { Currency, BillingCycle, PlanDetails } from '@/types';

/* ============================================================
 * Currency Toggle
 * ============================================================ */

interface CurrencyToggleProps {
  readonly value: Currency;
  readonly onChange: (currency: Currency) => void;
}

const CurrencyToggle = memo(function CurrencyToggle({
  value,
  onChange,
}: CurrencyToggleProps) {
  return (
    <div
      className="inline-flex items-center rounded-xl bg-secondary/60 p-1 gap-1"
      role="radiogroup"
      aria-label="Select currency"
    >
      {CURRENCIES.map((currency) => (
        <button
          key={currency}
          role="radio"
          aria-checked={value === currency}
          className={[
            'px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer',
            'transition-all duration-[180ms] ease-out',
            value === currency
              ? 'bg-white text-darkest shadow-premium'
              : 'text-dark-blue/50 hover:text-dark-blue/80',
          ].join(' ')}
          onClick={() => onChange(currency)}
        >
          {currency}
        </button>
      ))}
    </div>
  );
});

/* ============================================================
 * Billing Toggle
 * ============================================================ */

interface BillingToggleProps {
  readonly value: BillingCycle;
  readonly onChange: (billing: BillingCycle) => void;
}

const BillingToggle = memo(function BillingToggle({
  value,
  onChange,
}: BillingToggleProps) {
  return (
    <div className="inline-flex items-center gap-3" role="radiogroup" aria-label="Select billing cycle">
      <button
        role="radio"
        aria-checked={value === 'monthly'}
        className={[
          'text-sm font-semibold cursor-pointer transition-colors duration-[180ms]',
          value === 'monthly' ? 'text-darkest' : 'text-dark-blue/40',
        ].join(' ')}
        onClick={() => onChange('monthly')}
      >
        Monthly
      </button>

      {/* Toggle Switch */}
      <button
        className="relative w-12 h-7 rounded-full bg-secondary cursor-pointer transition-colors duration-[180ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={() => onChange(value === 'monthly' ? 'yearly' : 'monthly')}
        aria-label={`Switch to ${value === 'monthly' ? 'yearly' : 'monthly'} billing`}
        role="switch"
        aria-checked={value === 'yearly'}
      >
        <div
          className={[
            'absolute top-1 w-5 h-5 rounded-full gradient-accent shadow-premium',
            'transition-all duration-[180ms] ease-out',
            value === 'yearly' ? 'left-6' : 'left-1',
          ].join(' ')}
        />
      </button>

      <button
        role="radio"
        aria-checked={value === 'yearly'}
        className={[
          'text-sm font-semibold cursor-pointer transition-colors duration-[180ms] flex items-center gap-2',
          value === 'yearly' ? 'text-darkest' : 'text-dark-blue/40',
        ].join(' ')}
        onClick={() => onChange('yearly')}
      >
        Yearly
        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-darkest font-bold">
          -20%
        </span>
      </button>
    </div>
  );
});

/* ============================================================
 * Pricing Card
 * ============================================================ */

interface PricingCardProps {
  readonly plan: PlanDetails;
  readonly currency: Currency;
  readonly billing: BillingCycle;
  readonly index: number;
  readonly isInView: boolean;
}

const PricingCard = memo(function PricingCard({
  plan,
  currency,
  billing,
  index,
  isInView,
}: PricingCardProps) {
  const price = computePrice(plan.tier, currency, billing);
  const formattedPrice = formatPrice(price, currency);

  return (
    <div
      className={[
        'relative rounded-2xl p-6 lg:p-8 flex flex-col',
        'transition-all duration-[180ms] ease-out',
        plan.isPopular
          ? 'glass-card shadow-premium-lg border-2 border-accent/30 -translate-y-2 lg:-translate-y-4'
          : 'glass-card hover:-translate-y-1 hover:shadow-premium-lg',
        isInView ? 'animate-fade-in-up' : 'opacity-0',
      ].join(' ')}
      style={{ animationDelay: isInView ? `${index * 100}ms` : '0ms' }}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="accent">Most Popular</Badge>
        </div>
      )}

      {/* Plan Name & Description */}
      <h3 className="text-xl font-bold text-darkest font-heading">
        {plan.name}
      </h3>
      <p className="mt-1 text-sm text-dark-blue/60">{plan.description}</p>

      {/* Price */}
      <div className="mt-6 mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl lg:text-5xl font-bold text-darkest font-heading">
            {formattedPrice}
          </span>
          <span className="text-sm text-dark-blue/50 font-medium">
            /mo
          </span>
        </div>
        {billing === 'yearly' && (
          <p className="mt-1 text-xs text-accent-secondary font-semibold">
            Billed annually · Save 20%
          </p>
        )}
      </div>

      {/* Features List */}
      <ul className="flex-1 space-y-3 mb-8" role="list">
        {plan.features.map((feature) => (
          <li
            key={feature.text}
            className="flex items-start gap-3 text-sm"
          >
            {feature.included ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#114C5A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#172B36"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 mt-0.5 opacity-20"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
            <span
              className={
                feature.included
                  ? 'text-darkest'
                  : 'text-dark-blue/30 line-through'
              }
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={plan.isPopular ? 'primary' : 'outline'}
        size="md"
        className="w-full"
      >
        {plan.ctaLabel}
      </Button>
    </div>
  );
});

/* ============================================================
 * Pricing Section — Fully Isolated State Island
 *
 * All pricing state (currency, billing) lives inside this
 * component. No state is lifted to the page level.
 * Changing currency/billing ONLY re-renders this subtree.
 * ============================================================ */

export default function PricingSection() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
  });

  const handleCurrencyChange = useCallback((c: Currency) => {
    setCurrency(c);
  }, []);

  const handleBillingChange = useCallback((b: BillingCycle) => {
    setBilling(b);
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 lg:py-32 bg-secondary/30"
      aria-labelledby="pricing-heading"
      id="pricing"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="Start free. Scale as you grow. No hidden fees, no surprises."
        />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 lg:mb-16">
          <CurrencyToggle value={currency} onChange={handleCurrencyChange} />
          <BillingToggle value={billing} onChange={handleBillingChange} />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {PLAN_DETAILS.map((plan, index) => (
            <PricingCard
              key={plan.tier}
              plan={plan}
              currency={currency}
              billing={billing}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
