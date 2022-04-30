import React, { useEffect, useState } from 'react'
import '../../styles/components/Navbar.css';
import '../../styles/Global.css';
import Card from '../Card/Card'

const Navbar = () => {

  const [searchdata, setSearchata] = useState('');
  
  const searchPokemon = (e) => {
    setSearchata(e.target.value);
    console.log(searchdata);
    return searchdata;
  }

  return (
    <div>
    <div className='navbar'>
        <div className='navbar__sitelogo'>
            <img src={require("../../assets/logo-white.png")} alt="logo" className='sitelogo'/>
        </div>
        <div className='navbar__searchbar'>       
            <input type="text" className='searchbar__input' placeholder='Search here' onChange={searchPokemon}/>
            <button className='searchbar__button'>Search</button>
        </div>        
    </div>

    <Card searchPokemon={searchdata}></Card>

    </div>
    
  )
}

export default Navbar