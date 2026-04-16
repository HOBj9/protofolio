import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navItems, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-(--border-soft) py-8">
      <Container className="flex flex-col gap-4 text-sm text-slate-500 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <nav className="flex flex-wrap gap-4">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} className="hover:text-slate-800 dark:hover:text-zinc-200">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
