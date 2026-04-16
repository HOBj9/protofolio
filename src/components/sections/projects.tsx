"use client";

import { motion } from "framer-motion";
import { FeaturedProject } from "@/components/cards/featured-project";
import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const featuredProject = projects.find((project) => project.featured);
  const gridProjects = projects.filter((project) => !project.featured);

  return (
    <motion.section
      id="projects"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-14 h-80 w-80 rounded-full bg-green-100 blur-[130px] dark:bg-emerald-400/10" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-sky-300/10 blur-[140px] dark:bg-emerald-300/8" />
      </div>
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Premium product showcases built with execution depth."
          description="A curated set of SaaS-grade platforms focused on architecture quality, scalable delivery, and polished product experience."
        />

        {featuredProject ? <FeaturedProject project={featuredProject} /> : null}

        <motion.div
          className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {gridProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
