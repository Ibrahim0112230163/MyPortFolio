interface Props {
  message?: string;
}

/** Shown when a data collection in portfolio.json is empty. Renders nothing without a message. */
export default function EmptyState({ message }: Props) {
  if (!message) return null;
  return (
    <div
      data-reveal="panel"
      className="panel speed-lines flex items-center gap-4 px-6 py-8 md:px-10"
      role="status"
    >
      <span aria-hidden="true" className="font-comic text-4xl text-accent">
        …
      </span>
      <p className="max-w-xl text-lg font-semibold text-ink-soft">{message}</p>
    </div>
  );
}
