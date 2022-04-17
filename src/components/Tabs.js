import React,{useState, useEffect} from "react";
import $ from 'jquery';
import attr from 'jquery/src/attributes';
import "jquery-ui-dist/jquery-ui";




export default function Tabs(props) {
    useEffect(()=>{
        
    },[]);

    function toggleOption(elem){
        $( ".formsAPI" ).addClass( "d-none" );
        $(`#${elem}`).toggleClass( "d-none" );
    }
 
    return (
        <div className="dTabs">
        <ul>
            <li><a href={'#create'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} onClick={() => { toggleOption('create'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")) }}>Añadir {props.tab}</a></li>
            <li><a href={'#modify'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} onClick={() => { toggleOption('modify'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")) }}>Modificar {props.tab}</a></li>
            <li><a href={'#delete'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} onClick={() => { toggleOption('delete'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")) }}>Eliminar {props.tab}</a></li>

        </ul>
        </div>
    );

  }