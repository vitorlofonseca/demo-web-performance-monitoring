import { get } from "../external-layers/http.js";

export const getPikachuData = async (req, res) => {
  const response = await get("https://pokeapi.co/api/v2/pokemon/pikachu");
  res.send(await response.json());
};
