
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import CuerpoPerfil from "../components/CuerpoPerfil"
import Footer from '../components/Footer';
import { Navigate } from 'react-router-dom'



function Profile() {

  if (localStorage.getItem('user') != null) {
    return (
      <>
        <Menu />
        <CuerpoPerfil />
        <Footer/>
      </>
    );
  }else{
    return (<Navigate to='/' />);
  }
}


export default Profile;
