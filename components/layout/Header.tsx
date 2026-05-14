"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/app/[lang]/dictionaries";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "@/components/layout/Logo";
import { LinkButton } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type HeaderDict = {
  brand: string;
  brandSubtitle: string;
  nav: {
    home: string;
    about: string;
    services: string;
    contact: string;
  };
  cta: { quote: string };
  locale: { pt: string; en: string; switchTo: string };
};

export function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: HeaderDict;
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [trackedPathname, setTrackedPathname] = useState(pathname);
  const reduce = useReducedMotion();

  if (trackedPathname !== pathname) {
    setTrackedPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `/${lang}`, label: dict.nav.home, exact: true },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const onContactPage = pathname === `/${lang}/contact`;
  const showFloatingCta = !open && !onContactPage;

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-brand-slate/15 bg-brand-ivory/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 sm:h-20 sm:px-8">
        <Link
          href={`/${lang}`}
          aria-label={dict.brand}
          className="flex items-center gap-2.5"
        >
          <Logo size={40} priority />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-brand-navy">
              {dict.brand}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-brand-slate sm:block">
              {dict.brandSubtitle}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href, link.exact)
                  ? "text-brand-navy"
                  : "text-brand-slate hover:text-brand-navy"
              }`}
            >
              {link.label}
              {isActive(link.href, link.exact) ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-azure"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher
            currentLocale={lang}
            labels={dict.locale}
            tone="light"
          />
          <div className="hidden lg:flex">
            <LinkButton
              href={`/${lang}/contact`}
              size="md"
              variant="primary"
              onClick={() => trackEvent("cta_click", { source: "header" })}
            >
              {dict.cta.quote}
            </LinkButton>
          </div>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open ? "true" : "false"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-slate/25 lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-t border-brand-slate/15 bg-brand-ivory lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-3 text-base font-medium ${
                    isActive(link.href, link.exact)
                      ? "bg-brand-azure/15 text-brand-navy"
                      : "text-brand-slate hover:bg-brand-navy/5 hover:text-brand-navy"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>

    <AnimatePresence>
      {showFloatingCta ? (
        <motion.div
          key="floating-cta"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40 lg:hidden"
        >
          <LinkButton
            href={`/${lang}/contact`}
            size="lg"
            variant="primary"
            className="shadow-[0_8px_32px_-8px_rgba(5,187,251,0.6)]"
            onClick={() => trackEvent("cta_click", { source: "floating_cta" })}
          >
            {dict.cta.quote}
          </LinkButton>
        </motion.div>
      ) : null}
    </AnimatePresence>
    </>
  );
}
