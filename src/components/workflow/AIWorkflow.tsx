'use client';

import React, { memo } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const WORKFLOW_STEPS = [
  {
    id: 'connect',
    title: 'Connect',
    description: 'Link your data sources in seconds — databases, APIs, cloud storage, and more.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    id: 'transform',
    title: 'Transform',
    description: 'AI automatically cleans, maps, and transforms your data with intelligent schemas.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    id: 'analyze',
    title: 'Analyze',
    description: 'Machine learning models detect patterns, anomalies, and deliver predictive insights.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: 'automate',
    title: 'Automate',
    description: 'Deploy self-optimizing pipelines that run 24/7 with built-in error recovery.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
] as const;

function AIWorkflow() {
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 lg:py-32"
      aria-labelledby="workflow-heading"
      id="workflow"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="How It Works"
          title="Four Steps to Intelligent Automation"
          subtitle="From raw data to actionable insights — our AI handles the complexity so your team can focus on what matters."
        />

        <div className="relative mt-12 lg:mt-16">
          {/* Connection Line (desktop) */}
          <div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2"
            aria-hidden="true"
          >
            <svg
              className="w-full h-2"
              preserveAspectRatio="none"
            >
              <line
                x1="12%"
                y1="50%"
                x2="88%"
                y2="50%"
                stroke="#D9E8E2"
                strokeWidth="2"
                strokeDasharray="8 6"
                className={isInView ? 'animate-dash-flow' : ''}
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {WORKFLOW_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={[
                  'relative glass-card rounded-2xl p-6 lg:p-8 text-center',
                  'transition-all duration-[180ms] ease-out',
                  'hover:-translate-y-1 hover:shadow-premium-lg',
                  isInView ? 'animate-fade-in-up' : 'opacity-0',
                ].join(' ')}
                style={{
                  animationDelay: isInView ? `${index * 100}ms` : '0ms',
                }}
              >
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-darkest shadow-premium">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mx-auto mt-2 w-14 h-14 rounded-xl bg-secondary/60 flex items-center justify-center text-dark-blue mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-darkest font-heading">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-dark-blue/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AIWorkflow);
