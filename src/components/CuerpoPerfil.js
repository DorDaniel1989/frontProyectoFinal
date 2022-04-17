
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import InscripcionesUsuario from "../components/InscripcionesUsuario";

function CuerpoPerfil(){

    const [user, setUser] = useState([])
    const { Id } = useParams();

    useEffect(() => {
        obtenerDatos()
      }, [])
    
      const obtenerDatos = async () => {
        const data = await fetch(`http://localhost:5000/api/Usuario/${Id}`);
        const user = await data.json()
        setUser(user)
    
      }
    

    return (

    <>
    <h1>PERFIL DE : {user.username}</h1>
    <img src={user.imagen}/>
    <h2>Email : {user.email}</h2>
    <h2>Nombre : {user.nombre}</h2>
    <h2>Apellido : {user.apellido}</h2>
    <h2>Direccion : {user.direccion}</h2>
    <h2>Telefono : {user.telefono}</h2>

    <InscripcionesUsuario/>
    </>
    )
}

export default CuerpoPerfil;