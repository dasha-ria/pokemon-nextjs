import { getPokemonIdFromUrl } from "@/utils/pokemon";
import { upperCase } from "@/utils/string";

export default function Pokemon({ pokemon }) {
  return (
    <>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
        alt="pokemon"
      ></img>
      <h2>{upperCase(pokemon.name)}</h2>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + params.id);
  const data = await res.json();

  return {
    props: {
      pokemon: data,
    },
  };
};
