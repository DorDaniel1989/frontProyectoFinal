import React,{useState, useEffect} from "react";
import Carta from "./Carta";
import '../styles/cartas.css';


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
       
            {
                cards.map(item => (
                   
                        <div className="col-4" key={item.eventoId}>
                            <Carta titulo={item.evento} descripcion={item.descripcion} imagen={item.imagen} eventoId={item.eventoId} fecha={item.fecha_inic}/>
                        </div>
                        
                ))

            }


     </div>

    )
}

export default Cartas;