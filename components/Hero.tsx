import Image from "next/image";
import Icon from "@/components/Icon";
import type { Hero as HeroData, Personal, Social } from "@/lib/types";

interface Props {
  hero: HeroData;
  personal: Personal;
  social: Social[];
}

const stickerSpots = [
  "-top-6 -left-6 rotate-[-12deg] text-2xl md:text-3xl",
  "top-[38%] -right-5 rotate-[10deg] text-xl md:-right-10 md:text-2xl",
  "-bottom-7 left-[18%] rotate-[-4deg] text-xl md:text-2xl",
];

export default function Hero({ hero, personal, social }: Props) {
  const words = personal.name.split(" ");

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-[calc(var(--nav-h)+2rem)] pb-20"
    >
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div data-parallax="0.25" className="speed-lines absolute inset-0 opacity-70" />
        <div
          data-parallax="-0.15"
          className="halftone-fade absolute -top-24 -right-24 h-[34rem] w-[34rem] rounded-full text-accent/40"
        />
        <div
          data-parallax="0.35"
          className="halftone absolute bottom-10 -left-16 h-52 w-52 rotate-12 text-ink/15"
        />
        <svg
          data-hero="ink"
          className="absolute top-[18%] right-[6%] hidden w-[38rem] text-pop lg:block"
          viewBox="0 0 200 200"
        >
          <path
            fill="currentColor"
            d="M43.2,-58.1C55.1,-49.8,63.6,-36.2,68.5,-21C73.4,-5.8,74.7,11,68.9,24.8C63.1,38.6,50.2,49.4,36,57.8C21.7,66.2,6.1,72.2,-10.5,73.4C-27.2,74.5,-44.9,70.8,-55.8,60.1C-66.8,49.4,-71,31.7,-72.4,14.6C-73.9,-2.6,-72.7,-19.3,-65,-32.4C-57.3,-45.4,-43.1,-54.9,-28.8,-62.3C-14.5,-69.7,0,-75,13.1,-72.6C26.2,-70.2,31.3,-66.4,43.2,-58.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        {/* Copy */}
        <div className="relative">
          {hero.issue && (
            <p data-hero="issue" className="kicker">
              {hero.issue}
            </p>
          )}

          <h1 id="hero-title" className="mt-6" aria-label={personal.name}>
            {hero.greeting && (
              <span data-hero="greeting" className="mb-2 block font-comic text-2xl tracking-wider text-ink-soft md:text-3xl" aria-hidden="true">
                {hero.greeting}
              </span>
            )}
            <span aria-hidden="true" className="section-title block text-[clamp(3.4rem,14.5vw,8.5rem)]">
              {words.map((word, wi) => (
                <span
                  key={`${word}-${wi}`}
                  className={`mr-[0.18em] inline-block whitespace-nowrap last:mr-0 ${
                    wi === words.length - 1 && words.length > 1
                      ? "text-accent [text-shadow:4px_4px_0_var(--color-ink)]"
                      : ""
                  }`}
                >
                  {Array.from(word).map((char, ci) => (
                    <span key={ci} data-hero="char" className="inline-block will-change-transform">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <p
            data-hero="headline"
            className="mt-6 inline-block border-y-[3px] border-ink py-2 font-mono text-sm font-semibold tracking-tight sm:text-base"
          >
            {hero.headline}
          </p>

          <p data-hero="intro" className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            {hero.intro}
          </p>

          <div data-hero="cta" className="mt-9 flex flex-wrap gap-4">
            {hero.primaryCta && (
              <a href={hero.primaryCta.href} data-scroll-link className="btn-comic bg-accent text-white">
                {hero.primaryCta.label}
                <Icon name="arrow-right" size={20} />
              </a>
            )}
            {hero.secondaryCta && (
              <a
                href={hero.secondaryCta.href}
                download={hero.secondaryCta.download ? personal.cv?.fileName ?? true : undefined}
                className="btn-comic bg-card text-ink"
              >
                <Icon name="download" size={20} />
                {hero.secondaryCta.label}
              </a>
            )}
          </div>

          {hero.focus.length > 0 && (
            <div data-hero="focus" className="mt-10">
              {hero.focusLabel && (
                <p className="font-comic text-lg tracking-wider text-ink-mute">{hero.focusLabel}</p>
              )}
              <ul className="mt-2 flex flex-wrap gap-2">
                {hero.focus.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {social.length > 0 && (
            <ul data-hero="focus" className="mt-8 flex gap-3">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-card shadow-[var(--shadow-comic-sm)] transition-transform hover:-translate-y-1 hover:bg-pop"
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Portrait panel */}
        {personal.avatar && (
          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-md">
            {hero.speechBubble && (
              <p
                data-hero="bubble"
                className="speech relative z-20 mb-10 ml-auto max-w-[16rem] text-sm md:text-base lg:absolute lg:-top-24 lg:-right-6 lg:mb-0"
              >
                {hero.speechBubble}
              </p>
            )}

            <div data-parallax="-0.08" className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 rotate-[3deg] rounded-md border-[3px] border-ink bg-accent"
              />
              <figure
                data-hero="avatar"
                className="panel relative rotate-[-2deg] overflow-hidden p-3 shadow-[var(--shadow-comic-lg)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm border-[3px] border-ink">
                  <Image
                    src={personal.avatar.src}
                    alt={personal.avatar.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 90vw"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="halftone-fade absolute inset-0 text-ink/25 mix-blend-multiply" />
                </div>
                <figcaption className="absolute bottom-6 left-0 border-y-[3px] border-r-[3px] border-ink bg-pop px-4 py-2 font-comic text-lg tracking-wider">
                  {personal.name}
                </figcaption>
              </figure>
            </div>

            {hero.stickers.slice(0, stickerSpots.length).map((label, i) => (
              <span
                key={`${label}-${i}`}
                data-hero="sticker"
                aria-hidden="true"
                className={`sticker absolute z-10 ${stickerSpots[i]}`}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {hero.scrollHint && (
        <a
          href="#about"
          data-scroll-link
          data-hero="hint"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-xs tracking-widest text-ink-mute uppercase md:flex"
        >
          <span className="inline-block h-8 w-[3px] animate-pulse bg-ink" aria-hidden="true" />
          {hero.scrollHint}
        </a>
      )}
    </section>
  );
}
