
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import imagen from "../imagenes/maluma.png";
import TextArea from "./TextArea";
import Link from '@mui/material/Link';
import axios from 'axios';
import '../styles/miCss.css';

function CuerpoDetalles(props) {

  const ruta = "/profile/";
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


  function Inscribirse() {

    console.log("Inscribiendo usuario....")
    const data = {
      "usuarioId": JSON.parse(localStorage.getItem('user')).usuarioId,
      "eventoId": Id,
      "valoracion": 0
    }
    console.log(data)

    axios.post('http://localhost:5000/api/Inscripcion', data).then(response => {
      return response.data
    }).then(response => console.log(response))

  }

  if (localStorage.getItem('user') == null){
    var claseBotonInscripcion = "disabled";
    return (
      <div className='container'>

        <h1>{evento.evento}</h1>
        <p>{evento.descripcion}</p>
        <img src={imagen} />
        <a><button onClick={Inscribirse} type="button" className="btn btn-success disabled">Inscribirse</button></a>
        <div className="comments-container">
          <h1>Comentarios </h1>
          <ul id="comments-list" className="comments-list">
            <li>
              <div className="comment-main-level">
                {

                  comentarios.map(item => (

                    <div className="comment-box" key={item.comentarioId}>
                      <div className="comment-head">
                        <Link href={ruta + item.usuarioId}>#{item.usuarioId}</Link>
                        <span>{item.fecha_comentario}</span>
                        <i className="fa fa-reply"></i>
                        <i className="fa fa-heart"></i>
                      </div>
                      <div className="comment-content">
                        {item.comentario_text}
                      </div>
                    </div>
                  ))
                }
                   <TextArea display={"disabled"} eventoId={evento.eventoId} categoriaId={evento.categoriaId}  />

              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }else
   
  return (
    <div className='container'>
      <h1>{evento.evento}</h1>
      <p>{evento.descripcion}</p>
      <img src={imagen}/>
      <a><button onClick={Inscribirse} type="button" className="btn btn-success" >Inscribirse</button></a>
      <div className="comments-container">
        <h1>Comentarios </h1>
        <ul id="comments-list" className="comments-list">
          <li>
            <div className="comment-main-level">
              {

                comentarios.map(item => (

                  <div className="comment-box" key={item.comentarioId}>
                    <div className="comment-head">
                      <Link href={ruta + item.usuarioId}>#{item.usuarioId}</Link>
                      <span>{item.fecha_comentario}</span>
                      <i className="fa fa-reply"></i>
                      <i className="fa fa-heart"></i>
                    </div>
                    <div className="comment-content">
                      {item.comentario_text}
                    </div>
                  </div>
                ))
              }

              <TextArea display={""} eventoId={evento.eventoId} categoriaId={evento.categoriaId} usuarioId={JSON.parse(localStorage.getItem('user')).usuarioId} />

            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CuerpoDetalles;