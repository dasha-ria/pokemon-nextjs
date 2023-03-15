import { getPokemonIdFromUrl } from "@/utils/pokemon";
import { upperCase } from "@/utils/string";
import Image from "next/image";
import Link from "next/link";

export default function Home({ pokemons }) {
  return (
    <div className="flex flex-wrap gap-10 justify-center mt-8">
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon.id}
          href={`/pokemon/${getPokemonIdFromUrl(pokemon.url)}`}
        >
          <div className="shadow-lg hover:shadow-xl rounded-lg  flex justify-center items-center flex-col  hover:text-blue-800">
            <div>
              <img
                className="max-w-sm"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${getPokemonIdFromUrl(
                  pokemon.url
                )}.png`}
                alt="pokemon"
              ></img>
            </div>
            <div>
              <h2 className="m-4 text-2xl">{upperCase(pokemon.name)}</h2>
            </div>
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
