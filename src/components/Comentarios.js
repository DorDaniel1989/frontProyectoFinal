
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Link, BrowserRouter, Routes, Route } from "react-router-dom";



function Comentarios() {

    const ruta = "/visitProfile/";
    const rutaPropia = "/profile/";
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

    async function EliminarComentario(Id) {

        console.log(Id)
        const response = await axios.delete(` https://localhost:5001/api/Comentario/${Id}`);
        console.log(response)
        obtenerDatos()

    }

    const estaLogueado=()=> localStorage.getItem('user') !== null ? true : false;
     
    
    return (
        <div className="comments-container">
            <ul id="comments-list" className="comments-list">
                <h2>Comentarios </h2>
                <li>
                    <div className="comment-main-level">
                        {

                            comentarios.map(item => (
                                
                                <>
                                
                                <div className="comment-box" key={item.comentarioId}>
                                 <img height={30} src={item.imagen}/>
                                    <div className="comment-head">
                                    
                                        {estaLogueado()?( item.usuarioId === JSON.parse(localStorage.getItem('user')).usuarioId ? (<><span>#<Link to={rutaPropia + item.usuarioId}>{item.username}</Link></span> <button onClick={() => EliminarComentario(item.comentarioId)} className="text-dark border border-warning bg-transparent btn btn-danger">Eliminar</button></>) : (<span>#<Link to={ruta + item.usuarioId}>{item.username}</Link></span>)):<span>#<Link to={ruta + item.usuarioId}>{item.username}</Link></span>} 
                                        
                                        <span>&emsp;{item.fecha_comentario}&nbsp;</span>
                                        <span>a las {item.hora_comentario}</span>
                                        <i className="fa fa-reply"></i>
                                        <i className="fa fa-heart"></i>
                                    </div>
                                    <div className="comment-content">
                                        {item.comentario_text}
                                    </div>
                                </div>
                                </>
                            ))
                        }
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Comentarios;