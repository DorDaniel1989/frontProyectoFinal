
import React, { Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import '../styles/login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import md5 from 'md5';


function Login() {

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
       // console.log(baseUrl + `/${data}`)

        await axios.post(baseUrl, data)
            .then(response => {
                return response.data;
            }).then(response => {
                
                if (response != null) {
                    var respuesta = response;
                    console.log(respuesta)
                    cookies.set('user', respuesta)
                    console.log("Bienvenid@ ", cookies.get('user').nombre)
                    console.log("Este es el token del usuario guardado en cookies =>", cookies.get('user').token)
                } else {
                    console.log(response)
                    alert('El usuario o la contraseña no son correctos')
                }
            }).catch(error => {
                console.log(error)
            })
            
   }

    return (
        <><Menu />
            <div className="row main-content bg-success text-center">

                <div className="col-md-4 text-center company__info">
                    <span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
                    <h4 className="company_title">Your Company Logo</h4>
                </div>
                <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
                    <div className="container-fluid">
                        <div className="row">
                            <h2>Log In</h2>
                        </div>
                        <div className="row">
                            <form method="POST" control="" className="form-group">
                                <div className="row">
                                    <input type="text" onChange={controlarCambio} name="username" id="username" className="form__input" placeholder="Username" />
                                </div>
                                <div className="row">

                                    <input type="password" onChange={controlarCambio} name="password" id="password" className="form__input" placeholder="Password" />
                                </div>
                                <div className="row">
                                    <input type="checkbox" name="remember_me" id="remember_me" className="" />
                                    <label htmlFor="remember_me">Remember Me!</label>
                                </div>
                                <div className="row">
                                    <input onClick={() => iniciarSesion()} className="btn" />
                                </div>
                            </form>
                        </div>
                        <div className="row">
                            <p>Don't have an account? <a href="#">Register Here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
