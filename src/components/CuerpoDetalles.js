
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import fuego_activo from "../imagenes/fuego_activo.gif";
import fuego_tenue from "../imagenes/fuego_tenue.png";
import "jquery-ui-dist/jquery-ui";
import $ from 'jquery';
import '../styles/evento.sass';
import NavTabsEvento from "./NavTabsEvento"; 



function CuerpoDetalles(props) {

  const ruta = "/profile/";
  let hypeado = false;
  const [evento, setEvento] = useState([])
  const [inscripciones, setInscripciones] = useState([])
  const [localizacion, setlocalizacion] = useState([])
  const { Id } = useParams();

  const [inscripcionId, setInscripcionId] = useState([])

  useEffect(() => {
    obtenerDatos()
    comprobarInscripcion();
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
    

    const imagenf = document.getElementById("fondo-evento");
    console.log("imagen F ", imagenf)
    try{
      imagenf.style.backgroundImage = `url(${evento.imagen})`;
      
    }catch(e){
      
    }
    

  }

  function Inscribirse() {

    console.log("Inscribiendo usuario....")
    const data = {
      "usuarioId": JSON.parse(localStorage.getItem('user')).usuarioId,
      "eventoId": Id,
      "valoracion": 0
    }
    
    axios.post('http://localhost:5000/api/Inscripcion', data).then(response => {
      return response.data
    }).then(response => { console.log(response); window.location.reload(); })


  }


  function comprobarAforo() {

    if (inscripciones.length >= evento.aforo_max) {
    
      return false;

    }

    return true;

  }


  function comprobarInscripcion() {

    let inscrito = false;

    inscripciones.forEach(element => {
      if (element.username == (JSON.parse(localStorage.getItem('user')).username)) {
        //console.log("encontrado!")
        // setInscripcionId(inscripciones.inscripcionId)

        console.log("inscripcionID => ", inscripcionId)
        inscrito = true;
        getInscripcion();
        checkHype(inscripcionId);
      }
    });

    return inscrito;

  }

  async function getInscripcion() {
    const inscData = await fetch(`http://localhost:5000/api/Inscripcion/Usuario/${JSON.parse(localStorage.getItem('user')).usuarioId}`);
    const inscripcionesUser = await inscData.json()
    inscripcionesUser.map((tupla) => {
      Object.entries(tupla).map(([key, subkey]) => {

        if (key == 's') {
          Object.entries(subkey).map(([key, value]) => {
            if (key == 'eventoId') {
              if (value == Id) {
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

    if (hypeado) {
      await axios.get(`http://localhost:5000/api/Inscripcion/HypeDown/${inscripcionId}`)
        .catch(function (error) {
         
        });
      console.log('estabas hypeado prro');
    }

    console.log('aca wacho ' + Id);

    const response = await axios.delete(` https://localhost:5001/api/Inscripcion/${Id}`);
    console.log(response)
    obtenerDatos()
    window.location.reload();
  }

  async function checkHype(Id) {

    const thisInsc = await axios.get(`http://localhost:5000/api/Inscripcion/${Id}`)
      .catch(function (error) {
       
      });


    Object.entries(thisInsc.data).map(([key, value]) => {
      if (key == 'valoracion' && value >= 1) {
        console.log('hype on');
        $('.hype-on').removeClass('d-none')
        $('.hype-off').addClass('d-none')
      }
    })

  }

  async function sumarHype() {

    $('.hype').toggleClass('d-none')

    await axios.get(`http://localhost:5000/api/Inscripcion/HypeUp/${inscripcionId}`)
      .catch(function (error) {
        
      });

    hypeado = true;

  }

  async function restarHype() {

    $('.hype').toggleClass('d-none')

    await axios.get(`http://localhost:5000/api/Inscripcion/HypeDown/${inscripcionId}`)
      .catch(function (error) {
       
      });

    hypeado = false;

  }


  if (localStorage.getItem('user') == null) {
     console.log("local storage   evento ", localStorage.getItem('user'))
    return (

      <div className='container container-evento'>

        <div className="cabecera-evento" id="aside-details">

          <div id="fondo-evento">

            <div className="dFilter">
              <div className="absolute-info p-2">

                <h1>{evento.evento}</h1>

                {
                  comprobarAforo() ? (<a><button id="btn-inscribir" type="button" className="text-light border border-warning bg-dark mr-md-3 btn btn-danger disabled">Inscríbete</button></a>) : (<a><button id="btn-inscribir" type="button" className="text-light border border-warning bg-dark mr-md-3 btn disabled btn-danger">Completo</button></a>)
                }
                <div className="cuadrado-info">
                  <p>Aforo</p>
                  <p>{evento.aforo_max}</p>
                </div>
                <div className="cuadrado-info">
                  <p>Vendidos</p>
                  <p>{inscripciones.length}</p>
                </div>
                <div className="cuadrado-info">
                  <p>Disponibles</p>
                  <p>{evento.aforo_max - inscripciones.length}</p>
                </div>

              </div>
            </div>
           
          </div>
        </div>
        <div className="body-details">

          <br></br>
          <NavTabsEvento fecha_inic={evento.fecha_inic} fecha_fin={evento.fecha_fin} hora_inic={evento.hora_inic} hora_fin={evento.hora_fin} precio={evento.precio} descripcion={evento.descripcion} ubicacion={localizacion.localizacion} display={"disabled"} eventoId={evento.eventoId} categoriaId={evento.categoriaId} usuarioId={""}/>
          <hr />
        </div>

      </div>

    );
  } else

    return (
      <div className='container container-evento'>

        <div className="cabecera-evento" id="aside-details">

          <div id="fondo-evento">

            <div className="dFilter">
              <div className="absolute-info p-2">
                <h1>{evento.evento}</h1>
                {
                  comprobarInscripcion() ? (
                    <div className="inscribirse-hype-container ">
                      <a><button id="btn-bye-inscribir" onClick={() => { EliminarInscripcion(inscripcionId) }} type="button" className="text-light border border-warning bg-dark btn btn-danger">Cancelar inscripción</button></a>
                      <img onClick={restarHype} className="hype hype-on d-none" height={50} src={fuego_activo} />
                      <img onClick={sumarHype} className="hype hype-off" height={50} src={fuego_tenue} /></div>) :
                    (
                      comprobarAforo() ? (<a><button id="btn-inscribir" onClick={Inscribirse} type="button" className="text-light border border-warning bg-dark mr-md-3 btn btn-danger ">Inscribirse</button></a>) : (<a><button id="btn-inscribir" type="button" className="text-light border border-warning bg-dark mr-md-3 btn disabled btn-danger">Completo</button></a>)
                    )

                }

                <div className="cuadrado-info">
                  <p>Aforo</p>
                  <p>{evento.aforo_max}</p>
                </div>
                <div className="cuadrado-info">
                  <p>Vendidos</p>
                  <p>{inscripciones.length}</p>
                </div>

                <div className="cuadrado-info">
                  <p>Disponibles</p>
                  <p>{evento.aforo_max - inscripciones.length}</p>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div className="body-details">
        <NavTabsEvento fecha_inic={evento.fecha_inic} fecha_fin={evento.fecha_fin} hora_inic={evento.hora_inic} hora_fin={evento.hora_fin} precio={evento.precio} descripcion={evento.descripcion} ubicacion={localizacion.localizacion} display={""} eventoId={evento.eventoId} categoriaId={evento.categoriaId} usuarioId={JSON.parse(localStorage.getItem('user')).usuarioId}/>
        <hr />
          

      </div>

      </div>

    )
}

export default CuerpoDetalles;