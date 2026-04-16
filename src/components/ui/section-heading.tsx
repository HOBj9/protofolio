type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-green-800 dark:text-emerald-300/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-heading sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base text-muted">{description}</p> : null}
    </div>
  );
}
