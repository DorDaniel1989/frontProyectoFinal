
import React, {Component, useEffect, useState } from "react";
import Cabecera from '../components/Cabecera';
import Menu from '../components/Menu';
import CuerpoDetalles from '../components/CuerpoDetalles';
import Cartas from "../components/Cartas";
import '../styles/admin.sass';
import { render } from "@testing-library/react";

function Details() {

  return (
    <>
    <Menu/>
    <CuerpoDetalles/>
    
    </>
  );}


export default Details;
