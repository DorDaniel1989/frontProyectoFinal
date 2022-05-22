
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import fuego_activo from "../imagenes/fuego_activo.gif";
import fuego_tenue from "../imagenes/fuego_tenue.png";
import "jquery-ui-dist/jquery-ui";
import $ from 'jquery';
import '../styles/evento.sass';
import NavTabsEvento from "./NavTabsEvento"; 
import Swal from 'sweetalert2'



function CuerpoDetalles(props) {

  const ruta = "/profile/";
  let hypeado = false;
  const [evento, setEvento] = useState([])
  const [inscripciones, setInscripciones] = useState([])
  const [localizacion, setlocalizacion] = useState([])
  const [fechaFin, setFechaFin] = useState([])
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
   
    try{
      imagenf.style.backgroundImage = `url(${evento.imagen})`;
      
    }catch(e){
      
    }
    
    setFechaFin(new Date(+(evento.fecha_fin.split("/"))[2], (evento.fecha_fin.split("/"))[1] - 1, +(evento.fecha_fin.split("/"))[0]))

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
    }).then(response => { 
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tu inscripcion fue realizada !',
        showConfirmButton: false,
        iconColor:"#39FF1A" ,
        color: "#cb990f",
        background: "linear-gradient(360deg, #000000d0, transparent)",
        
        timer: 1500
      })
    
      obtenerDatos()

    })

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

  const EliminarInscripcion = async (Id) => {

    Swal.fire({
        title: '¿Estás serguro?',
        text: "Puede que más adelante no queden plazas",
        icon: 'question',
        showCancelButton: true,
        color: "#cb990f",
        background: "linear-gradient(to right, #434343, #000)",
        confirmButtonColor: 'black',
        cancelButtonColor: 'orange',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText:'Mejor no'
      }).then((result) => {

        if (result.isConfirmed) {
            
         
            EliminarInscripcionConfirmado(Id)
           
          Swal.fire({
            title:'Subscripcion Eliminada!',
            icon: 'success',
            iconColor:"#39FF1A" ,
            color: "#cb990f",
            background: "linear-gradient(360deg, #000000d0, transparent)",
            showConfirmButton: false,
            position: 'top-end',
            
            timer: 1000
          })
        }
      })
  
     async function EliminarInscripcionConfirmado(inscripcionId){

      if (hypeado) {
        await axios.get(`http://localhost:5000/api/Inscripcion/HypeDown/${inscripcionId}`)
          .catch(function (error) {
           
          });
      
      }

        const response = await axios.delete(` https://localhost:5001/api/Inscripcion/${inscripcionId}`);
        console.log(response)
        obtenerDatos()
     }
  

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

      <>
  
        <div className='container container-evento'>
      
          <div className="cabecera-evento" id="aside-details">
      
            <div id="fondo-evento">

              <div className="dFilter">

                <div className="dLittleImage">
                  <img src={evento.imagen} alt={evento.evento}></img>
                </div>

                <div className="dFade d-flex">
                  <div className="absolute-info p-2">

                    <div className="dBasicInfo">
                      <div className="dDataEvent d-flex flex-column">
                        <h1>{evento.evento}</h1>
                        <span>{localizacion.localizacion}</span>
                      </div>
                    </div>

                    <div className="dDisponibilidad d-flex row justify-content-end">
                      <div className="cuadrado-info d-flex flex-column align-items-center">
                        <h4>{evento.aforo_max}</h4>
                        <p>Aforo</p>
                      </div>
                      <div className="cuadrado-info d-flex flex-column align-items-center">
                        <h4>{inscripciones.length}</h4>
                        <p>Vendidos</p>
                      </div>
                      <div className="cuadrado-info d-flex flex-column align-items-center">
                        <h4>{evento.aforo_max - inscripciones.length}</h4>
                        <p>Disponibles</p>
                      </div>
                    </div>

                  </div>
                </div>   
              </div> 
            </div>
            {
              (fechaFin > new Date()) ? 
                (comprobarAforo() ? (<button id="btn-inscribir" type="button" className="text-light border border-warning bg-dark mr-md-3 btn btn-danger disabled">Inscríbete</button>) : (<button id="btn-inscribir" type="button" className="text-light border border-warning bg-dark mr-md-3 btn disabled btn-danger">Completo</button>))
                : (<button id="btn-inscribir" type="button" className="text-light border border-warning bg-dark mr-md-3 btn btn-danger disabled">Finalizado</button>)           
            }
          </div>
          <div className="body-details">
                
            <br></br>
            <NavTabsEvento fecha_inic={evento.fecha_inic} fecha_fin={evento.fecha_fin} hora_inic={evento.hora_inic} hora_fin={evento.hora_fin} precio={evento.precio} descripcion={evento.descripcion} ubicacion={localizacion.localizacion} display={"disabled"} eventoId={evento.eventoId} categoriaId={evento.categoriaId} usuarioId={""}/>
            <hr />
          </div>
                
        </div>
      </>

    );
  } else

    return (
      <>
        {
            comprobarInscripcion() ? (
            <div className="hype-container">
              <img onClick={restarHype} className="hype hype-on d-none" src={fuego_activo} />
              <img onClick={sumarHype} className="hype hype-off"  src={fuego_tenue} />
            </div>) : 
            (<></>)
        }
        <div className='container container-evento'>

          <div className="cabecera-evento" id="aside-details">

            <div id="fondo-evento">

              <div className="dFilter">
                <div className="dLittleImage">
                  <img src={evento.imagen} alt={evento.evento}></img>
                </div>

                <div className="dFade d-flex">

                  <div className="absolute-info p-2">

                    <div className="dBasicInfo">
                      <div className="dDataEvent d-flex flex-column">
                        <h1>{evento.evento}</h1>
                        <span>{localizacion.localizacion}</span>
                      </div>
                    </div>

                    <div className="dDisponibilidad d-flex row justify-content-end">
                      <div className="cuadrado-info d-flex flex-column align-items-center">
                        <h4>{evento.aforo_max}</h4>
                        <p>Aforo</p>
                      </div>
                      <div className="cuadrado-info d-flex flex-column align-items-center">
                        <h4>{inscripciones.length}</h4>
                        <p>Vendidos</p>
                      </div>
                      <div className="cuadrado-info d-flex flex-column align-items-center">
                        <h4>{evento.aforo_max - inscripciones.length}</h4>
                        <p>Disponibles</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {
              (fechaFin > new Date()) ? 
              (comprobarInscripcion() ? (
                <button id="btn-inscribir" onClick={() => { EliminarInscripcion(inscripcionId) }} type="button" className="text-light border border-warning bg-dark btn btn-danger">Cancelar inscripción</button>) :
              (
                comprobarAforo() ? (<button id="btn-inscribir" onClick={Inscribirse} type="button" className="text-light border border-warning bg-dark mr-md-3 btn btn-danger ">Inscribirse</button>) : (<button id="btn-inscribir" type="button" className="text-light border border-warning bg-dark mr-md-3 btn disabled btn-danger">Completo</button>)
              )) : (<button id="btn-inscribir" type="button" className="text-light border border-warning bg-dark mr-md-3 btn btn-danger disabled">Finalizado</button>)

            }
          </div>
          <div className="body-details">
          <NavTabsEvento fecha_inic={evento.fecha_inic} fecha_fin={evento.fecha_fin} hora_inic={evento.hora_inic} hora_fin={evento.hora_fin} precio={evento.precio} descripcion={evento.descripcion} ubicacion={localizacion.localizacion} display={""} eventoId={evento.eventoId} usuarioId={JSON.parse(localStorage.getItem('user')).usuarioId}/>
          <hr />
                

        </div>

        </div>
      </>
    )
}

export default CuerpoDetalles;