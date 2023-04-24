import Pokemon from "./model.js";

export const listPokemon = async (data)=> {
    const namePokemonRegex = new RegExp(data.name, 'i');
    if (data.name) {
        return await Pokemon.find({ name: namePokemonRegex });
    } else {
        return await Pokemon.find({}, { name: 1, type: 1 });
    }
}

export const detailedPokemon = async (id) => {
  return await Pokemon.findOne({ _id: id });
};

export const addPokemon = async (data) => {
  data.body.trainer = data.token.id
  const pokemon = new Pokemon(data.body);
  return await pokemon.save();
};

export const editPokemon = async (req) => {
  const pokemon = await Pokemon.findOne({ _id: req.params.id });
  if (pokemon) {
    await Pokemon.replaceOne({ _id: req.params.id }, req.body);
    return await pokemon.save();
  }
};

export const patchPokemon = async (req) => {
  const pokemon = await Pokemon.findOne({ _id: req.params.id });
  if (pokemon) {
    await Pokemon.updateOne({ _id: req.params.id }, req.body);
    return await pokemon.save();
  }
};

export const deletePokemon = async (id) => {
    const pokemon = await Pokemon.findOne({ _id: id });
    if (pokemon) {
    return await Pokemon.deleteOne({ _id: id });
    }
};

