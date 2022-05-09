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
  };

return (
    <div className="main">
      <div className="search" id="tBuscador">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List input={inputText} />
    </div>
);

}

export default Buscador;