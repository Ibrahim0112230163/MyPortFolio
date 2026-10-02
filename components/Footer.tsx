import Icon from "@/components/Icon";
import { fillTemplate } from "@/lib/data";
import type { Personal, Social } from "@/lib/types";

interface Props {
  footer: { tagline: string; copyright: string; endMark?: string };
  personal: Personal;
  social: Social[];
  backToTop: string;
}

export default function Footer({ footer, personal, social, backToTop }: Props) {
  const copyright = fillTemplate(footer.copyright, { year: new Date().getFullYear(), name: personal.name });

  return (
    <footer className="relative z-[1] overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {footer.endMark && (
          <p data-reveal="fade" className="mb-10 font-comic text-[clamp(2.5rem,8vw,5rem)] leading-none tracking-wider text-pop">
            {footer.endMark}
          </p>
        )}
        <div className="flex flex-col gap-8 border-t-2 border-paper/20 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-2xl font-black tracking-tight uppercase">{personal.name}</p>
            <p className="mt-2 max-w-md text-paper/70">{footer.tagline}</p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <ul className="flex gap-3">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border-2 border-paper/40 transition-colors hover:border-pop hover:bg-pop hover:text-ink"
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
            <a href="#home" data-scroll-link className="text-sm font-semibold text-paper/70 underline-offset-4 hover:text-pop hover:underline">
              {backToTop} ↑
            </a>
          </div>
        </div>
        <p className="mt-8 text-sm text-paper/60">{copyright}</p>
      </div>
    </footer>
  );
}
