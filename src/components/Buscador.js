import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import TextField from "@mui/material/TextField";
import "../styles/buscador.sass";
import List from "./ListaEventos";


function Buscador(){

  const [inputText, setInputText] = useState("");
  
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);

    if(lowerCase != null && lowerCase != ''){
      
      $("#uListEvt").not("#lNoResult").removeClass('d-none');
      
    }else{
      $("#uListEvt").addClass('d-none');
      $("#lNoResult").removeClass('d-none');
    }
  };

return (
    <div className="main">
      <div className="search" id="tBuscador">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="standard"
          fullWidth
          label="Buscar"
        />
        <div id="dSearchRes">
          <List input={inputText} />
        </div>
      </div>
    </div>
);

}

export default Buscador;