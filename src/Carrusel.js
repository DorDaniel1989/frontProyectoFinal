
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {React, useEffect, useState } from "react";
import imagen1 from "./concierto.png"
const handleDragStart = (e) => e.preventDefault();

const Gallery = () => {

   
    const [eventos, setEventos] = useState([])
    const imagen=new Image();
    var items=[];
    useEffect(() => {

      fetch('https://localhost:5001/api/Usuario/9')
        .then((response) => {
          return response.json()
        })
        .then((usuario) => {
        //   setEventos(usuario)
          imagen.src= usuario.imagen;
          console.log(typeof(imagen.src))
          items = [
            <img src={imagen.src} onDragStart={handleDragStart} role="presentation" />,
          
            
          ];
        })
    }) 
   
   

  return (
    <AliceCarousel mouseTracking items={items} />
  );
}

export default Gallery;