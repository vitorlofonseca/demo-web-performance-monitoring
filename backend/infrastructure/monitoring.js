import Prometheus from "prom-client";
import "json-circular-stringify";

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["route"],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});

const fidMetricScore = new Prometheus.Histogram({
  name: "fid_metric_score",
  help: "Score of web vitals FID metric",
  labelNames: ["metric"],
  buckets: [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
    10,
  ],
});

const clsMetricScore = new Prometheus.Histogram({
  name: "cls_metric_score",
  help: "Score of web vitals CLS metric",
  labelNames: ["metric"],
  buckets: [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
    10,
  ],
});

const lcpMetricScore = new Prometheus.Histogram({
  name: "lcp_metric_score",
  help: "Score of web vitals LCP metric",
  labelNames: ["metric"],
  buckets: [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
    10,
  ],
});

const webVitalsMetrics = { fidMetricScore, clsMetricScore, lcpMetricScore };

export const trackRequestTimeMiddleware = (req, res, next) => {
  const startTimeRequest = Date.now();
  const oldSend = res.send;

  res.send = function (data) {
    const endTimeRequest = Date.now();

    console.log(
      `The request time over ${req.originalUrl} at ${new Date()} has taken ${
        endTimeRequest - startTimeRequest
      }ms`
    );

    httpRequestDurationMicroseconds
      .labels(req.originalUrl)
      .observe(endTimeRequest - startTimeRequest);

    res.send = oldSend;
    return res.send(data);
  };

  next();
};

export const pushFrontendMetric = async (req, res) => {
  const body = req.body;

  console.log(`Value ${body.value} received for metric ${body.name}`);

  const prometheusMetricName = `${body.name.toLowerCase()}MetricScore`;

  webVitalsMetrics[prometheusMetricName].labels(body.name).observe(body.value);

  res.send();
};
