import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import defaultUser from "../imagenes/defaultUser.png";
import NavTabsVisitUser from "../components/NavTabsVisitUser";
import '../styles/perfil.sass';


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
    <div className='container container-perfil'>
        <div className="cabeceraPerfil" id="aside-details">
            <div className="div_imagen">
              <img src={user.imagen} className="imagenPerfil" />
              <h1>{user.username}</h1>
            </div>

            <div className="div_about_me">
            <p className="about_me">{user.about_me}</p>
            </div>

          </div>

      <div className="bodyDetails">

     

        <NavTabsVisitUser />

      </div>



    </div>
  )
}

export default CuerpoVisitProfile;