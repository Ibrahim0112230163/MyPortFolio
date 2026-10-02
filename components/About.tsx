import Icon from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import type { About as AboutData, SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  about: AboutData;
}

export default function About({ meta, about }: Props) {
  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader meta={meta} />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Narration panel */}
          <article data-reveal="panel" className="panel p-6 sm:p-8 lg:col-span-7 lg:p-10">
            {about.speechBubble && (
              <p className="speech mb-10 inline-block max-w-sm rotate-[-1deg] text-base">{about.speechBubble}</p>
            )}
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i} className={i === 0 ? "text-xl font-medium text-ink" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>

            {about.languages.length > 0 && (
              <div className="mt-8 border-t-[3px] border-dashed border-ink/30 pt-6">
                {about.languagesLabel && (
                  <h3 className="font-comic text-xl tracking-wider">{about.languagesLabel}</h3>
                )}
                <ul className="mt-3 flex flex-wrap gap-3">
                  {about.languages.map((lang) => (
                    <li key={lang.name} className="chip">
                      <strong className="font-sans font-bold">{lang.name}</strong>
                      <span className="text-ink-mute">· {lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>

          <div className="grid gap-6 lg:col-span-5">
            {/* Stats — only rendered when real values exist in the data */}
            {about.stats.length > 0 && (
              <ul data-stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {about.stats.map((stat, i) => (
                  <li
                    key={stat.label}
                    data-stagger-item
                    className={`panel panel-hover flex flex-col justify-between gap-3 p-5 ${
                      i % 3 === 0 ? "bg-pop" : i % 3 === 1 ? "bg-card" : "bg-ink text-paper"
                    }`}
                  >
                    <span className="section-title text-3xl xl:text-[2rem]">
                      {stat.value}
                      {stat.suffix && <span className="ml-0.5 text-base opacity-70">{stat.suffix}</span>}
                    </span>
                    <span className="text-sm leading-snug font-semibold">{stat.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {about.interests.length > 0 && (
              <div data-reveal="panel" className="panel bg-ink p-6 text-paper sm:p-8">
                {about.interestsLabel && (
                  <h3 className="font-comic text-2xl tracking-wider text-pop">{about.interestsLabel}</h3>
                )}
                <ul data-stagger className="mt-5 grid gap-3 sm:grid-cols-2">
                  {about.interests.map((interest) => (
                    <li
                      key={interest.label}
                      data-stagger-item
                      className="flex items-center gap-3 rounded border-2 border-paper/20 px-3 py-2.5 transition-colors hover:border-pop hover:text-pop"
                    >
                      <Icon name={interest.icon} size={20} className="shrink-0 text-accent" />
                      <span className="font-semibold">{interest.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
