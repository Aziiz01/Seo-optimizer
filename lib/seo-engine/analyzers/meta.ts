import { load } from "cheerio";
import { MetricResult } from "../types";

export function analyzeMeta(html: string) {
  const $ = load(html);

  const title = $("title").text().trim();
  const description = $('meta[name="description"]').attr("content")?.trim() || "";
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() || "";
  const robots = $('meta[name="robots"]').attr("content")?.trim() || "";

  return {
    title: {
      value: title,
      ok: title.length > 0 && title.length <= 60,
      message: title ? (title.length <= 60 ? "Title OK" : "Title too long") : "Missing title"
    },
    description: {
      value: description,
      ok: description.length > 0 && description.length <= 160,
      message: description ? (description.length <= 160 ? "Description OK" : "Description too long") : "Missing description"
    },
    canonical: {
      value: canonical,
      ok: !!canonical,
      message: canonical ? "Canonical tag present" : "Missing canonical tag"
    },
    robots: {
      value: robots,
      ok: !!robots,
      message: robots ? "Robots meta present" : "No robots meta tag"
    }
  };
}
