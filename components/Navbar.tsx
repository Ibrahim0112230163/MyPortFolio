"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { NavItem, Portfolio } from "@/lib/types";

interface Props {
  items: NavItem[];
  extras: Portfolio["navigationExtras"];
  brand: string;
  name: string;
}

export default function Navbar({ items, extras, brand, name }: Props) {
  const [active, setActive] = useState(items[0]?.href ?? "");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const linkClass = (href: string) =>
    `relative rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
      active === href ? "bg-ink text-pop" : "text-ink hover:bg-pop"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-[calc(var(--nav-h)-12px)] max-w-7xl items-center justify-between gap-4 rounded-xl border-[3px] border-ink bg-card/95 px-3 backdrop-blur-sm transition-shadow duration-300 sm:px-4 ${
          scrolled ? "shadow-[var(--shadow-comic)]" : "shadow-[var(--shadow-comic-sm)]"
        }`}
      >
        <a
          href={items[0]?.href ?? "#"}
          data-scroll-link
          aria-label={name}
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center rounded-md border-[3px] border-ink bg-accent font-comic text-xl tracking-wider text-white shadow-[2px_2px_0_0_var(--color-ink)]">
            {brand}
          </span>
          <span className="hidden font-black tracking-tight uppercase sm:inline">{name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-scroll-link
                aria-current={active === item.href ? "location" : undefined}
                className={linkClass(item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {extras.ctaLabel && extras.ctaHref && (
            <a
              href={extras.ctaHref}
              data-scroll-link
              className="hidden rounded-md border-[3px] border-ink bg-pop px-4 py-1.5 text-sm font-black shadow-[2px_2px_0_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 sm:inline-block"
            >
              {extras.ctaLabel}
            </a>
          )}
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-md border-[3px] border-ink bg-card lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? extras.menuCloseLabel : extras.menuOpenLabel}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-auto mt-3 max-w-7xl rounded-xl border-[3px] border-ink bg-card p-4 shadow-[var(--shadow-comic)] lg:hidden"
      >
        <ul className="grid gap-2 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-scroll-link
                aria-current={active === item.href ? "location" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-md border-[3px] border-ink px-4 py-3 text-lg font-black uppercase ${
                  active === item.href ? "bg-ink text-pop" : "bg-white hover:bg-pop"
                }`}
              >
                <span aria-hidden="true" className="font-comic text-base text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
