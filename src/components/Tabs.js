import React,{useState, useEffect} from "react";
import $ from 'jquery';
import attr from 'jquery/src/attributes';
import ShowTableContent from "./ShowTableContent";
import "jquery-ui-dist/jquery-ui";




export default function Tabs(props) {
    useEffect(()=>{
        
    },[]);

    function toggleOption(elem, datatable){
        $( ".formsAPI" ).not(`#${elem}`).addClass( "d-none" );
        $(`#${elem}`).toggleClass( "d-none" );
        $(`#${datatable}`).removeClass( "d-none" );
        console.log('elemento: ' + elem);
        console.log('datatable: ' + datatable);
    }
 
    return (
        <div className="dTabs">
        <ul>
            <li><a href={'#create'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} onClick={() => { toggleOption('create'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,""), 'show'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")) }}>Añadir {props.tab}</a></li>
            <li><a href={'#modify'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} onClick={() => { toggleOption('modify'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,""), 'show'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")) }}>Modificar {props.tab}</a></li>
            <li><a href={'#delete'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} onClick={() => { toggleOption('delete'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,""), 'show'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")) }}>Eliminar {props.tab}</a></li>

        </ul>
        </div>
    );

  }