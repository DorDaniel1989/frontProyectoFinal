
import React, { useState } from "react";
import '../styles/register.sass';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { faHomeUser } from "@fortawesome/free-solid-svg-icons";
import { faPhoneFlip } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'


function FormularioRegistro(props) {

    const baseUrl = 'http://localhost:5000/api/Usuario/';
    const UrlComprobarUsuario = "http://localhost:5000/api/Usuario/ComprobarUsuario/";
    const UrlComprobarEmail = "http://localhost:5000/api/Usuario/comprobarEmail/";

    const navigate = useNavigate();

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

    const [formData, setForm] = useState({

    });

    const controlarCambio = e => {
        const { name, value } = e.target;
        if ([name] != 'imagen') {
            setForm({
                ...formData,
                [name]: value
            })
        } else {
            getBase64(e.target);
        }
        // console.log("data de controlar cambio =>", formData)

    }

    async function comprobarSiUsuarioExiste() {

        console.log(UrlComprobarUsuario + formData.username)

        await axios.get(UrlComprobarUsuario + formData.username)
            .then(response => {
                console.log("data" ,response.data)
                return response.data;
            }).then(response => {
                console.log("respuesta de username",response)
                if (response === true) {
                    Swal.fire({
                        title: 'Ups!',
                        text: "Ese usuario ya existe",
                        icon: 'error',
                        iconColor: "red",
                        showConfirmButton: false,
                        color: "#cb990f",
                        background: "linear-gradient(360deg, #000000d0, transparent)",
                        timer: 1500
                    })
                }

            })
    }

    const comprobarSiEmailExiste = async () => {


        console.log(UrlComprobarEmail + formData.email)
        await axios.get(UrlComprobarEmail + formData.email)
            .then(response => {
                return response.data;
            }).then(response => {
                console.log("respuesta de email", response)
                if (response === true) {
                    Swal.fire({
                        title: 'Ups!',
                        text: "Ya hay una cuenta registrada con ese email",
                        icon: 'error',
                        iconColor: "red",
                        showConfirmButton: false,
                        color: "#cb990f",
                        background: "linear-gradient(360deg, #000000d0, transparent)",
                        iconColor: "#cb990f",
                        timer: 1500
                    })
                }

            }).then(
               setTimeout(()=>{ window.location.reload()},1500)
            )
    }


    const registroUsuario = async () => {

        console.log('Registrando usuario...');
        console.log("comprobacion Username " , !comprobarSiUsuarioExiste())

       if(comprobarSiUsuarioExiste()) {
           if(comprobarSiEmailExiste()){
            console.log(formData.password)
            console.log(formData.confirmPwd)
     
             if (formData.password !== formData.confirmPwd) {
                 Swal.fire({
                     icon: 'error',
                     iconColor: "red",
                     title: "La contraseña que has introducido no coincide",
                     showConfirmButton: false,
                     color: "#cb990f",
                     background: "linear-gradient(360deg, #000000d0, transparent)",
                     timer: 1500
                 })
     
             } else {
     
                 delete formData.confirmPwd;
     
                 await axios.post(baseUrl, formData)
                     .then(response => {
                         return response.data;
                     }).then(response => {
     
                         if (response !== null) {
                             var respuesta = response;
                             console.log(respuesta)
                             Swal.fire({
                                 title: 'Bienvenido!',
                                 position: 'center',
                                 text: "Tu registro ha sido completado con exito!",
                                 icon: 'success',
                                 iconColor:"#39FF1A" ,
                                 showConfirmButton: false,
                                 color: "#cb990f",
                                 background: "linear-gradient(to right, #434343, #000)",
                                 timer: 3000
     
                             }).then(
                                 navigate("/")
                             )
     
     
                         } else {
                             console.log(response)
     
                             Swal.fire({
                                 title: 'Algo ha fallado en el proceso de registro',
                                 icon: 'error',
                                 showConfirmButton: false,
                                 color: "#cb990f",
                                 background: "linear-gradient(360deg, #000000d0, transparent)",
                                 iconColor: "#cb990f",
                                 timer: 1500
                             })
                         }
                     }).catch(error => {
                         console.log(error)
                     })
             }
     
           }else
            return
    
        }
    
           }
    
    return (


        <div className="register-container-view d-flex flex-column justify-content-center align-items-center">
            <h3>Dale paso a la diversión  .  .  .  <br />&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; con EVENTUM</h3>
            <div className="form-box d-flex flex-column justify-content-start">
                <div className="header-form">

                    <div className="image">
                    </div>
                </div>
                <div className="body-form">
                    <form>

                        <div className="input-group mb-3 d-flex justify-content-center">
                            <div className="input-container-alone d-flex justify-content-center">
                                <div className="input-group-prepend">
                                    <span class="input-group-text">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                </div>
                                <input type="text" onChange={controlarCambio} name="username" id="username" className="form-control" placeholder="Username" />
                            </div>
                        </div>

                        <div className="input-group mb-3 d-flex justify-content-center">
                            <div className="input-container-alone d-flex justify-content-center">
                                <div className="input-group-prepend">
                                    <span class="input-group-text">
                                        <FontAwesomeIcon icon={faAt} />
                                    </span>
                                </div>
                                <input type="text" onChange={controlarCambio} name="email" id="email" className="form-control" placeholder="email" />
                            </div>
                        </div>

                        <div className="input-group mb-3 d-flex justify-content-center">
                            <div className="input-container-multiple d-flex justify-content-center">
                                <div className="input-group-prepend">
                                    <span class="input-group-text">
                                        <FontAwesomeIcon icon={faUnlock} />
                                    </span>
                                </div>
                                <input type="password" onChange={controlarCambio} name="password" id="password" className="form-control" placeholder="Password" />
                            </div>
                            <div className="input-container-multiple d-flex justify-content-center">
                                <div className="input-group-prepend">
                                    <span class="input-group-text">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                                <input type="password" onChange={controlarCambio} name="confirmPwd" id="confirmPwd" className="form-control" placeholder="Confirm password" />
                            </div>
                        </div>

                        <div className="input-group mb-3 d-flex justify-content-center">
                            <div className="input-container-multiple d-flex justify-content-center">
                                <div className="input-group-prepend">
                                    <span class="input-group-text">
                                        <FontAwesomeIcon icon={faSignature} />
                                    </span>
                                </div>
                                <input type="text" onChange={controlarCambio} name="nombre" id="nombre" className="form-control" placeholder="nombre" />
                            </div>
                            <div className="input-container-multiple d-flex justify-content-center">
                                <div className="input-group-prepend">
                                    <span class="input-group-text">
                                        <FontAwesomeIcon icon={faPeopleRoof} />
                                    </span>
                                </div>
                                <input type="text" onChange={controlarCambio} name="apellido" id="apellido" className="form-control" placeholder="apellido" />
                            </div>
                        </div>

                        <div className="input-group mb-3 d-flex justify-content-center">
                            <div className="input-container-alone d-flex justify-content-center">
                                <div className="input-group-prepend">
                                    <span class="input-group-text">
                                        <FontAwesomeIcon icon={faHomeUser} />
                                    </span>
                                </div>
                                <input type="text" onChange={controlarCambio} name="direccion" id="direccion" className="form-control" placeholder="direccion" />
                            </div>
                        </div>

                        <div className="input-group mb-3 d-flex justify-content-center">
                            <div className="input-container-alone d-flex justify-content-center">
                                <div className="input-group-prepend">
                                    <span class="input-group-text">
                                        <FontAwesomeIcon icon={faPhoneFlip} />
                                    </span>
                                </div>
                                <input type="text" onChange={controlarCambio} name="telefono" id="telefono" className="form-control" placeholder="telefono" />
                            </div>
                        </div>

                        <div className="input-group mb-3 d-flex justify-content-center">
                            <div className="input-container-alone d-flex justify-content-center">
                                <div className="input-group-prepend">
                                    <span class="input-group-text">
                                        <FontAwesomeIcon icon={faImage} />
                                    </span>
                                </div>
                                <input type="file" onChange={controlarCambio} name="imagen" id="imagen" className="form-control" />
                            </div>
                        </div>

                        <div className="input-group mb-3 d-flex justify-content-center">
                            <input onClick={() => registroUsuario()} className="btn btn-danger border border-warning bg-transparent text-light register" value="REGISTRARSE" />
                        </div>

                    </form>

                </div>
            </div>
        </div>



    );
}

export default FormularioRegistro;
