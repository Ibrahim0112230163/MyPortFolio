import Icon from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import type { Achievement, Certification, SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  certifications: Certification[];
  achievements: Achievement[];
}

export default function Certifications({ meta, certifications, achievements }: Props) {
  // Nothing verified to show yet → don't render an empty section.
  if (certifications.length === 0 && achievements.length === 0) return null;

  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader meta={meta} />

        <div className="grid gap-10 lg:grid-cols-2">
          {achievements.length > 0 && (
            <div>
              {meta.achievementsLabel && (
                <h3 className="mb-5 font-comic text-2xl tracking-wider">{meta.achievementsLabel}</h3>
              )}
              <ul data-stagger className="grid gap-5">
                {achievements.map((a) => (
                  <li key={a.title} data-stagger-item className="panel panel-hover flex gap-4 p-5 sm:p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-pop">
                      <Icon name={a.icon ?? "trophy"} size={22} />
                    </span>
                    <div>
                      <p className="font-mono text-xs font-semibold tracking-widest text-accent uppercase">
                        {[a.category, a.date].filter(Boolean).join(" · ")}
                      </p>
                      <h4 className="mt-1 text-lg leading-snug font-extrabold">
                        {a.url ? (
                          <a href={a.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                            {a.title}
                          </a>
                        ) : (
                          a.title
                        )}
                      </h4>
                      {a.description && <p className="mt-1 text-ink-soft">{a.description}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            {meta.certificationsLabel && (
              <h3 className="mb-5 font-comic text-2xl tracking-wider">{meta.certificationsLabel}</h3>
            )}
            {certifications.length === 0 ? (
              meta.emptyState && (
                <p data-reveal="fade" className="panel speed-lines p-6 font-semibold text-ink-soft">
                  {meta.emptyState}
                </p>
              )
            ) : (
              <ul data-stagger className="grid gap-5">
                {certifications.map((c) => (
                  <li key={c.title} data-stagger-item className="panel panel-hover flex gap-4 p-5 sm:p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-card">
                      <Icon name="award" size={22} />
                    </span>
                    <div>
                      <p className="font-mono text-xs font-semibold tracking-widest text-accent uppercase">
                        {[c.issuer, c.date].filter(Boolean).join(" · ")}
                      </p>
                      <h4 className="mt-1 text-lg leading-snug font-extrabold">{c.title}</h4>
                      {c.description && <p className="mt-1 text-ink-soft">{c.description}</p>}
                      {c.url && meta.credentialLabel && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 font-bold underline decoration-2 underline-offset-4 hover:text-accent"
                        >
                          {meta.credentialLabel} <Icon name="arrow-up-right" size={14} />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
