
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import InscripcionesUsuario from "../components/InscripcionesUsuario";
import defaultUser from "../imagenes/defaultUser.png";
import DatosUsuario from "../components/DatosUsuario";
import axios from 'axios';
import "jquery-ui-dist/jquery-ui";
import $ from 'jquery';

import { Link, BrowserRouter, Routes, Route } from "react-router-dom";




function CuerpoPerfil() {

  const ruta = "/visitProfile/";
  const [user, setUser] = useState([])
  const [comentarios, setComentarios] = useState([])
  const { Id } = useParams();

  const navigate = useNavigate();


  useEffect(() => {

    console.log("PARAMETRO ID DESDE LOCALSTORAGE", JSON.parse(localStorage.getItem('user')).usuarioId)
    console.log("PARAETRO ID DESDE URL =>", Id)
    console.log(JSON.parse(localStorage.getItem('user')).usuarioId != Id)

    obtenerDatos()

  }, [])


  const obtenerDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/Usuario/${Id}`);
    const user = await data.json()
    user.imagen == "" ? user.imagen = defaultUser : user.imagen = user.imagen

    setUser(user)

    const comData = await fetch(`http://localhost:5000/api/Comentario/Usuario/${Id}`);
    const comentarios = await comData.json()
    setComentarios(comentarios)

  }

  function abrirFrameDatos() {

    console.log("Abriendo datos de usuario....")
    $(".container-datos").css("display", "flex")
    $("#container-perfil").css("display", "none");

  }

  async function EliminarComentario(Id) {

    console.log(Id)
    const response = await axios.delete(` https://localhost:5001/api/Comentario/${Id}`);
    console.log(response)
    obtenerDatos()

  }


  async function EliminarCuenta(usuarioId) {

    console.log("eliminando cuenta" ,usuarioId)
    const response = await axios.delete(` http://localhost:5000/api/Usuario/${usuarioId}`);
    console.log(response) 
    localStorage.clear();
    
    navigate("/");
  }


  if (localStorage.getItem('user') !== null) {
    if (JSON.parse(localStorage.getItem('user')).usuarioId != Id) {
      return (<Navigate to='/' />);
    } else {
      return (
        <div className="container">
          <div id="container-perfil" className='container'>
            <div className="aside" id="aside-details">

              <h1>{user.username}</h1>
              <img src={user.imagen} />
              <button className="btn btn-warning" onClick={abrirFrameDatos}> Ver datos Personales</button>
              <button className="btn btn-danger" onClick={()=>EliminarCuenta(user.usuarioId)}>Eliminar cuenta</button>

            </div>


            <div className="bodyDetails">
              <InscripcionesUsuario />


              <div className="comments-container">
                <ul id="comments-list" className="comments-list">
                  <h1>Comentarios </h1>
                  <li>
                    <div className="comment-main-level">
                      {

                        comentarios.map(item => (

                          <div className="comment-box" key={item.comentarioId}>
                            <div className="comment-head">

                              <Link to={ruta + item.usuarioId}>{item.username}</Link>
                              <button onClick={() => EliminarComentario(item.comentarioId)} className="btn btn-danger">Eliminar</button>
                              <span>&emsp;{item.fecha_comentario}</span>
                              <span>:{item.hora_comentario}</span>
                              <i className="fa fa-reply"></i>
                              <i className="fa fa-heart"></i>
                            </div>
                            <div className="comment-content">
                              {item.comentario_text}
                            </div>

                          </div>
                        ))
                      }
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <DatosUsuario />
        </div>
      );
    }
  } else {
    return (<Navigate to='/' />);
  }


}
export default CuerpoPerfil;