
import React, {Component, useEffect, useState } from "react";
import Cabecera from '../components/Cabecera';
import Menu from '../components/Menu';
import CuerpoPerfil from "../components/CuerpoPerfil"
import '../styles/miCss.css';
import { render } from "@testing-library/react";


function Profile() {

  return (
    <>
    <Menu/>
    <CuerpoPerfil/>
    
    </>
  );}


export default Profile;
