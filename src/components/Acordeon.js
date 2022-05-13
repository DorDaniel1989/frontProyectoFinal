import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import Tabs from "./Tabs";



function Acordeon(){



 useEffect(()=>{
    $( "#dTablas" ).accordion({
        collapsible: true,
        active: false 
      })
},[]);

const tabs =  [{name:'Usuarios'}, {name: 'Inscripciones'} , {name: 'Eventos'}, {name: 'Comentarios'}, {name: 'Categorías'}, {name: 'Localizaciones'}];

function toggleDataTable(elem){
    $( ".formsAPI" ).not(`#${elem}`).addClass( "d-none" );
    $(`#${elem}`).toggleClass( "d-none" );
}

    return (

    <>

        <div id="dTablas" className="container border border-dark rounded-2 bg-dark">
                {
                tabs.map(tabla => (
                    
                    <>
                        <h3 className={tabla.name.normalize('NFD').replace(/[\u0300-\u036f]/g,"")+'Tab'} onClick={() => { toggleDataTable('show'+ tabla.name.normalize('NFD').replace(/[\u0300-\u036f]/g,"")) }}>{tabla.name}</h3>
                        <div>
                            <Tabs tab={tabla.name}/>
                        </div>
                    </>
    
                ))
                }
        </div>
                
            


    </>
    )
}

export default Acordeon;