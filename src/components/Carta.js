
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
import imagen from "../imagenes/maluma.png";

export default function Carta(props) {
  

 const ruta = "/details/"+props.eventoId;
 
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 450 ,minHeight:450, marginTop :2}}>
      <CardHeader
     
        action={
          <IconButton aria-label="settings">
            <LocalActivityIcon />
          </IconButton>
        }
        title={props.titulo}
       
        subheader={props.fecha}
      />
      <CardMedia
        component="img"
        height="200"
        image={imagen}
        alt="Imagen evento"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {props.descripcion}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="settings">
            <LocalActivityIcon />
        </IconButton>
        <Link href={ruta}>
        Ver
        </Link>
        
      </CardActions>
     
    </Card>
  );
}