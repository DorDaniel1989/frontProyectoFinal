
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

        console.log(data)
        console.log('Iniciando sesion...')
       
        await axios.post(baseUrl, data)
            .then(response => {
                console.log(response.data.message)
                
                return response.data;
            }).then(response => {

                var respuesta = response;
                console.log("respuesta", respuesta)
                localStorage.setItem('user', JSON.stringify(respuesta));
                console.log("Bienvenid@ ", JSON.parse(localStorage.getItem('user')).nombre)

                var saludo= "Hola de nuevo "+ JSON.parse(localStorage.getItem('user')).nombre
                console.log(saludo)
                exitoLoguearModal()

            }).catch(error => {
                console.log(error)

                Swal.fire({
                    
                    title: "Los datos que has introducido no son correctos",
                    position: 'top-end',
                    icon: 'error',
                    iconColor: "red",
                    color: "#cb990f",
                    background: "linear-gradient(360deg, #000000d0, transparent)",
                    showConfirmButton: false,
                    timer: 2000
         
                  })
                  
            })
    }


    function exitoLoguearModal(){
//falla cualquiera que no sea top-end,() sera que no sera visible por algun z-index? 
        Swal.fire({
            icon: 'success',
            position: 'top-end',
            title: 'Bienvenido',
            iconColor:"#39FF1A" ,
            color: "#cb990f",
            background: "linear-gradient(360deg, #000000d0, transparent)",
            showConfirmButton: false,
            timer: 1500
          }).then(

            setTimeout(()=>{window.location.href=("/")},1500)
           
          )
    }

    //enter login

    $('#username').keyup(function(e){
        if(e.keyCode == 13)
        {
            iniciarSesion()
        }
    });

    $('#password').keyup(function(e){
        if(e.keyCode == 13)
        {
            iniciarSesion()
        }
    });

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
