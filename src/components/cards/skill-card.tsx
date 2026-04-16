import { Reveal } from "@/components/ui/reveal";

type SkillCardProps = {
  category: string;
  items: string[];
  index: number;
};

export function SkillCard({ category, items, index }: SkillCardProps) {
  return (
    <Reveal delay={index * 0.08}>
      <article className="group rounded-2xl border border-(--border-soft) bg-(--surface) p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:bg-green-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-200/30 dark:hover:bg-white/8">
        <h3 className="text-lg font-semibold text-heading dark:text-white">{category}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-slate-800/12 bg-white px-3 py-1.5 text-xs text-slate-700 dark:border-white/15 dark:bg-black/20 dark:text-zinc-200"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
