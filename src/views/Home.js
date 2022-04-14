import {useRef} from "react";
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import Cartas from "../components/Cartas";
import '../styles/miCss.css';
import '../styles/admin.sass';
import { render } from "@testing-library/react";

function Home() {

  return (
    <div>
        <div className="cabecera"> <h1 className="pru">The dick</h1></div>
    
    <Menu/>
    <Cartas/>
    
    </div>
  );}


export default Home;
