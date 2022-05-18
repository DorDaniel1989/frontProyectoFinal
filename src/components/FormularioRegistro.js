
import React, { useState } from "react";
import '../styles/register.sass';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function FormularioRegistro(props) {

    const baseUrl = 'http://localhost:5000/api/Usuario/';

    const navigate = useNavigate();

    function getBase64(objeto) {

        // declaramos variable del tipo clave valor

        var {name,value} = objeto;

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
        username: props.username,
        password: props.password,
        email: props.email,
        nombre: props.nombre,
        apellido: props.apellido,
        direccion: props.direccion,
        telefono: props.telefono,
        about_me: props.about_me,
        imagen: props.imagen
    });

    const controlarCambio = e => {
        const { name, value } = e.target;
        if([name] != 'imagen'){
		    setForm({
                ...formData,
                [name]: value
            })
	    }else{
            getBase64(e.target); 
        }
       // console.log("data de controlar cambio =>", formData)

    }


    const registroUsuario = async () => {

        console.log(formData);
        console.log('Registrando usuario...');



         await axios.post(baseUrl, formData)
             .then(response => {
                 return response.data;
             }).then(response => {

                 if (response != null) {
                     var respuesta = response;
                     console.log(respuesta)
                    
                     navigate("/");
                 } else {
                     console.log(response)
                     alert('El usuario o la contraseña no son correctos')
                 }
             }).catch(error => {
                 console.log(error)
             })
    }

    return (


        <div className="register-container-view d-flex justify-content-center align-items-center">
            <h3>Dale paso a la diversión  .  .  .  <br/>&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; con EVENTUM</h3>
            <div className="form-box d-flex flex-column justify-content-start">
                <div className="header-form">
                  
                    <div className="image">
                    </div>
                </div>
                <div className="body-form">
                    <form>
                    
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bi bi-person-circle"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="username" id="username" className="form-control" value={props.username} placeholder="Username" />
                        </div>


                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="password" onChange={controlarCambio} name="password" id="password" value={props.password} className="form-control" placeholder="Password" />
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
                            <input type="file" onChange={controlarCambio} name="imagen" id="imagen" className="form-control"/>
                        </div>
                      


                        <input onClick={() => registroUsuario()} className="btn btn-danger border border-warning bg-transparent text-light register" value="REGISTRAME!" />

                    </form>

                </div>
            </div>
        </div>



    );
}

export default FormularioRegistro;
