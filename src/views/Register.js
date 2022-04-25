
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import Cabecera from '../components/Cabecera';
import Cartas from "../components/Cartas";
import '../styles/admin.sass';
import { render } from "@testing-library/react";

function Register() {

  return (
    <div>
  
    <Menu/>
    <Cabecera/>
    
    </div>
  );}


export default Register;
