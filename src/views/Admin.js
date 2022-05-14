
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import Acordeon from "../components/Acordeon";
import Forms from "../components/FormulariosAdmin";
import '../styles/admin.sass';
import { render } from "@testing-library/react";
import  { Navigate } from 'react-router-dom'

function Admin() {


  if(localStorage.getItem('user') != null){
        if(!JSON.parse(localStorage.getItem('user')).admin){
            return (<Navigate to='/'  />);
        }else{
          return (
            <div className="container-fluid">
              <Menu/>

              <marquee>Cuidado!!! que estás en el admin wacho</marquee>

              <div id="dCMS" className="container-fluid d-flex flex-wrap">
                <Acordeon/>

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
