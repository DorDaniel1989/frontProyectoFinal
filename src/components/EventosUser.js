import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from 'axios';
import '../styles/cartas.css';



function EventosUser(props) {

    const [cards, setCards] = useState([])


    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        const data = await fetch(`http://localhost:5000/api/Usuario/Eventos/${props.user}`);
        const eventos = await data.json()
        setCards(eventos)

    }

    async function EliminarInscripcion(Id) {
        console.log(Id)
        const response = await axios.delete(` https://localhost:5001/api/Inscripcion/${Id}`);
        console.log(response)
        obtenerDatos()

    }

    return (
        <div className="container-cartas">

            {
                cards.map(item => (

                    <>
                        <Card titulo={item.evento} descripcion={item.descripcion} imagen={item.imagen} eventoId={item.eventoId} fecha={item.fecha_inic} />
                        <button onClick={() => EliminarInscripcion(item.inscripcionId)} className="btn btn-danger"> Eliminar</button>
                    </>

                ))
            }

        </div>
    )
}

export default EventosUser;