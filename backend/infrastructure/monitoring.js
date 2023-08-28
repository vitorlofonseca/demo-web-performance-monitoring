import Prometheus from "prom-client";
import "json-circular-stringify";

const HIGH_SCORE_LIMIT_WEB_VITALS = 1;

const fidMetricScore = new Prometheus.Histogram({
  name: "fid_metric_score",
  help: "Score of web vitals FID metric",
  labelNames: ["metric"],
  buckets: [0, 0.2, 0.5, 0.7, 1],
});

const clsMetricScore = new Prometheus.Histogram({
  name: "cls_metric_score",
  help: "Score of web vitals CLS metric",
  labelNames: ["metric"],
  buckets: [0, 0.2, 0.5, 0.7, 1],
});

const lcpMetricScore = new Prometheus.Histogram({
  name: "lcp_metric_score",
  help: "Score of web vitals LCP metric",
  labelNames: ["metric"],
  buckets: [0, 0.2, 0.5, 0.7, 1],
});

const quantityOfHighLCP = new Prometheus.Counter({
  name: "quantity_high_lcp",
  help: "Counter of accesses with high LCP metric",
});

const quantityOfHighFID = new Prometheus.Counter({
  name: "quantity_high_fid",
  help: "Counter of accesses with high FID metric",
});

const quantityOfHighCLS = new Prometheus.Counter({
  name: "quantity_high_cls",
  help: "Counter of accesses with high CLS metric",
});

const webVitalsMetrics = {
  fidMetricScore,
  clsMetricScore,
  lcpMetricScore,
  quantityOfHighLCP,
  quantityOfHighFID,
  quantityOfHighCLS,
};

export const pushFrontendMetric = async (req, res) => {
  const body = req.body;

  console.log(`Value ${body.value} received for metric ${body.name}`);

  const webVitalBucketName = `${body.name.toLowerCase()}MetricScore`;

  webVitalsMetrics[webVitalBucketName].labels(body.name).observe(body.value);

  if (body.value > HIGH_SCORE_LIMIT_WEB_VITALS) {
    const highMetricBucketName = `quantityOfHigh${body.name}`;
    webVitalsMetrics[highMetricBucketName].inc();
  }

  res.send();
};
