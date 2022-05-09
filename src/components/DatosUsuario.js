
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import InscripcionesUsuario from "../components/InscripcionesUsuario";
import defaultUser from  "../imagenes/defaultUser.png";
import FormularioEditarUsuario from "../components/FormularioEditarUsuario";

function DatosUsuario() {

  const [user, setUser] = useState([])
  const { Id } = useParams();
  
  useEffect(() => {
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/Usuario/${Id}`);
    const user = await data.json()
    console.log("!")
    console.log(user)
    user.imagen == "" || user.imagen == null? user.imagen = defaultUser : user.imagen = user.imagen
 
    setUser(user)

  }

  return (
    <div className='container container-datos'>
        
        <FormularioEditarUsuario usuarioId={user.usuarioId} imagen={user.imagen} username={user.username} password={user.password} nombre={user.nombre} apellido={user.apellido} email={user.email} direccion ={user.direccion} telefono ={user.telefono} about_me={user.about_me}/>

      </div>

  )
}

export default DatosUsuario;