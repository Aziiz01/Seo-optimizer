import { load } from "cheerio";
import { MetricResult } from "../types";

export function analyzeMeta(html: string) {
  const $ = load(html);

  const title = $("title").text().trim();
  const description = $('meta[name="description"]').attr("content")?.trim() || "";

  const titleMetric: MetricResult<string> = {
    value: title,
    ok: title.length > 0 && title.length <= 60,
    message: title
      ? title.length <= 60
        ? "Title is present and within recommended length."
        : "Title is too long. Recommended <= 60 characters."
      : "Title tag is missing."
  };

  const descriptionMetric: MetricResult<string> = {
    value: description,
    ok: description.length > 0 && description.length <= 160,
    message: description
      ? description.length <= 160
        ? "Meta description is present and within recommended length."
        : "Meta description is too long. Recommended <= 160 characters."
      : "Meta description is missing."
  };

  return { title: titleMetric, description: descriptionMetric };
}
