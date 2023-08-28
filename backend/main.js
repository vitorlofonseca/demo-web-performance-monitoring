import express from "express";
import { getPikachuData } from "./api/pokemon.js";
import { pushFrontendMetric } from "./infrastructure/monitoring.js";
import promMid from "express-prometheus-middleware";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "*", //THIS IS JUST A DEMO, DONT DO THIS IN PRODUCTION
  })
);

app.use(
  promMid({
    metricsPath: "/metrics",
  })
);

app.use(bodyParser.json());

app.get("/pikachu", getPikachuData);

app.post("/push-frontend-metric", pushFrontendMetric);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
