
import imagen4 from "./concierto.png";
import {useRef} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import './miCss.css';

function Menu() {
    
  return (
    <div className="navbar" style={{
         display :"flex"
         }}>
     <div><a href="/">Home</a></div>
     <div><a href="/">Eventos</a></div>
     <div><a href="/">Registrarse</a></div>
     <div><a href="/">Loguear</a></div>
     <div> <a href="/">Contacto</a></div>
    </div>
  );
}

export default Menu;