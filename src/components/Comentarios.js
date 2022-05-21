
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2'
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import defaultUser from "../imagenes/defaultUser.png";



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

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            iconColor:"#cb990f" ,
            text: 'Tu comentario fue eliminado!',
            showConfirmButton: false,
            color: "#cb990f",
            background: "linear-gradient(to right, #434343, #979292)",
            timer: 1000
          })
            
           
            

    }

    const estaLogueado=()=> localStorage.getItem('user') !== null ? true : false;
     
    
    return (
        <div className="comments-container">
            <ul id="comments-list" className="comments-list">
                <h2>Comentarios </h2>
                <li>
                    <div className="comment-main-level d-flex flex-column align-items-center">
                        {

                            comentarios.map(item => (
                                
                                <div className="dCommentRow w-100 d-flex row justify-content-center">

                                    <div className="dUserImg">
                                        {(item.imagen != null && item.imagen != '') ? (<img height={80} src={item.imagen}/>) : (<img height={80} src={defaultUser}/>)}
                                    </div>
                                
                                    <div className="comment-box details" key={item.comentarioId}>

                                        <div className="comment-head">

                                                {estaLogueado() ? (item.usuarioId === JSON.parse(localStorage.getItem('user')).usuarioId ? (<><span>#<Link to={rutaPropia + item.usuarioId}>{item.username}</Link></span> <DeleteForeverIcon onClick={() => EliminarComentario(item.comentarioId)} /></>) : (<span>#<Link to={ruta + item.usuarioId}>{item.username}</Link></span>)):<span>#<Link to={ruta + item.usuarioId}>{item.username}</Link></span>} 

                                            <span>&emsp;{item.fecha_comentario}&nbsp;</span>
                                            <span>a las {item.hora_comentario}</span>
                                            <i className="fa fa-reply"></i>
                                            <i className="fa fa-heart"></i>
                                        </div>
                                        <div className="comment-content">
                                            {item.comentario_text}
                                        </div>
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