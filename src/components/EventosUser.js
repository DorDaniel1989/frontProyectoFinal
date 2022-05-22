import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from 'axios';
import "jquery-ui-dist/jquery-ui";
import $ from 'jquery';
import Swal from 'sweetalert2'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import '../styles/cards.sass';


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


    const EliminarInscripcion = async (Id) => {

        Swal.fire({
            title: '¿Estás serguro?',
            text: "Puede que más adelante no queden plazas",
            icon: 'warning',
            showCancelButton: true,
            color: "#cb990f",
            background: "linear-gradient(to right, #434343, #979292)",
            confirmButtonColor: 'black',
            cancelButtonColor: 'orange',
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText:'Mejor no'
            
          }).then((result) => {

            if (result.isConfirmed) {
                EliminarInscripcionConfirmado(Id)
            }
          })
      
         async function EliminarInscripcionConfirmado(inscripcionId){

            const response = await axios.delete(` https://localhost:5001/api/Inscripcion/${inscripcionId}`);
            console.log(response)
            obtenerDatos()
            Swal.fire({
                title: 'Subscripcion Eliminada!',
                icon: 'success',
                showConfirmButton: false,
                color: "#cb990f",
                background: "linear-gradient(to right, #434343, #979292)",
                timer: 1000
            })
         }
    }


    return (
        <div className="container-cartas">

            {
                cards.map(item => (

                    <div className="evento-usuario d-flex justify-content-center flex-wrap">
                        <Card titulo={item.evento} descripcion={item.descripcion} imagen={item.imagen} eventoId={item.eventoId} fecha={item.fecha_inic} precio={item.precio}/>
                        
                        <button onClick={() => { EliminarInscripcion(item.inscripcionId)}}><DeleteForeverIcon/></button>

                    </div>
                ))
            }
            
        </div>
    )
}

export default EventosUser;