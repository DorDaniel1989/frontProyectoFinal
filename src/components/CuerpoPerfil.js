
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import defaultUser from "../imagenes/defaultUser.png";
import DatosUsuario from "../components/DatosUsuario";
import NavTabs from "../components/NavTabs";
import axios from 'axios';
import "jquery-ui-dist/jquery-ui";
import $ from 'jquery';
import '../styles/perfil.sass';
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

function CuerpoPerfil() {

  const ruta = "/profile/";
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
              <img src={user.imagen} className="imagenPerfil" />
              <button className="btn btn-warning" onClick={abrirFrameDatos}> Ver datos Personales</button>
              <button className="btn btn-danger" onClick={()=>EliminarCuenta(user.usuarioId)}>Eliminar cuenta</button>

            </div>


            <div className="bodyDetails">

            <h1>{user.about_me}</h1>

            <NavTabs/>

            </div>
          </div>

          <DatosUsuario tablaData={user} setTablaData={setUser}/>
        </div>
      );
    }
  } else {
    return (<Navigate to='/' />);
  }


}
export default CuerpoPerfil;