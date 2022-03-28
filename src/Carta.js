
import imagen4 from "./concierto.png";
import {useRef} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {Component, useEffect, useState } from "react";
import Menu from './Menu';

import './miCss.css';

import { render } from "@testing-library/react";

function Carta() {


  return (
    <div className="card">
    <div className="image">
      <img src="https://cdn.pixabay.com/photo/2019/01/12/16/21/breakfast-3928800_960_720.jpg" alt="img"/>
    </div>
    <div className="subscribe">
      <h2>Get diet and fitness tips in your inbox</h2>
      <p>Eat better and exercise better. Sign up for the Diet & Fitness newsletter.</p>
      <form>
        
        <button type="button">Subscribe</button>
      </form>
    </div>
  </div>
  );}


export default Carta;
