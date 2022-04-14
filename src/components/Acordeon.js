import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import Tabs from "./Tabs";



function Acordeon(){



 useEffect(()=>{
    $( "#dTablas" ).accordion({
        collapsible: true
      })
},[]);

const tabs =  [{name:'Usuarios'}, {name: 'Inscripciones'} , {name: 'Eventos'}, {name: 'Comentarios'}, {name: 'Categorías'}, {name: 'Localizaciones'}];

    return (

     <div className="container">

        <div id="dTablas">
                {
                tabs.map(tabla => (
                    
                    <>
                        <h3>{tabla.name}</h3>
                        <div>
                            <Tabs tab={tabla.name}/>
                        </div>
                    </>
    
                ))
                }
        </div>
                
            


     </div>
    )
}

export default Acordeon;