export const fetchPokemonData = async (numOfPokemon) => {
  const fetchedData = [];
  for (let i = 1; i <= numOfPokemon; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    fetchedData.push({
      id: data.id,
      imageUrl: data.sprites.front_default,
      name: data.name,
    });
  }
  return fetchedData;
};
