import React from 'react';

interface BadgeProps {
  readonly children: React.ReactNode;
  readonly variant?: 'accent' | 'dark' | 'outline';
  readonly className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps['variant']>, string> = {
  accent: 'gradient-accent text-darkest',
  dark: 'bg-darkest text-background',
  outline: 'bg-transparent border border-dark-blue text-dark-blue',
};

export default function Badge({
  children,
  variant = 'accent',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full',
        'tracking-wide uppercase',
        VARIANT_CLASSES[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
