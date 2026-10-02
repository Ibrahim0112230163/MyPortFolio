import EmptyState from "@/components/EmptyState";
import SectionHeader from "@/components/SectionHeader";
import Timeline from "@/components/Timeline";
import type { ExperienceItem, SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  items: ExperienceItem[];
}

export default function Experience({ meta, items }: Props) {
  // With no data and no empty-state copy, the section is omitted entirely.
  if (items.length === 0 && !meta.emptyState) return null;

  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader meta={meta} />
        {items.length === 0 ? (
          <EmptyState message={meta.emptyState} />
        ) : (
          <Timeline
            entries={items.map((item, i) => ({
              key: `${item.title}-${i}`,
              title: item.title,
              subtitle: item.organization,
              badge: item.date,
              meta: [item.type, item.location].filter((v): v is string => Boolean(v)),
              description: item.description,
              link: item.link ? { href: item.link, label: item.link.replace(/^https?:\/\//, "") } : undefined,
            }))}
          />
        )}
      </div>
    </section>
  );
}
