

import {Link, BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FormularioLogin from '../components/FormularioLogin';
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import '../styles/miCss.css';

function Menu() {

  const ruta = "/profile/";

function displayLoginForm(){
  $("#login").css("display","flex")
  $("#contenedorLogin").css("background-color", "rgba(0, 255, 255, 0.5)")
}

  function logout(){

    localStorage.clear();
    window.location="/";
    
  }



  if(localStorage.getItem('user')==null)
  return (
    <>
    <header className='navbar'>
    <div className='navbar__title navbar__item'><Link to='/'>Home</Link></div>
    <div className='navbar__item'><Link to='/register'>Registro</Link></div>
    <div className='navbar__item'><button className="btn btn-primary" onClick={displayLoginForm}>Login</button></div>
    
   </header>
   <FormularioLogin/>
   </>
  )
  else
  return (
    <header className='navbar'>
    <div className='navbar__title navbar__item'><Link to='/'>Home</Link></div>
    <div className='navbar__item'><button onClick={logout}>Logout</button></div>
    <div className='navbar__item'> <Link to={ruta+JSON.parse(localStorage.getItem('user')).usuarioId}>Hola{JSON.parse(localStorage.getItem('user')).nombre}</Link></div>
   

    </header>
  )
}

export default Menu;