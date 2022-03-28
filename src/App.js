
import imagen4 from "./concierto.png";
import {useRef} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {Component, useEffect, useState } from "react";
import Menu from './Menu';
import Carrusel from './Carrusel';
import Carta from './Carta';

import './miCss.css';
import { render } from "@testing-library/react";

function App() {


  return (
    <div>
      <div className="cabecera"> <h1>EVENTOS</h1>
     <img src={imagen4}/></div>
    <Menu/>
    <Carrusel/>
    <Carta/>
  
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="registro" element={<Formulario/>} />
        <Route path="contacto" element={<Login/>} />
        <Route path="login" element={<Register/>} />
       
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter> */}
    </div>
  );}


export default App;
