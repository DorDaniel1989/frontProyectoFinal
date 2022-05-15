
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import defaultUser from "../imagenes/defaultUser.png";
import DatosUsuario from "../components/DatosUsuario";
import NavTabs from "../components/NavTabs";
import "jquery-ui-dist/jquery-ui";
import $ from 'jquery';
import '../styles/perfil.sass';
import imagenPreferencias from '../imagenes/preferencias.jpg'



function CuerpoPerfil() {


  const [user, setUser] = useState([])

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

  }

  function abrirFrameDatos() {

    console.log("Abriendo datos de usuario....")
   const container_datos = $("#container-datos").css("display", "flex")
    
    $("#container-pestanas").css("display", "none");
    
  }


  if (localStorage.getItem('user') !== null) {
    if (JSON.parse(localStorage.getItem('user')).usuarioId != Id) {
      return (<Navigate to='/' />);
    } else {
      return (


        <div id="container-perfil" className='container container-perfil'>
          <div className="cabeceraPerfil" id="aside-details">
            <div className="div_imagen">
              <button className="btn-preferencias btn bg-primary" onClick={abrirFrameDatos}> <img src={imagenPreferencias} /> </button>
              <img src={user.imagen} className="imagenPerfil" />
              <h1>{user.username}</h1>
            </div>

            <div className="div_about_me">
              <h1>{user.about_me}</h1>
            </div>

          </div>

          <div className="bodyDetails">

            <NavTabs />
            <DatosUsuario tablaData={user} setTablaData={setUser} />
          </div>

         
        </div>
      );
    }
  } else {
    return (<Navigate to='/' />);
  }
}
export default CuerpoPerfil;