import React, { useEffect, useState } from "react";
import axios from 'axios'
import Cookies from "universal-cookie";
import '../styles/miCss.css';
import obtenerDatos from "./CuerpoPerfil.js";


function TextArea(props) {

   // const cookies = new Cookies();

    function capturarComentario(){
      return  document.getElementById('textarea').value ;
    }

    function obtenerFecha(){
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       
        if(month<10){
          month="0"+ month
        }
        if(day<10){
          day="0"+ day
        }

        return day + "/" + month + "/" + year;
    }

    function crearPostBody(){

        return {
            "comentario_text" : capturarComentario(),
            "eventoId": props.eventoId,
            "categoriaId" : props.categoriaId,
            "usuarioId": "cookies.get('user').usuarioId",
            "fecha_comentario" : obtenerFecha(),
           

        }
    }

    function PostComentario(){
       var data = crearPostBody()
       console.log(data)
        axios.post('http://localhost:5000/api/Comentario',  data)
        window.location.reload();
     
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