

import {Link, BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import '../styles/miCss.css';

function Menu() {




  if(document.cookie==null)
  return (
    <header className='navbar'>
    <div className='navbar__title navbar__item'><Link to='/'>Home</Link></div>
    <div className='navbar__item'><Link to='/register'>Registro</Link></div>
    <div className='navbar__item'><Link to='/login'>Login</Link></div>
    
 </header>
  )
  else
  return (
    <header className='navbar'>
    <div className='navbar__title navbar__item'><Link to='/'>Home</Link></div>
    <div className='navbar__item'><Link to='/register'>Registro</Link></div>
    <div className='navbar__item'><Link to='/login'>Logout</Link></div>
    <div className='navbar__item'><Link to='/login'>Hola </Link></div>
    
    
</header>
  )
}

export default Menu;