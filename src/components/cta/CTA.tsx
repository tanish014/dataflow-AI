'use client';

import React, { memo } from 'react';
import Button from '@/components/ui/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function CTA() {
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 lg:py-32"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={[
            'relative overflow-hidden rounded-3xl gradient-dark px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24 text-center',
            isInView ? 'animate-scale-in' : 'opacity-0',
          ].join(' ')}
        >
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
            aria-hidden="true"
          />

          {/* Glow Orbs */}
          <div
            className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl animate-glow-pulse"
            style={{ backgroundColor: 'rgba(255, 200, 1, 0.1)' }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl animate-glow-pulse"
            style={{
              backgroundColor: 'rgba(255, 153, 50, 0.08)',
              animationDelay: '2s',
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            >
              Ready to Transform
              <br />
              <span className="text-accent">Your Data Workflows?</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Join 500+ companies already using DataFlow AI to automate their
              data operations. Start your free trial today.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg">
                Start Free Trial
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                Schedule a Demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/40">
              No credit card required · 14-day free trial · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CTA);
