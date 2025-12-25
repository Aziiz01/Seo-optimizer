import { load } from "cheerio";
import { MetricResult } from "../types";

export function analyzeHeadings(html: string) {
  const $ = load(html);

  const h1Count = $("h1").length;
  const h2Count = $("h2").length;
  const depth = Math.max(
    $("h1").length ? 1 : 0,
    $("h2").length ? 2 : 0
  );

  return {
    h1: { value: h1Count, ok: h1Count === 1, message: h1Count === 1 ? "H1 OK" : `Found ${h1Count} H1 tags` },
    h2: { value: h2Count, ok: h2Count >= 1, message: h2Count >= 1 ? "H2 OK" : "No H2 tags found" },
    depth: { value: depth, ok: depth <= 2, message: `Max heading depth ${depth}` }
  };
}
