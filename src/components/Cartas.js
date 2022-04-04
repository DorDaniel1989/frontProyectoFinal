import React,{useState, useEffect} from "react";
import Carta from "./Carta";




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
     <div className="container">
       
            {
                cards.map(item => (
                   <div className="row">
                        <div className="col-6" key={item.eventoId}>
                            <Carta title={item.evento} descripcion={item.descripcion}/>
                        </div>
                    </div>
                ))
            }


     </div>

    )
}

export default Cartas;