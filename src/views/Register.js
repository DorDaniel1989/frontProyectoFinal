
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import FormularioRegistro from "../components/FormularioRegistro";
import '../styles/admin.sass';
import { render } from "@testing-library/react";

function Register() {

  return (
    <div className="register-view"> 
    <Menu/>
    <FormularioRegistro/>
    </div>
  );}


export default Register;
