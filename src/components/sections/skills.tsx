"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type TimelineSide = "left" | "right";

type TimelineSkill = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  side: TimelineSide;
};

const TIMELINE_SKILLS: TimelineSkill[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description:
      "Building polished, accessible interfaces with React and Next.js, optimized for clarity, responsiveness, and long-term maintainability.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    side: "right",
  },
  {
    id: "backend",
    title: "Backend Systems",
    description:
      "Designing stable service layers, APIs, and business logic with Node.js to support reliable product behavior at scale.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <rect x="4" y="5" width="16" height="5" rx="1.6" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <rect x="4" y="14" width="16" height="5" rx="1.6" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </svg>
    ),
    side: "left",
  },
  {
    id: "architecture",
    title: "Clean Architecture",
    description:
      "Structuring codebases around modular boundaries, predictable data flow, and developer-friendly patterns for fast iteration.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M12 4 4 8.5 12 13 20 8.5 12 4Z" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M4 12.5 12 17l8-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    side: "right",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description:
      "Improving loading speed, rendering efficiency, and runtime responsiveness through practical profiling and targeted tuning.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </svg>
    ),
    side: "left",
  },
  {
    id: "dx",
    title: "Delivery & DX",
    description:
      "Maintaining high engineering velocity with clean workflows, quality guardrails, and production-ready implementation standards.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    side: "right",
  },
];

const TIMELINE_TIMING = {
  lineStep: 420,
  iconDelay: 130,
  cardDelay: 220,
  betweenItems: 130,
} as const;

type TimelineLineProps = {
  progress: number;
  lineRef: React.RefObject<HTMLDivElement | null>;
};

