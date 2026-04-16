import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site";

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="Building modern products with engineering clarity."
          description="From elegant frontend interfaces to stable backend systems, I focus on quality across the full product lifecycle."
        />
        <Reveal>
          <article className="mx-auto grid max-w-4xl gap-6 rounded-3xl border border-(--border-soft) bg-(--surface) p-6 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.32)] backdrop-blur sm:grid-cols-3 sm:p-8 dark:shadow-[0_18px_45px_-34px_rgba(0,0,0,0.72)]">
            <p className="flex items-center text-sm uppercase tracking-[0.22em] text-green-800 dark:text-emerald-200 sm:col-span-1">
              My Journey
            </p>
            <p className="text-muted sm:col-span-2">{siteConfig.about}</p>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
