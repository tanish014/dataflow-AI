import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly children: React.ReactNode;
  readonly href?: string;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'gradient-accent text-darkest font-semibold shadow-premium hover:shadow-premium-lg hover:brightness-105',
  secondary:
    'bg-darkest text-background font-semibold hover:bg-dark-blue',
  outline:
    'bg-transparent border-2 border-darkest text-darkest font-semibold hover:bg-darkest hover:text-background',
  ghost:
    'bg-transparent text-dark-blue font-medium hover:bg-secondary',
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2',
    'transition-all duration-[180ms] ease-out',
    'cursor-pointer select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} className={classes} role="button">
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
