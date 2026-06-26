'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface SectionHeadingProps {
  readonly badge?: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly centered?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={[
        'max-w-3xl mb-12 md:mb-16',
        centered ? 'mx-auto text-center' : '',
        isInView ? 'animate-fade-in-up' : 'opacity-0',
      ].join(' ')}
    >
      {badge && (
        <span className="inline-flex items-center px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-secondary text-dark-blue border border-dark-blue/10">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-darkest">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg sm:text-xl text-dark-blue/70 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
