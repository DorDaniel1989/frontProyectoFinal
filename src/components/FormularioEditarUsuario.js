
import React, { Component, useEffect, useState } from "react";
import '../styles/login.css';
import axios from 'axios';
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";


function FormularioEditarUsuario(props) {

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

   
   console.log(JSON.parse(localStorage.getItem('user')).telefono) 


    const [formData, setForm] = useState({

        usuarioId :   JSON.parse(localStorage.getItem('user')).usuarioId,
        username: JSON.parse(localStorage.getItem('user')).username,
        password: JSON.parse(localStorage.getItem('user')).password,
        email:  JSON.parse(localStorage.getItem('user')).email,
        administrator : JSON.parse(localStorage.getItem('user')).administrator,
        nombre: JSON.parse(localStorage.getItem('user')).nombre,
        apellido: JSON.parse(localStorage.getItem('user')).apellido,
        direccion: JSON.parse(localStorage.getItem('user')).direccion,
        telefono: JSON.parse(localStorage.getItem('user')).telefono,
        about_me: JSON.parse(localStorage.getItem('user')).about_me,
        imagen: JSON.parse(localStorage.getItem('user')).imagen,
        
    });


    useEffect(() => {
       
      },[] )
    

    console.log("Estado del formulario al comenzar  =>" + formData.imagen)
 
    const baseUrl = 'http://localhost:5000/api/Usuario/'+ props.usuarioId;
    console.log(baseUrl)


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


    const  actualizarUsuario = async (data) => {

        console.log('actualizando usuario...');

     
        console.log( "data FINAL del formulario =>", formData);


         await axios.put(baseUrl, formData)
             .then(response => {
                 return response.data;
             }).then(response => {
                     window.location.reload();
                     alert('El usuario ha sido modificado')
                 }
             ).catch(error => {
                 console.log("ERROR FATAL")
                 console.log(error)
         })
    }

    function cerrarVentana(){

$(".container-datos").css("display", "none");
$("#container-perfil").css("display", "flex");
    }


    return (


        <div className="register-container">
            <div className="form-box  form-editar-usuario">
            <button  onClick={cerrarVentana} className="btn btn-close bg-danger" ></button>
                <div className="header-form">
                    <h4 className="text-white text-center"> DATOS PERSONALES</h4>
                    <div className="image">
                    </div>
                </div>
                <div className="body-form">
               
                    <form>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bi bi-person-circle"></i>
                            </div>
                            <img height={100} src={props.imagen} />
                            <input type="text" onChange={controlarCambio} name="username" id="username" className="form-control" value={formData.username} placeholder="Username" />
                        </div>


                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="password" onChange={controlarCambio} name="password" id="password" value={formData.password} className="form-control" placeholder="Password" />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="email" id="email" className="form-control" value={formData.email} placeholder="email" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="nombre" id="nombre" className="form-control" value={formData.nombre} placeholder="nombre" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="apellido" id="apellido" className="form-control" value={formData.apellido} placeholder="apellido" ></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="direccion" id="direccion" className="form-control" value={formData.direccion} placeholder="direccion" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="telefono" id="telefono" className="form-control" value={formData.telefono} placeholder="telefono" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="text" onChange={controlarCambio} name="about_me" id="about_me" className="form-control" value={formData.about_me} placeholder="about_me" />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock"></i>
                            </div>
                            <input type="file" onChange={controlarCambio} name="imagen" id="imagen" className="form-control"/>
                        </div>

                        <input onClick={() => actualizarUsuario()} className="btn login" value="GUARDAR CAMBIOS" />

                    </form>

                </div>
            </div>
        </div>



    );
}

export default FormularioEditarUsuario;
