export const getPokemonIdFromUrl = (url) => {
  const parts = url.split("/");
  return parts.at(-2);
};
