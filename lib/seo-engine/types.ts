export interface MetricResult<T = any> {
  value: T;
  ok: boolean;
  message: string;
}

export interface SEOReport {
  meta: {
    title: MetricResult<string>;
    description: MetricResult<string>;
    canonical: MetricResult<string>;
    robots: MetricResult<string>;
  };
  headings: {
    h1: MetricResult<number>;
    h2: MetricResult<number>;
    depth: MetricResult<number>; // optional: max heading depth
  };
  links: {
    internal: MetricResult<number>;
    external: MetricResult<number>;
  };
  images: {
    total: MetricResult<number>;
    missingAlt: MetricResult<number>;
  };
  structuredData: MetricResult<boolean>;
  score: number;
}
