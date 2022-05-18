
import React from "react";
import Menu from '../components/Menu';
import FormularioRegistro from "../components/FormularioRegistro";
import { Navigate } from 'react-router-dom'

function Register() {

  if(localStorage.getItem('user')!=null)
      return (<Navigate to='/' />)


  return (
    <div className="register-view"> 
    <Menu/>
    <FormularioRegistro/>
    </div>
  );}


export default Register;
