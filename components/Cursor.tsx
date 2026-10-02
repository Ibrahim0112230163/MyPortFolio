"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], label, summary, [data-cursor='hover']";
const TEXT_INPUT = "input, textarea, select, [contenteditable='true']";

/** Desktop-only custom cursor. Disabled on touch devices and for reduced-motion users. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!enabled || !dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const overText = Boolean(target.closest(TEXT_INPUT));
      const overLink = !overText && Boolean(target.closest(INTERACTIVE));
      gsap.to(ring, { scale: overLink ? 1.9 : overText ? 0.5 : 1, duration: 0.3, ease: "power3.out" });
      gsap.to(dot, { autoAlpha: overText ? 0 : 1, scale: overLink ? 0 : 1, duration: 0.2 });
      ring.dataset.state = overLink ? "hover" : "default";
    };

    const onDown = () => gsap.to(ring, { scale: "*=0.8", duration: 0.12 });
    const onUp = () => gsap.to(ring, { scale: ring.dataset.state === "hover" ? 1.9 : 1, duration: 0.2 });
    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200] mix-blend-difference">
      <div ref={ringRef} className="fixed top-0 left-0 h-9 w-9 rounded-full border-2 border-white data-[state=hover]:bg-white" />
      <div ref={dotRef} className="fixed top-0 left-0 h-2 w-2 rounded-full bg-white" />
    </div>
  );
}
