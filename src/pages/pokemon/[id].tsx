import { getPokemonIdFromUrl } from "@/utils/pokemon";
import { upperCase } from "@/utils/string";
import Link from "next/link";

export default function Pokemon({ pokemon, species }) {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt="pokemon"
          ></img>
        </div>

        <div>
          <h2>{upperCase(pokemon.name)}</h2>

          <h3>Abilities</h3>
          {pokemon.abilities.map(({ ability }) => (
            <p key={ability.name}>{upperCase(ability.name)}</p>
          ))}

          <h3>Color</h3>
          <Link key={pokemon.id} href={`/color/${species.color.name}`}>
            <p>{species.color.name}</p>
          </Link>
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
