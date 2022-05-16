import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from '@mui/material';
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";

function ListaEventos(props) {

    const [data, setData] = useState([]);

    useEffect( () => { 
        async function fetchData() {
            let res = await axios.get(`http://localhost:5000/api/Evento`)
            .catch(function (error) {
                alert('Error!!! ->\n' + error)                
            });

            setData(res.data);
        }
        fetchData();
    }, []);


    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.evento.toLowerCase().includes(props.input)
        }
    })

    $(window).click(function() {
        $("#uListEvt").addClass('d-none');
    });

    $( "#tBuscador" ).click(function(event) {
        if(props.input != null && props.input != ''){
            $("#uListEvt").removeClass('d-none');
            event.stopPropagation();
        } 
    });

    $( "#uListEvt" ).click(function(event) {
        event.stopPropagation();
    });
    

    return (
        <ul className='d-none' id='uListEvt'>
            <li id='lNoResult' className='d-none'><a>No se encontraron resultados...</a></li>
            {filteredData.map((event) => (
                <>
                    <li key={event.eventoId}><a href= {'/details/' + event.eventoId}>{event.evento}</a></li>
                 
                </>
            ))}
        </ul>
    )
}

export default ListaEventos
