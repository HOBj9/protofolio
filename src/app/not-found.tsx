import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background py-20 text-foreground">
      <Container className="max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-green-800 dark:text-emerald-200">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-heading">Page not found</h1>
        <p className="mt-4 text-muted">
          This page does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-slate-800/18 px-5 py-2.5 text-sm text-slate-800 hover:bg-black/6 dark:border-white/20 dark:text-zinc-100 dark:hover:bg-white/10"
        >
          Return Home
        </Link>
      </Container>
    </main>
  );
}
