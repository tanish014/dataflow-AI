'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface IntersectionOptions {
  readonly threshold?: number;
  readonly rootMargin?: string;
  readonly triggerOnce?: boolean;
}

/**
 * Custom hook for intersection observation.
 * Used for scroll-triggered entrance animations.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionOptions = {}
): {
  ref: React.RefObject<T | null>;
  isInView: boolean;
} {
  const { threshold = 0.15, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsInView(true);
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, handleIntersection]);

  return { ref, isInView };
}
