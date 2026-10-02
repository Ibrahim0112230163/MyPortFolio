import Icon from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import type { SectionMeta, SkillCategory } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  categories: SkillCategory[];
}

export default function Skills({ meta, categories }: Props) {
  if (categories.length === 0) return null;

  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="relative overflow-hidden border-y-[3px] border-ink bg-paper-deep py-24 md:py-32"
    >
      <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 text-ink/[0.06]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader meta={meta} />

        <ul data-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <li
              key={category.name}
              data-stagger-item
              className={`panel panel-hover flex flex-col p-5 ${i % 4 === 1 || i % 4 === 2 ? "lg:translate-y-6" : ""}`}
            >
              <div className="flex items-center gap-3 border-b-[3px] border-ink pb-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-pop">
                  <Icon name={category.icon} size={18} />
                </span>
                <h3 className="text-lg leading-tight font-extrabold">{category.name}</h3>
              </div>
              <ul data-skill-list className="mt-4 flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <li key={skill} data-skill className="chip transition-colors hover:bg-ink hover:text-paper">
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
