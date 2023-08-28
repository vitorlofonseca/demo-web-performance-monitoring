import Prometheus from "prom-client";
import "json-circular-stringify";

const fidMetricScore = new Prometheus.Histogram({
  name: "fid_metric_score",
  help: "Score of web vitals FID metric",
  labelNames: ["metric"],
  buckets: [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
    10, 100, 200,
  ],
});

const clsMetricScore = new Prometheus.Histogram({
  name: "cls_metric_score",
  help: "Score of web vitals CLS metric",
  labelNames: ["metric"],
  buckets: [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
    10, 100, 200,
  ],
});

const lcpMetricScore = new Prometheus.Histogram({
  name: "lcp_metric_score",
  help: "Score of web vitals LCP metric",
  labelNames: ["metric"],
  buckets: [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
    10, 100, 200,
  ],
});

const webVitalsMetrics = { fidMetricScore, clsMetricScore, lcpMetricScore };

export const pushFrontendMetric = async (req, res) => {
  const body = req.body;

  console.log(`Value ${body.value} received for metric ${body.name}`);

  const prometheusMetricName = `${body.name.toLowerCase()}MetricScore`;

  webVitalsMetrics[prometheusMetricName].labels(body.name).observe(body.value);

  res.send();
};
