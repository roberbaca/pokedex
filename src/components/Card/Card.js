import React, { useEffect, useState } from 'react'
import '../../styles/components/Card.css';
import '../../styles/Global.css';
//import axiosInstance from "../utils/axiosInstance";
import axios from "axios";


const Card = () => {

  const baseURL= "https://pokeapi.co/api/v2/";

  const[allPokemons, setAllPokemons] = useState([])
  const [pokeList, setPokeList] = useState([]);


  const getAllPokemons = async () => {
    try {
      const response = await axios.get(baseURL + 'pokemon?limit=20');
      const data = response.data.results;
      //console.log(data);
      
      for (let i = 0; i < data.length; i++){
        allPokemons[i] = await axios.get(baseURL + `pokemon/${data[i].name}`);        
        pokeList[i] = allPokemons[i].data;
        setPokeList(pokeList);
      }
      
      console.log("LISTA", pokeList);

    } catch(error){
      console.log(error);
    }
  }
 
  //const [offset, setOffset] = useState(10); 

 


  useEffect( () => {
    //getPokeList();         
    getAllPokemons();
  }, [])

  return (
    <div className='container'>     
      { pokeList.map( (p , index) =>                 
        <div className={`card ${p.types[0].type.name}`} key={index}>     
          <div className='card__pokenumbercontainer'>
            <p className='card__pokenumber'># {p.id}</p>
          </div>    
          <div className='card__pokeimgcontainer'>
            <img src={p.sprites.front_default} alt="pokemonImg" className='card__pokeimg' />
          </div>
          <div className='card__pokename'>
            <h2>{p.name}</h2>
          </div>
          <div className="card__poketypecontainer">
            <p className={`card__poketype--${p.types[0].type.name}`}>{p.types[0].type.name}</p>
            {p.types[1] && <p className={`card__poketype--${p.types[1]?.type.name}`}>{p.types[1]?.type.name}</p>}
          </div> 
          <div className='card_buttoncontainer'>
            <button className='card__button'>Info</button>
          </div>
          
        </div>        
      )}
    </div>
 
  )
}

export default Card