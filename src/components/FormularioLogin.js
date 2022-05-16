
import React, { Component, useEffect, useState } from "react";
import '../styles/login.sass';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LoginIcon from '@mui/icons-material/Login';

import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";

function FormularioLogin() {

    const baseUrl = 'http://localhost:5000/api/Usuario/authenticate/';
    const { Id } = useParams();
    const navigate = useNavigate();

    const [formData, setForm] = useState({
        username: '',
        password: ''
    });

    const controlarCambio = e => {
        const { name, value } = e.target;
        setForm({
            ...formData,
            [name]: value
        })
        console.log(formData)
    }

    function cerrarDivLogin(){
        $(".login-container").css("display","none");
        $("#root").removeClass('modal-open')
    }

    const iniciarSesion = async () => {

        var data = {
            "username": formData.username,
            "password": formData.password
        }

        console.log('Iniciando sesion...')

        await axios.post(baseUrl, data)
            .then(response => {
                return response.data;
            }).then(response => {

                if (response != null) {
                    var respuesta = response;
                    console.log(respuesta)
                    localStorage.setItem('user', JSON.stringify(respuesta));
                    console.log("Bienvenid@ ", JSON.parse(localStorage.getItem('user')).nombre)
                    console.log("Bienvenid@ ", JSON.parse(localStorage.getItem('user')).telefono)
                   
             
                   
                    return (window.location.reload())
                     
                    

                } else {
                    console.log(response)
                    alert('El usuario o la contraseña no son correctos')
                }
            }).catch(error => {
                console.log(error)
            })
    }

    return (


        <div className="login-container">
           
            <div className="form-box">
            <KeyboardBackspaceIcon onClick={cerrarDivLogin}/>
                <div className="header-form">
                    <h4 className="text-center"> LOGIN</h4>
                    <div className="image">
                    </div>
                </div>
                <div className="body-form">
                    <form>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bi bi-person-circle"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="username" id="username" className="form-control" placeholder="Username" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <i className="fa fa-lock"></i>
                            </div>
                            <input type="password" onChange={controlarCambio} name="password" id="password" className="form-control" placeholder="Password" />
                        </div>
                        <button onClick={iniciarSesion} className="btn login text-light border border-warning bg-transparent"> <LoginIcon/>LOGIN</button>
                       
                        
                    </form>
                    <div className="social">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter-square"></i></a>
                        <a href="#"><i className="fab fa-google"></i></a>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default FormularioLogin;
