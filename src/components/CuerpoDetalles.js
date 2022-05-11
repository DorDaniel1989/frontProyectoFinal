
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import imagen from "../imagenes/maluma.png";
import TextArea from "./TextArea";
import Comentarios from "./Comentarios";
import Map from "./Map";
import Link from '@mui/material/Link';
import axios from 'axios';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import fuego_activo from "../imagenes/fuego_activo.gif";
import fuego_tenue from "../imagenes/fuego_tenue.png";
import "jquery-ui-dist/jquery-ui";
import $ from 'jquery';

import '../styles/miCss.css';


function CuerpoDetalles(props) {

  const ruta = "/profile/";
  const [evento, setEvento] = useState([])
  const [inscripciones, setInscripciones] = useState([])
  const [localizacion, setlocalizacion] = useState([])
  const { Id } = useParams();
 
  const [inscripcionId, setInscripcionId] = useState([])

  useEffect(() => {
    obtenerDatos()

  }, [])


  const obtenerDatos = async () => {

    const evenData = await fetch(`http://localhost:5000/api/Evento/${Id}`);
    const evento = await evenData.json()
    setEvento(evento)

    const inscData = await fetch(`http://localhost:5000/api/Inscripcion/evento/${Id}`).then(comprobarAforo());
    const inscripciones = await inscData.json()
    setInscripciones(inscripciones)

    const locData = await fetch(`http://localhost:5000/api/Localizacion/evento/${Id}`);
    const localizacion = await locData.json()
    setlocalizacion(localizacion[0])
    console.log(localizacion)

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

    if (inscripciones.length >= evento.aforo_max) {
      console.log(inscripciones.length >= evento.aforo_max)
      document.getElementById("btn-inscribir").setAttribute("class", "btn btn-disabled btn-danger")
      document.getElementById("btn-inscribir").innerText = "COMPLETO"
    }

  }


  function comprobarInscripcion() {

    let inscrito = false;

    inscripciones.forEach(element => {
      if (element.username == (JSON.parse(localStorage.getItem('user')).username)) {
        //console.log("encontrado!")
       // setInscripcionId(inscripciones.inscripcionId)
        
        console.log("inscripcionID => ",inscripcionId)
        inscrito = true;
        getInscripcion();
      }
    });

    return inscrito;

  }

  async function getInscripcion(){
    const inscData = await fetch(`http://localhost:5000/api/Inscripcion/Usuario/${JSON.parse(localStorage.getItem('user')).usuarioId}`);
    const inscripcionesUser = await inscData.json()
    inscripcionesUser.map((tupla) => {
      Object.entries(tupla).map(([key, subkey]) => {

        if(key == 's'){
          Object.entries(subkey).map(([key, value]) =>{
            if(key == 'eventoId'){
              if(value == Id){
                setInscripcionId(subkey['inscripcionId']);
                return true;
              }
            }
          })
        }
        
      })
    })
    
  }

  async function EliminarInscripcion(Id) {
    console.log('aca wacho '+Id);
    const response = await axios.delete(` https://localhost:5001/api/Inscripcion/${Id}`);
    console.log(response)
    obtenerDatos()
    await axios.get(`http://localhost:5000/api/Inscripcion/HypeDown/${Id}`)
      .catch(function (error) {
        alert('Error!!! ->\n' + error)
      }); 
    window.location.reload();
  }

  async function sumarHype() {

    $('.hype').toggleClass('d-none')

    await axios.get(`http://localhost:5000/api/Inscripcion/HypeUp/${Id}`)
      .catch(function (error) {
        alert('Error!!! ->\n' + error)
      }); 

  }

  async function restarHype() {

    $('.hype').toggleClass('d-none')

    await axios.get(`http://localhost:5000/api/Inscripcion/HypeDown/${Id}`)
      .catch(function (error) {
        alert('Error!!! ->\n' + error)
      }); 

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


          {
            comprobarInscripcion() ? (
              <>
                <a><button id="btn-bye-inscribir" onClick={() => {EliminarInscripcion(inscripcionId)}} type="button" className="btn btn-success">Cancelar inscripción</button></a>
                <img onClick={restarHype} className="hype d-none" height={50} src={fuego_activo} />
                <img onClick={sumarHype} className="hype" height={50} src={fuego_tenue} /></>) :
                 (
              <a><button id="btn-inscribir" onClick={Inscribirse} type="button" className="btn btn-primary ">Inscribirme</button></a>)

          }
         

          {comprobarAforo()}
        </div>
        <div className="bodyDetails">
          <h1>{evento.evento}</h1>
          <h4>{evento.fecha_inic} hasta {evento.fecha_fin} de {evento.hora_inic} a {evento.hora_fin}</h4>
          <h2>{localizacion.localizacion}</h2>
          <img src={imagen} />
          <p>{evento.descripcion}</p>
          <br></br>
          <h3>Precio entrada: {evento.precio}</h3>
          <br></br>

          <TextArea display={""} eventoId={evento.eventoId} categoriaId={evento.categoriaId} usuarioId={JSON.parse(localStorage.getItem('user')).usuarioId} />
          <Comentarios />
        </div>
      </div>

    )
}

export default CuerpoDetalles;