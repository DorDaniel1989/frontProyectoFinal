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

    let activo = false;

    // recorremos para ver si hay alguna tabla activa

    $('.formsAPI').each(function(i, obj) {
        if(! obj.classList.contains("d-none")){
            activo = true;
        }
    });

    if(!activo){
        $('#dShowBackImage').addClass( "d-none" );
    }else{
        $('#dShowBackImage').removeClass( "d-none" );
    }

    $(`#${elem}`).toggleClass( "d-none" );
}

    return (

    <>

        <div id="dTablas" className="container border border-dark rounded-1">
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