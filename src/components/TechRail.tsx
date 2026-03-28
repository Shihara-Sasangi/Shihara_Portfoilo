import React, { useEffect, useRef } from "react";
import { AnimatedOnScroll } from "./ui/AnimatedOnScroll";
import { SKILLS } from "../content/profile";

export const TechRail: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const items = [...SKILLS.primary, ...SKILLS.secondary].filter(Boolean);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const pause = () => {
      rail.style.animationPlayState = "paused";
    };
    const resume = () => {
      rail.style.animationPlayState = "running";
    };
    rail.addEventListener("mouseenter", pause);
    rail.addEventListener("mouseleave", resume);
    return () => {
      rail.removeEventListener("mouseenter", pause);
      rail.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="tech-rail" id="skills" aria-label="Skills">
      <div className="tech-rail__container">
        <AnimatedOnScroll>
          <div className="tech-rail-header">
            <p className="tech-rail-eyebrow">Skills</p>
            <h2 className="tech-rail-title">Tools I Build With</h2>
          </div>
        </AnimatedOnScroll>
      </div>
      <div ref={railRef} className="tech-rail-track">
        {[...items, ...items].map((t, i) => (
          <div key={`${t}-${i}`} className="tech-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="3" className="tech-item-dot" />
            </svg>
            <span className="tech-label">{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
