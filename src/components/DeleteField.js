import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import axios from 'axios';


export default function DeleteField(props) {

    const tabs =  [{name:'Usuarios'}, {name: 'Inscripciones'} , {name: 'Eventos'}, {name: 'Comentarios'}, {name: 'Categorías'}, {name: 'Localizaciones'}];

    const endPointName = [
        ['Usuario'],
        ['Inscripcion'], 
        ['Evento'], 
        ['Comentario'], 
        ['Categoria'], 
        ['Localizacion']
    ];

    var whichTabla = tabs.findIndex(t => {return t.name === props.tab;});

    const [formData,setForm] = useState({
        id:''
      });

    useEffect(()=>{
      $( '.imgCopy' ).tooltip();
      
    } ,[])

    var tablaDataMod;

    const controlarCambio = e =>{
        const {name,value} = e.target;
        setForm({
            ...formData,
            [name]: value
        })
        console.log(formData);
      }

    const eliminarRegistro = async() =>{

      
        
      await axios.delete(`http://localhost:5000/api/${endPointName[whichTabla]}/${formData.id}`)
                .catch(function (error) {
                    alert('El registro seleccionado no existe!!!')                
                }).then(response =>{
                     return response.data;
                 }).then(response=>{
                        alert('Registro eliminado satisfactoriamente')
                     
                 })

      tablaDataMod = props.tablaData.filter(function(tuplas) {
        return tuplas[Object.keys(tuplas)[0]] != formData.id;
      });

      props.setTablaData(tablaDataMod);
    }
 

    return (

        <div className="container border border-dark rounded-1 dDeleteData">
   
          <div className="dDataInput d-flex flex-column align-items-center">
            <p>Introduzca el ID del registro que quiera eliminar:</p>
            <input type="text" onChange={controlarCambio} name="id" className="iDelete" placeholder="ID" />
          </div>
          <div className="dDataInput dDataInputBtn d-flex flex-column align-items-center">
            <input onClick={()=>eliminarRegistro()} value="Submit" className="btn btn-primary border border-warning bg-transparent" />
          </div>
        </div>
       )
   }
   

    
   