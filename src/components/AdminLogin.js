import React, { useState } from "react";
import '../styles/login.sass';
import axios from 'axios';
import Swal from 'sweetalert2'
import LoginIcon from '@mui/icons-material/Login';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";

function AdminLogin() {

    const baseUrl = 'http://localhost:5000/api/Usuario/authenticate/';

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
                    if(response.admin){
                        var respuesta = response;
                        //console.log(respuesta)
                        localStorage.setItem('user', JSON.stringify(respuesta));
                        console.log("Bienvenid@ ", JSON.parse(localStorage.getItem('user')).nombre)
                        Swal.fire({
                            title: 'Hola administrador!',
                            text: "Ten cuidado con lo que tocas",
                            position: 'top-end',
                            color: "#ff6600",
                            iconColor:"#39FF1A" ,
                            icon: "success",
                            background: "linear-gradient(to right, #434343, #979292)",
                            customClass: {
                                container: 'my-swal'
                              },
                            showConfirmButton: false,
                            timer: 2000
                 
                          }).then(
                            setTimeout(()=>{window.location.reload()},2000)
                          )
                          
                        
                    }else{
                        Swal.fire({
                            title: 'Error!',
                            text: "El usuario no es un administrador",
                            position: 'center',
                            icon: 'error',
                            color: "#ff6600",
                            iconColor: "red",
                            background: "linear-gradient(to right, #434343, #979292)",
                            customClass: {
                                container: 'my-swal'
                              },
                            showConfirmButton: false,
                            timer: 2000
                 
                          })
                          
                    }
                } else {
                    console.log(response)
                    Swal.fire({
                        title: 'Error!',
                        text: "El usuario o la contraseña no son correctos",
                        position: 'top-end',
                        icon: 'error',
                        color: "#ff6600",
                        iconColor: "red",
                        background: "linear-gradient(to right, #434343, #979292)",
                        customClass: {
                            container: 'my-swal'
                          },
                        showConfirmButton: false,
                        timer: 2000
             
                      })
                      
                }
            }).catch(error => {
                console.log(error)
                
                Swal.fire({
                    title: 'Error!',
                    text: "El usuario o la contraseña no son correctos",
                    position: 'top-end',
                    icon: 'error',
                    color: "#ff6600",
                    iconColor: "red",
                    background: "linear-gradient(to right, #434343, #979292)",
                    customClass: {
                        container: 'my-swal'
                      },
                    showConfirmButton: false,
                    timer: 2000
         
                  })



            })
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


        <div className="login-container adminlogin d-flex flex-column justify-content-center">

            <div className="form-box">
                <div className="header-form">
                    <h4 className="text-center"><LoginIcon />LOGIN</h4>
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

export default AdminLogin;
