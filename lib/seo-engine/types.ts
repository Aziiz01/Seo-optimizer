export interface MetricResult<T = any> {
  value: T;             // Raw data (string, number, array)
  ok: boolean;          // Pass/fail
  message: string;      // Human-readable explanation or recommendation
}

export interface SEOReport {
  meta: {
    title: MetricResult<string>;
    description: MetricResult<string>;
  };
  headings: {
    h1: MetricResult<number>;
    h2: MetricResult<number>;
  };
  links: {
    internal: MetricResult<number>;
    external: MetricResult<number>;
  };
  images?: {
    total: MetricResult<number>;
    missingAlt: MetricResult<number>;
  };
  score: number;        // Overall SEO score 0-100
}
