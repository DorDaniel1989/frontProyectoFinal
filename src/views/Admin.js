
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import Cartas from "../components/Cartas";
import '../styles/admin.sass';
import { render } from "@testing-library/react";

function Admin() {

  return (
    <div>
        <div className="cabecera"> <h1 className="pru">EVENTOS</h1> </div>
    
    <Menu/>
    <h1>HELLO ADMIN</h1>
    
    </div>
  );}


export default Admin;
