import type { SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export default function SectionHeader({ meta, align = "left", tone = "light" }: Props) {
  const centered = align === "center";
  return (
    <header
      data-reveal="header"
      className={`mb-10 md:mb-14 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}
    >
      {meta.kicker && <p className="kicker" data-header-part>{meta.kicker}</p>}
      <h2
        id={`${meta.id}-title`}
        className={`section-title mt-5 text-[clamp(2.4rem,7vw,4.75rem)] ${tone === "dark" ? "text-paper" : "text-ink"}`}
      >
        <span data-header-part className="inline-block">
          {meta.title}
        </span>
      </h2>
      {meta.subtitle && (
        <p
          data-header-part
          className={`mt-4 text-lg ${tone === "dark" ? "text-paper/75" : "text-ink-soft"}`}
        >
          {meta.subtitle}
        </p>
      )}
    </header>
  );
}
