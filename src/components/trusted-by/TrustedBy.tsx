'use client';

import React, { memo } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

/* Simple SVG "logos" representing trusted companies */
const COMPANIES = [
  { name: 'Quantum Labs', initials: 'QL' },
  { name: 'NexGen Systems', initials: 'NG' },
  { name: 'Apex Dynamics', initials: 'AD' },
  { name: 'Orion Cloud', initials: 'OC' },
  { name: 'Vertex AI', initials: 'VA' },
  { name: 'Prism Data', initials: 'PD' },
  { name: 'Atlas Corp', initials: 'AC' },
  { name: 'Stratos Inc', initials: 'SI' },
] as const;

interface LogoItemProps {
  readonly name: string;
  readonly initials: string;
}

const LogoItem = memo(function LogoItem({ name, initials }: LogoItemProps) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center gap-2 px-8 sm:px-10 grayscale opacity-40 transition-all duration-[180ms] ease-out hover:grayscale-0 hover:opacity-100"
      title={name}
    >
      <div className="w-8 h-8 rounded-lg bg-darkest/10 flex items-center justify-center">
        <span className="text-xs font-bold font-heading text-darkest/70">
          {initials}
        </span>
      </div>
      <span className="text-sm font-semibold text-darkest/50 whitespace-nowrap hidden sm:inline">
        {name}
      </span>
    </div>
  );
});

function TrustedBy() {
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className={[
        'py-12 sm:py-16 border-y border-darkest/5',
        isInView ? 'animate-fade-in' : 'opacity-0',
      ].join(' ')}
      aria-label="Trusted by leading companies"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs sm:text-sm font-semibold tracking-widest uppercase text-dark-blue/40 mb-8">
          Trusted by 500+ data-driven companies
        </p>

        {/* Logo Carousel — infinite scroll */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10"
            style={{
              background:
                'linear-gradient(to right, var(--color-background), transparent)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10"
            style={{
              background:
                'linear-gradient(to left, var(--color-background), transparent)',
            }}
            aria-hidden="true"
          />

          <div className="flex animate-scroll-logos" aria-hidden="true">
            {/* Double the logos for seamless loop */}
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <LogoItem
                key={`${company.name}-${i}`}
                name={company.name}
                initials={company.initials}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(TrustedBy);
