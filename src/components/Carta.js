import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import imagen from "../imagenes/maluma.png";
import { CardActionArea, Button } from '@mui/material';

export default function Carta(props) {


  const ruta = "/details/" + props.eventoId;

  return (

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imagen}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.titulo}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.fecha}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.descripcion}
          </Typography>
        </CardContent>
        <Button href={ruta} size="big" color="primary">
          VER
        </Button>
      </CardActionArea>
    </Card>

  );
}