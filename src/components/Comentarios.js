
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import '../styles/miCss.css';


function Comentarios() {

    const ruta = "/profile/";
    const [comentarios, setComentarios] = useState([])
    const { Id } = useParams();


    useEffect(() => {
        obtenerDatos()

    }, [])


    const obtenerDatos = async () => {


        const comData = await fetch(`http://localhost:5000/api/Comentario/evento/${Id}`);
        const comentarios = await comData.json()
        setComentarios(comentarios)

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

                                        
                                        <span>#{item.username}</span>
                                        <span>&emsp;{item.fecha_comentario}</span>
                                        <span>:{item.hora_comentario}</span>
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

export default Comentarios;