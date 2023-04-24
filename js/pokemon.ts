import express from "express";
import mongoose from "mongoose";
import auth from "./middleware.js";

const router = express.Router();

// interface Pokemon {
//   id: number;
//   name: string;
//   type: string;
//   type2?: string;
//   description: string;
// }
const POKEMON_NOT_FOUND = "Pokemon not found";

// let pokedex: Array<Pokemon> = [];
// let contador = pokedex.length + 1;

const PokemonSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    description: String,
  },
  { versionKey: false }
);

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

const listPokemon = async (req, res) => {
  const data = req.query;
  const namePokemonRegex = new RegExp(data.name);
  if (data.name) {
    // return res.json(pokedex.filter((pokemon) => {
    //   if(pokemon.name){
    //       return pokemon.name.includes(data.name);
    //   }
    // }))
    // const [key, value] = Object.entries(req.query)[0];
    const pokemon = await Pokemon.find({ name: namePokemonRegex });
    res.json(pokemon);
  } else {
    // res.json(
    //   pokedex.map((pokemon) => {
    //     // const {description, ...rest } = pokemon;
    //     // return rest
    //     return { name: pokemon.name, type: pokemon.type };
    //   })
    // );
    const pokemon = await Pokemon.find({}, { name: 1, type: 1 });
    res.json(pokemon);
  }
};

const detailedPokemon = async (req, res) => {
  // const pokemonID =;
  // res.json(pokedex.find((pokemon) => pokemon.id == pokemonID));
  const pokemon = await Pokemon.findOne({ _id: req.params.id });
  res.json(pokemon);
};

const addPokemon = async(req, res) => {
  const data = req.body;
  // let nextID = contador++;
  // const newPokemon = {
  //   id: nextID,
  //   name: data.name,
  //   type: data.type,
  //   description: data.description,
  // };
  // pokedex.push(newPokemon);
  const pokemon = new Pokemon(data);
  await pokemon.save();
  return res.json(pokemon);
};

const editPokemon = async (req, res) => {
  // let modifiedPokemon = pokedex.find((pokemon) => pokemon.id == pokemonID);
  // if(!modifiedPokemon){
  //    return res.status(404).res.json(POKEMON_NOT_FOUND)
  // }
  // modifiedPokemon.name = data.name;
  // modifiedPokemon.type = data.type;
  // modifiedPokemon.description = data.description;
  const pokemon = await Pokemon.findOne({ _id: req.params.id });
  if (!pokemon) {
    return res.status(400);
  }
  await Pokemon.replaceOne({ _id: req.params.id }, req.body);
  await pokemon.save();
  return res.json(pokemon);
};

const editOneField = async (req, res) => {
  const pokemon = await Pokemon.findOne({ _id: req.params.id });
  if (!pokemon) {
    return res.status(404);
  }
  await Pokemon.updateOne({ _id: req.params.id }, req.body);
  await pokemon.save();
  return res.json(pokemon);
}

const deletePokemon = async (req, res) => {
  // pokedex = pokedex.filter((pokemon) => pokemon.id !== pokemonId);
  try {
    await Pokemon.deleteOne({ _id: req.params.id });
  } catch (e) {
    res.status(404);
  }
  return res.json();
};

router.get("/", listPokemon);
router.get("/:id", detailedPokemon);
router.post("/", auth, addPokemon);
router.put("/:id", editPokemon);
router.patch("/:id", editOneField);
router.delete("/:id", deletePokemon);

export default router;
