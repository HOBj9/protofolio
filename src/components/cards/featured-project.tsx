"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

type FeaturedProjectProps = {
  project: Project;
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

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-linear-to-br from-green-50 via-white to-sky-100/45 p-6 shadow-[0_38px_90px_-55px_rgba(37,99,235,0.22)] backdrop-blur-xl sm:p-8 lg:p-10 dark:border-white/10 dark:bg-linear-to-br dark:from-emerald-400/12 dark:via-zinc-950 dark:to-black/70 dark:shadow-[0_38px_90px_-55px_rgba(16,185,129,0.45)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#dcfce7,transparent_42%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_42%)]" />
      <div className="pointer-events-none absolute -right-20 top-8 h-56 w-56 rounded-full bg-sky-300/16 blur-[90px] dark:bg-emerald-300/12" />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="inline-flex rounded-full border border-green-200 bg-green-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:border-emerald-300/45 dark:bg-emerald-300/12 dark:text-emerald-100">
            Featured Project
          </p>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight text-heading sm:text-4xl">{project.title}</h3>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-green-800 dark:text-emerald-200/85">{project.type}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-800/14 bg-black/5 px-3 py-1.5 text-xs text-slate-700 dark:border-white/20 dark:bg-black/30 dark:text-zinc-100"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800/20 px-5 py-2.5 text-sm text-slate-800 transition hover:border-green-300 hover:bg-green-50 dark:border-white/25 dark:text-zinc-100 dark:hover:border-emerald-300/40 dark:hover:bg-white/10"
            >
              <GitHubIcon />
              GitHub
            </a>
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-full border border-green-600 bg-green-600 px-5 py-2.5 text-sm text-white transition hover:bg-green-700 dark:border-emerald-300/40 dark:bg-emerald-400/12 dark:text-emerald-100 dark:hover:bg-emerald-300/20"
            >
              View Details
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
