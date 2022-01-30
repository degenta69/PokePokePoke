import React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card/index';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import "./PokeCard.css"
import {useSetRecoilState} from 'recoil';
import popUpShow from '../../Atoms/popUpShow';
import pokemonFromList from '../../Atoms/pokemonFromList';
import Loader from '../Loader/Loader';

export default function PokeCard({url,name}) {
  const showPopup = useSetRecoilState(popUpShow)
  const setPokemon = useSetRecoilState(pokemonFromList)
    const [pokemon, setpokemon] = useState({
        name:'',
        height:'',
        id:Number,
        svg:'',
        type:{
            name:'',
            url:''
        },
        data:{}

    });
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
    axios.get(url).then(res => {
    //   setNextPageUrl(res.data.next)
    //   setPrevPageUrl(res.data.previous)
        setLoading(false)
      setpokemon({
        data:res.data,
          name:res.data.name,
          svg:res.data.sprites.other.dream_world.front_default,
        height:res.data.height,
        id:res.data.id,
        type:{...res.data.types[0].type}
      })
      // console.log('resdata:', res.data);
    })
    }, []);
    const handlePopup = ()=>{
      setPokemon(poke => ({...poke, ...pokemon.data,name:pokemon.name}))
      showPopup(true)
    }
  return (
    <Card onClick={handlePopup} sx={{ maxWidth: 200 }}>
      <CardActionArea>
        {loading?<Loader/>:<CardMedia
        className={`poke-${pokemon.type.name}`}
        style={{objectFit:'contain',boxShadow:'inset 0px -20px 20px 1px #2624244a'}}
          component="img"
          height="192"
          image={pokemon.svg}
          alt={pokemon.name}
        />}
        <CardContent className={`poke-${pokemon.type.name} position-relative`}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Height: {pokemon.height} 
          </Typography>
          <Typography variant="p" color="text.secondary">
            {pokemon.type.name}
          </Typography>
          <div className='position-absolute idDiv text-black-50' >
          <p>
            #{pokemon.id}
          </p>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
