"use client";

import { useState, useTransition } from "react";
import { runAudit } from "@/app/actions/runAudit";
import { SEOReport } from "@/lib/seo-engine/types";

export default function AuditPage() {
  const [report, setReport] = useState<SEOReport | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const url = (new FormData(e.currentTarget).get("url") as string)?.trim();
    if (!url) return;

    try {
      startTransition(async () => {
        const result = await runAudit(url);
        console.log("[AuditPage] Report received:", result);
        setReport(result);
      });
    } catch (err: any) {
      console.error("[AuditPage] Error:", err);
      setError(err.message || "Unknown error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">SEO Optimizer</h1>
      <form className="flex gap-2 mb-6" onSubmit={handleSubmit}>
        <input
          name="url"
          placeholder="https://example.com"
          required
          className="flex-1 border px-4 py-2 rounded"
        />
        <button
          type="submit"
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

          {/* Meta */}
          <section>
            <h3 className="font-semibold">Meta Tags</h3>
            <p>
              Title: {report.meta.title.value || "Missing"} (
              {report.meta.title.ok ? "✅" : "⚠️"})
            </p>
            <p>
              Description: {report.meta.description.value || "Missing"} (
              {report.meta.description.ok ? "✅" : "⚠️"})
            </p>
            <p className="text-sm text-gray-500">
              {report.meta.title.message} | {report.meta.description.message}
            </p>
          </section>

          {/* Headings */}
          <section>
            <h3 className="font-semibold">Headings</h3>
            <p>
              H1 count: {report.headings.h1.value} (
              {report.headings.h1.ok ? "✅" : "⚠️"})
            </p>
            <p>
              H2 count: {report.headings.h2.value} (
              {report.headings.h2.ok ? "✅" : "⚠️"})
            </p>
            <p className="text-sm text-gray-500">
              {report.headings.h1.message} | {report.headings.h2.message}
            </p>
          </section>

          {/* Links */}
          <section>
            <h3 className="font-semibold">Links</h3>
            <p>
              Internal links: {report.links.internal.value} (
              {report.links.internal.ok ? "✅" : "⚠️"})
            </p>
            <p>
              External links: {report.links.external.value} (
              {report.links.external.ok ? "✅" : "⚠️"})
            </p>
            <p className="text-sm text-gray-500">
              {report.links.internal.message} | {report.links.external.message}
            </p>
          </section>

          {/* Overall score */}
          <section>
            <h3 className="font-semibold">Overall SEO Score</h3>
            <p className="text-2xl font-bold">{report.score}/100</p>
          </section>
        </div>
      )}
    </div>
  );
}
