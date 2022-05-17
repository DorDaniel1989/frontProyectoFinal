
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import Acordeon from "../components/Acordeon";
import Forms from "../components/FormulariosAdmin";
import '../styles/admin.sass';
import pichasu from "../imagenes/pichasu.gif";
import hacking from "../imagenes/juanquer.gif";
import  { Navigate } from 'react-router-dom'

function Admin() {


  if(localStorage.getItem('user') != null){
        if(!JSON.parse(localStorage.getItem('user')).admin){
            return (<Navigate to='/'  />);
        }else{
          return (
            <div id="dAdminBody" className="container-fluid d-flex flex-column">
              <Menu/>

              <marquee id="mAviso"><img src={pichasu} alt="Pichasu" /><span>Cuidado!!! que estás en el admin wacho</span></marquee>

              <div id="dCMS" className="container-fluid d-flex flex-column justify-content-center">
                <Acordeon/>

                <div className="showTable container-fluid d-flex flex-column align-items-center
                justify-content-center" id="dShowBackImage">
                  <div id="dBackImage">

                  </div>
                </div>  

                <Forms/>
              </div>

              </div>
          );
        }
  }else{
    return (<Navigate to='/'  />);
  }
}


export default Admin;
