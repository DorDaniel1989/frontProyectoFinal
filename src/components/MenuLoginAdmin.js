

import {Link} from "react-router-dom";
import React from "react";
import imagen from "../imagenes/Eventum_golden.png";
import HomeIcon from '@mui/icons-material/HomeTwoTone';
import '../styles/navbar.sass';

function Menu() {

  return (
    <>
    <header className='navbar' id="nav-bar" >
      <div className='navbar__title navbar__item home-logo'><Link to='/'><HomeIcon sx={{ fontSize: 70 }} /></Link></div>
      <div className="navbar__logo"><Link to='/'><img alt="Evencum" className="logo-eventum" src={imagen}/></Link></div>
    
   </header>

   </>
  )

}

export default Menu;