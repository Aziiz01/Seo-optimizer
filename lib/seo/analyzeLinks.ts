import * as cheerio from "cheerio";

export function analyzeLinks(html: string) {
  const $ = cheerio.load(html);

  const internalLinks = $('a[href^="/"]').length;
  const externalLinks = $('a[href^="http"]').length;

  return { internalLinks, externalLinks };
}
