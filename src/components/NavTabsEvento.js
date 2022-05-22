import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import '../styles/NavTabs.sass';
import '../styles/detailsEvent.sass';
import TextArea from "./TextArea";
import Comentarios from "./Comentarios";
import CommentIcon from '@mui/icons-material/Comment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import Map from "./Map";


function NavTabsEvento(props) {
  const [toggleState, setToggleState] = useState(1);
  
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const { Id } = useParams();

  const [comentarios, setComentarios] = useState([])

  useEffect(() => {
      obtenerDatos()

  }, [])


  const obtenerDatos = async () => {


      const comData = await fetch(`http://localhost:5000/api/Comentario/evento/${Id}`);
      const comentarios = await comData.json()
      setComentarios(comentarios)

  }



  return (
    <div  className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <CommentIcon/>
          Comentarios
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
       <LocationOnIcon/>
          Mapa
        </button>

        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
       <InfoIcon/>
          Detalles
        </button>
       
       
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content active-content" : "content"}>
        
          <TextArea display={props.display} eventoId={props.eventoId}  usuarioId= {props.usuarioId}  tabla={comentarios} setTabla={setComentarios} />

          <hr className="bg-white"/>

          <Comentarios tabla={comentarios} setTabla={setComentarios}/>
        </div>

        <div className={toggleState === 2 ? "content active-content" : "content"}>
          <div id="map">
            <Map />
          </div>
        </div>

        <div className={toggleState === 3 ? "content active-content" : "content"}>
          <div className="dEventDescription d-flex flex-column ps-2">
            <h2>¿De qué trata este evento?</h2>
            <p>{props.descripcion}</p>
          </div>

          <hr className="bg-white"/>

          <div className="texto-pestaña-detalles">
           <div className="dFechas dInfoEvento d-flex flex-column">
            <h5>Fecha del evento</h5>
            <p className="ps-3">{props.fecha_inic} - {props.fecha_fin}</p>
           </div>

           <div className="dHorarios dInfoEvento d-flex flex-column">
            <h4>Horarios</h4>
            <p className="ps-3">{props.hora_inic} - {props.hora_fin}</p>
           </div>

           <div className="dPrecios dInfoEvento d-flex flex-column">
            <h4 className="ms-auto">Precio entrada</h4>
            {(props.precio === '0') ? (<p className="pe-3 ms-auto">Gratis</p>) : (<p className="pe-3 ms-auto">{props.precio}€</p>)}
           </div>
          </div>

          <hr/>
        
        </div>

      </div>
    </div>
  );
}

export default NavTabsEvento;