"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import EmptyState from "@/components/EmptyState";
import SectionHeader from "@/components/SectionHeader";
import type { Project, SectionMeta } from "@/lib/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
  meta: SectionMeta;
  projects: Project[];
}

const coverTones = ["bg-pop text-ink", "bg-accent text-white", "bg-ink text-pop", "bg-sky text-white"];

function ProjectCard({ project, index, meta }: { project: Project; index: number; meta: SectionMeta }) {
  const tone = coverTones[index % coverTones.length];
  const { github, demo } = project.links ?? {};

  return (
    <article
      data-project-card
      className="panel panel-hover group flex h-full flex-col overflow-hidden"
    >
      <div className={`relative overflow-hidden border-b-[3px] border-ink ${project.featured ? "h-48 md:h-56" : "h-40"} ${tone}`}>
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div aria-hidden="true" className="halftone-fade absolute inset-0 opacity-40" />
            <div aria-hidden="true" className="speed-lines absolute inset-0 opacity-60" />
            <Icon
              name={project.icon}
              size={project.featured ? 96 : 72}
              className="absolute right-6 bottom-4 opacity-90 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
            />
          </>
        )}
        <span aria-hidden="true" className="absolute top-3 left-4 font-comic text-5xl leading-none opacity-90">
          #{String(index + 1).padStart(2, "0")}
        </span>
        {project.status && (
          <span className="sticker absolute top-3 right-3 rotate-[6deg] bg-white text-base">{project.status}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {project.category && (
          <p className="font-mono text-xs font-semibold tracking-widest text-accent uppercase">{project.category}</p>
        )}
        <h3 className="mt-2 text-2xl leading-tight font-black tracking-tight">{project.name}</h3>
        {project.tagline && <p className="mt-1 font-semibold text-ink-soft">{project.tagline}</p>}
        <p className="mt-4 leading-relaxed text-ink-soft">{project.description}</p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-5">
            {meta.highlightsLabel && (
              <h4 className="font-comic text-lg tracking-wider">{meta.highlightsLabel}</h4>
            )}
            <ul className={`mt-2 grid gap-2 text-sm text-ink-soft ${project.featured ? "md:grid-cols-2" : ""}`}>
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-auto pt-6">
            {meta.technologiesLabel && <p className="sr-only">{meta.technologiesLabel}</p>}
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <li key={t} className="chip text-[0.7rem]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(github || demo) && (
          <div className="mt-5 flex flex-wrap gap-3 border-t-[3px] border-dashed border-ink/25 pt-4">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold underline decoration-2 underline-offset-4 hover:text-accent"
                aria-label={`${meta.githubLabel ?? "GitHub"}: ${project.name}`}
              >
                <Icon name="github" size={18} />
                {meta.githubLabel}
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold underline decoration-2 underline-offset-4 hover:text-accent"
                aria-label={`${meta.demoLabel ?? "Demo"}: ${project.name}`}
              >
                <Icon name="arrow-up-right" size={18} />
                {meta.demoLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects({ meta, projects }: Props) {
  const allLabel = meta.allFilterLabel ?? "All";
  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category).filter((c): c is string => Boolean(c)))),
    [projects],
  );
  const [active, setActive] = useState(allLabel);
  const gridRef = useRef<HTMLUListElement>(null);

  const visible = active === allLabel ? projects : projects.filter((p) => p.category === active);

  // Re-animate cards when the filter changes (skipped on first render; ScrollTrigger handles that).
  const firstRun = useRef(true);
  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      // Cards that were waiting for their scroll reveal must not stay hidden after a re-layout.
      gsap.set("[data-stagger-item]", { autoAlpha: 1, y: 0 });
      ScrollTrigger.refresh();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-project-card]",
        { autoAlpha: 0, y: 30, rotate: -1.5, scale: 0.97 },
        { autoAlpha: 1, y: 0, rotate: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.4)" },
      );
    },
    { scope: gridRef, dependencies: [active] },
  );

  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader meta={meta} />

        {projects.length === 0 ? (
          <EmptyState message={meta.emptyState} />
        ) : (
          <>
            {categories.length > 1 && (
              <div role="group" aria-label={meta.title} className="mb-10 flex flex-wrap gap-3">
                {[allLabel, ...categories].map((cat) => {
                  const selected = cat === active;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActive(cat)}
                      className={`rounded-full border-[3px] border-ink px-4 py-1.5 text-sm font-bold transition-all ${
                        selected
                          ? "bg-ink text-pop shadow-[3px_3px_0_0_var(--color-accent)]"
                          : "bg-card hover:-translate-y-0.5 hover:bg-pop"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}

            <ul ref={gridRef} data-stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((project) => (
                <li
                  key={project.name}
                  data-stagger-item
                  className={project.featured ? "md:col-span-2" : undefined}
                >
                  <ProjectCard project={project} index={projects.indexOf(project)} meta={meta} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
