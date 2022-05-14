import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import ShowTableContent from "./ShowTableContent";
import FormData from "./FormData";
import DeleteField from "./DeleteField";



function Acordeon(){

    const [tablaUsuario , setTablaUsuario] = useState([])
    const [tablaInscripciones , setTablaInscripciones] = useState([])
    const [tablaEventos , setTablaEventos] = useState([])
    const [tablaComentarios , setTablaComentarios] = useState([])
    const [tablaCategorias , setTablaCategorias] = useState([])
    const [tablaLocalizaciones , setTablaLocalizaciones] = useState([])

 useEffect(()=>{
    $( "#dTablas" ).accordion({
        collapsible: true
      })

},[]);

const tabs =  [{name:'Usuarios', table: tablaUsuario, setTable: setTablaUsuario}, {name: 'Inscripciones', table: tablaInscripciones, setTable: setTablaInscripciones} , {name: 'Eventos', table: tablaEventos, setTable: setTablaEventos}, {name: 'Comentarios', table: tablaComentarios, setTable: setTablaComentarios}, {name: 'Categorías', table: tablaCategorias, setTable: setTablaCategorias}, {name: 'Localizaciones', table: tablaLocalizaciones, setTable: setTablaLocalizaciones}];

const endPointName = [
    ['Usuario'],
    ['Inscripcion'], 
    ['Evento'], 
    ['Comentario'], 
    ['Categoria'], 
    ['Localizacion']
];

var whichTabla

useEffect(()=>{
    tabs.map(tabla =>{

        whichTabla = tabs.findIndex(t => {return tabla.name === t.name;});
    
        const obtenerDatos = async() =>{
    
            const data =  await fetch(`http://localhost:5000/api/${endPointName[whichTabla]}`);
            const tablaData = await data.json().then(tablaData => {
                tabla.setTable(tablaData)
                
            })
            
            
            
          }
        
          obtenerDatos()
          
    
    })
      
},[]);


    return (

     <>
        {
            tabs.map(tabla => (
                <>
                    <div className="d-none formsAPI showTable container-fluid" id={'show'+ tabla.name.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>
                        <ShowTableContent tab = {tabla.name} tablaData = {tabla.table} setTablaData = {tabla.setTable}/>
                    </div>  

                    <div className="formularios container-fluid">
                        <div className="d-none formsAPI" id={'create'+ tabla.name.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>
                            <FormData method = {'POST'} tab = {tabla.name} tablaData = {tabla.table} setTablaData = {tabla.setTable}/>
                        </div>

                        <div className="d-none formsAPI" id={'modify'+ tabla.name.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>
                            <FormData method = {'PUT'} tab = {tabla.name} tablaData = {tabla.table} setTablaData = {tabla.setTable}/>   
                        </div>

                        <div className="d-none formsAPI" id={'delete'+ tabla.name.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>
                            <DeleteField tab = {tabla.name} tablaData = {tabla.table} setTablaData = {tabla.setTable}/>
                        </div>
                    </div>
                </>
    
            ))
        }
     </>
    )
}

export default Acordeon;