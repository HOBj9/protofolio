import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/data/site";

type ContactPlatform = {
  id: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
};

const CONTACT_PLATFORMS: ContactPlatform[] = [
  {
    id: "facebook",
    label: "Facebook",
    value: "facebook.com/share/1Lb38tG1oi",
    href: "https://www.facebook.com/share/1Lb38tG1oi/",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M13.5 21v-7.1H16l.4-2.9h-2.9V9.2c0-.9.3-1.5 1.6-1.5h1.4V5.1c-.7-.1-1.4-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.8V11H8.5v2.9h2.3V21h2.7Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "instagram.com/hothaifa_bjbj",
    href: "https://www.instagram.com/hothaifa_bjbj?igsh=aHAwNHd0NjQ1M3Bk",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.6" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/HOBj9",
    href: "https://github.com/HOBj9",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M12 3.8a8.6 8.6 0 0 0-2.7 16.8c.4.1.5-.2.5-.4v-1.5c-2.2.5-2.7-.9-2.7-.9-.4-.9-.9-1.1-.9-1.1-.8-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.8 1.2 2 1 2.5.8.1-.5.3-.8.5-1-1.8-.2-3.7-.9-3.7-4a3 3 0 0 1 .8-2.1 2.8 2.8 0 0 1 .1-2.1s.7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1 .1 1.8.1 2.1a3 3 0 0 1 .8 2.1c0 3.1-1.9 3.8-3.8 4 .3.2.6.8.6 1.5v2.3c0 .2.1.5.5.4A8.6 8.6 0 0 0 12 3.8Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/hothaifa-bjbj-a5a885381",
    href: "https://www.linkedin.com/in/hothaifa-bjbj-a5a885381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M6.3 8.8H3.9V20h2.4V8.8Zm.2-3.4a1.4 1.4 0 1 0-2.8 0 1.4 1.4 0 0 0 2.8 0ZM20.1 13.5c0-2.8-1.5-4.1-3.6-4.1-1.7 0-2.5.9-2.9 1.5v-1.3h-2.4V20h2.4v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20H20v-6.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+963962336527",
    href: "https://wa.me/963962336527",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M12 4.2a7.8 7.8 0 0 0-6.7 11.7l-1 3.4 3.5-.9A7.8 7.8 0 1 0 12 4.2Zm4.5 11c-.2.6-1 1.1-1.5 1.2-.4.1-.9.1-1.5-.1a12 12 0 0 1-4.7-4.2c-.4-.6-.9-1.7-.4-2.6.2-.5.6-.7.8-.8.2-.1.4-.1.5-.1h.4c.2 0 .3.1.4.4l.6 1.4c.1.3 0 .4-.1.6l-.3.4c-.1.1-.2.2-.1.5.2.4.7 1.2 1.5 1.9 1.1 1 1.9 1.3 2.2 1.4.3.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.4.6c.2.1.3.2.4.4 0 .1 0 .7-.2 1.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "telegram",
    label: "Telegram",
    value: "t.me/HOBJ7",
    href: "https://t.me/HOBJ7",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M20.3 5.1c.4-.2.8.2.7.6l-2.6 12.1c-.1.5-.7.7-1.1.5l-3.9-2.9-2.1 2.1c-.3.3-.7.2-.9-.2l.3-3.3 6.1-5.5c.2-.2-.1-.5-.3-.3L9 13 5.7 12c-.5-.1-.5-.8 0-1L20.3 5.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M4 7.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Zm2 .5 6 4.5L18 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-(--border-soft) bg-(--surface) p-6 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.3)] backdrop-blur sm:p-8 dark:shadow-[0_18px_45px_-34px_rgba(0,0,0,0.72)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-800 dark:text-emerald-200">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-heading">
                Let&apos;s build something exceptional.
              </h2>
              <p className="mt-4 text-muted">
                I am available for freelance, contract, and full-time opportunities.
                Share your idea and I will help turn it into a premium digital
                product.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {CONTACT_PLATFORMS.map((platform) => (
                  <a
                    key={platform.id}
                    href={platform.href}
                    target={platform.external ? "_blank" : undefined}
                    rel={platform.external ? "noreferrer noopener" : undefined}
                    aria-label={`Open ${platform.label}`}
                    className="group flex items-center gap-3 rounded-xl border border-(--border-soft) bg-(--surface-elevated) px-3.5 py-3 transition duration-200 hover:border-green-300 hover:bg-green-50 dark:hover:border-emerald-300/40 dark:hover:bg-emerald-300/10"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-200 bg-green-100 text-green-700 dark:border-emerald-200/30 dark:bg-emerald-300/10 dark:text-emerald-100">
                      {platform.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-zinc-400">
                        {platform.label}
                      </span>
                      <span className="block truncate text-sm text-slate-800 group-hover:text-green-700 dark:text-zinc-100 dark:group-hover:text-emerald-100">
                        {platform.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
