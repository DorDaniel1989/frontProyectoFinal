
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import CuerpoDetalles from '../components/CuerpoDetalles';
import FormularioLogin from '../components/FormularioLogin';
import '../styles/admin.sass';


function Details() {

  return (
    <>
    <Menu/>
    <FormularioLogin />
    <CuerpoDetalles/>
    
    </>
  );}


export default Details;
