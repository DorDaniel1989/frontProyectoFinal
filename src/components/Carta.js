
import {useRef} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {Component, useEffect, useState } from "react";
import '../styles/miCss.css';


function Carta(props) {

  return (
    <div className="cardP">
    <div className="image">
      <img src={props.imagen} alt="img"/>
    </div>
    <div className="subscribe">
      <h2>{props.title}</h2>
      <p>{props.descripcion}</p>
      <form>
        
        <button type="button">Apúntate</button>
      </form>
    </div>
  </div>
  );}


export default Carta;
