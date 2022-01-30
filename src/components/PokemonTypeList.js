import React from 'react'
import { useRecoilValue } from 'recoil';
import allPokemonAtom from '../Atoms/allPokemonAtom';
import PokeCard from './PokeCard/PokeCard';

export default function PokemonTypeList({ pokemon }) {
  const allPokemon = useRecoilValue(allPokemonAtom);

  console.log('pkemonList:',pokemon);
  return (
    <>
        <div className="mx-auto my-5 d-grid pokeList gap-5 row-6">
          {allPokemon.map((poke, index) => (
            // <p className='col-1' key={poke.id}>{poke.name}</p>
            <PokeCard
              url={poke.pokemon.url}
              index={index}
              name={poke.pokemon.name}
            />
          ))}
        </div>
    </>
  );
}
