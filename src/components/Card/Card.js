import React from 'react'
import '../../styles/components/Card.css';
import '../../styles/Global.css';

const Card = () => {
  return (
    <div className='container'>


    <div className='card'>
    
        <div className='card__pokenumber'>
          <p>003</p>
        </div>
        <div className='card__pokeimg'>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" alt="pokemonImg" />
        </div>
        
       

        <div className='card__pokename'>
          <h2>Ditto</h2>
        </div>
        <div className='card__poketype'>
          <p>Normal</p>
        </div>
 
      </div>
      </div>
 
  )
}

export default Card