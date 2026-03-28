import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Button } from "../components/ui/button";
import {
  AnimatedOnScroll,
  useRevealAnimationsFromNavigation,
} from "../components/ui/AnimatedOnScroll";
import {
  ACADEMIC_MODULES,
  PROFESSIONAL_DEVELOPMENT_IIT,
} from "../content/profile";

export const AcademicModulesPage: React.FC<{
  onNavigateSection?: (id: string) => void;
}> = ({ onNavigateSection }) => {
  const revealImmediately = useRevealAnimationsFromNavigation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const { columnA, columnB } = useMemo(() => {
    const mid = Math.ceil(ACADEMIC_MODULES.length / 2);
    return {
      columnA: ACADEMIC_MODULES.slice(0, mid),
      columnB: ACADEMIC_MODULES.slice(mid),
    };
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
                Academic modules
              </h1>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={2} revealImmediately={revealImmediately}>
              <p className="text-sm text-slate-600 md:text-base">
                Modules completed during my degree, plus professional development courses at IIT.
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
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
              Academic modules
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                {columnA.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                {columnB.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </AnimatedOnScroll>

        <AnimatedOnScroll staggerIndex={5} revealImmediately={revealImmediately}>
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
              Professional Development Unit (IIT)
            </h2>
            <ul className="mt-6 space-y-5">
              {PROFESSIONAL_DEVELOPMENT_IIT.map((row) => (
                <li
                  key={row.course}
                  className="flex flex-col gap-1 border-b border-slate-100 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-sm font-medium text-slate-900">{row.course}</span>
                  <span className="text-sm text-slate-600">
                    <span className="text-slate-500">Completed:</span> {row.completed}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </AnimatedOnScroll>
      </main>
    </div>
  );
};
