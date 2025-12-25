interface SEOResults {
  metaResults: ReturnType<typeof import("./analyzeMeta").analyzeMeta>;
  headingResults: ReturnType<typeof import("./analyzeHeadings").analyzeHeadings>;
  linkResults: ReturnType<typeof import("./analyzeLinks").analyzeLinks>;
}

export function computeScore({ metaResults, headingResults, linkResults }: SEOResults) {
  let score = 0;

  if (metaResults.title.ok) score += 25;
  if (metaResults.description.ok) score += 25;

  if (headingResults.ok) score += 25;

  // Link diversity bonus
  if (linkResults.internalLinks + linkResults.externalLinks > 0) score += 25;

  return score;
}
