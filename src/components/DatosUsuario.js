
import React from "react";
import FormularioEditarUsuario from "../components/FormularioEditarUsuario";

function DatosUsuario(props) {

  return (
    <div className='container-datos'>
        
      <FormularioEditarUsuario tablaData={props.tablaData} setTablaData={props.setTablaData}/>

      </div>

  )
}

export default DatosUsuario;