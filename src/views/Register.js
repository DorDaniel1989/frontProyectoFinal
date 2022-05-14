
import React from "react";
import Menu from '../components/Menu';
import FormularioRegistro from "../components/FormularioRegistro";
import '../styles/admin.sass';


function Register() {

  return (
    <div className="register-view"> 
    <Menu/>
    <FormularioRegistro/>
    </div>
  );}


export default Register;
