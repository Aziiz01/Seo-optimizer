import { load } from "cheerio";
import { MetricResult } from "../types";

export function analyzeStructuredData(html: string) {
  const $ = load(html);
  const jsonLd = $("script[type='application/ld+json']").length > 0;

  return {
    value: jsonLd,
    ok: jsonLd,
    message: jsonLd ? "Structured data present" : "No JSON-LD structured data found"
  };
}
