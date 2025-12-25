import * as cheerio from "cheerio";

export function analyzeMeta(html: string) {
  const $ = cheerio.load(html);

  const title = $("title").text() || null;
  const description = $('meta[name="description"]').attr("content") || null;

  const results = {
    title: {
      value: title,
      length: title?.length || 0,
      ok: title?.length && title.length <= 60,
    },
    description: {
      value: description,
      length: description?.length || 0,
      ok: description?.length && description.length <= 160,
    },
  };

  return results;
}
