import { get } from "../external-layers/http.js";
import Prometheus from "prom-client";

const prometheusMetrics = [];

const getPrometheusMetricByIdentifier = (identifier) => {
  if (!prometheusMetrics[identifier]) {
    prometheusMetrics[identifier] = new Prometheus.Histogram({
      name: `${identifier}_duration_ms`,
      help: `Duration of request to ${identifier} in ms`,
      labelNames: ["route"],
      buckets: [
        0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000,
        4000, 5000, 6000, 7000,
      ],
    });
  }

  return prometheusMetrics[identifier];
};

export const getPikachuData = async (req, res) => {
  const startTimeRequest = Date.now();

  const response = await get("https://pokeapi.co/api/v2/pokemon/pikachu");

  const requestDuration = Date.now() - startTimeRequest;

  console.log(
    `The request time over ${
      req.originalUrl
    } at ${new Date()} has taken ${requestDuration}ms`
  );

  getPrometheusMetricByIdentifier("getPikachuData").observe(requestDuration);

  res.send(await response.json());
};
