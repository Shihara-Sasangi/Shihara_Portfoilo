import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function elementIntersectsViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  return rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw;
}

type AnimatedOnScrollProps = {
  children: React.ReactNode;
  /** Stagger index (0-based) for sequential delay. Default 0. */
  staggerIndex?: number;
  /** Delay in ms per stagger index. Default 80. */
  staggerMs?: number;
  /** Root margin for Intersection Observer. */
  rootMargin?: string;
  /** Minimum fraction of element visible to trigger (0-1). Default 0.15. */
  threshold?: number;
  className?: string;
  /**
   * Trigger the same scroll reveal animation for every block on load (e.g. after Learn more), without
   * waiting for scroll. Still uses opacity/transform transitions + stagger delays.
   */
  revealImmediately?: boolean;
};

/** Location state set by Learn more links; read once per mount for detail pages. */
export function useRevealAnimationsFromNavigation(): boolean {
  const { state } = useLocation();
  return Boolean((state as { revealAnimations?: boolean } | null)?.revealAnimations);
}

export const AnimatedOnScroll: React.FC<AnimatedOnScrollProps> = ({
  children,
  staggerIndex = 0,
  staggerMs = 80,
  /** Matches reffer code useScrollRevealBidirectional defaults. */
  rootMargin = "0px 0px -80px 0px",
  threshold = 0.15,
  className = "",
  revealImmediately = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  /**
   * revealImmediately: keep initial hidden state for one paint, then show so CSS transitions run
   * (same as scroll reveal). Stagger comes from transitionDelay on the visible class.
   */
  useLayoutEffect(() => {
    if (revealImmediately) {
      let cancelled = false;
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          if (!cancelled) setIsVisible(true);
        });
      });
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf1);
        if (raf2) cancelAnimationFrame(raf2);
      };
    }
    const el = ref.current;
    if (!el) return;
    if (elementIntersectsViewport(el)) {
      setIsVisible(true);
    }
  }, [revealImmediately]);

  useEffect(() => {
    if (revealImmediately) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Bidirectional: replay entrance whenever the element re-enters the viewport
          requestAnimationFrame(() => {
            setIsVisible(entry.isIntersecting);
          });
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealImmediately, rootMargin, threshold]);

  const delayMs = staggerIndex * staggerMs;
  const style: React.CSSProperties = {
    transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
  };

  return (
    <div
      ref={ref}
      className={`animate-in-scroll ${isVisible ? "animate-in-scroll-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
};
