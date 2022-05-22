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
            <div className="div_imagen d-flex flex-column align-items-center">
              <img src={user.imagen} className="imagenPerfil" />
              <div className="dUsername d-flex flex-row justify-content-center">
                <h4>@{user.username}</h4>
              </div>
            </div>

            <div className="div_about_me d-flex flex-column">
            <p className="about_me">{user.about_me}</p>
            </div>

          </div>

      <div className="bodyDetails">

     

        <NavTabsVisitUser tablaData={user} setTablaData={setUser}/>

      </div>



    </div>
  )
}

export default CuerpoVisitProfile;