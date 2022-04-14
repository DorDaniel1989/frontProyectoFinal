

import {useRef} from "react";
import {Link, BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import '../styles/miCss.css';

function Menu() {

  return (
    <header className='navbar'>
    <div className='navbar__title navbar__item'><Link to='/'>Home</Link></div>
    <div className='navbar__item'><Link to='/register'>Registro</Link></div>
    <div className='navbar__item'><Link to='/profile'>Login</Link></div>
    
</header>
  );
}

export default Menu;