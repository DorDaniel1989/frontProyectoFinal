
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import InscripcionesUsuario from "../components/InscripcionesUsuario";
import defaultUser from  "../imagenes/defaultUser.png";
import DatosUsuario from "../components/DatosUsuario";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
function CuerpoPerfil() {

  const [user, setUser] = useState([])
  const { Id } = useParams();
  
  useEffect(() => {
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/Usuario/${Id}`);
    const user = await data.json()
    user.imagen == "" ? user.imagen = defaultUser : user.imagen = user.imagen
 
    setUser(user)

  }

  function abrirFrameDatos(){

    console.log("Abriendo datos de usuario....")
    $(".container-datos").css("display" ,"flex")
    $("#container-perfil").css("display", "none");

  }


  return (
    <div className="container">
    <div id="container-perfil" className='container'>
      <div className="aside" id="aside-details">

        <h1>{user.username}</h1>
        <img src={user.imagen} />
        <button className="btn btn-warning" onClick={abrirFrameDatos}> Ver datos Personales</button>

      </div>

      
      <div className="bodyDetails">
         <InscripcionesUsuario/>
      </div>

    </div>
    
      <DatosUsuario/>
    </div>
  )
}

export default CuerpoPerfil;