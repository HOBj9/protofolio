"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { services } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const ACCENT_COLORS = [
  "rgba(16, 185, 129, 0.32)",
  "rgba(20, 184, 166, 0.3)",
  "rgba(167, 139, 250, 0.28)",
  "rgba(245, 158, 11, 0.28)",
  "rgba(59, 130, 246, 0.28)",
];

type ServiceContentProps = {
  service: string;
  index: number;
  isActive: boolean;
  compact?: boolean;
};

function ServiceCardContent({ service, index, isActive, compact = false }: ServiceContentProps) {
  return (
    <div className="relative z-10 flex h-full flex-col">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-300">{`Service ${index + 1}`}</p>
      <h4 className={cn("mt-3 font-semibold text-heading", compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl")}>
        {service}
      </h4>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed transition-colors duration-300",
          isActive ? "text-body" : "line-clamp-2 text-muted",
        )}
      >
        {`Focused execution in ${service.toLowerCase()} with clean implementation and user-first quality.`}
      </p>

      <div className={cn("mt-auto", compact ? "pt-5" : "pt-6")}>
        <motion.div
          animate={{ width: isActive ? "100%" : "46%", opacity: isActive ? 1 : 0.6 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="h-1 rounded-full bg-slate-800/16 dark:bg-white/20"
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
              key={`${service}-detail`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-4 text-sm leading-relaxed text-body"
            >
              {`This service is delivered with strong architecture, measurable performance, and polished product experience.`}
            </motion.p>
          ) : (
            <motion.p
              key={`${service}-hint`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mt-4 text-xs uppercase tracking-[0.16em] text-muted"
            >
              Press to focus
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const getSignedDistance = (index: number) => {
    const total = services.length;
    const forward = (index - activeIndex + total) % total;
    const backward = forward - total;
    return Math.abs(forward) <= Math.abs(backward) ? forward : backward;
  };

  return (
    <section id="services" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-(--border-soft) bg-linear-to-br from-white/80 via-white/60 to-sky-100/35 p-4 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.24)] backdrop-blur-xl dark:border-white/10 dark:bg-linear-to-br dark:from-white/6 dark:via-black/50 dark:to-white/3 dark:shadow-[0_24px_70px_-44px_rgba(0,0,0,0.7)] sm:p-6">
            <div className="mb-6 sm:mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-green-800 dark:text-emerald-200">
                Services
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
                Vertical premium cards with rotating layered focus.
              </h3>
            </div>

            <div className="space-y-4 lg:hidden">
              {services.map((service, index) => {
                const isActive = activeIndex === index;
                const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

                return (
                  <motion.button
                    key={`${service}-mobile`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0.88,
                      scale: isActive ? 1 : 0.985,
                    }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "relative w-full overflow-hidden rounded-2xl border bg-(--surface-elevated) p-5 text-left shadow-[0_18px_38px_-28px_rgba(15,23,42,0.26)] outline-none dark:bg-zinc-950/90 dark:shadow-[0_18px_38px_-28px_rgba(0,0,0,0.8)] sm:p-6",
                      isActive ? "border-border" : "border-(--border-soft) hover:border-border",
                    )}
                    style={{
                      backgroundImage: `linear-gradient(145deg, ${accentColor}, color-mix(in srgb, var(--card) 88%, transparent) 46%, color-mix(in srgb, var(--background) 90%, transparent) 100%)`,
                    }}
                    aria-pressed={isActive}
                  >
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0.65, scale: isActive ? 1 : 0.92 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute right-4 top-4 h-9 w-9 rounded-full border border-slate-800/14 bg-white/45 dark:border-white/20 dark:bg-white/6 sm:right-5 sm:top-5 sm:h-10 sm:w-10"
                    >
                      <motion.div
                        animate={{ rotate: isActive ? 360 : 0 }}
                        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                        className="absolute inset-1 rounded-full border border-slate-800/20 dark:border-white/25"
                      />
                    </motion.div>

                    <ServiceCardContent service={service} index={index} isActive={isActive} compact />
                  </motion.button>
                );
              })}
            </div>

            <div className="relative mx-auto hidden h-[470px] w-full max-w-4xl overflow-hidden lg:block lg:h-[540px]">
              {services.map((service, index) => {
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
                const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

                return (
                  <motion.button
                    key={service}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    initial={false}
                    animate={{ x: xOffset, y: yOffset, scale, opacity }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "absolute left-1/2 top-0 h-full -translate-x-1/2 overflow-hidden rounded-2xl border bg-(--surface-elevated) p-6 text-left shadow-[0_22px_46px_-30px_rgba(15,23,42,0.24)] outline-none dark:bg-zinc-950/90 dark:shadow-[0_22px_46px_-30px_rgba(0,0,0,0.85)] sm:p-7",
                      isActive ? "border-border" : "border-(--border-soft) hover:border-border",
                    )}
                    style={{
                      width: cardWidth,
                      zIndex,
                      transformOrigin: "center center",
                      backgroundImage: `linear-gradient(145deg, ${accentColor}, color-mix(in srgb, var(--card) 86%, transparent) 42%, color-mix(in srgb, var(--background) 90%, transparent) 100%)`,
                    }}
                    aria-pressed={isActive}
                  >
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0.65, scale: isActive ? 1 : 0.92 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute right-5 top-5 h-10 w-10 rounded-full border border-slate-800/16 bg-white/45 dark:border-white/20 dark:bg-white/6"
                    >
                      <motion.div
                        animate={{ rotate: isActive ? 360 : 0 }}
                        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                        className="absolute inset-1 rounded-full border border-slate-800/20 dark:border-white/25"
                      />
                    </motion.div>

                    <ServiceCardContent service={service} index={index} isActive={isActive} />
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
