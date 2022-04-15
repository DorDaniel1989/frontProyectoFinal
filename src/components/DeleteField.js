import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import Tabs from "./Tabs";


export default function DeleteField(props) {

    const [tablaData , getRegistros] = useState([])
 

    useEffect(()=>{
        obtenerDatos()
    } ,[])
   

    const obtenerDatos = async() =>{
        const data =  await fetch(`http://localhost:5000/api/${props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}`);
        const tabla = await data.json()
        getRegistros(tabla)
        
      }
     

    
   }