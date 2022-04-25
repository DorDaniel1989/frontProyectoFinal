
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
        console.log(inscripciones)
    }

    async function  EliminarInscripcion(Id){

        const response = await axios.delete(` https://localhost:5001/api/Inscripcion/${Id}`);
        console.log(response)
        obtenerDatos()
    
    }

    return (

        <div className="container">

            <h2>IDS DE EVENTOS INSCRIPCIONES DEL USUARIO</h2>

            <table className="tMisInscripciones" onLoad={$('.tMisInscripciones').DataTable()}>
                <thead>
                    <tr>
                        <th>Seleccionar</th>
                        <th>Inscripcion Id</th>
                        <th>Evento Id</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        inscripciones.map(item => (
                            <tr key={item.inscripcionId}>
                                <td><button onClick={()=>EliminarInscripcion(item.inscripcionId)} className="btn btn-warning"> Desapuntar</button></td>
                                <td>{item.inscripcionId}</td>
                                <td>{item.eventoId}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <input type="button"  value="Seleccion"/>
        </div>

    )
}

export default InscripcionesUsuario;