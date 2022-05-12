import {useRef} from "react";
import React, {Component, useEffect, useState } from "react";
import Buscador from '../components/Buscador';
import Menu from '../components/Menu';
import Cartas from "../components/Cartas";
import Carrusel from "../components/Carrusel";
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

  console.log(masHypeados);
  return (
   <>
    <Menu/>
    <Buscador/>
      <div className="carousel-outer">
        <Carrusel>

        {
            masHypeados.map((tupla) => {
              return (<Card titulo={tupla.evento} descripcion={tupla.descripcion} imagen={tupla.imagen} eventoId={tupla.eventoId} fecha={tupla.fecha_inic} />)
            })
            
        }

        </Carrusel>
      </div>
    <Cartas/>
   </>
   
  );}


export default Home;
