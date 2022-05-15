
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

import '../styles/comentarios.sass';


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

    }

    return (
        <div className="comments-container">
            <ul id="comments-list" className="comments-list">
                <h1>Comentarios </h1>
                <li>
                    <div className="comment-main-level">
                        {

                            comentarios.map(item => (

                                <div className="comment-box" key={item.comentarioId}>
                                    <div className="comment-head">

                                        <span>#<Link to={ruta + item.usuarioId}>{item.username}</Link></span>
                                        <button onClick={() => EliminarComentario(item.comentarioId)} className="text-light border border-warning bg-transparent btn btn-danger">Eliminar</button>
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