import React, { useEffect, useState } from "react";
import imagen from "../imagenes/marcanthony.png";
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../styles/cards.sass';


export default function Carta(props) {


  const ruta = "/details/" + props.eventoId;
  let precioParseao;
  (props.precio == 0) ? precioParseao = "GRATIS!" : precioParseao = props.precio + "€"




  async function convertirImagen() {

   const cssId='card-'+props.eventoId

    const imagenf = document.getElementById(cssId);
    try {
      console.log("evento " + props.titulo + " imagen " + props.imagen)
      imagenf.style.backgroundImage = `url(${props.imagen})`;
      console.log("imagen F" + imagenf)
    } catch (e) {}

  }

  useEffect(() => {
    convertirImagen()
  }, [])


  return (

    <div className='card' key={props.titulo} >

      <div id={'card-'+props.eventoId} className='fondo-card-wrapper'>

          <div className="img-wrapper">
            <img height={180} src={props.imagen} />
          </div>

          <div className='btn-wrapper'>
            <Button className='boton-entrar border border-warning bg-transparent' href={ruta}><VisibilityIcon />ENTRAR</Button>
          </div>

      </div>

      <div className='detalles-wrapper'>

          <h3 className='tituloCard'>{props.titulo}</h3>
          <p>LUGAR</p>
          <p>{props.fecha}</p>
        
      </div>

      <div className='precio-wrapper'>

           <p>{precioParseao}</p>

      </div>


    </div>
  )
}