
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import Acordeon from "../components/Acordeon";
import '../styles/admin.sass';
import { render } from "@testing-library/react";

function Admin() {

  return (
    <div>
        <div className="cabecera"> <h1 className="pru">EVENTOS</h1> </div>
    
    <Menu/>
    <Acordeon/>
    
    </div>
  );}


export default Admin;
