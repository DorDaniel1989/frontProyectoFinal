

import {Link} from "react-router-dom";
import React from "react";
import FormularioLogin from '../components/FormularioLogin';
import imagen from "../imagenes/Eventum_golden.png";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import '../styles/navbar.sass';

function Menu() {

  const ruta = "/profile/";

function displayLoginForm(){

  $(".login-container").css("display","flex");
  $("#root").addClass('modal-open')
  var clientHeight = document.getElementById('nav-bar').clientHeight;
  $(".login-container").css("position", "sticky").css("top",clientHeight)
  
  console.log(clientHeight)
}

  function logout(){

    localStorage.clear();
    window.location="/";
    
  }



  if(localStorage.getItem('user')==null)
  return (
    <>
    <header className='navbar' id="nav-bar" >
    <div className='navbar__title navbar__item'><Link to='/'><HomeIcon sx={{ fontSize: 70 }} /></Link></div>
    <img className="navbar__title logo-eventum" src={imagen}/>
    <div className='navbar__item'><button className="btn btn-success border border-warning bg-transparent"><Link to='/register'><AppRegistrationIcon/>Regístrate</Link></button></div>
    <div className='navbar__item'><button className="btn btn-primary border border-warning bg-transparent" onClick={displayLoginForm}><LoginIcon/>Login</button></div>
    
   </header>
   <FormularioLogin/>
   </>
  )
  else
  return (
    <header className='navbar' id="nav-bar">
    <div className='navbar__title navbar__item'><Link to='/'> <HomeIcon sx={{ fontSize: 70 }} /></Link></div>
    <img className="navbar__title logo-eventum" src={imagen}/>
    <div className='navbar__item'><button  className="btn btn-danger btn-desloguear border border-warning bg-transparent" onClick={logout}><LogoutIcon/>Logout</button></div>
    <div className='navbar__item'><h2 className="bienvenidoUsuario"><Link to={ruta+JSON.parse(localStorage.getItem('user')).usuarioId}>Hola {JSON.parse(localStorage.getItem('user')).nombre}</Link></h2></div>
   

    </header>
  )
}

export default Menu;