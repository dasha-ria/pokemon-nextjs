import { getPokemonIdFromUrl } from "@/utils/pokemon";
import { upperCase } from "@/utils/string";
import Link from "next/link";

export default function Pokemon({ pokemon, species }) {
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <a href="../">
          <button className="pt-2 pb-2 pl-4 pr-4 shadow-md rounded-lg hover:shadow-lg">
            Back to home
          </button>
        </a>
        <div className="flex items-center justify-center max-w-5xl shadow-lg rounded-xl gap-24">
          <div className="max-w-sm mb-24 ml-12">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
              alt="pokemon"
            ></img>
          </div>

          <div className="mr-24 flex flex-col gap-4">
            <div>
              <h2 className="text-3xl">{upperCase(pokemon.name)}</h2>
            </div>

            <div>
              <h3 className="text-xl">Abilities</h3>
              {pokemon.abilities.map(({ ability }) => (
                <p key={ability.name}>{upperCase(ability.name)}</p>
              ))}
            </div>

            <div>
              <h3 className="text-xl">Color</h3>
              <Link key={pokemon.id} href={`/color/${species.color.name}`}>
                <p className="hover:text-blue-800">
                  {upperCase(species.color.name)}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + params.id);
  const data = await res.json();

  const resSpecies = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species/" + params.id
  );
  const dataSpecies = await resSpecies.json();
  console.log(dataSpecies);

  return {
    props: {
      pokemon: data,
      species: dataSpecies,
    },
  };
};
