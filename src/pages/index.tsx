import { getPokemonIdFromUrl } from "@/utils/pokemon";
import { upperCase } from "@/utils/string";
import Image from "next/image";
import Link from "next/link";

export default function Home({ pokemons }) {
  return (
    <div>
      {pokemons.map((pokemon) => (
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

      {/* <pre>{JSON.stringify(pokemons, null, 2)}</pre> */}
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const { results } = await res.json();

  return {
    props: {
      pokemons: results,
    },
  };
};
