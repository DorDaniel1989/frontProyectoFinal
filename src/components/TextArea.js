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
       
        if(month < 10){
          month="0"+ month
        }
        if(day < 10){
          day="0"+ day
        }

        return day + "/" + month + "/" + year;
    }


    function obtenerHora(){

      var dateObj = new Date();
      var hour = dateObj.getHours();
      var minutes = dateObj.getMinutes();


      if(hour < 10){
        hour="0"+ hour
      }
      if(minutes < 10){
        minutes="0"+ minutes
      }

      return hour + ":" + minutes ;

    }

    function crearPostBody(){

        return {
            "comentario_text" : capturarComentario(),
            "eventoId": props.eventoId,
            "categoriaId" : props.categoriaId,
            "usuarioId": props.usuarioId,
            "fecha_comentario" : obtenerFecha(),
            "hora_comentario" : obtenerHora()

        }
    }

    const PostComentario = async() =>{
        var data = crearPostBody()
        await axios.post('http://localhost:5000/api/Comentario',  data)
        window.location.reload();
     
    }

  return (
    <div className="comments-container">
      <form>
      
        <div className="form-group">
          
          <textarea className="form-control" id="textarea" rows="3"></textarea>
        </div>
        <a><button onClick={PostComentario} type="button" className={"btn btn-primary "+props.display} >Añadir comentario</button></a>

      </form>
      </div>
  );
}

export default TextArea;