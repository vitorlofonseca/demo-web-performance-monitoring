import express from "express";
import { getPokemonByName } from "./api/pokemon.js";
import { pushFrontendMetric } from "./infrastructure/monitoring.js";
import promMid from "express-prometheus-middleware";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

const allowedOrigins = ["http://localhost:5174"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);

app.use(bodyParser.json());

app.get("/pikachu", async (req, res) => {
  const pokemon = await getPokemonByName("pikachu");

  res.send(pokemon);
});

app.post("/push-frontend-metric", pushFrontendMetric);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
