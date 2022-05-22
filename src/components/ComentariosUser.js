
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import '../styles/comentarios.sass';
import Swal from 'sweetalert2'


function ComentariosUser() {

    const ruta = "/profile/";
    const rutaEvento = "/details/";
    const [comentarios, setComentarios] = useState([])
    const { Id } = useParams();

    console.log(Id);

    useEffect(() => {
        obtenerDatos()

    }, [])


    const obtenerDatos = async () => {

        const comData = await fetch(`http://localhost:5000/api/Comentario/Usuario/${Id}`);
        const comentarios = await comData.json()
        setComentarios(comentarios)
        console.log(`http://localhost:5000/api/Comentario/evento/${Id}`);
    }


    console.log(comentarios)
    async function EliminarComentario(comentarioId) {

        Swal.fire({
            title: '¿Estás serguro?',
            text: "Puede que más adelante no queden plazas",
            icon: 'warning',
            showCancelButton: true,
            color: "#cb990f",
            background: "linear-gradient(to right, #434343, #000)",
            confirmButtonColor: 'black',
            cancelButtonColor: 'orange',
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText:'Mejor no'
            
          }).then((result) => {

            if (result.isConfirmed) {
                EliminarComentarioConfirmado(comentarioId)
            }
          })
      
          
    async function EliminarComentarioConfirmado(_comentarioId){
        console.log(_comentarioId)
        const response = await axios.delete(` https://localhost:5001/api/Comentario/${_comentarioId}`);
        console.log(response)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tu comentario fue eliminado!',
            iconColor:"#39FF1A" ,
            color: "#cb990f",
            background: "linear-gradient(360deg, #000000d0, transparent)",
            showConfirmButton: false,
            timer: 1000
          })

        obtenerDatos()

    }
     
    }

    return (
        <div className="comments-container">
            <ul id="comments-list" className="comments-list">
                <li>
                    <div className="comment-main-level d-flex flex-column align-items-center">
                        {

                            comentarios.map(item => (

                                <div className="comment-box" key={item.comentarioId}>
                                    <div className="comment-head">

                                        <span>#<Link to={ruta + item.usuarioId}>{item.username}</Link></span>
                                        <DeleteForeverIcon onClick={() => EliminarComentario(item.comentarioId)}/>
                                        <span>&emsp;{item.fecha_comentario}&nbsp;</span>
                                        <span>a las {item.hora_comentario}</span>
                                        <i className="fa fa-reply"></i>
                                        <i className="fa fa-heart"></i>
                                        <span className="sRedirectToEvent"><Link to={rutaEvento + item.eventoId}>Ir al evento</Link></span>
                                    </div>
                                    <div className="comment-content">
                                        {item.comentario_text}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ComentariosUser;