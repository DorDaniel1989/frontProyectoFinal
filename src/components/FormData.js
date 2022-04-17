import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import axios from 'axios';



export default function FormData(props) {
 
    const tabs =  [{name:'Usuarios'}, {name: 'Inscripciones'} , {name: 'Eventos'}, {name: 'Comentarios'}, {name: 'Categorías'}, {name: 'Localizaciones'}];

    

    const endPointName = [
        ['Usuario'],
        ['Inscripcion'], 
        ['Evento'], 
        ['Comentario'], 
        ['Categoria'], 
        ['Localizacion']
    ];

    const endPointNameButton = [
        ['usuario'],
        ['inscripción'], 
        ['evento'], 
        ['comentario'], 
        ['categoría'], 
        ['localización']
    ];

    const fieldType = [
        [
            {
            username: "text",
            password: "text",
            email: "email",
            administrator: 'checkbox',
            nombre: "text",
            apellido: "text",
            direccion: "text",
            telefono: "tel",
            imagen: "image"
          }],
        [
            {
            usuarioId: "number",
            eventoId: "number",
            valoracion: "number"
          }], 
        [
            {
            evento: "text",
            imagen: "image",
            fecha_inic: "date",
            fecha_fin: "date",
            hora_inic: "time",
            hora_fin: "time",
            localizacionId: "number",
            descripcion: "text",
            aforo_max: "number",
            popularidad: "number",
            precio: "number",
            categoriaId: "number"
          }], 
        [
            {
            comentario_text: "text",
            eventoId: "number",
            categoriaId: "number",
            usuarioId: "number",
            fecha_comentario: "date"
          }], 
        [
            {
            categoria: "text",
            descripcion_categoria: "text"
          }], 
        [
            {
            localizacion: "text",
            latitud: "text",
            longitud: "text"
          }]
    ];

    const firstData = props.tablaData.slice(0, 1);
    
    const campos = [];

    firstData.map((tupla) => {
        Object.entries(tupla).map(([key, value]) => {
            
            campos.push(key);
        })
        })

    var whichTabla = tabs.findIndex(t => {return t.name === props.tab;});

    useEffect(()=>{
        obtenerDatos();
        
    } ,[])


    const obtenerDatos = async() =>{
        
        const data =  await fetch(`http://localhost:5000/api/${endPointName[whichTabla]}`);
        const tabla = await data.json()
        props.setTablaData(tabla)
        
      }

      //console.log(fieldType[whichTabla][0])

      return (
        <>
            <form method="POST" id={'Form' + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>
            {
                fieldType[whichTabla].map(campo => (
                    Object.entries(campo).map(([key, value]) => (
                    <>
                        <label for={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>{key}:</label><br/>
                        <input type={value} id={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} name={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}></input><br/>
                    </>
                        
                    ))
                    
                ))
                
            }
            <div className="row">
                <input id={'bPost' + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} onClick={() => console.log('uwu')} className="btn" value={'Añadir ' + (endPointNameButton[whichTabla]) }/>
            </div>
            </form>
        </>
      );

   }