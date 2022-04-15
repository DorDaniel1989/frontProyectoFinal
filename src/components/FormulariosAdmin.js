import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import Tabs from "./Tabs";
import ShowTableContent from "./ShowTableContent";
import DeleteField from "./DeleteField";



function Acordeon(){



 useEffect(()=>{
    $( "#dTablas" ).accordion({
        collapsible: true
      })
},[]);

const tabs =  [{name:'Usuarios'}, {name: 'Inscripciones'} , {name: 'Eventos'}, {name: 'Comentarios'}, {name: 'Categorías'}, {name: 'Localizaciones'}];

    return (

     <>
        {
            tabs.map(tabla => (
                    
                <>
                    <ShowTableContent tab = {tabla.name}/>
                </>
    
            ))
        }
     </>
    )
}

export default Acordeon;