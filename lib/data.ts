import raw from "@/data/portfolio.json";
import type { Portfolio } from "./types";

/** The single source of truth for every piece of portfolio content. */
export const portfolio = raw as Portfolio;

/** Replaces `{key}` tokens in a template string. */
export function fillTemplate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
