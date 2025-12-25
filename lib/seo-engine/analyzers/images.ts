import { load } from "cheerio";
import { MetricResult } from "../types";

export function analyzeImages(html: string) {
  const $ = load(html);
  const imgs = $("img").toArray();
  const missingAlt = imgs.filter((img) => !$(img).attr("alt")).length;

  return {
    total: { value: imgs.length, ok: imgs.length > 0, message: `${imgs.length} images found` },
    missingAlt: { value: missingAlt, ok: missingAlt === 0, message: missingAlt === 0 ? "All images have alt" : `${missingAlt} images missing alt` }
  };
}
