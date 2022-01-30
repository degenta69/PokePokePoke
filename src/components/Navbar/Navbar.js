import React, { useEffect, useState } from "react";
import './Navbar.css'
import {useRecoilState, useSetRecoilState} from 'recoil';
import pokemonFromList from '../../Atoms/pokemonFromList';
import axios from "axios";
import popUpShow from "../../Atoms/popUpShow";
import listApiUrlAtom from "../../Atoms/listApiUrlAtom";
import alertPopUpAtom from "../../Atoms/alertPopUpAtom";
import allPokemonAtom from "../../Atoms/allPokemonAtom";

const Navbar = () => {
  const [Pokemon, setPokemon] = useRecoilState(pokemonFromList)
  const setpokemonAtom = useSetRecoilState(allPokemonAtom);
  const setOpen = useSetRecoilState(popUpShow)
  const setUrl = useSetRecoilState(listApiUrlAtom)
  const setAlert = useSetRecoilState(alertPopUpAtom)
  const [pokeState, setpokeState] = useState('');
  const [types,settypes]= useState([])
  const [currentTypes,setCurrentTypes]= useState('All Types')
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type')
    .then((res)=>{
      settypes(res.data.results);
      // console.log(types);
    })
    .catch(()=>{
      setAlert(true)
    })
  }, []);
  
  const handleFetchPokemon = (e)=>{
    e.preventDefault();
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeState}`).then((res)=>{
      let data = res.data
      setPokemon(poke => ({...poke, ...data,name:data.name}))
      setOpen(true)
      console.log('data:',data,'pokeAtom:',Pokemon)
    })
    .catch((err)=>{
      console.log(err)
      setAlert(true)
    })
    // console.log(pokeState)
    
  }
  const handleType = (e)=>{
    setCurrentTypes(e.name)
    axios
      .get(e.url)
      .then((res) => {
        setpokemonAtom(res.data.pokemon)
        setUrl({ url:e.url, type:true});
        // console.log(res.data.pokemon);
      })
      .catch((err) => {
        console.log(err);
      });
  }
// console.log(Pokemon);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <p className="navbar-brand rainbow" >PokePoke</p>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto me-auto mb-2 mb-lg-0">
        <li className="nav-item">
      <form className="d-flex">
        <input className="form-control me-2" onChange={(e)=>{setpokeState(e.target.value)}} type="search" placeholder="Search" aria-label="Search"/>
        <button onClick={handleFetchPokemon} className="btn btn-outline-success btn-small" type="submit">Search</button>
      </form>
        </li>
        <li  className="nav-item dropdown">
          <a onClick={()=>{}} className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {currentTypes}
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li onClick={()=>{setUrl({ url:'', type:false}); setCurrentTypes('All Types')}} ><p className="dropdown-item" >All Types</p></li>
            {types.map((e,index)=>{
             return(<li key={index} onClick={()=>{handleType(e)}} ><p className="dropdown-item" >{e.name}</p></li>)
            })
            }
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  );
};

export default Navbar;
