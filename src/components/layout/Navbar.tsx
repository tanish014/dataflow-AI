'use client';

import React, { useState, useCallback, memo } from 'react';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
] as const;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full glass border-b border-white/20"
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-18"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-darkest font-bold text-xl tracking-tight"
          aria-label="DataFlow AI — Home"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="8" fill="#172B36" />
            <path
              d="M8 16L14 10L20 16L14 22L8 16Z"
              fill="#FFC801"
              opacity="0.9"
            />
            <path
              d="M14 16L20 10L26 16L20 22L14 16Z"
              fill="#FF9932"
              opacity="0.7"
            />
          </svg>
          <span className="font-heading hidden sm:inline">DataFlow</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8" role="menubar">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-dark-blue/80 transition-colors duration-[180ms] ease-out hover:text-darkest"
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="primary" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-[180ms] hover:bg-secondary"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-darkest"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={[
          'lg:hidden overflow-hidden transition-all duration-[350ms] ease-in-out',
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        role="menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="px-4 pb-6 pt-2 space-y-1 border-t border-white/20">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-base font-medium text-dark-blue/80 rounded-lg transition-colors duration-[180ms] hover:bg-secondary hover:text-darkest"
              onClick={closeMenu}
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <Button variant="outline" size="md" className="w-full">
              Sign In
            </Button>
            <Button variant="primary" size="md" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Navbar);
