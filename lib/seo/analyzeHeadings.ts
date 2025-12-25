import * as cheerio from "cheerio";

export function analyzeHeadings(html: string) {
  const $ = cheerio.load(html);

  const h1s = $("h1").length;
  const h2s = $("h2").length;

  return {
    h1Count: h1s,
    h2Count: h2s,
    ok: h1s === 1 && h2s >= 1,
  };
}
