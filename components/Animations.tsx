"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const reveal = (targets: gsap.TweenTarget) => gsap.set(targets, { autoAlpha: 1, clearProps: "transform" });

/**
 * Page-wide motion layer. Components only mark elements with data attributes
 * (data-hero, data-reveal, data-stagger, data-timeline, data-parallax, data-scroll-link);
 * all GSAP / ScrollTrigger logic lives here.
 */
export default function Animations() {
  useGSAP(() => {
    const root = document.documentElement;
    // Must happen before any ScrollTrigger exists: it disables the CSS smooth-scroll fallback,
    // which ScrollTrigger would otherwise snapshot and fight against.
    root.classList.add("anim-ready");
    const mm = gsap.matchMedia();

    // ---------- Smooth anchor scrolling ----------
    const navOffset = () => (document.querySelector("header")?.getBoundingClientRect().height ?? 72) + 12;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href^='#']");
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Wait a frame so a closing mobile menu can release its scroll lock first.
      requestAnimationFrame(() =>
        gsap.to(window, {
        // Scale duration with distance so long jumps don't feel sluggish to start.
        duration: reduce ? 0 : gsap.utils.clamp(0.6, 1.2, Math.abs(target.getBoundingClientRect().top) / 4000),
        ease: "power3.out",
        scrollTo: { y: hash === "#home" ? 0 : target, offsetY: navOffset(), autoKill: false },
        onComplete: () => {
          history.replaceState(null, "", hash);
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        },
        }),
      );
    };
    document.addEventListener("click", onClick);

    // ---------- Reduced motion: show everything immediately ----------
    mm.add("(prefers-reduced-motion: reduce)", () => {
      reveal("[data-hero], [data-reveal], [data-stagger-item], [data-timeline-item]");
      gsap.set("[data-timeline-line]", { scaleY: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ---------- Hero entrance ----------
      const hero = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });
      hero
        .fromTo("[data-hero='ink']", { autoAlpha: 0, scale: 0.6, rotate: -25 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.4, ease: "elastic.out(1, 0.6)" }, 0)
        .fromTo("[data-hero='issue']", { autoAlpha: 0, x: -40, rotate: -8 }, { autoAlpha: 1, x: 0, rotate: -2, duration: 0.6 }, 0.1)
        .fromTo("[data-hero='greeting']", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.2)
        .fromTo(
          "[data-hero='char']",
          { autoAlpha: 0, yPercent: 110, rotate: 12 },
          { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 0.8, stagger: 0.035, ease: "back.out(2)" },
          0.25,
        )
        .fromTo("[data-hero='headline']", { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" }, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.inOut" }, 0.7)
        .fromTo("[data-hero='intro']", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.85)
        .fromTo("[data-hero='cta']", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 1)
        .fromTo("[data-hero='focus']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.1)
        .fromTo(
          "[data-hero='avatar']",
          { autoAlpha: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", rotate: -8 },
          { autoAlpha: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", rotate: -2, duration: 1.1, ease: "power4.inOut" },
          0.35,
        )
        .fromTo("[data-hero='sticker']", { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(3)" }, 1.2)
        .fromTo("[data-hero='bubble']", { autoAlpha: 0, scale: 0.6, transformOrigin: "20% 100%" }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2.2)" }, 1.45)
        .fromTo("[data-hero='hint']", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.7);

      // Idle wobble on stickers once they land.
      gsap.utils.toArray<HTMLElement>("[data-hero='sticker']").forEach((el, i) => {
        gsap.to(el, { y: -6, rotate: `+=${i % 2 ? 3 : -3}`, duration: 2 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
      });

      // ---------- Parallax ----------
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax ?? "0.2");
        const section = el.closest("section") ?? el;
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // ---------- Section headers ----------
      gsap.utils.toArray<HTMLElement>("[data-reveal='header']").forEach((header) => {
        const parts = header.querySelectorAll("[data-header-part]");
        gsap
          .timeline({ scrollTrigger: { trigger: header, start: "top 85%", once: true } })
          .set(header, { autoAlpha: 1 })
          .fromTo(parts, { autoAlpha: 0, yPercent: 60, skewY: 4 }, { autoAlpha: 1, yPercent: 0, skewY: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" });
      });

      // ---------- Comic panels: slanted wipe-in ----------
      gsap.utils.toArray<HTMLElement>("[data-reveal='panel']").forEach((panel, i) => {
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: 50, rotate: i % 2 ? 1.5 : -1.5, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power4.out",
            clearProps: "clipPath,transform",
            scrollTrigger: { trigger: panel, start: "top 85%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='fade']").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      // ---------- Staggered grids (cards, skills, research) ----------
      gsap.set("[data-stagger-item]", { autoAlpha: 0, y: 40, rotate: -1 });
      ScrollTrigger.batch("[data-stagger-item]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.4)", clearProps: "transform" }),
      });

      // Skill chips pop in after their card.
      gsap.utils.toArray<HTMLElement>("[data-skill-list]").forEach((list) => {
        gsap.from(list.querySelectorAll("[data-skill]"), {
          scale: 0.6,
          opacity: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: "back.out(2.5)",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: list, start: "top 88%", once: true },
        });
      });

      // ---------- Timelines ----------
      gsap.utils.toArray<HTMLElement>("[data-timeline]").forEach((timeline) => {
        const line = timeline.querySelector("[data-timeline-line]");
        if (line) {
          gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: timeline, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
        }
        timeline.querySelectorAll<HTMLElement>("[data-timeline-item]").forEach((item) => {
          gsap.fromTo(item, { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: item, start: "top 85%", once: true } });
        });
      });
    });

    // Fonts/images can shift layout after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  });

  return null;
}
