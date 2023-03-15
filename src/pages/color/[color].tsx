import { getPokemonIdFromUrl } from "@/utils/pokemon";
import { upperCase } from "@/utils/string";
import Link from "next/link";

export default function Color({ pokemons }) {
  return (
    <>
      {pokemons.pokemon_species.map((pokemon) => (
        <Link
          key={pokemon.id}
          href={`/pokemon/${getPokemonIdFromUrl(pokemon.url)}`}
        >
          <div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${getPokemonIdFromUrl(
                pokemon.url
              )}.png`}
              alt="pokemon"
            ></img>
            <h2>{upperCase(pokemon.name)}</h2>
          </div>
        </Link>
      ))}
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon-color/" + params.color
  );
  const data = await res.json();

  return {
    props: {
      pokemons: data,
    },
  };
};
