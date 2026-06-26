'use client';

import React, { memo, useEffect, useRef, useCallback, useState } from 'react';
import Button from '@/components/ui/Button';
import type { HeroStat } from '@/types';

const HERO_STATS: readonly HeroStat[] = [
  { label: 'Data Points Processed', value: 2400000000, suffix: 'B+', prefix: '' },
  { label: 'Enterprise Clients', value: 500, suffix: '+', prefix: '' },
  { label: 'Uptime SLA', value: 99, suffix: '.99%', prefix: '' },
  { label: 'Faster Workflows', value: 10, suffix: 'x', prefix: '' },
] as const;

/* ---------- Floating Icon ---------- */

interface FloatingIconProps {
  readonly d: string;
  readonly className: string;
  readonly delay: string;
}

const FloatingIcon = memo(function FloatingIcon({
  d,
  className,
  delay,
}: FloatingIconProps) {
  return (
    <div
      className={`absolute opacity-[0.08] ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-darkest w-10 h-10 sm:w-12 sm:h-12"
      >
        <path d={d} />
      </svg>
    </div>
  );
});

const FLOATING_ICONS: readonly FloatingIconProps[] = [
  {
    d: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    className: 'top-[15%] left-[8%] animate-float',
    delay: '0s',
  },
  {
    d: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
    className: 'top-[20%] right-[10%] animate-float-reverse',
    delay: '1s',
  },
  {
    d: 'M22 12h-4l-3 9L9 3l-3 9H2',
    className: 'bottom-[25%] left-[12%] animate-float',
    delay: '2s',
  },
  {
    d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    className: 'bottom-[20%] right-[8%] animate-float-reverse',
    delay: '0.5s',
  },
  {
    d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    className: 'top-[45%] left-[5%] animate-float',
    delay: '1.5s',
  },
];

/* ---------- Glowing Orb ---------- */

interface GlowOrbProps {
  readonly color: string;
  readonly size: string;
  readonly position: string;
  readonly delay: string;
}

const GlowOrb = memo(function GlowOrb({
  color,
  size,
  position,
  delay,
}: GlowOrbProps) {
  return (
    <div
      className={`absolute rounded-full blur-3xl animate-glow-pulse ${position} ${size}`}
      style={{ backgroundColor: color, animationDelay: delay }}
      aria-hidden="true"
    />
  );
});

const GLOW_ORBS: readonly GlowOrbProps[] = [
  {
    color: 'rgba(255, 200, 1, 0.12)',
    size: 'w-64 h-64 sm:w-80 sm:h-80',
    position: 'top-[10%] -left-20',
    delay: '0s',
  },
  {
    color: 'rgba(255, 153, 50, 0.08)',
    size: 'w-72 h-72 sm:w-96 sm:h-96',
    position: 'top-[5%] -right-24',
    delay: '2s',
  },
  {
    color: 'rgba(17, 76, 90, 0.06)',
    size: 'w-56 h-56 sm:w-72 sm:h-72',
    position: 'bottom-[5%] left-[30%]',
    delay: '1s',
  },
];

/* ---------- Stat Counter ---------- */

interface StatCounterProps {
  readonly stat: HeroStat;
  readonly delay: number;
}

const StatCounter = memo(function StatCounter({ stat, delay }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200;
    const startTime = performance.now();
    const targetValue = stat.value;

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* ease-out cubic */
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(easedProgress * targetValue);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    setTimeout(() => requestAnimationFrame(step), delay);
  }, [stat.value, delay]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [animate]);

  const formatStatValue = (value: number): string => {
    if (stat.suffix === 'B+') {
      return `${(value / 1000000000).toFixed(1)}`;
    }
    return value.toLocaleString();
  };

  return (
    <div
      ref={elementRef}
      className="text-center px-2"
    >
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-darkest">
        {stat.prefix}
        {formatStatValue(displayValue)}
        {stat.suffix}
      </div>
      <div className="mt-1 text-xs sm:text-sm text-dark-blue/60 font-medium">
        {stat.label}
      </div>
    </div>
  );
});

/* ---------- Hero Component ---------- */

function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-[90vh] sm:min-h-[85vh] flex items-center"
      aria-labelledby="hero-heading"
    >
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background:
            'linear-gradient(135deg, #F1F6F4 0%, #D9E8E2 25%, #F1F6F4 50%, #D9E8E2 75%, #F1F6F4 100%)',
          backgroundSize: '400% 400%',
        }}
        aria-hidden="true"
      />

      {/* Floating Icons */}
      {FLOATING_ICONS.map((icon, i) => (
        <FloatingIcon key={i} {...icon} />
      ))}

      {/* Glowing Orbs */}
      {GLOW_ORBS.map((orb, i) => (
        <GlowOrb key={i} {...orb} />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full bg-accent/10 text-darkest border border-accent/20">
              <span
                className="w-2 h-2 rounded-full bg-accent animate-subtle-bounce"
                aria-hidden="true"
              />
              Now in Public Beta
            </span>
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <span className="gradient-text">Automate Your Data.</span>
            <br />
            <span className="text-darkest">Accelerate Your Business.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-6 text-lg sm:text-xl lg:text-2xl text-dark-blue/70 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            The AI-powered platform that transforms complex data workflows into
            intelligent, self-optimizing pipelines.
          </p>

          {/* CTAs */}
          <div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
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
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div
            className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            {HERO_STATS.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} delay={i * 150} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
