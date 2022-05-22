import React, { useEffect, useState } from "react";
import imagen from "../imagenes/marcanthony.png";
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "jquery-ui-dist/jquery-ui";
import $ from 'jquery';
import '../styles/cards.sass';



export default function Carta(props) {


  const ruta = "/details/" + props.eventoId;
  let precioParseao;
  (props.precio == 0) ? precioParseao = "GRATIS!" : precioParseao = props.precio + "€"

  const [idCarta, setIdCarta] = useState([])


  useEffect(() => {
    convertirImagen()
  }, [])

  
  function convertirImagen() {


  let cssCustomId=setIds(props.listado)+"card-"+props.eventoId
 
  setIdCarta(cssCustomId)

    let imagenf = document.getElementById(cssCustomId);
    try {
    
      imagenf.style.backgroundImage = `url('${props.imagen}')`;
      console.log("imagen F" + imagenf + "    "  + props.titulo)
      console.log("Background image " +imagenf.style.backgroundImage)
    

    } catch (e) {}

  }


  function setIds(tipoListado){

    let idListado="";

    switch (tipoListado) {
      case "hype": idListado = "hype-" 
      break;
      case "ultimos": idListado = "ultimos-" 
      break;
      case "conciertos": idListado = "conciertos-" 
      break;
      case "otaku": idListado = "otaku-" 
      break;
      case "gastronomia": idListado = "gastronomia-"
      break;
      case "gaming": idListado = "gaming-" 
      break;
      case "it": idListado = "it-" 
      break;
      default:  idListado =""
      break;
  }
       return idListado;
  }




  return (
    <>

      <div  className='card' key={props.titulo} >

        <div onLoad={convertirImagen} id={idCarta} className='fondo-card-wrapper' >

            <div className="dBackFilter">
              <div className="img-wrapper">
                <img height={180} src={props.imagen} />
              </div>

              <div className='btn-wrapper'>
                <Button className='boton-entrar border border-warning bg-dark' href={ruta}><VisibilityIcon />ENTRAR</Button>
              </div>
            </div>

        </div>

        <div className='detalles-wrapper'>

            <h3 className='tituloCard'>{props.titulo}</h3>
            <p>{props.localizacion}</p>
            <p>{props.fecha}</p>
          
        </div>

        <div className='precio-wrapper'>

            <p>{precioParseao}</p>

        </div>


      </div>
      
      </>
  )
}