import React, { useEffect, useState } from 'react'
import '../../styles/components/Card.css';
import '../../styles/Global.css';
//import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import Modal from '../Modal/Modal'


const Card = () => {

  const baseURL= "https://pokeapi.co/api/v2/";

  const pokemon = [];
  const pokeDescription = [];
  const pokeDescriptionEn = [];
  const [pokeList, setPokeList] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [pokeModal, setPokeModal] = useState("");  


  const getAllPokemons = async () => {
    try {
      const response = await axios.get(baseURL + 'pokemon?limit=20');
      const data = response.data.results;      
    
      for (let i = 0; i < data.length; i++){
        pokemon[i] = await axios.get(baseURL + `pokemon/${data[i].name}`);        
        pokeDescription[i] = await axios.get(pokemon[i].data.species.url);          
        pokeDescriptionEn[i] = pokeDescription[i].data.flavor_text_entries.find(d => d.language.name === "en"); // buscamos la descripcion en ingles

        let pokemonData = {
          id: pokemon[i].data.id,
          name: pokemon[i].data.name,          
          img: pokemon[i].data.sprites.front_default,
          types: [pokemon[i].data.types[0].type.name, pokemon[i].data.types[1] ? pokemon[i].data.types[1].type.name : ""], // algunos pokemon tiene un solo tipo otros 2       
          stats: {
            height: pokemon[i].data.height,
            weight: pokemon[i].data.weight,
            hp: pokemon[i].data.stats[0].base_stat,            
            atk: pokemon[i].data.stats[1].base_stat,
            def: pokemon[i].data.stats[2].base_stat,
            spAtk: pokemon[i].data.stats[3].base_stat,
            spDef: pokemon[i].data.stats[4].base_stat,
            speed: pokemon[i].data.stats[5].base_stat,
          },                  
          description: pokeDescriptionEn[i].flavor_text // damos formato al texto de la descripcion del pokemon
            .replace(/u'\f'/, /u'\n'/)
            .replace(/\u00AD/g, '')
            .replace(/\u000C/g, ' ')
            .replace(/u' -\n'/, ' - ')
            .replace(/u'-\n'/, '-')
            .replace(/(\r\n|\n|\r)/gm, ' ')               
        }       
        pokeList[i] = pokemonData;        
        setPokeList(pokeList);
      }      
      console.log("LISTA", pokeList);   // para debug

    } catch(error){      
      console.log(error);
    }
  }
 

  const handleClickModal = (e) => {
    setIsOpen(true);
    let id = e.target.value;
    console.log("hiciste click en pokemon #", id);
    console.log(pokeList[id-1]);
    setPokeModal(pokeList[id-1]);
  }


  useEffect( () => {          
    getAllPokemons();
  }, [])

  return (
    <div className='container'>     
      { pokeList.map( (p , index) =>     
       <div className={`card ${p.types[0]}`} key={index}>     
        <div className='card__pokenumbercontainer'>
          <p className='card__pokenumber'># {p.id}</p>
        </div>    
        <div className='card__pokeimgcontainer'>
          <img src={p.img} alt="pokemonImg" className='card__pokeimg' />
        </div>
        <div className='card__pokename'>
          <h2>{p.name}</h2>
        </div>
        <div className="card__poketypecontainer">
          <p className={`card__poketype--${p.types[0]}`}>{p.types[0]}</p>
          {p.types[1] && <p className={`card__poketype--${p.types[1]}`}>{p.types[1]}</p>}
        </div> 
        <div className='card_buttoncontainer'>
          <button className='card__button' onClick={handleClickModal} value={p.id}>Info</button>
        </div>       
      </div>                  
       
      )}

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <p>{pokeModal.name}</p>
          <img src={pokeModal.img} alt="pokemonImg" className='card__pokeimg' />         
          <p>Height: {pokeModal.stats.height}</p>
          <p>Weight: {pokeModal.stats.weight}</p>
          <p>HP: {pokeModal.stats.hp}</p>
          <p>Attack: {pokeModal.stats.atk}</p>
          <p>Defense: {pokeModal.stats.def}</p>
          <p>Sp. Attack: {pokeModal.stats.spAtk}</p>
          <p>Sp. Deffense: {pokeModal.stats.spDef}</p>
          <p>Speed: {pokeModal.stats.speed}</p>
          <p>{pokeModal.description}</p>

        </div>

       
         
      </Modal>
    </div>
 
  )
}

export default Card