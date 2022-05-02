

import {Link, BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FormularioLogin from '../components/FormularioLogin';
import imagen from "../imagenes/Eventum_golden.png";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import '../styles/miCss.css';

function Menu() {

  const ruta = "/profile/";

function displayLoginForm(){

  $(".login-container").css("display","flex");
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
    <div className='navbar__title navbar__item'><Link to='/'>Home</Link></div>
    <div className='navbar__item'><img src="../imagenes/Eventum.png"/></div>
    <div className='navbar__item'><button className="btn btn-success"><Link to='/register'>Regístrate</Link></button></div>
    <div className='navbar__item'><button className="btn btn-primary" onClick={displayLoginForm}>Login</button></div>
    
   </header>
   <FormularioLogin/>
   </>
  )
  else
  return (
    <header className='navbar' id="nav-bar">
    <div className='navbar__title navbar__item'><Link to='/'>Home</Link></div>
    <img className="navbar__title logo-eventum" src={imagen}/>
    <div className='navbar__item'><button  className="btn btn-danger" onClick={logout}>Logout</button></div>
    <div className='navbar__item'><h2><Link to={ruta+JSON.parse(localStorage.getItem('user')).usuarioId}>Hola {JSON.parse(localStorage.getItem('user')).nombre}</Link></h2></div>
   

    </header>
  )
}

export default Menu;