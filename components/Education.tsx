import SectionHeader from "@/components/SectionHeader";
import Timeline from "@/components/Timeline";
import type { EducationItem, SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  items: EducationItem[];
}

export default function Education({ meta, items }: Props) {
  if (items.length === 0) return null;

  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="relative overflow-hidden border-y-[3px] border-ink bg-paper-deep py-24 md:py-32"
    >
      <div aria-hidden="true" className="speed-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader meta={meta} />
        <Timeline
          entries={items.map((item, i) => {
            const range = item.period ?? [item.startDate, item.endDate].filter(Boolean).join(" – ");
            return {
              key: `${item.degree}-${i}`,
              title: item.degree,
              subtitle: item.institution,
              badge: range || undefined,
              meta: [item.department, item.location].filter((v): v is string => Boolean(v)),
              highlight: item.result,
              description: item.description,
              current: item.current,
            };
          })}
        />
      </div>
    </section>
  );
}
