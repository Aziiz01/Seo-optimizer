"use client";

import { useSearchParams } from "next/navigation";

export default function ReportPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  if (!data) {
    console.error("[ReportPage] No report data in URL");
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold">SEO Report</h1>
        <p className="mt-2 text-red-600">Report not found or missing data.</p>
      </main>
    );
  }

  // Decode base64 JSON
  let report;
  try {
    report = JSON.parse(atob(data));
    console.log("[ReportPage] Decoded report:", report);
  } catch (err) {
    console.error("[ReportPage] Failed to parse report data:", err);
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold">SEO Report</h1>
        <p className="mt-2 text-red-600">Invalid report data.</p>
      </main>
    );
  }

  const { metaResults, headingResults, linkResults, score } = report;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 space-y-6">
      <h1 className="text-3xl font-bold">SEO Report</h1>

      <section>
        <h2 className="text-xl font-semibold">Meta Tags</h2>
        <p>Title: {metaResults.title.value || "Missing"} ({metaResults.title.ok ? "✅" : "⚠️"})</p>
        <p>Description: {metaResults.description.value || "Missing"} ({metaResults.description.ok ? "✅" : "⚠️"})</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Headings</h2>
        <p>H1 count: {headingResults.h1Count}</p>
        <p>H2 count: {headingResults.h2Count}</p>
        <p>{headingResults.ok ? "✅ Good heading structure" : "⚠️ Check H1/H2 usage"}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Links</h2>
        <p>Internal links: {linkResults.internalLinks}</p>
        <p>External links: {linkResults.externalLinks}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Overall SEO Score</h2>
        <p className="text-2xl font-bold">{score}/100</p>
      </section>
    </main>
  );
}
