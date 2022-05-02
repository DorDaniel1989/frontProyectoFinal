
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import imagen from "../imagenes/maluma.png";
import TextArea from "./TextArea";
import Comentarios from "./Comentarios";
import Map from "./Map";
import Link from '@mui/material/Link';
import axios from 'axios';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import '../styles/miCss.css';




function CuerpoDetalles(props) {

  const ruta = "/profile/";
  const [evento, setEvento] = useState([])
  const [localizacion, setLocalizacion] = useState([])
  const [inscripciones, setInscripciones] = useState([])
  const [comentarios, setComentarios] = useState([])
  const { Id } = useParams();



  useEffect(() => {
    obtenerDatos()

  }, [])


  const obtenerDatos = async () => {

    const evenData = await fetch(`http://localhost:5000/api/Evento/${Id}`);
    const evento = await evenData.json()
    setEvento(evento)

    const inscData = await fetch(`http://localhost:5000/api/Inscripcion/evento/${Id}`);
    const inscripciones = await inscData.json()
   // console.log(inscripciones)
    setInscripciones(inscripciones)
  //  console.log(inscripciones.includes(JSON.parse(localStorage.getItem('user')).username))

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

    window.location.reload();
  }


  function comprobarAforo() {
    console.log(inscripciones.length)
    console.log(evento.aforo_max)
    console.log("console ", inscripciones.length >= evento.aforo_max)
   
    return inscripciones.length >= evento.aforo_max

  }


  function comprobarInscripcion() {

    let inscrito = false;

    inscripciones.forEach(element => {
      if (element.username == (JSON.parse(localStorage.getItem('user')).username)) {
        //console.log("encontrado!")
        inscrito = true;
      }
    });

    return inscrito;

  }



  if (localStorage.getItem('user') == null) {

    return (

      <div className='container'>

        <div className="aside" id="aside-details">
          <h2>ASISTENTES {inscripciones.length}</h2>
          <h2>CUPOS {evento.aforo_max - inscripciones.length}</h2>

          <Map />

          <a><button onClick={Inscribirse} type="button" className="btn btn-success disabled">Inscribirse</button></a>
        </div>

        <div className="bodyDetails">

          <h1>{evento.evento}</h1>
          <p>{evento.descripcion}</p>
          <img src={imagen} />

          <TextArea display={"disabled"} eventoId={evento.eventoId} categoriaId={evento.categoriaId} />
          <Comentarios />
        </div>
      </div>

    );
  } else

    return (
      <div className='container'>

        <div className="aside" id="aside-details">
          <h2>AFORO MAX {evento.aforo_max}</h2>
          <h2>ASISTENTES {inscripciones.length}</h2>
          <h2>CUPOS {evento.aforo_max - inscripciones.length}</h2>

          <Map />

          {comprobarAforo() ? <div>COMPLETO!</div>:<div>Ok!</div>}

          {
            comprobarInscripcion() ?
              <a><button type="button" className="btn btn-success disabled ">Asistiré a este evento</button></a> :
              <a><button  id="btn-inscribir" onClick={Inscribirse} type="button" className="btn btn-primary ">Inscribirme</button></a>

          }

        </div>
        <div className="bodyDetails">
          <h1>{evento.evento}</h1>
          <p>{evento.descripcion}</p>
          <img src={imagen} />

          <TextArea display={""} eventoId={evento.eventoId} categoriaId={evento.categoriaId} usuarioId={JSON.parse(localStorage.getItem('user')).usuarioId} />
          <Comentarios />
        </div>
      </div>

    )
}

export default CuerpoDetalles;