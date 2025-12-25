"use server";

import { analyzeMeta } from "@/lib/seo/analyzeMeta";
import { analyzeHeadings } from "@/lib/seo/analyzeHeadings";
import { analyzeLinks } from "@/lib/seo/analyzeLinks";
import { computeScore } from "@/lib/seo/score";

export async function runAudit(url: string) {
  if (!url.startsWith("http")) throw new Error("Invalid URL");

  let html: string;
  try {
    const res = await fetch(url);
    html = await res.text();
  } catch {
    throw new Error("Failed to fetch URL");
  }

  const metaResults = analyzeMeta(html);
  const headingResults = analyzeHeadings(html);
  const linkResults = analyzeLinks(html);
  const score = computeScore({ metaResults, headingResults, linkResults });

  // Return report directly instead of redirect
  return { metaResults, headingResults, linkResults, score };
}
