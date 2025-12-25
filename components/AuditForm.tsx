"use client";

import { useState, useTransition } from "react";
import { runAudit } from "@/app/actions/runAudit"; // server action

interface SEOReport {
  metaResults: {
    title: { value: string; ok: boolean };
    description: { value: string; ok: boolean };
  };
  headingResults: { h1Count: number; h2Count: number; ok: boolean };
  linkResults: { internalLinks: number; externalLinks: number };
  score: number;
}

export function AuditForm() {
  const [isPending, startTransition] = useTransition();
  const [report, setReport] = useState<SEOReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const url = (new FormData(e.currentTarget).get("url") as string)?.trim();
    console.log("[AuditForm] Submitting URL:", url);

    if (!url) return;

    try {
      startTransition(async () => {
        // Call server action to get report data
        const reportData = await runAudit(url);
        console.log("[AuditForm] Received report:", reportData);
        setReport(reportData);
      });
    } catch (err: any) {
      console.error("[AuditForm] Error running audit:", err);
      setError(err.message || "Unknown error");
    }
  };

  return (
    <div>
      <form className="flex gap-2 mb-6" onSubmit={handleSubmit}>
        <input
          name="url"
          required
          placeholder="https://example.com"
          className="flex-1 border px-4 py-2 rounded"
        />
        <button
          disabled={isPending}
          className="bg-black text-white px-6 rounded"
        >
          {isPending ? "Analyzing..." : "Run Audit"}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {report && (
        <div className="space-y-6 border-t pt-6">
          <h2 className="text-2xl font-bold">SEO Report</h2>

          <section>
            <h3 className="font-semibold">Meta Tags</h3>
            <p>Title: {report.metaResults.title.value || "Missing"} ({report.metaResults.title.ok ? "✅" : "⚠️"})</p>
            <p>Description: {report.metaResults.description.value || "Missing"} ({report.metaResults.description.ok ? "✅" : "⚠️"})</p>
          </section>

          <section>
            <h3 className="font-semibold">Headings</h3>
            <p>H1 count: {report.headingResults.h1Count}</p>
            <p>H2 count: {report.headingResults.h2Count}</p>
            <p>{report.headingResults.ok ? "✅ Good heading structure" : "⚠️ Check H1/H2 usage"}</p>
          </section>

          <section>
            <h3 className="font-semibold">Links</h3>
            <p>Internal links: {report.linkResults.internalLinks}</p>
            <p>External links: {report.linkResults.externalLinks}</p>
          </section>

          <section>
            <h3 className="font-semibold">Overall SEO Score</h3>
            <p className="text-2xl font-bold">{report.score}/100</p>
          </section>
        </div>
      )}
    </div>
  );
}
