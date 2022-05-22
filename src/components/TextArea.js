import React, { useEffect, useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import '../styles/TextArea.sass';


function TextArea(props) {

  const navigate = useNavigate();

  const ruta = "/details/"+ props.eventoId;


  console.log(ruta)

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
            "usuarioId": props.usuarioId,
            "fecha_comentario" : obtenerFecha(),
            "hora_comentario" : obtenerHora()

        }
    }

    const PostComentario = async() =>{
        var data = crearPostBody()
        await axios.post('http://localhost:5000/api/Comentario',  data)

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          iconColor:"#39FF1A" ,
          title: 'Tu comentario fue añadido!',
          showConfirmButton: false,
          color: "#cb990f",
          background: "linear-gradient(360deg, #000000d0, transparent)",
          timer: 1500
        }).then(
          
          obtenerDatos()
          
        )
       
      
        
    }

    const obtenerDatos = async () => {


      const comData = await fetch(`http://localhost:5000/api/Comentario/evento/${props.eventoId}`);
      const comentarios = await comData.json()
      props.setTabla(comentarios)

  }

  return (
    <div className="comment-container d-flex row justify-content-center">
      <form className="fTextArea">
      
        <div className="form-group d-flex row justify-content-center">
          
          <textarea className="form-control" id="textarea" rows="3"></textarea>
        </div>

        {(props.display) != "disabled" ? 
          (<a><button onClick={PostComentario} type="button" className={"text-light border border-warning bg-dark btn btn-danger btn-añadir-comentario " + props.display} >Añadir comentario</button></a>) : 
          (<a><button type="button" className={"text-light border border-warning bg-dark btn btn-danger btn-añadir-comentario " + props.display} >Añadir comentario</button></a>)
        }

      </form>
      </div>
  );
}

export default TextArea;