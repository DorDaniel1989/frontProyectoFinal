

import {useRef} from "react";
import {Link, BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios'

import '../styles/miCss.css';

function TextArea(props) {


    function capturarComentario(){
      return  document.getElementById('textarea').value ;
    }

    function obtenerFecha(){
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       
        return day + "/" + month + "/" + year;
    }

    function crearPostBody(){

        return {
            "comentario_text" : capturarComentario(),
            "eventoId": props.eventoId,
            "categoriaId" : props.categoriaId,
            "usuarioId": "1",
            "fecha_comentario" : obtenerFecha(),
           

        }
    }

    function PostComentario(){
       var data = crearPostBody()
       console.log(data)
        axios.post('http://localhost:5000/api/Comentario',  data)
    }

  return (

      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
          <textarea className="form-control" id="textarea" rows="3"></textarea>
        </div>
       
        <a><button onClick={PostComentario} type="button" className="btn btn-primary" >Añadir comentario</button></a>

      </form>
      
  
  );
}

export default TextArea;