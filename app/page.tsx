import AuditForm from "@/components/AuditForm"; // no curly braces for default

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight">
        SEO Audit Tool
      </h1>

      <p className="mt-4 text-neutral-600">
        Analyze any webpage for technical SEO issues in seconds.
      </p>

      <div className="mt-10">
        <AuditForm />
      </div>
    </main>
  );
}
