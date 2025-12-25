"use server";

import { runAudit as engineRunAudit } from "@/lib/seo-engine";

export async function runAudit(url: string) {
  if (!url.startsWith("http")) throw new Error("Invalid URL");

  let html: string;
  try {
    const res = await fetch(url);
    html = await res.text();
  } catch {
    throw new Error("Failed to fetch URL");
  }

  // Use your engine
  const report = engineRunAudit(html);

  return report;
}
