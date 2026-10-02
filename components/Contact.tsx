"use client";

import { useId, useState, type FormEvent } from "react";
import Icon from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import { fillTemplate } from "@/lib/data";
import type { Contact as ContactData, Personal, SectionMeta, Social } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  contact: ContactData;
  personal: Personal;
  social: Social[];
}

type Status = { kind: "idle" } | { kind: "error" | "success"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ meta, contact, personal, social }: Props) {
  const { form } = contact;
  const uid = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus({ kind: "error", message: form.errorRequired });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus({ kind: "error", message: form.errorEmail });
      return;
    }
    if (!personal.email) return;

    // No backend: hand the message to the visitor's own mail client.
    const subject = fillTemplate(form.subjectTemplate, { name });
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "success", message: form.successMessage });
  }

  const inputClass =
    "mt-2 block w-full rounded-md border-[3px] border-ink bg-white px-4 py-3 text-base shadow-[var(--shadow-comic-sm)] placeholder:text-ink-mute/70 focus:shadow-[4px_4px_0_0_var(--color-accent)] focus:outline-none";

  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="relative overflow-hidden border-t-[3px] border-ink bg-paper-deep py-24 md:py-32"
    >
      <div aria-hidden="true" className="halftone-fade pointer-events-none absolute -right-20 -bottom-20 h-[30rem] w-[30rem] rotate-180 text-accent/30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader meta={meta} />

        <div className="grid gap-8 lg:grid-cols-12">
          <div data-reveal="panel" className="lg:col-span-5">
            {contact.speechBubble && (
              <p className="speech mb-8 inline-block rotate-[-2deg] font-comic text-2xl tracking-wider">
                {contact.speechBubble}
              </p>
            )}
            <p className="text-lg leading-relaxed text-ink-soft">{contact.intro}</p>

            {contact.directLabel && social.length > 0 && (
              <h3 className="mt-10 font-comic text-xl tracking-wider">{contact.directLabel}</h3>
            )}
            <ul className="mt-4 grid gap-3">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="panel panel-hover flex items-center gap-4 px-4 py-3"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-pop">
                      <Icon name={s.icon} size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink-mute">{s.label}</span>
                      {s.handle && <span className="block truncate font-bold">{s.handle}</span>}
                    </span>
                    <Icon name="arrow-up-right" size={18} className="ml-auto shrink-0" />
                  </a>
                </li>
              ))}
            </ul>

            {personal.location && (
              <p className="mt-6 flex items-center gap-2 font-semibold text-ink-soft">
                <Icon name="map-pin" size={18} className="text-accent" />
                {contact.locationLabel && <span className="sr-only">{contact.locationLabel}</span>}
                {personal.location}
              </p>
            )}
          </div>

          <form
            data-reveal="panel"
            onSubmit={handleSubmit}
            noValidate
            className="panel p-6 sm:p-8 lg:col-span-7 lg:p-10"
            aria-describedby={form.note ? `${uid}-note` : undefined}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="font-bold">
                  {form.nameLabel}
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={form.namePlaceholder}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="font-bold">
                  {form.emailLabel}
                </label>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={form.emailPlaceholder}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor={`${uid}-message`} className="font-bold">
                {form.messageLabel}
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                required
                rows={6}
                placeholder={form.messagePlaceholder}
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn-comic bg-accent text-white">
                {form.submitLabel}
                <Icon name="arrow-right" size={20} />
              </button>
              {form.note && (
                <p id={`${uid}-note`} className="text-sm text-ink-mute sm:max-w-xs sm:text-right">
                  {form.note}
                </p>
              )}
            </div>

            <p
              role={status.kind === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`mt-5 min-h-[1.5rem] font-semibold ${
                status.kind === "error" ? "text-accent-deep" : "text-ink"
              }`}
            >
              {status.kind !== "idle" && status.message}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
