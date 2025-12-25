import { load } from "cheerio";
import { MetricResult } from "../types";

export function analyzeLinks(html: string) {
  const $ = load(html);

  const links = $("a[href]")
    .map((_, el) => $(el).attr("href")?.trim())
    .get()
    .filter(Boolean) as string[];

  // Internal: starts with '/'
  const internalLinks = links.filter((href) => href.startsWith("/")).length;

  // External: starts with 'http'
  const externalLinks = links.filter((href) => href.startsWith("http")).length;

  const internalMetric: MetricResult<number> = {
    value: internalLinks,
    ok: internalLinks > 0,
    message: internalLinks > 0 ? "Internal links present." : "No internal links found."
  };

  const externalMetric: MetricResult<number> = {
    value: externalLinks,
    ok: true, // optional
    message: externalLinks > 0 ? "External links present." : "No external links found (optional)."
  };

  return { internal: internalMetric, external: externalMetric };
}
