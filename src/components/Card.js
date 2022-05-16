import * as React from 'react';
import imagen from "../imagenes/marcanthony.png";
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../styles/cards.sass';

export default function Carta(props) {


  const ruta = "/details/" + props.eventoId;


  return (

    <div className='card cardP ' key={props.titulo} >

      <h2 className='tituloCard'>{props.titulo}</h2>
      <Button className='boton-entrar border border-warning bg-transparent' href={ruta}><VisibilityIcon />ENTRAR</Button>
     
      <img height={180} src={imagen} />
        <p>{props.fecha}</p>
       
  
     

    </div>
  )
}