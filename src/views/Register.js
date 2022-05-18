
import React from "react";
import Menu from '../components/Menu';
import FormularioLogin from '../components/FormularioLogin';
import FormularioRegistro from "../components/FormularioRegistro";
import { Navigate } from 'react-router-dom'

function Register() {

  if(localStorage.getItem('user')!=null)
      return (<Navigate to='/' />)


  return (
    <div className="register-view container-fluid d-flex flex-column mw-100 min-vh-100 p-0"> 
      <Menu/>
      <div className="register-section d-flex">
          <FormularioLogin />
          <FormularioRegistro />
        </div>
    </div>
  );}


export default Register;
