import React from "react";
/** Matches reffer code marketing-navigation.css: top 1.2rem, width 90%, max 1080px, padding ~0.65rem vertical */
export declare const Header: React.FC<{
    onNavigateSection?: (id: string) => void;
    onOpenCv?: () => void;
    /** "light" = always use white bar + dark nav (e.g. product detail on white background). Default uses dark bar over hero until scroll. */
    variant?: "default" | "light";
    /** Force which nav item is active (useful for routed detail pages). */
    activeSectionOverride?: string;
}>;
//# sourceMappingURL=Header.d.ts.map