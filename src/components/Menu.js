
import {Link} from "react-router-dom";
import React from "react";
import FormularioLogin from '../components/FormularioLogin';
import imagen from "../imagenes/Eventum_golden.png";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/HomeTwoTone';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import '../styles/navbar.sass';

function Menu() {

  const ruta = "/profile/";

function displayLoginForm(){

  $(".login-container").css("display","flex");
  $("body").addClass('overflow-hidden')
  
}

  function logout(){

    localStorage.clear();
    window.location="/";
    
  }

//<div className='navbar__title navbar__item'><Link to='/'><HomeIcon sx={{ fontSize: 70 }} /></Link></div>

  if(localStorage.getItem('user')==null)
  return (
    <>
    <header className='navbar' id="nav-bar" >
      <div className='navbar__title navbar__item home-logo'><Link to='/'><HomeIcon sx={{ fontSize: 70 }} /></Link></div>
      <div className="navbar__logo"><Link to='/'><img className="logo-eventum" src={imagen}/></Link></div>
        <div className='navbar__item'><button className="btn btn-danger border border-warning bg-transparent"><Link to='/register'>Regístrate</Link></button></div>
        <div className='navbar__item'><button className="btn btn-danger border border-warning bg-transparent" onClick={displayLoginForm}><LoginIcon/>Login</button></div>
    
    </header>
    <FormularioLogin/>
   </>
  )
  else
  return (
    <header className='navbar' id="nav-bar">
      <div className='navbar__title navbar__item home-logo'><Link to='/'><HomeIcon sx={{ fontSize: 70 }} /></Link></div>
      <div className="navbar__logo"><Link to='/'><img className="logo-eventum" src={imagen}/></Link></div>
      <div className='navbar__item'><button  className="btn btn-danger btn-desloguear border border-warning bg-transparent" onClick={logout}><LogoutIcon/>Logout</button></div>
      <div className='navbar__item'><h2 className="bienvenidoUsuario"><Link to={ruta+JSON.parse(localStorage.getItem('user')).usuarioId}>Hola {JSON.parse(localStorage.getItem('user')).nombre}</Link></h2></div>
   
    </header>
  )
}

export default Menu;