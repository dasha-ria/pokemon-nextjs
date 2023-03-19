import { getPokemonIdFromUrl } from "@/utils/pokemon";
import { upperCase } from "@/utils/string";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Pagination from "../components/pagination";

export default function Home({ pokemons, totalPokemons, postsPerPage }) {
  return (
    <>
      <div className="flex flex-wrap gap-10 justify-center mt-8 mb-8">
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

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPokemons}
      ></Pagination>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = Number(query.page ?? 1);
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + 20 * (page - 1)
  );
  const { results, count } = await res.json();

  return {
    props: {
      pokemons: results,
      postsPerPage: 20,
      totalPokemons: count,
    },
  };
};
