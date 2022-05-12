import {useRef} from "react";
import React, {Component, useEffect, useState } from "react";
import Buscador from '../components/Buscador';
import Menu from '../components/Menu';
import Cartas from "../components/Cartas";
import Carrusel from "../components/Carrusel";
import AliceCarousel from 'react-alice-carousel';
import Card from "../components/Card";
import '../styles/miCss.css';

import { render } from "@testing-library/react";

function Home() {

  const [eventos, setEventos] = useState([])


  useEffect(() => {
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {
    const data = await fetch('http://localhost:5000/api/Evento');
    const eventos = await data.json()
    setEventos(eventos)

  }

  let orderHypeados = eventos.sort((a, b) => (b.popularidad > a.popularidad) ? 1 : -1);

  let masHypeados = orderHypeados.slice(0, 8);

  const responsive = {
    0: { items: 1 },
    820: { items: 2 },
    1220: { items: 3 },
    1624: { items: 4 }
  };

  return (
   <>
    <Menu/>
    <Buscador/>
      <div className="carousel-outer">

        <AliceCarousel infinite = {true} autoPlay autoPlayInterval="3000" responsive={responsive}>
        {
            masHypeados.map((tupla) => {
              return (<Card titulo={tupla.evento} descripcion={tupla.descripcion} imagen={tupla.imagen} eventoId={tupla.eventoId} fecha={tupla.fecha_inic} />)
            })
            
        }
    </AliceCarousel>

        

      </div>
    <Cartas/>
   </>
   
  );}


export default Home;
