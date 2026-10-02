import Icon from "@/components/Icon";
import EmptyState from "@/components/EmptyState";
import SectionHeader from "@/components/SectionHeader";
import type { ResearchItem, SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  items: ResearchItem[];
  interests: string[];
}

function Meta({ item }: { item: ResearchItem }) {
  const parts = [item.venue, item.year].filter(Boolean);
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {item.type && (
        <span className="rounded-sm bg-ink px-2 py-0.5 font-mono text-xs font-semibold tracking-wider text-pop uppercase">
          {item.type}
        </span>
      )}
      {item.area && <span className="font-mono text-xs font-semibold text-accent">{item.area}</span>}
      {parts.length > 0 && <span className="font-semibold text-ink-soft">{parts.join(" · ")}</span>}
    </div>
  );
}

function PaperLink({ item, label }: { item: ResearchItem; label?: string }) {
  if (!item.url) return null;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-2 font-bold underline decoration-2 underline-offset-4 hover:text-accent"
    >
      {label} <Icon name="arrow-up-right" size={16} />
    </a>
  );
}

export default function Research({ meta, items, interests }: Props) {
  const featured = items.filter((i) => i.featured);
  const rest = items.filter((i) => !i.featured);

  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="relative overflow-hidden border-y-[3px] border-ink bg-ink py-24 text-paper md:py-32"
    >
      <div aria-hidden="true" className="halftone-fade pointer-events-none absolute -top-10 -left-10 h-96 w-96 text-accent/50" />
      <div aria-hidden="true" data-parallax="-0.2" className="halftone pointer-events-none absolute right-0 bottom-0 h-72 w-72 text-paper/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader meta={meta} tone="dark" />

        {interests.length > 0 && (
          <div data-reveal="fade" className="mb-12">
            {meta.interestsLabel && (
              <h3 className="font-comic text-xl tracking-wider text-pop">{meta.interestsLabel}</h3>
            )}
            <ul className="mt-3 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border-2 border-paper/40 px-3 py-1 text-sm font-semibold transition-colors hover:border-pop hover:text-pop"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        )}

        {items.length === 0 ? (
          <EmptyState message={meta.emptyState} />
        ) : (
          <div className="grid gap-6 text-ink">
            {featured.map((item) => (
              <article key={item.title} data-reveal="panel" className="panel relative bg-pop p-6 sm:p-10">
                {item.status && (
                  <span className="sticker absolute -top-5 right-4 rotate-[5deg] bg-accent text-xl text-white sm:right-10 sm:text-2xl">
                    {item.status}!
                  </span>
                )}
                <Meta item={item} />
                <h3 className="mt-4 max-w-4xl text-2xl leading-tight font-black tracking-tight sm:text-4xl">
                  {item.title}
                </h3>
                {item.authors && item.authors.length > 0 && (
                  <p className="mt-3 font-semibold text-ink-soft">{item.authors.join(", ")}</p>
                )}
                {item.description && <p className="mt-4 max-w-3xl text-lg text-ink-soft">{item.description}</p>}
                {item.reference && <p className="mt-4 font-mono text-sm text-ink-soft">{item.reference}</p>}
                <PaperLink item={item} label={meta.paperLinkLabel} />
              </article>
            ))}

            {rest.length > 0 && (
              <ul data-stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((item, i) => (
                  <li key={item.title} data-stagger-item className="panel panel-hover flex flex-col p-6">
                    <span aria-hidden="true" className="font-comic text-3xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-xl leading-snug font-extrabold">{item.title}</h3>
                    {item.description && <p className="mt-3 text-ink-soft">{item.description}</p>}
                    <div className="mt-auto pt-5">
                      <Meta item={item} />
                      {item.status && <p className="mt-2 text-sm font-semibold">{item.status}</p>}
                    </div>
                    <PaperLink item={item} label={meta.paperLinkLabel} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
