import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";




export default function Tabs(props) {
    useEffect(()=>{
        $( "#dTabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
        $( "#dTabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
    },[]);
 
    return (
        <ul>
            <li><a href={'#create'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>Añadir {props.tab}</a></li>
            <li><a href={'#create'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>Modificar {props.tab}</a></li>
            <li><a href={'#create'+ props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>Eliminar {props.tab}</a></li>

        </ul>
    );

  }