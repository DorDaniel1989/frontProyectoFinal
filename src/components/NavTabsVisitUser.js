import { useState } from "react";
import { useParams } from 'react-router-dom';
import ComentariosVisitUser from "./ComentariosVisitUser"; 
import EventosVisitUser from "./EventosVisitUser";
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
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <EventIcon/>
          Eventos a los que asistirá
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
       <CommentIcon/>
           Comentarios del usuario
        </button>
       
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <EventosVisitUser user = {Id} />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
      
          <hr />
          <ComentariosVisitUser />
        </div>

      </div>
    </div>
  );
}

export default NavTabs;