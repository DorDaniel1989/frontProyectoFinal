
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function InscripcionesUsuario() {

    const [inscripciones, setInscripciones] = useState([])
    const { Id } = useParams();

    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        const data = await fetch(`http://localhost:5000/api/Inscripcion/Usuario/${Id}`);
        const inscripciones = await data.json()
        setInscripciones(inscripciones)
        console.log(inscripciones)
    }



    return (


        <div className="container">

            <h2>IDS DE EVENTOS INSCRIPCIONES DEL USUARIO</h2>

            {
                inscripciones.map(item => (

                    <div  key={item.eventoId}>
                    <p>{item.eventoId}</p>
                    </div>

                ))
            }

        </div>

    )
}

export default InscripcionesUsuario;