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

        if ($(this).find('input').val()){
            if (filteredData.length > 0) {
                $("#uListEvt").not('#lNoResult').removeClass('d-none');
                event.stopPropagation();
            } 
        }
    });

    $("#tBuscador").find('input').keyup(function (event) {
        if (filteredData.length > 0) {
            $('#lNoResult').addClass('d-none')
        } else{
            $('#lNoResult').removeClass('d-none')
        }
    });

    $( "#uListEvt" ).click(function(event) {
        event.stopPropagation();
    });

    return (
        <ul className='d-none' id='uListEvt'>
            {filteredData.map((event) => (
                <>
                    <li key={event.eventoId}><a href= {'/details/' + event.eventoId}>{event.evento}</a></li>
                 
                </>
            ))}
            <li id='lNoResult' className='d-none'><a>No se encontraron resultados...</a></li>
        </ul>
    )
}

export default ListaEventos
