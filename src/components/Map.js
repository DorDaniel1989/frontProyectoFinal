

import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "jquery-ui-dist/jquery-ui";
import 'leaflet/dist/leaflet.css';
import '../styles/mapa.sass';
import $ from 'jquery';

function Map() {


    const [localizacion, setLocalizacion] = useState([])
    const { Id } = useParams();

    useEffect(() => {

        obtenerDatos()

    }, [])

    //arregla bug del mapa mostrandose en gris

    $('.bloc-tabs').find('.tabs').eq(1).click(function() {
        window.dispatchEvent(new Event('resize'));
      });


    const obtenerDatos = async () => {

        const locData = await fetch(`http://localhost:5000/api/Localizacion/evento/${Id}`);
        console.log(`http://localhost:5000/api/Localizacion/evento/${Id}`)
        let localizacion = await locData.json()
        //Hay que parsear los valores para poder pasarselos al mapa
        var latitud = parseFloat((localizacion[0].latitud).toString().substring(0, 9))
        var longitud = parseFloat((localizacion[0].longitud).toString().substring(0, 9))
        localizacion[0].latitud = latitud;
        localizacion[0].longitud = longitud;
        setLocalizacion(localizacion)

    }

    return (

        <>
            {
                localizacion.map(item => (

                    <MapContainer center={[item.latitud, item.longitud]} zoom={8} scrollWheelZoom={true} key={item}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[item.latitud, item.longitud]}>
                            <Popup>
                                {localizacion[0].localizacion}
                            </Popup>
                        </Marker>
                    </MapContainer>
                ))
            }

        </>

    )
}

export default Map;