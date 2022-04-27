import React from 'react'
import '../../styles/components/Navbar.css';
import '../../styles/Global.css';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='navbar__sitelogo'>
            <img src={require("../../assets/pikachu-logo.png")} alt="logo" className='sitelogo'/>
        </div>
        <div className='navbar__searchbar'>
            <select name="" id="" className='searchbar__select'>
                <option value="0">All Categories</option>
				<option value="1">Category 01</option>
				<option value="1">Category 02</option>
            </select>
            <input type="text" className='searchbar__input' placeholder='Search here'/>
            <button className='searchbar__button'>Search</button>
        </div>
    </div>
  )
}

export default Navbar