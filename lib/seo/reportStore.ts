interface SEOReport {
  metaResults: ReturnType<typeof import("./analyzeMeta").analyzeMeta>;
  headingResults: ReturnType<typeof import("./analyzeHeadings").analyzeHeadings>;
  linkResults: ReturnType<typeof import("./analyzeLinks").analyzeLinks>;
  score: number;
}

const reports = new Map<string, SEOReport>();

export function saveReport(id: string, report: SEOReport) {
  reports.set(id, report);
}

export function getReport(id: string): SEOReport | undefined {
  return reports.get(id);
}
