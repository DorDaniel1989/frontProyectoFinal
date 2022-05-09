import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import imagen from "../imagenes/marcanthony.png";
import { CardActionArea, Button } from '@mui/material';
import '../styles/cards.css';

export default function Carta(props) {


  const ruta = "/details/" + props.eventoId;

  return (

      <div className='card cardP ' key={props.titulo} >
          <h2>{props.titulo}</h2>
          <p>{props.fecha}</p>
          <p>{props.descripcion}</p>
          <img height={200} src={imagen}/>
       <Button href= {ruta}>VER</Button>
        
        
 </div> 
  )
}