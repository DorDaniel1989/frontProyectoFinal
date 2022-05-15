import * as React from 'react';
import imagen from "../imagenes/marcanthony.png";
import { Button } from '@mui/material';
import '../styles/cards.sass';

export default function Carta(props) {


  const ruta = "/details/" + props.eventoId;
  

  return (

      <div className='card cardP ' key={props.titulo} >
          <h2>{props.titulo}</h2>
          <p>{props.fecha}</p>
          <p>{props.descripcion}</p>
          <img height={200} src={imagen}/>
          
          <Button className='boton-entrar border border-warning bg-transparent' href= {ruta}>ENTRAR</Button>
        
 </div> 
  )
}