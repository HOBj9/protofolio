"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navItems, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash.replace("#", "");
    return hash || "home";
  });
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const unlockScrollRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScrollChrome = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScrollChrome();
    window.addEventListener("scroll", handleScrollChrome, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollChrome);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (unlockScrollRef.current) {
        window.clearTimeout(unlockScrollRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;
    let rafId = 0;
    const updateActiveFromScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      const navOffset = (headerRef.current?.offsetHeight ?? 74) + 28;
      let current = sections[0].id;

      for (const section of sections) {
        if (window.scrollY + navOffset >= section.offsetTop) {
          current = section.id;
        }
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    const currentHash = window.location.hash.replace("#", "");
    if (!(currentHash && sections.some((section) => section.id === currentHash))) {
      updateActiveFromScroll();
    }

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    setOpen(false);
    setActiveSection(id);
    isProgrammaticScrollRef.current = true;
    if (unlockScrollRef.current) {
      window.clearTimeout(unlockScrollRef.current);
    }
    unlockScrollRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 720);

    const navOffset = (headerRef.current?.offsetHeight ?? 74) + 20;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={cn(
          "mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center rounded-full border px-3 py-2.5 backdrop-blur-xl transition-all duration-300 sm:px-5",
          isScrolled
            ? "border-white/16 bg-black/62 shadow-[0_14px_40px_-24px_rgba(0,0,0,0.75)]"
            : "border-(--border-soft) bg-(--surface)",
        )}
      >
        <Link href="#home" className="flex items-center" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/ho_bj_logo_refined.svg"
            alt={`${siteConfig.name} logo`}
            width={96}
            height={34}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        <LayoutGroup id="navbar-active-pill">
          <ul className="relative mx-auto hidden items-center gap-1 rounded-full bg-white/4 p-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id} className="relative">
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 z-10 overflow-hidden rounded-full bg-emerald-300/16 shadow-[0_0_18px_-10px_rgba(16,185,129,0.65)]"
                      initial={false}
                      transition={{
                        layout: { duration: 0.24, ease: [0.8, 0, 0.2, 1] },
                      }}
                    >
                      <motion.span
                        key={`flash-${activeSection}`}
                        initial={{ x: "-35%", opacity: 0 }}
                        animate={{ x: "145%", opacity: [0, 0.28, 0] }}
                        transition={{ duration: 0.16, ease: [0.8, 0, 0.2, 1] }}
                        className="absolute inset-y-0 w-8 bg-linear-to-r from-white/0 via-white/35 to-white/0"
                      />
                    </motion.span>
                  ) : null}
                  <Link
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative z-20 block rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-out",
                      isActive
                        ? "text-emerald-100"
                        : "text-zinc-300 hover:bg-white/6 hover:text-zinc-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </LayoutGroup>

        <div className="flex items-center justify-end">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-full border border-white/15 bg-white/3 px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-white/8 md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 w-full max-w-6xl rounded-3xl border border-white/14 bg-black/78 p-4 shadow-[0_14px_36px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.id)}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-2 text-sm transition-colors duration-300 ease-out",
                      activeSection === item.id
                        ? "bg-emerald-300/15 text-emerald-100"
                        : "text-zinc-300 hover:bg-white/6 hover:text-zinc-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
