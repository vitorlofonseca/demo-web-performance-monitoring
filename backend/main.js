import express from "express";
import { getPokemonByName } from "./http/pokemon.js";
import promMid from "express-prometheus-middleware";

const app = express();
const port = 3000;

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);

app.get("/pikachu", async (req, res) => {
  const pokemon = await getPokemonByName("pikachu");

  res.send(pokemon);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
