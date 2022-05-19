
import React, { Component, useEffect, useState } from "react";
import '../styles/login.sass';
import axios from 'axios';
import Swal from 'sweetalert2'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LoginIcon from '@mui/icons-material/Login';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";

import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import { PropaneSharp } from "@mui/icons-material";

function FormularioLogin() {

    const baseUrl = 'http://localhost:5000/api/Usuario/authenticate/';
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
        $("body").removeClass('overflow-hidden')
    }

    const iniciarSesion = async () => {

        var data = {
            "username": formData.username,
            "password": formData.password
        }

        console.log('Iniciando sesion...')
       
        await axios.post(baseUrl, data)
            .then(response => {
                console.log(response)
                
                return response.data;
            }).then(response => {

                var respuesta = response;
                console.log("respuesta", respuesta)
                localStorage.setItem('user', JSON.stringify(respuesta));
                console.log("Bienvenid@ ", JSON.parse(localStorage.getItem('user')).nombre)

                var saludo= "Hola de nuevo "+ JSON.parse(localStorage.getItem('user')).nombre
                console.log(saludo)
                Swal.fire({
                    text: saludo,
                    icon: 'success',
                    position: 'top-end',
                    showConfirmButton: false,
                    color: "#cb990f",
                    background: "linear-gradient(to right, #434343, #979292)",
                    timer: 2000
                  }).then(

                    navigate("/"),
                    setTimeout(()=>{window.location.reload()},2000)
                  )

            }).catch(error => {
                console.log(error)
                Swal.fire({
                    title: 'Error!',
                    text: "La contraseña que has introducido no coincide",
                    icon: 'error',
                    color: "#cb990f",
                    background: "linear-gradient(to right, #434343, #979292)",
                    showConfirmButton: false,
                    timer: 1500
         
                  })
                  
            })
    }

    return (


        <div className="login-container">
           
            <div className="form-box">
            <KeyboardBackspaceIcon onClick={cerrarDivLogin} className="sRetroc"/>
                <div className="header-form">
                    <h4 className="text-center"><LoginIcon/>LOGIN</h4>
                    <div className="image">
                    </div>
                </div>
                <div className="body-form">
                    <form className="d-flex flex-column align-items-center">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span class="input-group-text">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                            <input type="text" onChange={controlarCambio} name="username" id="username" className="form-control" placeholder="Username" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                            <input type="password" onChange={controlarCambio} name="password" id="password" className="form-control" placeholder="Password" />
                        </div>
                        <input onClick={() => iniciarSesion()} className="btn btn-danger login text-light border border-warning bg-transparent" value="Acceder" />
                       
                        
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
