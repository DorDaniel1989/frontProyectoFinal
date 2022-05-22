import React, { useState, useEffect } from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import axios from 'axios';
import Swal from 'sweetalert2'


export default function DeleteField(props) {

  const tabs = [{ name: 'Usuarios' }, { name: 'Inscripciones' }, { name: 'Eventos' }, { name: 'Comentarios' }, { name: 'Categorías' }, { name: 'Localizaciones' }];

  const endPointName = [
    ['Usuario'],
    ['Inscripcion'],
    ['Evento'],
    ['Comentario'],
    ['Categoria'],
    ['Localizacion']
  ];

  var whichTabla = tabs.findIndex(t => { return t.name === props.tab; });

  const [formData, setForm] = useState({
    id: ''
  });

  useEffect(() => {
    $('.imgCopy').tooltip();

  }, [])

  var tablaDataMod;

  const controlarCambio = e => {
    const { name, value } = e.target;
    setForm({
      ...formData,
      [name]: value
    })
    console.log(formData);
  }

  const eliminarRegistro = async () => {



    Swal.fire({
      title: '¿Estás serguro?',
      text: "Desapareceran todos los registros de la BBDD relacionados con el usuario",
      icon: 'warning',
      showCancelButton: true,
      color: "#cb990f",
      background: "linear-gradient(to right, #434343, #000)",
      confirmButtonColor: 'black',
      cancelButtonColor: 'orange',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Mejor no'

    }).then((result) => {

      if (result.isConfirmed) {
        eliminarRegistroConfirmado()
        tablaDataMod = props.tablaData.filter(function (tuplas) {
          return tuplas[Object.keys(tuplas)[0]] != formData.id;
        });
    
        props.setTablaData(tablaDataMod);
      }
    })


    async function eliminarRegistroConfirmado() {

      await axios.delete(`http://localhost:5000/api/${endPointName[whichTabla]}/${formData.id}`)
       .then(response => {
          return response.data;
        }).then(
      
          Swal.fire({
            icon: 'success',
            position: 'top-end',
            text: 'Registro eliminado correctamente',
            iconColor:"#39FF1A" ,
            color: "#cb990f",
            background: "linear-gradient(360deg, #000000d0, transparent)",
            showConfirmButton: false,
            timer: 1500

         })
        ).catch(error => {
          console.log(error)

          Swal.fire({
              title: 'Ese registro no existe!',
              position: 'top-end',
              icon: 'error',
              iconColor: "red",
              color: "#cb990f",
              background: "linear-gradient(360deg, #000000d0, transparent)",
              showConfirmButton: false,
              timer: 2000
   
            })
            
      })
    }
  }


  return (

    <div className="container border border-dark rounded-1 dDeleteData">

      <div className="dDataInput d-flex flex-column align-items-center">
        <p>Introduzca el ID del registro que quiera eliminar:</p>
        <input type="text" onChange={controlarCambio} name="id" className="iDelete" placeholder="ID" />
      </div>
      <div className="dDataInput dDataInputBtn d-flex flex-column align-items-center">
        <input onClick={() => eliminarRegistro()} value="Submit" className="btn btn-danger border border-warning bg-transparent" />
      </div>
    </div>
  )
}



