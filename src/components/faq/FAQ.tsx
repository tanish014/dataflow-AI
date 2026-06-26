'use client';

import React, { useState, useCallback, memo } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { FAQItem as FAQItemType } from '@/types';

const FAQ_DATA: readonly FAQItemType[] = [
  {
    id: 'faq-1',
    question: 'How does DataFlow AI differ from traditional ETL tools?',
    answer:
      'Unlike traditional ETL tools that require manual configuration and maintenance, DataFlow AI uses machine learning to automatically detect data patterns, optimize transformations, and self-heal when errors occur. This reduces setup time by 90% and eliminates most manual intervention.',
  },
  {
    id: 'faq-2',
    question: 'What data sources does DataFlow AI support?',
    answer:
      'We support 200+ integrations including all major databases (PostgreSQL, MySQL, MongoDB, Snowflake), cloud services (AWS S3, GCP BigQuery, Azure Blob), SaaS applications (Salesforce, HubSpot, Stripe), and REST/GraphQL APIs. Custom connectors can be built in minutes.',
  },
  {
    id: 'faq-3',
    question: 'Is my data secure with DataFlow AI?',
    answer:
      'Absolutely. We are SOC 2 Type II certified with end-to-end encryption (AES-256 at rest, TLS 1.3 in transit). We offer role-based access control, audit logging, data masking, and comply with GDPR, CCPA, and HIPAA. Your data never leaves your chosen region.',
  },
  {
    id: 'faq-4',
    question: 'Can I try DataFlow AI before committing?',
    answer:
      'Yes! Our Starter plan includes a 14-day free trial with full access to all features. No credit card required. Our Pro plan also offers a 14-day trial. Enterprise customers can schedule a personalized demo with our solutions team.',
  },
  {
    id: 'faq-5',
    question: 'How does pricing work when I scale?',
    answer:
      'Pricing is based on your plan tier and usage. As you grow, you can upgrade plans seamlessly. Yearly billing saves you exactly 20%. Enterprise customers get custom pricing with volume discounts, dedicated support, and SLA guarantees.',
  },
  {
    id: 'faq-6',
    question: 'What kind of support do you offer?',
    answer:
      'Starter plans include email support with 24-hour response time. Pro plans get priority support with 4-hour response time and live chat. Enterprise customers receive 24/7 dedicated support with a named account manager, on-call engineering, and guaranteed SLA.',
  },
] as const;

/* ============================================================
 * FAQ Item — Custom Accordion
 * ============================================================ */

interface FAQItemProps {
  readonly item: FAQItemType;
  readonly isOpen: boolean;
  readonly index: number;
  readonly isInView: boolean;
  readonly onToggle: () => void;
}

const FAQItem = memo(function FAQItem({
  item,
  isOpen,
  index,
  isInView,
  onToggle,
}: FAQItemProps) {
  const contentId = `faq-content-${item.id}`;
  const triggerId = `faq-trigger-${item.id}`;

  return (
    <div
      className={[
        'border-b border-darkest/5 last:border-b-0',
        isInView ? 'animate-fade-in-up' : 'opacity-0',
      ].join(' ')}
      style={{ animationDelay: isInView ? `${index * 60}ms` : '0ms' }}
    >
      <button
        id={triggerId}
        className="w-full flex items-center justify-between py-5 sm:py-6 text-left cursor-pointer group"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="text-base sm:text-lg font-semibold text-darkest pr-8 group-hover:text-dark-blue transition-colors duration-[180ms]">
          {item.question}
        </span>

        {/* Plus/Minus Icon */}
        <div
          className={[
            'flex-shrink-0 w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center',
            'transition-all duration-[350ms] ease-in-out',
            isOpen ? 'bg-accent/20 rotate-45' : '',
          ].join(' ')}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-darkest"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className="overflow-hidden transition-all duration-[350ms] ease-in-out"
        style={{
          maxHeight: isOpen ? '300px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="pb-5 sm:pb-6 text-sm sm:text-base text-dark-blue/60 leading-relaxed pr-12">
          {item.answer}
        </p>
      </div>
    </div>
  );
});

/* ============================================================
 * FAQ Section
 * ============================================================ */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
  });

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 lg:py-32"
      aria-labelledby="faq-heading"
      id="faq"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about DataFlow AI."
        />

        <div className="glass-card rounded-2xl px-6 sm:px-8">
          {FAQ_DATA.map((item, index) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openIndex === index}
              index={index}
              isInView={isInView}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
