import { load } from "cheerio";
import { MetricResult } from "../types";

export function analyzeHeadings(html: string) {
  const $ = load(html);

  const h1Count = $("h1").length;
  const h2Count = $("h2").length;

  const h1Metric: MetricResult<number> = {
    value: h1Count,
    ok: h1Count === 1,
    message: h1Count === 1 ? "Exactly one H1 found." : `Found ${h1Count} H1 tags; recommended exactly 1.`
  };

  const h2Metric: MetricResult<number> = {
    value: h2Count,
    ok: h2Count >= 1,
    message: h2Count >= 1 ? "H2 tags found." : "No H2 tags found; recommended at least 1."
  };

  return { h1: h1Metric, h2: h2Metric };
}

