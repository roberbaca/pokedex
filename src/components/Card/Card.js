import React, { useEffect, useState } from 'react'
import '../../styles/components/Card.css';
import '../../styles/Global.css';
//import axiosInstance from "../utils/axiosInstance";
import axios from "axios";


const Card = () => {

  const baseURL= "https://pokeapi.co/api/v2/pokemon/";
  const [pokeList, setPokeList] = useState([]);
  const [offset, setOffset] = useState(10);

  const getPokeList = async () => {
    try {

        for (let i = 0; i < offset; i++) {
          let response =  await axios.get(baseURL + (i + 1) + "/");
          pokeList[i] = response.data;
        } 
        
        //const response = await axios.get(baseURL + "pokemon?limit=10&offset=0");        
        //setPokeList(response.data.results)
        //console.log(response.data.results);
        setPokeList(pokeList)
        console.log(pokeList);
        console.log(pokeList[5].types[0].type.name);


    }catch(error) {
        alert(error);
    }
  }

  useEffect(() => {
    getPokeList();         
  }, [])

  return (
    <div className='container'>     
      { pokeList.map( (p , index) =>        
        <div className={`card ${p.types[0].type.name}`} key={index}>             
          
          <div className='card__pokeimg'>
            <img src={p.sprites.front_default} alt="pokemonImg" />
          </div>
          <div className='card__pokename'>
            <h2>{p.name}</h2>
          </div>
          {/* <div className={'card__poketype'}> */}
          <div className="card__poketypecontainer">
            <p className={`card__poketype--${p.types[0].type.name}`}>{p.types[0].type.name}</p>
          </div> 
          <button className='card__button'>Detalis</button>
          <div className='card__pokenumber'>
            <p>{p.id}</p>
          </div>
        </div>
        
      )}
    </div>
 
  )
}

export default Card