
import imagen4 from "./concierto.png";
import {useRef} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {Component, useEffect, useState } from "react";
import Menu from './Menu';

import './miCss.css';
import { render } from "@testing-library/react";

function App() {


  return (
    <div >
      <h1>EVENTOS</h1>
      <img src={imagen4}/>
      <Menu/>

    </div>
  );}


export default App;
