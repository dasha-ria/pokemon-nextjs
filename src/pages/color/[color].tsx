import { getPokemonIdFromUrl } from "@/utils/pokemon";
import { upperCase } from "@/utils/string";
import Link from "next/link";

export default function Color({ pokemons }) {
  return (
    <>
      <a href="../">
        <button className="pt-2 pb-2 pl-4 pr-4 shadow-md rounded-lg ml-32 mt-8 hover:shadow-lg">
          Back to home
        </button>
      </a>
      <div className="flex flex-wrap gap-10 justify-center mt-8">
        {pokemons.pokemon_species.map((pokemon) => (
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
      </div>
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
