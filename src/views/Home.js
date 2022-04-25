import {useRef} from "react";
import React, {Component, useEffect, useState } from "react";
import Cabecera from '../components/Cabecera';
import Menu from '../components/Menu';
import Cartas from "../components/Cartas";
import '../styles/miCss.css';
import '../styles/admin.sass';
import { render } from "@testing-library/react";

function Home() {

  return (
   <>
   <div className="fondo"></div>
   <Cabecera/>
   <Menu/>
   <Cartas/>
   </>
   
  );}


export default Home;
