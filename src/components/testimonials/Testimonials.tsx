'use client';

import React, { memo } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { Testimonial } from '@/types';

const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 't1',
    quote:
      'DataFlow AI reduced our data processing time by 85%. What used to take our team days now happens automatically in minutes.',
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'Quantum Labs',
    avatarInitials: 'SC',
  },
  {
    id: 't2',
    quote:
      'The AI-powered anomaly detection caught a critical data quality issue that would have cost us millions. Worth every penny.',
    name: 'Marcus Rivera',
    role: 'Chief Data Officer',
    company: 'NexGen Systems',
    avatarInitials: 'MR',
  },
  {
    id: 't3',
    quote:
      'We evaluated 12 platforms before choosing DataFlow AI. The combination of ease-of-use and enterprise features is unmatched.',
    name: 'Emily Nakamura',
    role: 'Head of Analytics',
    company: 'Apex Dynamics',
    avatarInitials: 'EN',
  },
] as const;

interface TestimonialCardProps {
  readonly testimonial: Testimonial;
  readonly index: number;
  readonly isInView: boolean;
}

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  index,
  isInView,
}: TestimonialCardProps) {
  return (
    <article
      className={[
        'glass-card rounded-2xl p-6 lg:p-8 flex flex-col',
        'transition-all duration-[180ms] ease-out',
        'hover:-translate-y-1 hover:shadow-premium-lg',
        isInView ? 'animate-fade-in-up' : 'opacity-0',
      ].join(' ')}
      style={{ animationDelay: isInView ? `${index * 100}ms` : '0ms' }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#FFC801"
            aria-hidden="true"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 text-base text-darkest/80 leading-relaxed mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full gradient-dark flex items-center justify-center text-sm font-bold text-white">
          {testimonial.avatarInitials}
        </div>
        <div>
          <div className="text-sm font-bold text-darkest">
            {testimonial.name}
          </div>
          <div className="text-xs text-dark-blue/50">
            {testimonial.role} at {testimonial.company}
          </div>
        </div>
      </div>
    </article>
  );
});

function Testimonials() {
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 lg:py-32"
      aria-labelledby="testimonials-heading"
      id="testimonials"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="Trusted by Data Leaders"
          subtitle="See why hundreds of companies rely on DataFlow AI for their most critical data workflows."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Testimonials);
