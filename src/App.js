import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import PokemonTypeList from "./components/PokemonTypeList";
import axios from "axios";
import Pagination from "./components/Pagination/Pagination";
import Loader from "./components/Loader/Loader";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { useRecoilValue } from "recoil";
import popUpShow from "./Atoms/popUpShow";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import AlertPopUp from "./components/AlertPopUp/AlertPopUp";
import listApiUrlAtom from "./Atoms/listApiUrlAtom";
import './fonts/Pokemon Hollow.ttf'; 
import './fonts/Pokemon Solid.ttf'; 

function App() {
  const currentPageUrl = useRecoilValue(listApiUrlAtom);
  const [PageUrl, setPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=21"
  );
  const [pokemon, setPokemon] = useState([
    { name: "", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  ]);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const popUp = useRecoilValue(popUpShow);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(PageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results);
        console.log("resdata:", res.data);
      });

    return () => cancel();
  }, [PageUrl]);

  function gotoNextPage() {
    setPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setPageUrl(prevPageUrl);
  }

  return (
    <div className="app">
      <Navbar />
      <AlertPopUp />
      {popUp && <PokemonDetail />}
      <div
        style={{ visibility: popUp && "hidden" }}
        className="my-auto d-flex flex-column"
      >
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {currentPageUrl.type ? (
              <PokemonTypeList />
            ) : (
              <PokemonList pokemon={pokemon} />
            )}
          </>
        )}
        {!currentPageUrl.type && (
          <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
        )}
      </div>
    </div>
  );
}

export default App;
