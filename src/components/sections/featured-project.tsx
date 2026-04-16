"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type ShowcaseCard = {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  detail: string;
  accentColor: string;
};

const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: "product-engineering",
    title: "Product Engineering",
    shortLabel: "Architecture",
    description: "Designing scalable foundations that keep product delivery fast and stable.",
    detail:
      "I shape robust frontend-backend flows, API boundaries, and modular code structures that scale with product growth.",
    accentColor: "rgba(16, 185, 129, 0.32)",
  },
  {
    id: "experience-layer",
    title: "Experience Layer",
    shortLabel: "UX Quality",
    description: "Crafting intuitive interfaces focused on clarity, speed, and conversion.",
    detail:
      "From information hierarchy to interaction polish, every UI block is tuned for readability and smooth user journeys.",
    accentColor: "rgba(20, 184, 166, 0.3)",
  },
  {
    id: "performance-ops",
    title: "Performance Ops",
    shortLabel: "Optimization",
    description: "Improving runtime behavior to deliver premium and reliable web experiences.",
    detail:
      "I optimize loading behavior, rendering paths, and bundle strategy to keep the platform responsive at every breakpoint.",
    accentColor: "rgba(167, 139, 250, 0.28)",
  },
  {
    id: "delivery-rhythm",
    title: "Delivery Rhythm",
    shortLabel: "Execution",
    description: "Turning requirements into maintainable releases with predictable quality.",
    detail:
      "Clear task slicing, code reviews, and pragmatic technical decisions help teams ship user-friendly outcomes consistently.",
    accentColor: "rgba(245, 158, 11, 0.28)",
  },
];

export function FeaturedProjectSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const getSignedDistance = (index: number) => {
    const total = SHOWCASE_CARDS.length;
    const forward = (index - activeIndex + total) % total;
    const backward = forward - total;
    return Math.abs(forward) <= Math.abs(backward) ? forward : backward;
  };

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-linear-to-br from-white/6 via-black/50 to-white/3 p-4 shadow-[0_24px_70px_-44px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-6">
            <div className="mb-6 sm:mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-green-800 dark:text-emerald-200">
                Interactive Showcase
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Vertical premium cards with rotating layered focus.
              </h3>
            </div>

            <div className="relative mx-auto h-[470px] w-full max-w-4xl overflow-hidden sm:h-[540px]">
              {SHOWCASE_CARDS.map((card, index) => {
                const distance = getSignedDistance(index);
                const level = Math.min(Math.abs(distance), 3);
                const isActive = distance === 0;
                const direction = distance === 0 ? 0 : Math.sign(distance);

                const xOffset = direction * (level === 1 ? 240 : level === 2 ? 315 : 360);
                const yOffset = level === 0 ? 0 : level === 1 ? 18 : level === 2 ? 28 : 36;
                const scale = level === 0 ? 1 : level === 1 ? 0.93 : level === 2 ? 0.88 : 0.84;
                const opacity = level === 0 ? 1 : level === 1 ? 0.58 : level === 2 ? 0.38 : 0.24;
                const cardWidth =
                  level === 0
                    ? "clamp(260px, 40vw, 420px)"
                    : level === 1
                      ? "clamp(220px, 32vw, 340px)"
                      : "clamp(205px, 28vw, 300px)";
                const zIndex = 40 - level;

                return (
                  <motion.button
                    key={card.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    initial={false}
                    animate={{
                      x: xOffset,
                      y: yOffset,
                      scale,
                      opacity,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "absolute left-1/2 top-0 h-full -translate-x-1/2 overflow-hidden rounded-2xl border bg-zinc-950/90 p-6 text-left shadow-[0_22px_46px_-30px_rgba(0,0,0,0.85)] outline-none sm:p-7",
                      isActive ? "border-white/18" : "border-white/9 hover:border-white/16",
                    )}
                    style={{
                      width: cardWidth,
                      zIndex,
                      transformOrigin: "center center",
                      backgroundImage: `linear-gradient(145deg, ${card.accentColor}, rgba(5, 8, 14, 0.88) 42%, rgba(9, 12, 18, 0.94) 100%)`,
                    }}
                    aria-pressed={isActive}
                  >
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0.65, scale: isActive ? 1 : 0.92 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute right-5 top-5 h-10 w-10 rounded-full border border-white/20 bg-white/6"
                    >
                      <motion.div
                        animate={{ rotate: isActive ? 360 : 0 }}
                        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                        className="absolute inset-1 rounded-full border border-white/25"
                      />
                    </motion.div>

                    <div className="relative z-10 flex h-full flex-col">
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-300">{card.shortLabel}</p>
                      <h4 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{card.title}</h4>
                      <p
                        className={cn(
                          "mt-3 text-sm leading-relaxed transition-colors duration-300",
                          isActive ? "text-zinc-100" : "line-clamp-2 text-zinc-400",
                        )}
                      >
                        {card.description}
                      </p>

                      <div className="mt-auto pt-6">
                        <motion.div
                          animate={{ width: isActive ? "100%" : "46%", opacity: isActive ? 1 : 0.6 }}
                          transition={{ duration: 0.45, ease: "easeInOut" }}
                          className="h-1 rounded-full bg-white/20"
                        >
                          <motion.div
                            animate={{ width: isActive ? "82%" : "34%" }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full bg-green-600 dark:bg-emerald-300/80"
                          />
                        </motion.div>

                        <AnimatePresence mode="wait">
                          {isActive ? (
                            <motion.p
                              key={`${card.id}-detail`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="mt-4 text-sm leading-relaxed text-zinc-200"
                            >
                              {card.detail}
                            </motion.p>
                          ) : (
                            <motion.p
                              key={`${card.id}-hint`}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.28, ease: "easeOut" }}
                              className="mt-4 text-xs uppercase tracking-[0.16em] text-zinc-400"
                            >
                              Press to focus
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
