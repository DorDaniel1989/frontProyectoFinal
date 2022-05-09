
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
            <>
              <Menu/>
              <Acordeon/>

              <div className="formularios">
                <Forms/>
              </div>

            </>
          );
        }
  }else{
    return (<Navigate to='/'  />);
  }
}


export default Admin;
