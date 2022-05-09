
import React, { Component, useEffect, useState } from "react";
import '../styles/login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';



function FormularioLogin() {

    const baseUrl = 'http://localhost:5000/api/Usuario/authenticate/';
    const cookies = new Cookies();

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
                    var respuesta = response;
                    console.log(respuesta)
                    localStorage.setItem('user', JSON.stringify(respuesta));
                    console.log("Bienvenid@ ", JSON.parse(localStorage.getItem('user')).nombre)
                    console.log("Bienvenid@ ", JSON.parse(localStorage.getItem('user')).telefono)
                    window.location.reload();
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
                <div className="header-form">
                    <h4 className="text-primary text-center"> LOGIN</h4>
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
                        <input onClick={() => iniciarSesion()} className="btn login" value="LOGIN" />
                        <div className="message">
                            <div><input type="checkbox" /> Remember ME</div>
                            <div><a href="#">Forgot your password</a></div>
                        </div>
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
