
import React, { Component, useEffect, useState } from "react";
import '../styles/login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';



function FormularioRegistro(props) {

    const baseUrl = 'http://localhost:5000/api/Usuario/authenticate/';
    const cookies = new Cookies();

    const [formData, setForm] = useState({
        new_username: props.username,
        new_password: props.password,
        email: props.email,
        nombre: props.nombre,
        apellido: props.apellido,
        direccion: props.direccion,
        telefono: props.telefono,
        about_me: props.about_me,
        new_imagenUsuario: props.imagen
    });

    const controlarCambio = e => {
        const { name, value } = e.target;
        setForm({
            ...formData,
            [name]: value
        })
        console.log(formData)
    }


    const registroUsuario = async () => {

        var data = {
            "new_username": formData.new_username,
            "new_password": formData.new_password,
            "email": formData.email,
            "nombre": formData.nombre,
            "apellido": formData.apellido,
            "direccion": formData.direccion,
            "telefono": formData.telefono,
            "about_me": formData.about_me,
            "new_imagenUsuario": formData.new_imagenUsuario

        }

        console.log('Registrando usuario...');

        console.log(data);


        // await axios.post(baseUrl, data)
        //     .then(response => {
        //         return response.data;
        //     }).then(response => {

        //         if (response != null) {
        //             var respuesta = response;
        //             console.log(respuesta)
        //             localStorage.setItem('user', JSON.stringify(respuesta));
        //             console.log("Bienvenid@ ", JSON.parse(localStorage.getItem('user')).nombre)
        //             window.location.reload();
        //         } else {
        //             console.log(response)
        //             alert('El usuario o la contraseña no son correctos')
        //         }
        //     }).catch(error => {
        //         console.log(error)
        //     })
    }

    return (


        <div className="register-container">
            <div className="form-box ">
                <div className="header-form">
                    <h4 className="text-white text-center"> REGISTER</h4>
                    <div className="image">
                    </div>
                </div>
                <div className="body-form">
                    <form>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bi bi-person-circle"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="new_username" id="new_username" className="form-control" value={props.username} placeholder="Username" />
                        </div>


                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="password" onChange={controlarCambio} name="new_password" id="new_password" value={props.password} className="form-control" placeholder="Password" />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="email" id="email" className="form-control" value={props.email} placeholder="email" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="nombre" id="nombre" className="form-control" value={props.nombre} placeholder="nombre" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="apellido" id="apellido" className="form-control" value={props.apellido} placeholder="apellido" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="direccion" id="direccion" className="form-control" value={props.direccion} placeholder="direccion" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="telefono" id="telefono" className="form-control" value={props.telefono} placeholder="telefono" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="about_me" id="about_me" className="form-control" value={props.about_me} placeholder="about_me" />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="file" onChange={controlarCambio} name="new_imagenUsuario" id="new_imagenUsuario" className="form-control"/>
                        </div>
                      


                        <input onClick={() => registroUsuario()} className="btn login" value="REGISTRAME!" />

                    </form>

                </div>
            </div>
        </div>



    );
}

export default FormularioRegistro;
