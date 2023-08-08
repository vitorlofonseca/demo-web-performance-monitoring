import Prometheus from "prom-client";
import "json-circular-stringify";

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["route"],
  // buckets for response time from 0.1ms to 500ms
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});

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
