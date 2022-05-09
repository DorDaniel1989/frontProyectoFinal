
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import InscripcionesUsuario from "../components/InscripcionesUsuario";
import defaultUser from  "../imagenes/defaultUser.png";

function CuerpoVisitProfile() {

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


  return (
    <div className='container'>
      <div className="aside" id="aside-details">

        <h1>PERFIL DE : {user.username}</h1>
        <img src={user.imagen} />
        <h2>Descripcion : {user.about_me}</h2>
        
      </div>

       
    </div>
  )
}

export default CuerpoVisitProfile;