function VerticalTimelineLine({ progress, lineRef }: TimelineLineProps) {
  return (
    <div
      ref={lineRef}
      className="pointer-events-none absolute bottom-0 right-5 top-0 w-px sm:right-6 md:right-7 lg:left-1/2 lg:right-auto lg:-translate-x-1/2"
      aria-hidden
    >
      <div className="absolute inset-0 bg-linear-to-b from-green-100 via-green-50 to-slate-100 dark:from-emerald-200/8 dark:via-emerald-200/12 dark:to-white/6" />
      <motion.div
        className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 rounded-full bg-linear-to-b from-green-600 via-green-700 to-green-800 shadow-[0_0_22px_rgba(34,197,94,0.28)] dark:from-emerald-300/80 dark:via-emerald-300/72 dark:to-emerald-200/65 dark:shadow-[0_0_22px_rgba(16,185,129,0.34)]"
        initial={{ height: "0%" }}
        animate={{ height: `${progress * 100}%` }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

type IconNodeProps = {
  icon: React.ReactNode;
  active: boolean;
};

function TimelineIconNode({ icon, active }: IconNodeProps) {
  return (
    <motion.div
      className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full border border-green-200 bg-green-100 text-green-700 shadow-[0_0_14px_rgba(34,197,94,0.18)] dark:border-emerald-200/40 dark:bg-linear-to-br dark:from-emerald-200/90 dark:to-emerald-100/80 dark:text-emerald-950 dark:shadow-[0_0_18px_rgba(16,185,129,0.32)]"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.7 }}
      transition={{ duration: 0.2, ease: [0.32, 1, 0.68, 1] }}
      aria-hidden
    >
      {icon}
      <span className="absolute -inset-2 rounded-full bg-green-100 blur-md dark:bg-emerald-300/16" />
    </motion.div>
  );
}

type SkillCardProps = {
  title: string;
  description: string;
  side: TimelineSide;
  visible: boolean;
};

function SkillCard({ title, description, side, visible }: SkillCardProps) {
  const fromRight = side === "right";

  return (
    <motion.article
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 0 : fromRight ? 16 : -16,
        scaleX: visible ? 1 : 0.92,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-(--border-soft) bg-(--surface) shadow-[0_18px_40px_-30px_rgba(15,23,42,0.24)] backdrop-blur-md dark:shadow-[0_18px_40px_-30px_rgba(0,0,0,0.9)]",
        !visible && "pointer-events-none",
      )}
      style={{ transformOrigin: fromRight ? "left center" : "right center" }}
    >
      <div className="h-1.5 w-full bg-linear-to-r from-green-600 via-green-700 to-green-800 dark:from-emerald-300/65 dark:via-emerald-200/60 dark:to-white/45" />
      <div className="p-4 sm:p-5 lg:p-6">
        <h3 className="text-base font-semibold tracking-tight text-heading sm:text-lg">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </motion.article>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const lineHostRef = useRef<HTMLDivElement>(null);
  const iconPointRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stopProgressRef = useRef<number[]>(
    TIMELINE_SKILLS.map((_, index) => (index + 1) / TIMELINE_SKILLS.length),
  );

  const [lineProgress, setLineProgress] = useState(0);
  const [iconsVisible, setIconsVisible] = useState<boolean[]>(() => TIMELINE_SKILLS.map(() => false));
  const [cardsVisible, setCardsVisible] = useState<boolean[]>(() => TIMELINE_SKILLS.map(() => false));

  const hasStartedRef = useRef(false);

  useEffect(() => {
    const computeStops = () => {
      const lineHost = lineHostRef.current;
      if (!lineHost) return;

      const lineRect = lineHost.getBoundingClientRect();
      const nextStops = iconPointRefs.current.map((node, index) => {
        if (!node || lineRect.height <= 0) {
          return (index + 1) / TIMELINE_SKILLS.length;
        }

        const nodeRect = node.getBoundingClientRect();
        const centerY = nodeRect.top + nodeRect.height / 2;
        const relative = (centerY - lineRect.top) / lineRect.height;
        return Math.max(0, Math.min(1, relative));
      });

      if (nextStops.length === TIMELINE_SKILLS.length) {
        stopProgressRef.current = nextStops;
      }
    };

    const raf = window.requestAnimationFrame(computeStops);
    window.addEventListener("resize", computeStops);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", computeStops);
    };
  }, []);

  useEffect(() => {
    if (!isInView || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const timeouts: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timeouts.push(id);
      });

    const runSequence = async () => {
      for (let i = 0; i < TIMELINE_SKILLS.length; i += 1) {
        const stopProgress = stopProgressRef.current[i] ?? (i + 1) / TIMELINE_SKILLS.length;
        setLineProgress(stopProgress);
        await wait(TIMELINE_TIMING.lineStep);

        setIconsVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        await wait(TIMELINE_TIMING.iconDelay);

        setCardsVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        await wait(TIMELINE_TIMING.cardDelay);
        await wait(TIMELINE_TIMING.betweenItems);
      }
    };

    void runSequence();

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [isInView]);

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-14 h-64 w-64 rounded-full bg-green-100 blur-[120px] dark:bg-emerald-400/12" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-sky-300/12 blur-[140px] dark:bg-[#d4c6ac]/10" />
      </div>
      <Container>
        <SectionHeading
          eyebrow="Tech Stack"
          title="Skills Timeline"
          description="A focused technical progression across frontend, backend, architecture, and performance."
        />

        <div className="relative mx-auto max-w-5xl">
          <VerticalTimelineLine progress={lineProgress} lineRef={lineHostRef} />

          <ol className="space-y-6 sm:space-y-7 lg:space-y-10">
            {TIMELINE_SKILLS.map((skill, index) => {
              const rightSide = skill.side === "right";
              const iconVisible = iconsVisible[index];
              const cardVisible = cardsVisible[index];

              return (
                <li
                  key={skill.id}
                  className="relative grid grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_3.25rem] sm:gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-8"
                >
                  <div
                    className="pointer-events-none absolute right-11 top-1/2 h-px w-5 -translate-y-1/2 bg-green-600 dark:bg-emerald-200/28 sm:right-13 sm:w-6 lg:hidden"
                    aria-hidden
                  />

                  <div className={cn("hidden lg:block", rightSide && "invisible")} aria-hidden={rightSide}>
                    <SkillCard
                      title={skill.title}
                      description={skill.description}
                      side="left"
                      visible={cardVisible && !rightSide}
                    />
                  </div>

                  <div
                    ref={(node) => {
                      iconPointRefs.current[index] = node;
                    }}
                    className="relative z-10 order-2 flex justify-center lg:order-0"
                  >
                    <TimelineIconNode icon={skill.icon} active={iconVisible} />
                  </div>

                  <div className={cn("hidden lg:block", !rightSide && "invisible")} aria-hidden={!rightSide}>
                    <SkillCard
                      title={skill.title}
                      description={skill.description}
                      side={rightSide ? "right" : "left"}
                      visible={cardVisible && rightSide}
                    />
                  </div>

                  <div className="order-1 pr-1.5 sm:pr-2.5 lg:hidden">
                    <SkillCard
                      title={skill.title}
                      description={skill.description}
                      side="right"
                      visible={cardVisible}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
