import React from 'react'

export default function PokemonList({ pokemon }) {
  return (
    <div className='mx-auto d-grid gap-2 row-5' style={{gridTemplateColumns:'1fr 1fr 1fr 1fr'}}>
      {pokemon.map(poke => (
        <p className='col-1' key={poke}>{poke}</p>
      ))}
    </div>
  )
}
