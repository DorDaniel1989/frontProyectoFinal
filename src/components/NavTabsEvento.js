import { useState } from "react";
import { useParams } from 'react-router-dom';
import ComentariosVisitUser from "./ComentariosVisitUser"; 
import EventosVisitUser from "./EventosVisitUser";
import '../styles/NavTabs.sass';
import TextArea from "./TextArea";
import Comentarios from "./Comentarios";
import Map from "./Map";


function NavTabsEvento(props) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const { Id } = useParams();



  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Comentarios
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
       
          Ubicación
        </button>

        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
       
          Detalles
        </button>
       
       
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
        
          <hr />

          <TextArea display={props.display} eventoId={props.eventoId} categoriaId={props.categoriaId} usuarioId= {props.usuarioId}  />
          <Comentarios/>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
         
          <h3>{props.ubicacion}</h3>
          <hr />
          <Map />
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>{props.descripcion}</h2>
         <div className="texto-pestaña-detalles">
         
          <h3>Precio : {props.precio}</h3>
          <h4>Hora de inicio : {props.hora_inic}</h4>
          <h4>Hasta : {props.hora_fin}</h4>
          <h4>Fecha comienzo : {props.fecha_inic}</h4>
          <h4>Fecha fin : {props.fecha_fin}</h4>
         </div>
         
          <hr />
        
        </div>

      </div>
    </div>
  );
}

export default NavTabsEvento;