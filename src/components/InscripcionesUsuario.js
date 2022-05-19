
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import axios from 'axios';

function InscripcionesUsuario() {

    const [inscripciones, setInscripciones] = useState([])
    const { Id } = useParams();

    useEffect(() => {
        obtenerDatos()

    }, [])

    const obtenerDatos = async () => {
        const data = await fetch(`http://localhost:5000/api/Inscripcion/Usuario/${Id}`);
        const inscripciones = await data.json()
        setInscripciones(inscripciones)
        $('.tMisInscripciones').DataTable()
    }

    async function  EliminarInscripcion(Id){
        console.log(Id)
        const response = await axios.delete(` https://localhost:5001/api/Inscripcion/${Id}`);
        console.log(response)
        obtenerDatos()
        
    
    }

    return (

        <div className="container">
                                                                                      
          

            <table className="tMisInscripciones" onLoad={obtenerDatos}>
       
                <thead>
                    <tr>
                        <th></th>
                        <th>EVENTO</th>
                        <th>FECHA/HORA</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        inscripciones.map(item => (
                            <tr key={item.inscripcionId}>
                                <td><button onClick={()=>EliminarInscripcion(item.s.inscripcionId)} className="btn btn-danger"> Eliminar</button></td>
                                <td>{item.evento}</td>
                              
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}

export default InscripcionesUsuario;