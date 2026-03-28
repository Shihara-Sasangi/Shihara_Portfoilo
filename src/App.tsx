import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "./components/layout/Header";
import "./global.css";
import { Button } from "./components/ui/button";
import { AnimatedOnScroll } from "./components/ui/AnimatedOnScroll";
import { TechRail } from "./components/TechRail";
import { HomeHeroThreeBackground } from "./components/HomeHeroThreeBackground";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./components/ui/dialog";
import { CvPdfPreview } from "./components/CvPdfPreview";
import { EXPERIENCE, PROFILE, SKILLS } from "./content/profile";

const CV_URL = "/cv.pdf";

const Section: React.FC<{
  id: string;
  label: string;
  kicker?: string;
  description?: React.ReactNode;
  variant?: "default" | "white";
  children?: React.ReactNode;
}> = ({ id, label, kicker, description, variant = "default", children }) => {
  return (
    <section
      id={id}
      className={[
        "scroll-mt-32 border-b border-border/40",
        variant === "white" ? "bg-white" : "bg-white",
      ].join(" ")}
    >
      <div className="mx-auto relative z-[1] flex max-w-6xl flex-col gap-10 px-6 py-24 text-slate-800 md:py-32">
        <div className="max-w-2xl space-y-3">
          {kicker && (
            <AnimatedOnScroll staggerIndex={0}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {kicker}
              </p>
            </AnimatedOnScroll>
          )}
          <AnimatedOnScroll staggerIndex={kicker ? 1 : 0}>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {label}
            </h2>
          </AnimatedOnScroll>
          {description && (
            <AnimatedOnScroll staggerIndex={kicker ? 2 : 1}>
              {description}
            </AnimatedOnScroll>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

type HomeLocationState = { scrollToSectionId?: string };

export const App: React.FC = () => {
  const location = useLocation();
  const [isCvOpen, setIsCvOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const SCROLL_TOP_REVEAL_AFTER = 240;

  const heroSkills = useMemo(() => SKILLS.primary.slice(0, 8), []);

  /** After route navigation (e.g. Back from /projects/*), scroll to #section once DOM exists. */
  useEffect(() => {
    const state = location.state as HomeLocationState | null | undefined;
    const fromHash = location.hash.replace(/^#/, "");
    const id = state?.scrollToSectionId || fromHash;
    if (!id) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 120;

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.key, location.state, location.hash]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;
      lastScrollY.current = y;
      if (y < SCROLL_TOP_REVEAL_AFTER) {
        setShowScrollTop(false);
        return;
      }
      if (y < prev) setShowScrollTop(true);
      else if (y > prev) setShowScrollTop(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Header
        variant="default"
        onNavigateSection={handleNavigateSection}
        onOpenCv={() => setIsCvOpen(true)}
      />

      <main className="relative">
        <section
          id="home"
          className="home-hero scroll-mt-32 flex min-h-screen flex-col border-b border-border/40 pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]"
        >
          <HomeHeroThreeBackground />
          <div className="home-hero__content mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-6 py-16 md:flex-row md:items-center md:py-20">
            <div className="flex-1 space-y-7 text-center md:text-left">
              <AnimatedOnScroll staggerIndex={0}>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300/95">
                  {PROFILE.location}
                </p>
              </AnimatedOnScroll>

              <AnimatedOnScroll staggerIndex={1}>
                <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow-sm md:text-6xl md:leading-[1.08]">
                  {PROFILE.name}{" "}
                  <span className="bg-gradient-to-r from-emerald-200 via-primary to-lime-200 bg-clip-text text-transparent">
                    Portfolio
                  </span>
                </h1>
              </AnimatedOnScroll>

              <AnimatedOnScroll staggerIndex={2}>
                <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-300/95 md:mx-0 md:text-lg">
                  <span className="font-semibold text-white">{PROFILE.headline}</span>
                  <span className="text-white/60"> — </span>
                  {PROFILE.summary}
                </p>
              </AnimatedOnScroll>

              <AnimatedOnScroll staggerIndex={3}>
                <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                  <Button size="lg" onClick={() => handleNavigateSection("projects")}>
                    View projects
                  </Button>

                  <Dialog open={isCvOpen} onOpenChange={setIsCvOpen}>
                    <DialogContent className="!flex !max-h-[90dvh] !w-[92vw] !max-w-[92vw] flex-col overflow-hidden p-0 sm:!w-[50vw] sm:!max-w-[50vw]">
                      <div className="flex shrink-0 flex-col gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                        <div className="min-w-0 flex-1">
                          <DialogTitle>Curriculum Vitae</DialogTitle>
                          <DialogDescription>Preview and download.</DialogDescription>
                        </div>
                        <div className="relative z-10 flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:flex-shrink-0">
                          <a href={CV_URL} download className="inline-flex">
                            <Button size="sm">Download</Button>
                          </a>
                          <a href={CV_URL} target="_blank" rel="noreferrer" className="inline-flex">
                            <Button size="sm">Open</Button>
                          </a>
                          <Button
                            type="button"
                            size="sm"
                            className="!bg-red-600 !text-white hover:!bg-red-700 focus-visible:!ring-red-500"
                            onClick={() => setIsCvOpen(false)}
                          >
                            Go back
                          </Button>
                        </div>
                      </div>
                      <CvPdfPreview cvUrl={CV_URL} />
                    </DialogContent>
                  </Dialog>
                </div>
              </AnimatedOnScroll>

              <AnimatedOnScroll staggerIndex={4}>
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  {heroSkills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </AnimatedOnScroll>
            </div>
          </div>
        </section>

        <Section
          id="projects"
          label="Projects"
          kicker="Selected work"
          variant="white"
          description={
            <p className="text-base text-slate-700 md:text-lg">
              A few projects that show how I build interfaces, structure code, and polish
              interactions.
            </p>
          }
        >
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedOnScroll staggerIndex={0}>
              <div className="card-interactive group flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0">
                <div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">
                    Personal Projects
                  </h3>
                  <p className="text-sm text-slate-600">
                    Independent work and side projects.
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">Selected highlights</div>
                  <Link
                    to="/projects/personal"
                    state={{ revealAnimations: true }}
                    className="inline-flex"
                  >
                    <Button variant="product" size="sm">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedOnScroll>

            <AnimatedOnScroll staggerIndex={1}>
              <div className="card-interactive group flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0">
                <div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">
                    University Projects
                  </h3>
                  <p className="text-sm text-slate-600">
                    University projects completed during my degree.
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">Selected highlights</div>
                  <Link
                    to="/projects/university"
                    state={{ revealAnimations: true }}
                    className="inline-flex"
                  >
                    <Button variant="product" size="sm">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedOnScroll>
          </div>
        </Section>

        <TechRail />

        <Section
          id="experience"
          label="Experience"
          kicker="Where I’ve worked"
          description={<p className="text-base text-muted-foreground md:text-lg">A snapshot of roles and what I delivered.</p>}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedOnScroll staggerIndex={0}>
              <div className="card-interactive group flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0">
                <div>
                  <h3 className="mb-2 text-base font-semibold tracking-tight text-slate-900">
                    ACADEMIC MODULES
                  </h3>
                  <p className="text-sm text-slate-600">
                    Degree modules and IIT professional development courses.
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">Curriculum overview</div>
                  <Link
                    to="/experience/academic-modules"
                    state={{ revealAnimations: true }}
                    className="inline-flex"
                  >
                    <Button variant="product" size="sm">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedOnScroll>

            <AnimatedOnScroll staggerIndex={1}>
              <div className="card-interactive group flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0">
                <div>
                  <h3 className="mb-2 text-base font-semibold tracking-tight text-slate-900">
                    UNIVERSITY PARTICIPANTS
                  </h3>
                  <p className="text-sm text-slate-600">
                    Workshops, programmes, and group activities I joined.
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">Activities &amp; workshops</div>
                  <Link
                    to="/experience/university-participants"
                    state={{ revealAnimations: true }}
                    className="inline-flex"
                  >
                    <Button variant="product" size="sm">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedOnScroll>
          </div>

          {EXPERIENCE.length > 0 ? (
            <div className="mt-10 grid gap-6">
              {EXPERIENCE.map((e, i) => (
                <AnimatedOnScroll key={`${e.company}-${e.role}`} staggerIndex={i + 2}>
                  <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">
                          {e.role} · {e.company}
                        </h3>
                        <p className="text-sm text-slate-600">{e.period}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {SKILLS.primary.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                      {e.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </AnimatedOnScroll>
              ))}
            </div>
          ) : null}
        </Section>

        <Section
          id="contact"
          label="Contact"
          kicker="Let’s build something"
          variant="white"
          description={
            <p className="text-base text-slate-700 md:text-lg">
              Want to collaborate or hire me? Reach out and I’ll reply as soon as possible.
            </p>
          }
        >
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ...PROFILE.socials,
              { label: "Contact number", href: "tel:+94702088355" },
            ].map((s, i) => (
              <AnimatedOnScroll key={s.label} staggerIndex={i}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  className="block"
                >
                  <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 shadow-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {s.label}
                    </p>
                    <p className="mt-2 text-sm text-slate-700 break-words">
                      {s.label === "Email"
                        ? "shiharasasangi@gmail.com"
                        : s.href.startsWith("tel:")
                          ? "0702088355"
                          : s.href}
                    </p>
                    {s.href.startsWith("tel:") ? null : (
                      <div className="mt-4">
                        <Button variant="product" size="sm">
                          Open
                        </Button>
                      </div>
                    )}
                  </div>
                </a>
              </AnimatedOnScroll>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={CV_URL} download className="inline-flex">
              <Button size="lg">Download CV</Button>
            </a>
            <a href={CV_URL} target="_blank" rel="noreferrer" className="inline-flex">
              <Button variant="outline" size="lg">
                Open CV
              </Button>
            </a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border/60 bg-background/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <span className="hidden sm:inline">Built with React + TypeScript</span>
        </div>
      </footer>

      <div
        className={[
          "fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8",
          "transition-all duration-300 ease-out motion-reduce:transition-none",
          showScrollTop
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0",
        ].join(" ")}
        aria-hidden={!showScrollTop}
      >
        <Button
          type="button"
          variant="default"
          className="h-12 w-12 min-w-[3rem] rounded-full p-0 shadow-lg shadow-primary/25 ring-2 ring-primary/20 transition-transform hover:scale-105 active:scale-95"
          aria-label="Scroll to top"
          tabIndex={showScrollTop ? 0 : -1}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 shrink-0"
            aria-hidden
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

