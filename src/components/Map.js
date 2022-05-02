

import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import '../styles/miCss.css';





function Map() {


    const [localizacion, setLocalizacion] = useState([])
    const { Id } = useParams();



    useEffect(() => {

        obtenerDatos()

    }, [])


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

                    <MapContainer center={[item.latitud, item.longitud]} zoom={8} scrollWheelZoom={false} key={item}>
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