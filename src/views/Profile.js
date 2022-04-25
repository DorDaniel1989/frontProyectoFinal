
import React, {Component, useEffect, useState } from "react";
import Cabecera from '../components/Cabecera';
import Menu from '../components/Menu';
import CuerpoPerfil from "../components/CuerpoPerfil"
import '../styles/admin.sass';
import { render } from "@testing-library/react";


function Profile() {

  return (
    <>

    <Menu/>
    <Cabecera/>
    <CuerpoPerfil/>
    
    </>
  );}


export default Profile;
