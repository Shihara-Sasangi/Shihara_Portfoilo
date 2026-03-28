import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Button } from "../components/ui/button";
import {
  AnimatedOnScroll,
  useRevealAnimationsFromNavigation,
} from "../components/ui/AnimatedOnScroll";
import { UNIVERSITY_PROJECTS } from "../content/profile";

const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium break-all">
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

export const UniversityProjectsPage: React.FC<{
  onNavigateSection?: (id: string) => void;
}> = ({ onNavigateSection }) => {
  const revealImmediately = useRevealAnimationsFromNavigation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header
        variant="light"
        activeSectionOverride="projects"
        {...(onNavigateSection ? { onNavigateSection } : {})}
      />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <AnimatedOnScroll staggerIndex={0} revealImmediately={revealImmediately}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Selected work
              </p>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={1} revealImmediately={revealImmediately}>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {UNIVERSITY_PROJECTS.title}
              </h1>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={2} revealImmediately={revealImmediately}>
              <p className="text-sm text-slate-600 md:text-base">{UNIVERSITY_PROJECTS.summary}</p>
            </AnimatedOnScroll>
          </div>

          <AnimatedOnScroll staggerIndex={3} revealImmediately={revealImmediately}>
            {onNavigateSection ? (
              <Button variant="default" onClick={() => onNavigateSection("projects")}>
                Back
              </Button>
            ) : (
              <Link to="/" state={{ scrollToSectionId: "projects" }} className="inline-flex">
                <Button variant="default">Back</Button>
              </Link>
            )}
          </AnimatedOnScroll>
        </div>

        <div className="mt-8 grid gap-3 md:gap-4">
          {UNIVERSITY_PROJECTS.points.map((p, i) => (
            <AnimatedOnScroll
              key={p}
              staggerIndex={4 + i}
              revealImmediately={revealImmediately}
            >
              <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                <p className="text-sm leading-relaxed text-slate-700">{renderTextWithLinks(p)}</p>
              </div>
            </AnimatedOnScroll>
          ))}
        </div>
      </main>
    </div>
  );
};

