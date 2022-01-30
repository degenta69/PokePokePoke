import React from 'react'
import PokeCard from './PokeCard/PokeCard';

export default function PokemonList({ pokemon }) {

  // console.log('pkemonList:',pokemon);
  return (
    <>
        <div className="mx-auto my-5 d-grid pokeList gap-5 row-6">
          {pokemon.map((poke, index) => (
            // <p className='col-1' key={poke.id}>{poke.name}</p>
            <PokeCard url={poke.url} index={index} name={poke.name} />
          ))}
        </div>
    </>
  );
}
