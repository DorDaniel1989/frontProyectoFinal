
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import CuerpoDetalles from '../components/CuerpoDetalles';
import Cartas from "../components/Cartas";
import '../styles/admin.sass';
import { render } from "@testing-library/react";

function Details() {

  return (
    <div>
        <div className="cabecera"> <h1 className="pru">EVENTOS</h1></div>
    
    <Menu/>
    <h1>DETALLES</h1>
    <CuerpoDetalles/>
    
    </div>
  );}


export default Details;
