import { analyzeMeta } from "./analyzers/meta";
import { analyzeHeadings } from "./analyzers/headings";
import { analyzeLinks } from "./analyzers/links";
import { analyzeImages } from "./analyzers/images";
import { analyzeStructuredData } from "./analyzers/structuredData";
import { SEOReport } from "./types";

export function runAudit(html: string): SEOReport {
  const meta = analyzeMeta(html);
  const headings = analyzeHeadings(html);
  const links = analyzeLinks(html);
  const images = analyzeImages(html);
  const structuredData = analyzeStructuredData(html);

  const score =
    (meta.title.ok && meta.description.ok && meta.canonical.ok ? 20 : 0) +
    (headings.h1.ok && headings.h2.ok ? 20 : 0) +
    (links.internal.ok ? 15 : 0) +
    (images.missingAlt.ok ? 15 : 0) +
    (structuredData.ok ? 30 : 0); // weighted example

  return { meta, headings, links, images, structuredData, score };
}
