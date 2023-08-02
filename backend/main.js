import express from "express";
import { getPokemonByName } from "./http/pokemon.js";

const app = express();
const port = 3000;

app.get("/pikachu", async (req, res) => {
  const pokemon = await getPokemonByName("pikachu");

  res.send(pokemon);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
