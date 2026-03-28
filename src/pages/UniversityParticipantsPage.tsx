import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Button } from "../components/ui/button";
import {
  AnimatedOnScroll,
  useRevealAnimationsFromNavigation,
} from "../components/ui/AnimatedOnScroll";
import { UNIVERSITY_PARTICIPANTS_ITEMS } from "../content/profile";

export const UniversityParticipantsPage: React.FC<{
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
        activeSectionOverride="experience"
        {...(onNavigateSection ? { onNavigateSection } : {})}
      />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <AnimatedOnScroll staggerIndex={0} revealImmediately={revealImmediately}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Education
              </p>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={1} revealImmediately={revealImmediately}>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                University participants
              </h1>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={2} revealImmediately={revealImmediately}>
              <p className="text-sm text-slate-600 md:text-base">
                Programmes, workshops, and activities I took part in at university.
              </p>
            </AnimatedOnScroll>
          </div>

          <AnimatedOnScroll staggerIndex={3} revealImmediately={revealImmediately}>
            {onNavigateSection ? (
              <Button variant="default" onClick={() => onNavigateSection("experience")}>
                Back
              </Button>
            ) : (
              <Link to="/" state={{ scrollToSectionId: "experience" }} className="inline-flex">
                <Button variant="default">Back</Button>
              </Link>
            )}
          </AnimatedOnScroll>
        </div>

        <AnimatedOnScroll staggerIndex={4} revealImmediately={revealImmediately}>
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
              University participants
            </h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-700">
              {UNIVERSITY_PARTICIPANTS_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </AnimatedOnScroll>
      </main>
    </div>
  );
};
