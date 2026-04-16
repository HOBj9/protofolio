"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.1-.74.09-.73.09-.73 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.31 3.51 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.82 1.11.82 2.24v3.32c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
      />
    </svg>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      className="group relative overflow-hidden rounded-2xl border border-(--border-soft) bg-(--surface) p-6 shadow-[0_26px_58px_-40px_rgba(15,23,42,0.3)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-green-300 hover:shadow-[0_30px_70px_-35px_rgba(22,163,74,0.22)] dark:shadow-[0_26px_58px_-40px_rgba(0,0,0,0.95)] dark:hover:border-emerald-300/45 dark:hover:shadow-[0_30px_70px_-35px_rgba(16,185,129,0.28)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_55%)] opacity-90" />
      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-heading">{project.title}</h3>
            <p className="mt-2 inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-green-700 dark:border-white/15 dark:bg-black/20 dark:text-emerald-200/90">
              {project.type}
            </p>
          </div>
          <span className="rounded-full border border-green-200 bg-green-100 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-green-700 dark:border-emerald-300/35 dark:bg-emerald-300/10 dark:text-emerald-100">
            Product
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => {
            return (
              <span
                key={tech}
                className="rounded-full border border-slate-800/14 bg-black/5 px-2.5 py-1 text-xs text-slate-700 dark:border-white/15 dark:bg-black/25 dark:text-zinc-200"
              >
                {tech}
              </span>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5 text-sm">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800/18 px-4 py-2 text-slate-800 transition hover:border-green-300 hover:bg-green-50 dark:border-white/20 dark:text-zinc-100 dark:hover:border-emerald-300/40 dark:hover:bg-white/10"
          >
            <GitHubIcon />
            GitHub
          </a>
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-full border border-green-600 bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 dark:border-emerald-300/35 dark:bg-emerald-400/10 dark:text-emerald-100 dark:hover:bg-emerald-300/18"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
