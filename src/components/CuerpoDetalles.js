
import {useRef} from "react";
import {Link, BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import '../styles/miCss.css';

function CuerpoDetalles(props) {


    const [evento , setEvento] = useState([])
    const [comentarios , setComentarios] = useState([])
    const { Id } = useParams();
    
    useEffect(()=>{
        obtenerDatos()
    } ,[])
   
    const obtenerDatos = async() =>{
      const data =  await fetch(`http://localhost:5000/api/Evento/${Id}`);
      const evento = await data.json()
      setEvento(evento)

      const info =  await fetch(`http://localhost:5000/api/Comentario/evento/${Id}`);
      const comments = await info.json()
      console.log(comments)
      setComentarios(comments)
      
    }

  return (
    <div className='container'>
        
        <h1>{evento.evento}</h1>
        <p>{evento.descripcion}</p>
        {
         comentarios.map(item=>(
            <div className="col-4" key={item.comentarioId}>
           <p>{item.comentario_text} </p>
           </div>
         ))

         }

</div>
  );
}

export default CuerpoDetalles;