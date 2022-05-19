
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import CuerpoPerfil from "../components/CuerpoPerfil"
import { Navigate } from 'react-router-dom'



function Profile() {

  if (localStorage.getItem('user') != null) {
    return (
      <>
        <Menu />
        <CuerpoPerfil />

      </>
    );
  }else{
    return (<Navigate to='/' />);
  }
}


export default Profile;
