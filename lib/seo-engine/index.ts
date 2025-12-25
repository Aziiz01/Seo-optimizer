import { analyzeMeta } from "./analyzers/meta";
import { analyzeHeadings } from "./analyzers/headings";
import { analyzeLinks } from "./analyzers/links"; // similar pattern
import { SEOReport } from "./types";

export function runAudit(html: string): SEOReport {
  const meta = analyzeMeta(html);
  const headings = analyzeHeadings(html);
  const links = analyzeLinks(html);

  // Compute simple weighted score
  const score =
    (meta.title.ok && meta.description.ok ? 50 : 0) +
    (headings.h1.ok && headings.h2.ok ? 25 : 0) +
    (links.internal.ok && links.external.ok ? 25 : 0);

  return { meta, headings, links, score };
}
