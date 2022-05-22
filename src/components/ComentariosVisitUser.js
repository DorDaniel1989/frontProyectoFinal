
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";



function ComentariosUser() {

    const ruta = "/visitProfile/";
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