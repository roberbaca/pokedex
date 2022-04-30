import React from 'react'
import '../../styles/components/Footer.css';
import '../../styles/Global.css';
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <img className="footer__logo" src={require('../../assets/rnbGamesCube.png')} alt="logo" />
      <p className='footer__copy'>Copyright &copy; 2022 <span>Roberto Baca</span></p>
      <div className='footer__iconcontainer'>
          <a className='footer__socialicon' href="https://github.com/roberbaca" target="_blank" rel="noopener noreferrer"><FaGithubSquare/></a>
          <a className='footer__socialicon' href="https://www.linkedin.com/in/roberto-baca" target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>         
          {/* <a className='social-icon' href="mailto:roberto.nicolas.baca@gmail.com" target="_blank" rel="noopener noreferrer"><AiFillMail/></a>              */}
      </div>            
    </footer>
  )
}

export default Footer