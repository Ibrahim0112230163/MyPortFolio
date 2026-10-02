export interface TimelineEntry {
  key: string;
  title: string;
  subtitle?: string;
  meta?: string[];
  badge?: string;
  description?: string;
  highlight?: string;
  link?: { href: string; label: string };
  current?: boolean;
}

/** Vertical comic-strip timeline shared by Experience and Education. */
export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol data-timeline className="relative ml-3 md:ml-6">
      <span
        aria-hidden="true"
        data-timeline-line
        className="absolute top-2 bottom-2 left-0 w-[4px] origin-top -translate-x-1/2 bg-ink"
      />
      {entries.map((entry) => (
        <li key={entry.key} data-timeline-item className="relative pb-10 pl-10 last:pb-0 md:pl-14">
          <span
            aria-hidden="true"
            className={`absolute top-5 left-0 h-6 w-6 -translate-x-1/2 rotate-45 border-[3px] border-ink ${
              entry.current ? "bg-accent" : "bg-pop"
            }`}
          />
          <article className="panel panel-hover p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl leading-tight font-extrabold sm:text-2xl">{entry.title}</h3>
                {entry.subtitle && <p className="mt-1 font-semibold text-accent">{entry.subtitle}</p>}
              </div>
              {entry.badge && (
                <span className="rounded-sm border-2 border-ink bg-ink px-2.5 py-1 font-mono text-xs font-semibold text-pop">
                  {entry.badge}
                </span>
              )}
            </div>
            {entry.meta && entry.meta.length > 0 && (
              <p className="mt-2 text-sm font-medium text-ink-mute">{entry.meta.join(" · ")}</p>
            )}
            {entry.highlight && (
              <p className="ink-underline mt-4 inline-block text-lg font-black">{entry.highlight}</p>
            )}
            {entry.description && <p className="mt-3 leading-relaxed text-ink-soft">{entry.description}</p>}
            {entry.link && (
              <a
                href={entry.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-bold underline decoration-2 underline-offset-4 hover:text-accent"
              >
                {entry.link.label}
              </a>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
