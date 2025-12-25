import { load } from "cheerio";
import { MetricResult } from "../types";

export function analyzeLinks(html: string) {
  const $ = load(html);

  const links = $("a[href]").map((_, el) => $(el).attr("href")?.trim()).get().filter(Boolean) as string[];

  const internal = links.filter((href) => href.startsWith("/")).length;
  const external = links.filter((href) => href.startsWith("http")).length;

  return {
    internal: { value: internal, ok: internal > 0, message: internal > 0 ? "Internal links OK" : "No internal links" },
    external: { value: external, ok: true, message: external > 0 ? "External links OK" : "No external links (optional)" }
  };
}
