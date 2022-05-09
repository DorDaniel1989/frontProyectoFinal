import React,{useState, useEffect} from "react";
import Carta from "./Carta";
import Card from "./Card";
import '../styles/cartas.css';

import Carousel from 'react-grid-carousel'

function Cartas(){

 const [cards , setCards] = useState([])
 
 
 useEffect(()=>{
     obtenerDatos()
 } ,[])

 const obtenerDatos = async() =>{
   const data =  await fetch('http://localhost:5000/api/Evento');
   const eventos = await data.json()
   setCards(eventos)

 }

    return (
     <div className="container-cartas">

     <h1 className="titoloEventos">dasdasdasd</h1>
          
          
            {
                cards.map(item => (
                   
                     <Card titulo={item.evento} descripcion={item.descripcion} imagen={item.imagen} eventoId={item.eventoId} fecha={item.fecha_inic}/>
                        
                ))
            }
    
     </div>
    )
}

export default Cartas;