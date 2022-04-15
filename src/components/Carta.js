
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
       
        subheader="September 14, 2016"
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="settings">
            <LocalActivityIcon />
          </IconButton>
        <Link href={ruta} variant="body2">
        Ir a detalle
        </Link>
        
      </CardActions>
     
    </Card>
  );
}