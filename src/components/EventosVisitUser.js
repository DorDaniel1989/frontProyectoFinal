import React, { useState, useEffect } from "react";
import Card from "./Card";


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

    return (
        <div className="container-cartas">

            {
                cards.map(item => (
                    <div className="evento-usuario d-flex justify-content-center flex-wrap">
                    <Card titulo={item.evento} descripcion={item.descripcion} imagen={item.imagen} eventoId={item.eventoId} fecha={item.fecha_inic} precio={item.precio} />
                    </div>
                ))
            }

        </div>
    )
}

export default EventosUser;