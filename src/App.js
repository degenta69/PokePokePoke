import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList'
import axios from 'axios'
import Pagination from './components/Pagination';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setTimeout(() => {
        setLoading(false)
      }, 500);
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
  
  return (
    <>
      <Navbar/>
      <div className='vw-100 my-auto d-flex flex-column'>

      {loading?<><Loader/></>:<PokemonList pokemon={pokemon} />}
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        />
        </div>
    </>
  );
}

export default App;
