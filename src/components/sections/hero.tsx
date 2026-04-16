"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { AnimatedAuthMark } from "@/components/ui/AnimatedAuthMark";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[80vh] items-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-green-100 blur-[120px] dark:bg-emerald-400/20" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-sky-300/18 blur-[130px] dark:bg-[#d4c6ac]/20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(2,6,23,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(2,6,23,0.06)_1px,transparent_1px)] bg-size-[56px_56px] opacity-[0.17] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] dark:opacity-[0.15]" />
      </div>
      <Container>
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-2xl space-y-6 text-center lg:text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-green-800 dark:text-emerald-200">
              {siteConfig.title}
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-heading sm:text-6xl">
              {siteConfig.headline}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {siteConfig.summary}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="#projects"
                className="rounded-full border border-green-600 bg-green-600 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 dark:border-emerald-300/45 dark:bg-emerald-400/15 dark:text-emerald-100 dark:hover:bg-emerald-300/25"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-slate-800/20 px-6 py-3 text-sm font-medium text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:bg-black/6 dark:border-white/20 dark:text-zinc-100 dark:hover:bg-white/10"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-[390px] xl:hidden"
          >
            <AnimatedAuthMark className="text-primary drop-shadow-[0_0_24px_rgba(16,185,129,0.34)] dark:text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
            className="relative hidden w-full max-w-[400px] sm:max-w-[460px] xl:block"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-100 blur-3xl sm:h-56 sm:w-56 dark:bg-emerald-400/25" />
            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl border border-slate-800/10 bg-linear-to-br from-white/85 via-white/72 to-green-50 px-8 py-10 shadow-[0_20px_60px_-36px_rgba(16,26,40,0.2)] backdrop-blur-md sm:min-h-[340px] sm:px-10 sm:py-12 dark:border-white/10 dark:bg-linear-to-br dark:from-white/7 dark:via-zinc-950/75 dark:to-emerald-500/8 dark:shadow-[0_20px_60px_-36px_rgba(16,185,129,0.55)]">
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-slate-800/20 to-transparent dark:via-white/35" />
              <div className="pointer-events-none absolute right-5 top-5 h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-emerald-300/70" />
              <div className="flex items-center justify-center">
                <AnimatedAuthMark className="h-auto w-48 text-slate-900 drop-shadow-[0_0_22px_rgba(16,185,129,0.18)] dark:text-white dark:drop-shadow-[0_0_22px_rgba(16,185,129,0.28)] sm:w-56" />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
