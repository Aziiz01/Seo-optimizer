"use client";

import Background from "@/components/ui/background";
import { DashboardTitle } from "@/components/ui/dashboard-title";
import AuditForm from "@/components/AuditForm"; // no curly braces for default

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <div className="relative z-10 container mx-auto px-6 py-20">
  {/* Centered Title */}
  <div className="flex justify-center">
    <DashboardTitle title="SEO Optimizer Dashboard" />
  </div>

  {/* Form below */}
  <div className="mt-12">
    <AuditForm />
  </div>
</div>

    </div>
  );
}
