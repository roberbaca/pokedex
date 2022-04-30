import React, { useEffect, useState } from 'react'
import axios from "axios";
import Modal from '../Modal/Modal'
import '../../styles/components/Card.css';
import '../../styles/Global.css';

const Card = ({searchPokemon}) => {

  const baseURL= "https://pokeapi.co/api/v2/";
  const limit = 150;        // maxima cantidad de pokemons a cargar de la API
  const pagination = 10;    // paginacion
  const pokemon = [];
  const pokeDescription = [];
  const pokeDescriptionEn = [];

  const [pokeNameList, setPokeNameList] = useState([]);
  const [pokeList, setPokeList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pokeModal, setPokeModal] = useState({});   
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false); // flag para ver si terminaron de cargar las peticiones
  
  console.log("buscando...", searchPokemon); // para debug

  const getAllPokemons = async () => {
    try {
      const response = await axios.get(`${baseURL}pokemon?limit=${limit}`);           
      setPokeNameList(response.data.results); 
      getPokemonData();       
    } catch(error){     
        console.log(error);
    }       
  };


  const getPokemonData = async () => {
    try {      
      for (let i = 0; i < limit; i++){
        pokemon[i] = await axios.get(`${baseURL}pokemon/${pokeNameList[i].name}`);        
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
      } 

      setPokeList(pokeList);   
      //console.log("LISTA", pokeList);   // para debug  
      setLoad(true); 
      setPokeModal(pokeList[0]);

    } catch (error){
        console.log(error);
      }      
  }    

 
  const handleClickModal = (e) => {
    setIsOpen(true);
    const id = e.target.value;    
    setPokeModal(pokeList[id-1]);
    console.log("clickeaste en el pokemon #", id);
  };

  const nextPage = () => {   
    if (page < 15) {
      let newpage = page + 1;      
      setPage(newpage);       
      console.log("Next page");     
    }
    return;
  }

  const previousPage = () => {    
    if (page > 1) {   
      let newpage = page - 1;    
      setPage(newpage);      
      console.log("Previous page");      
    }   
    return;
  };    

  useEffect( () => {    
    getAllPokemons();
  }, []);

  return (
    <div>      
 
   {/* Renderizamos segun numero de pagina */}
    {load && <div className='container'>     
      { searchPokemon === "" && pokeList.slice( (page - 1) * pagination, page * pagination).map( (p , index) =>           
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

      {/* Renderizamos segun los datos ingresados en la barra de busqueda */}
      { searchPokemon != "" && pokeList.filter(f => f.name.toUpperCase().includes( searchPokemon.toUpperCase() )).map( (p , index) =>     
      
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
    
      
      {/* Pop Ups (Modal) */}        
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <div className='modal__namecontainer'>
            <h3 className='modal__name'>{pokeModal.name}</h3>
            <img src={pokeModal.img} alt="pokemonImg" className='modal__img' />  
          </div>          
          <div className='modal__stats'>
            <div className='modal__measures'>
              <p>Height: {pokeModal.stats.height} ft</p>
              <p>Weight: {pokeModal.stats.weight} lbs</p>
            </div>
            <h4 className='modal__statstitle'>Statistics</h4>     
            <div className='modal__measures'>
              <p><span>Attack: </span>{pokeModal.stats.atk}</p>
              <p><span>Defense: </span>{pokeModal.stats.def}</p>
            </div>     
            <div className='modal__measures'>
              <p><span>Sp. Attack: </span>{pokeModal.stats.spAtk}</p>
              <p><span>Sp. Deffense: </span>{pokeModal.stats.spDef}</p>
            </div> 
            <div className='modal__measures'>
              <p><span>HP: </span>{pokeModal.stats.hp}</p>
              <p><span>Speed: </span>{pokeModal.stats.speed}</p>
            </div>            
          </div>
          <p className='modal__description'>{pokeModal.description}</p>

        </div>           
      </Modal>
      
    </div>
    }

    <div className='page__container'>
        <button className='page__button' onClick={previousPage}>Previous</button>
        <p className='page__number'>{page}</p> 
        <button className='page__button' onClick={nextPage}>Next</button>
      </div>

    </div>
  )

}

export default Card