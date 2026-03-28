import React from "react";
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
export declare function useRevealAnimationsFromNavigation(): boolean;
export declare const AnimatedOnScroll: React.FC<AnimatedOnScrollProps>;
export {};
//# sourceMappingURL=AnimatedOnScroll.d.ts.map