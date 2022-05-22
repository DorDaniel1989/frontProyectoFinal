
import React, { Component, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Swal from 'sweetalert2'

import '../styles/login.sass';
import '../styles/editarUsuario.sass';

function FormularioEditarUsuario(props) {

    var [formData, setForm] = useState({ ...props.tablaData });
    const navigate = useNavigate();

    console.log(localStorage.getItem('user').imagen)

    useEffect(() => {
        setForm(props.tablaData);

    }, [props.tablaData])

    console.log(formData);

    function getBase64(objeto) {

        // declaramos variable del tipo clave valor

        var { name, value } = objeto;

        //seleccionamos el objeto imagen de dentro del DOM de la etiqueta HTML

        var file = document.querySelector(`#imagen`)['files'][0];

        // creamos un reader y convertimos la imagen en string base64

        var reader = new FileReader();
        reader.readAsDataURL(file);

        // cargamos el string y lo extraemos en el hook de react para el formulario

        reader.onload = function () {
            console.log(reader.result);
            setForm({
                ...formData,
                [name]: reader.result
            })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            setForm({
                ...formData,
                [name]: null
            })
        };
    }

    const baseUrl = 'http://localhost:5000/api/Usuario/' + props.tablaData.usuarioId;

    const controlarCambio = e => {
        const { name, value } = e.target;
        if ([name] != 'imagen') {
            setForm({
                ...formData,
                [name]: value
            })
        } else {
            getBase64(e.target);
            console.log("imagen formateada", formData.imagen)
        }
        //  console.log("data de controlar cambio =>", formData)

    }


    const actualizarUsuario = async (data) => {

        console.log('actualizando usuario...');
        console.log("data FINAL del formulario =>", formData);


        await axios.put(baseUrl, formData)
            .then(response => {
                return response.data;
            }).then(response => {
                props.setTablaData(formData);

                Swal.fire({

                    text: "Tu perfil fue actualizado con exito",
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    iconColor:"#39FF1A" ,
                    color: "#cb990f",
                    background: "linear-gradient(360deg, #000000d0, transparent)",
                    icon: "success"
                    
                })

            }
            ).catch(error => {
                console.log("ERROR FATAL")
                console.log(error)
            })
    }


    function EliminarCuenta(usuarioId) {
        var usuarioId= JSON.parse(localStorage.getItem('user')).usuarioId
        console.log("eliminando cuenta", usuarioId)
    
        Swal.fire({
            title: '¿Estás serguro?',
            text: "Desapareceras de nuestra base de datos",
            icon: 'warning',
            showCancelButton: true,
            color: "#cb990f",
            background: "linear-gradient(to right, #434343, #000)",
            confirmButtonColor: 'black',
            cancelButtonColor: 'orange',
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText:'Mejor no'
    
        }).then((result) => {
    
            if (result.isConfirmed) {
                console.log("hoplitas")
                EliminarCuentaConfirmado(usuarioId)
            }
            
        })
    
    
        async function EliminarCuentaConfirmado(_usuarioId) {
    
            console.log("eliminando cuenta", _usuarioId)
            const response = await axios.delete(` http://localhost:5000/api/Usuario/${_usuarioId}`);
            console.log(response)
    
            Swal.fire({
                title: 'Cuenta Eliminada!',
                text: 'Esperemos que vuelvas pronto a nuestras comunidad',
                icon: 'success',
                color: "#cb990f",
                showConfirmButton: false,
                background: "linear-gradient(to right, #434343, #000)",
                timer : 3000
            }).then(

                setTimeout(()=>{ localStorage.clear(); window.location.href=('/')} , 3000)
               
            
            )
    
        }
    }
    

    function cerrarVentana() {

        $(".container-datos").css("display", "none");
        $("#container-pestanas").css("display", "block");
    }






    
    return (


        <div className="container register-container">
            <div className="form-box-editar">
                <KeyboardBackspaceIcon onClick={cerrarVentana} />

                <div className="header-form">
                    <h4 className="text-white text-center"> DATOS PERSONALES</h4>
                    <hr />

                </div>
                <div className="body-form">
                    <form>
                        <div className="row">
                            <div className="form-group col  col-10 offset-1">
                            </div>
                            <div className="col col-10 offset-1 offset-lg-1 col-lg-4 d-flex flex-column justify-content-center">
                                <label for="username">USERNAME</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <i className="bi bi-person-circle"></i>

                                        <input type="text" onChange={controlarCambio} name="username" id="username" className="form-control col-5" value={formData.username} placeholder="Username" />
                                    </div>
                                </div>
                            </div>
                            <div className="col col-12  col-lg-6 d-flex flex-row justify-content-center align-items-center">
                                <img onChange={controlarCambio} src={formData.imagen} className="imagenPerfil" />
                            </div>
                            <div className="col col-10 offset-1 offset-lg-1 col-lg-4">
                                <label for="username">PASSWORD</label>
                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                    <input type="password" onChange={controlarCambio} name="password" id="password" value={formData.password} className="form-control col-5" placeholder="Password" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-10 offset-1 offset-lg-1 col-lg-4">
                                <label for="username">EMAIL</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                    <input type="text" onChange={controlarCambio} name="email" id="email" className="form-control" value={formData.email} placeholder="email" />

                                </div>  </div>
                            <div className="col col-10 offset-1 offset-lg-1 col-lg-4">
                                <label for="username">NOMBRE</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                    <input type="text" onChange={controlarCambio} name="nombre" id="nombre" className="form-control" value={formData.nombre} placeholder="nombre" />
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col col-10 offset-1 offset-lg-1 col-lg-4">
                                <label for="username">APELLIDO</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                    <input type="text" onChange={controlarCambio} name="apellido" id="apellido" className="form-control" value={formData.apellido} placeholder="apellido" ></input>
                                </div>
                            </div>
                            <div className="col col-10 offset-1 offset-lg-1 col-lg-4">
                                <label for="username">DIRECCIÓN</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                    <input type="text" onChange={controlarCambio} name="direccion" id="direccion" className="form-control" value={formData.direccion} placeholder="direccion" />
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col col-10 offset-1 offset-lg-1 col-lg-4">
                                <label for="username">TELÉFONO</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                    <input type="text" onChange={controlarCambio} name="telefono" id="telefono" className="form-control" value={formData.telefono} placeholder="telefono" />
                                </div>
                            </div>
                            <div className="col col-10 offset-1 offset-lg-1 col-lg-5">
                                <label for="username">DINOS ALGO SOBRE TÍ</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                    <input type="text" onChange={controlarCambio} name="about_me" id="about_me" className="form-control" value={formData.about_me} placeholder="about_me" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10 offset-1 offset-lg-1 col-lg-6">
                                <label for="username">IMAGEN PERFIL</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                    <input type="file" onChange={controlarCambio} name="imagen" id="imagen" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-10 offset-1 offset-lg-1 col-lg-4 mb-3">
                                <input onClick={() => actualizarUsuario()} className="btn btn-danger border border-warning bg-transparent text-light login" value="GUARDAR CAMBIOS" />
                            </div>
                            <div className="col-10 offset-1 col-lg-5 mb-3">
                            <input className="btn-eliminar-cuenta btn btn-danger border border-warning  text-light btn-danger bg-dark" onClick={()=>{EliminarCuenta()}} value="Eliminar cuenta"/>
                            </div>
                        </div>
                    </form>

                </div >
            </div >
        </div >

    );
}

export default FormularioEditarUsuario;
