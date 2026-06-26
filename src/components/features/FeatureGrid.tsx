'use client';

import React, { useState, useCallback, memo } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import SectionHeading from '@/components/ui/SectionHeading';
import { FEATURES } from '@/components/features/feature-data';
import type { Feature, FeatureIconType } from '@/types';

/* ============================================================
 * Feature Icon SVGs
 * ============================================================ */

function FeatureIcon({ type }: { readonly type: FeatureIconType }) {
  const iconPaths: Record<FeatureIconType, string> = {
    automation:
      'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83',
    analytics:
      'M18 20V10M12 20V4M6 20v-6',
    integration:
      'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
    security:
      'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    speed:
      'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    collaboration:
      'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[type]} />
    </svg>
  );
}

/* ============================================================
 * Bento Card (Desktop)
 * ============================================================ */

interface BentoCardProps {
  readonly feature: Feature;
  readonly isActive: boolean;
  readonly index: number;
  readonly isInView: boolean;
  readonly onMouseEnter: () => void;
  readonly onMouseLeave: () => void;
}

const BentoCard = memo(function BentoCard({
  feature,
  isActive,
  index,
  isInView,
  onMouseEnter,
  onMouseLeave,
}: BentoCardProps) {
  return (
    <div
      className={[
        'relative group rounded-2xl p-6 lg:p-8 cursor-pointer',
        'transition-all duration-[180ms] ease-out',
        'glass-card',
        feature.span === 'wide' ? 'lg:col-span-2' : '',
        isActive
          ? '-translate-y-1 shadow-premium-lg shadow-glow-accent'
          : 'hover:-translate-y-1 hover:shadow-premium-lg',
        isInView ? 'animate-fade-in-up' : 'opacity-0',
      ].join(' ')}
      style={{ animationDelay: isInView ? `${index * 80}ms` : '0ms' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="article"
    >
      {/* Gradient border glow on active/hover */}
      <div
        className={[
          'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-[180ms] -z-10',
          isActive ? 'opacity-100' : 'group-hover:opacity-60',
        ].join(' ')}
        style={{
          background: feature.gradient,
          filter: 'blur(20px)',
          transform: 'scale(1.02)',
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className={[
          'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
          'transition-transform duration-[180ms] ease-out',
          isActive ? 'scale-110' : 'group-hover:scale-105',
        ].join(' ')}
        style={{ background: feature.gradient }}
      >
        <span className="text-white">
          <FeatureIcon type={feature.icon} />
        </span>
      </div>

      {/* Content */}
      <h3 className={[
        "text-lg lg:text-xl font-bold font-heading transition-colors duration-[180ms]",
        isActive && feature.isDarkTheme ? "text-white" : "text-darkest"
      ].join(' ')}>
        {feature.title}
      </h3>
      <p className={[
        "mt-2 text-sm lg:text-base leading-relaxed transition-colors duration-[180ms]",
        isActive && feature.isDarkTheme ? "text-white/80" : "text-dark-blue/60"
      ].join(' ')}>
        {feature.description}
      </p>
    </div>
  );
});

/* ============================================================
 * Accordion Item (Mobile)
 * ============================================================ */

interface AccordionItemProps {
  readonly feature: Feature;
  readonly isOpen: boolean;
  readonly index: number;
  readonly isInView: boolean;
  readonly onToggle: () => void;
}

const AccordionItem = memo(function AccordionItem({
  feature,
  isOpen,
  index,
  isInView,
  onToggle,
}: AccordionItemProps) {
  const contentId = `feature-content-${feature.id}`;
  const triggerId = `feature-trigger-${feature.id}`;

  return (
    <div
      className={[
        'glass-card rounded-xl overflow-hidden',
        'transition-all duration-[180ms] ease-out',
        isOpen ? 'shadow-premium-lg' : '',
        isInView ? 'animate-fade-in-up' : 'opacity-0',
      ].join(' ')}
      style={{ animationDelay: isInView ? `${index * 60}ms` : '0ms' }}
    >
      <button
        id={triggerId}
        className="w-full flex items-center gap-4 p-4 sm:p-5 text-left cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
          style={{ background: feature.gradient }}
        >
          <span className="text-white">
            <FeatureIcon type={feature.icon} />
          </span>
        </div>

        {/* Title */}
        <span className="flex-1 font-bold text-darkest font-heading text-base">
          {feature.title}
        </span>

        {/* Toggle Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={[
            'text-dark-blue/40 flex-shrink-0',
            'transition-transform duration-[350ms] ease-in-out',
            isOpen ? 'rotate-180' : 'rotate-0',
          ].join(' ')}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Expandable Content */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className="overflow-hidden transition-all duration-[350ms] ease-in-out"
        style={{
          maxHeight: isOpen ? '200px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
          <p className="text-sm text-dark-blue/60 leading-relaxed pl-14">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
});

/* ============================================================
 * Feature Grid — Orchestrator
 *
 * Manages a single `activeIndex` state that persists across
 * desktop ↔ mobile layout transitions.
 *
 * Desktop: Bento Grid — activeIndex = hovered card
 * Mobile: Accordion — activeIndex = open accordion item
 * ============================================================ */

export default function FeatureGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
  });

  const handleHover = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    /* Keep last hovered state for persistence */
  }, []);

  const handleToggle = useCallback(
    (index: number) => {
      setActiveIndex((prev) => (prev === index ? null : index));
    },
    []
  );

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 lg:py-32"
      aria-labelledby="features-heading"
      id="features"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Features"
          title="Everything You Need to Master Your Data"
          subtitle="A complete suite of AI-powered tools designed for modern data teams."
        />

        {isDesktop ? (
          /* ---- Desktop: Bento Grid ---- */
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {FEATURES.map((feature, index) => (
              <BentoCard
                key={feature.id}
                feature={feature}
                isActive={activeIndex === index}
                index={index}
                isInView={isInView}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleHoverEnd}
              />
            ))}
          </div>
        ) : (
          /* ---- Mobile: Accordion ---- */
          <div className="flex flex-col gap-3">
            {FEATURES.map((feature, index) => (
              <AccordionItem
                key={feature.id}
                feature={feature}
                isOpen={activeIndex === index}
                index={index}
                isInView={isInView}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
