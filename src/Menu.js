
import imagen4 from "./concierto.png";
import {useRef} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import './miCss.css';

function Menu() {

  return (
    <div className="navbar" style={{ display :"flex"}}>
     <div  className = "opcionMenu"><a href="/">Home</a></div>
     <div  className = "opcionMenu"><a href="/">Eventos</a></div>
     <div  className = "opcionMenu"><a href="/">Registrarse</a></div>
     <div  className = "opcionMenu"><a href="/">Loguear</a></div>
     <div  className = "opcionMenu"><a href="/">Contacto</a></div>
    </div>
  );
}

export default Menu;