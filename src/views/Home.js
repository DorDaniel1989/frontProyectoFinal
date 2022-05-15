import React, {Component, useEffect, useState } from "react";
import Buscador from '../components/Buscador';
import Menu from '../components/Menu';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";
import Card from "../components/Card";

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home() {

  const [eventos, setEventos] = useState([])
  
  
  useEffect(() => {
   
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {
    const data = await fetch('http://localhost:5000/api/Evento');
    const eventos = await data.json()
    setEventos(eventos)

  }

  //Hype data
  
  let orderHypeados = eventos.sort((a, b) => (b.popularidad > a.popularidad) ? 1 : -1);

  let masHypeados = orderHypeados.slice(0, 8);

  // Newest data

  let OrderNewestEvents = eventos.sort(function (a, b) {

    //transformando formato (source) -> https://stackoverflow.com/questions/33299687/how-to-convert-dd-mm-yyyy-string-into-javascript-date-object

    var datePartsA = (a.fecha_inic).split("/");

    var datePartsB = (b.fecha_inic).split("/");

    // tras la siguiente operación combrobaremos cuál fecha es más reciente en formato yyyy/mm/dd

    // cabe decir, una cosilla guay, y es que al poner + delante de la variable la parseamos a integer
    
    return new Date(+datePartsB[2], datePartsB[1] - 1, +datePartsB[0]) - new Date(+datePartsA[2], datePartsA[1] - 1, +datePartsA[0]);
  });

  let latestEvents = OrderNewestEvents.slice(0, 8);

  // conciertos

  var allConciertos = eventos.filter(obj => {
    return obj.categoriaId === 3
  })

    // filtramos los conciertos que estén activos mediante la filtración de la propiedad fecha_inic del objeto del array

  var activeConciertos = allConciertos.filter(({ fecha_inic }) => new Date(+(fecha_inic.split("/"))[2], (fecha_inic.split("/"))[1] - 1, +(fecha_inic.split("/"))[0]) > new Date());

  // otakus

  var allOtakus = eventos.filter(obj => {
    return obj.categoriaId === 5
  })

  var activeOtakus = allOtakus.filter(({ fecha_inic }) => new Date(+(fecha_inic.split("/"))[2], (fecha_inic.split("/"))[1] - 1, +(fecha_inic.split("/"))[0]) > new Date());

  // Gastronomía

  var allGastro = eventos.filter(obj => {
    return obj.categoriaId === 4
  })

  var activeGastro = allGastro.filter(({ fecha_inic }) => new Date(+(fecha_inic.split("/"))[2], (fecha_inic.split("/"))[1] - 1, +(fecha_inic.split("/"))[0]) > new Date());

  // Gaming

  var allGaming = eventos.filter(obj => {
    return obj.categoriaId === 2
  })

  var activeGaming = allGaming.filter(({ fecha_inic }) => new Date(+(fecha_inic.split("/"))[2], (fecha_inic.split("/"))[1] - 1, +(fecha_inic.split("/"))[0]) > new Date());

  // IT

  var allIT = eventos.filter(obj => {
    return obj.categoriaId === 1
  })

  var activeIT = allIT.filter(({ fecha_inic }) => new Date(+(fecha_inic.split("/"))[2], (fecha_inic.split("/"))[1] - 1, +(fecha_inic.split("/"))[0]) > new Date());


  return (
   <>
    <Menu/>
    <Buscador/>

        <h1>Los Más Hypeados</h1>     

        <Swiper
          initialSlide={0}
          //slidesPerView={3}
          //spaceBetween={30}
          //slidesPerGroup={3}
          centeredSlides={true}
        centeredSlidesBounds={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
              slidesPerGroup: 1
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
              slidesPerGroup: 2
            },
          }}
          //loop={true}
          //loopFillGroupWithBlank={true}
          rewind={true} /* solo se puede loop o rewind, los 2 a la vez no */
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          allowTouchMove={false}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {
            masHypeados.map((tupla) => {
              return (<SwiperSlide><Card titulo={tupla.evento} descripcion={tupla.descripcion} imagen={tupla.imagen} eventoId={tupla.eventoId} fecha={tupla.fecha_inic} /></SwiperSlide>)
            })
          }
      </Swiper>

      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}

      <h1>Últimos eventos</h1>

      <Swiper
        initialSlide={0}
        centeredSlides={true}
        centeredSlidesBounds={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup: 1
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
            slidesPerGroup: 2
          },
        }}
        rewind={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        allowTouchMove={false}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          latestEvents.map((tupla) => {
            return (<SwiperSlide><Card titulo={tupla.evento} descripcion={tupla.descripcion} imagen={tupla.imagen} eventoId={tupla.eventoId} fecha={tupla.fecha_inic} /></SwiperSlide>)
          })
        }
      </Swiper>

      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}

      <h1>Conciertos</h1>

      <Swiper
        initialSlide={0}
        centeredSlides={true}
        centeredSlidesBounds={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup: 1
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
            slidesPerGroup: 2
          },
        }}
        rewind={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        allowTouchMove={false}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          activeConciertos.map((tupla) => {
            return (<SwiperSlide><Card titulo={tupla.evento} descripcion={tupla.descripcion} imagen={tupla.imagen} eventoId={tupla.eventoId} fecha={tupla.fecha_inic} /></SwiperSlide>)
          })
        }
      </Swiper>

      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}

      <h1>Para los otakus</h1>

      <Swiper
        initialSlide={0}
        centeredSlides={true}
        centeredSlidesBounds={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup: 1
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
            slidesPerGroup: 2
          },
        }}
        rewind={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        allowTouchMove={false}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          activeOtakus.map((tupla) => {
            return (<SwiperSlide><Card titulo={tupla.evento} descripcion={tupla.descripcion} imagen={tupla.imagen} eventoId={tupla.eventoId} fecha={tupla.fecha_inic} /></SwiperSlide>)
          })
        }
      </Swiper>

      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}

      <h1>Gastronomía</h1>

      <Swiper
        initialSlide={0}
        centeredSlides={true}
        centeredSlidesBounds={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup: 1
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
            slidesPerGroup: 2
          },
        }}
        rewind={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        allowTouchMove={false}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          activeGastro.map((tupla) => {
            return (<SwiperSlide><Card titulo={tupla.evento} descripcion={tupla.descripcion} imagen={tupla.imagen} eventoId={tupla.eventoId} fecha={tupla.fecha_inic} /></SwiperSlide>)
          })
        }
      </Swiper>

      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}

      <h1>Gaming</h1>

      <Swiper
        initialSlide={0}
        centeredSlides={true}
        centeredSlidesBounds={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup: 1
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
            slidesPerGroup: 2
          },
        }}
        rewind={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        allowTouchMove={false}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          activeGaming.map((tupla) => {
            return (<SwiperSlide><Card titulo={tupla.evento} descripcion={tupla.descripcion} imagen={tupla.imagen} eventoId={tupla.eventoId} fecha={tupla.fecha_inic} /></SwiperSlide>)
          })
        }
      </Swiper>

      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}

      <h1>IT</h1>

      <Swiper
        initialSlide={0}
        centeredSlides={true}
        centeredSlidesBounds={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup: 1
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
            slidesPerGroup: 2
          },
        }}
        rewind={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        allowTouchMove={false}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          activeIT.map((tupla) => {
            return (<SwiperSlide><Card titulo={tupla.evento} descripcion={tupla.descripcion} imagen={tupla.imagen} eventoId={tupla.eventoId} fecha={tupla.fecha_inic} /></SwiperSlide>)
          })
        }
      </Swiper>
   </>
   
  );}


export default Home;
