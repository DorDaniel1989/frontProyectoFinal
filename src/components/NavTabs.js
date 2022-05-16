import { useState } from "react";
import { useParams } from 'react-router-dom';
import ComentariosUser from "./ComentariosUser";
import EventosUser from "./EventosUser";
import EventIcon from '@mui/icons-material/Event';
import CommentIcon from '@mui/icons-material/Comment';
import '../styles/NavTabs.sass';

function NavTabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const { Id } = useParams();


  return (
    <div id="container-pestanas" className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <EventIcon/>
          Mis Eventos 
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <CommentIcon/>
          Mis comentarios
        </button>
      
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <EventosUser user = {Id} />
          
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <ComentariosUser />
        </div>
        <div
          id="ajustes-preferencias"
        >
          
        </div>
      </div>
    </div>
  );
}

export default NavTabs;