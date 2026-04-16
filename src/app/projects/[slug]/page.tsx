import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background py-16 text-foreground">
      <Container className="max-w-4xl">
        <Link href="/#projects" className="text-sm text-green-800 hover:underline dark:text-emerald-200">
          ← Back to projects
        </Link>
        <section className="mt-8 rounded-3xl border border-(--border-soft) bg-(--surface) p-6 backdrop-blur sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-green-800 dark:text-emerald-200">Project Case Study</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-heading">{project.title}</h1>
          <p className="mt-4 text-muted">{project.summary}</p>
        </section>

        <section className="mt-8 grid gap-6 rounded-3xl border border-(--border-soft) bg-(--surface) p-6 sm:p-8">
          <Detail title="Problem / Goal" content={`${project.problem} ${project.goal}`} />
          <Detail title="My Role" content={project.role} />
          <Detail title="Project Type" content={project.type} />
          <Detail title="Tech Stack" content={project.stack.join(", ")} />
          <DetailList title="Key Features" items={project.features} />
          <DetailList title="Challenges" items={project.challenges} />
          <DetailList title="Solutions" items={project.solutions} />
          <Detail title="Final Result" content={project.result} />

          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-green-600 bg-green-600 px-5 py-2.5 text-sm text-white hover:bg-green-700 dark:border-emerald-300/45 dark:bg-emerald-400/10 dark:text-emerald-100 dark:hover:bg-emerald-300/20"
              >
                Live Demo
              </a>
            ) : null}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-800/18 px-5 py-2.5 text-sm text-slate-800 dark:border-white/20 dark:text-zinc-100"
            >
              GitHub Repository
            </a>
          </div>
        </section>
      </Container>
    </main>
  );
}

function Detail({ title, content }: { title: string; content: string }) {
  return (
    <article>
      <h2 className="text-lg font-semibold text-heading">{title}</h2>
      <p className="mt-2 text-muted">{content}</p>
    </article>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <article>
      <h2 className="text-lg font-semibold text-heading">{title}</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
