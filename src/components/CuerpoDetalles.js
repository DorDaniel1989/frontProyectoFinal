
import { useRef } from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import '../styles/miCss.css';
import TextArea from "./TextArea";

function CuerpoDetalles(props) {


  const [evento, setEvento] = useState([])
  const [comentarios, setComentarios] = useState([])
  const { Id } = useParams();

  useEffect(() => {
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/Evento/${Id}`);
    const evento = await data.json()
    setEvento(evento)

   

    const info = await fetch(`http://localhost:5000/api/Comentario/evento/${Id}`);
    const comments = await info.json()
   
    setComentarios(comments)

  }

  function comprobar(){
    console.log(Id , evento.eventoId, evento.categoriaId)
  }

  return (
    <div className='container'>

      <h1>{evento.evento}</h1>
      <p>{evento.descripcion}</p>
      <div className="comments-container">
        <h1>Comentarios </h1>
        <ul id="comments-list" className="comments-list">
          <li>
            <div className="comment-main-level">
              {

                comentarios.map(item => (

                  <div className="comment-box" key={item.comentarioId}>
                    <div className="comment-head">
                      <h6 className="comment-name by-author"><a href="#">{item.usuarioId}</a></h6>
                      <span>hace 20 minutos</span>
                      <i className="fa fa-reply"></i>
                      <i className="fa fa-heart"></i>
                    </div>
                    <div className="comment-content">
                      {item.comentario_text}
                    </div>
                  </div>
                ))

                
              }
              {comprobar()}
                 <TextArea  eventoId={evento.eventoId} categoriaId={evento.categoriaId} />
                 
            </div>
          </li>
        </ul>

      </div>
      
    

    </div>

    

  );
}

export default CuerpoDetalles;