
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import '../styles/comentarios.sass';
import Swal from 'sweetalert2'


function ComentariosUser() {

    const ruta = "/profile/";
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

    async function EliminarComentario(Id) {

        console.log(Id)
        const response = await axios.delete(` https://localhost:5001/api/Comentario/${Id}`);
        console.log(response)
        obtenerDatos()

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Tu comentario fue eliminado!',
            showConfirmButton: false,
            timer: 1000
          })

    }

    return (
        <div className="comments-container">
            <ul id="comments-list" className="comments-list">
                <h1>Comentarios </h1>
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