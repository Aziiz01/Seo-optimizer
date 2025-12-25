"use client";

import { useState, useTransition } from "react";
import { runAudit } from "@/app/actions/runAudit";
import { SEOReport, MetricResult } from "@/lib/seo-engine/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function AuditDashboard() {
  const [report, setReport] = useState<SEOReport | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setReport(null);

    const url = (new FormData(e.currentTarget).get("url") as string)?.trim();
    if (!url) return;

    startTransition(async () => {
      try {
        const result = await runAudit(url);
        setReport(result);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    });
  };

  const renderMetricCard = (title: string, metric: MetricResult<any>) => {
    const color = metric.ok ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50";
    const Icon = metric.ok ? CheckCircle : AlertTriangle;

    return (
      <Card key={title} className={`${color} border`}>
        <CardHeader className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">Value: {typeof metric.value === "boolean" ? (metric.value ? "Yes" : "No") : metric.value}</p>
          <p className="text-sm text-gray-600">{metric.message}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <form className="flex gap-2 mb-10" onSubmit={handleSubmit}>
        <input
          name="url"
          placeholder="https://example.com"
          required
          className="flex-1 border px-4 py-2 rounded"
        />
        <button type="submit" disabled={isPending} className="bg-black text-white px-6 rounded">
          {isPending ? "Analyzing..." : "Run Audit"}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {report && (
        <div className="space-y-10">
          {/* Overall Score Panel */}
          <Card className="p-6 bg-blue-50 border border-blue-400">
            <CardHeader>
              <CardTitle className="text-xl">Overall SEO Score</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <p className="text-4xl font-bold">{report.score}/100</p>
              <Progress value={report.score} className="w-1/2 h-4" />
            </CardContent>
          </Card>

          {/* Metric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Meta */}
            {renderMetricCard("Title", report.meta.title)}
            {renderMetricCard("Description", report.meta.description)}
            {renderMetricCard("Canonical", report.meta.canonical)}
            {renderMetricCard("Robots", report.meta.robots)}

            {/* Headings */}
            {renderMetricCard("H1 Count", report.headings.h1)}
            {renderMetricCard("H2 Count", report.headings.h2)}
            {renderMetricCard("Heading Depth", report.headings.depth)}

            {/* Links */}
            {renderMetricCard("Internal Links", report.links.internal)}
            {renderMetricCard("External Links", report.links.external)}

            {/* Images */}
            {renderMetricCard("Total Images", report.images.total)}
            {renderMetricCard("Images Missing Alt", report.images.missingAlt)}

            {/* Structured Data */}
            {renderMetricCard("Structured Data", report.structuredData)}
          </div>
        </div>
      )}
    </div>
  );
}
