import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import axios from 'axios';



export default function FormData(props) {


    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          console.log(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
    }

	function Uploaded() {
        
		var file = document.querySelector(`#imagen${props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}`)['files'][0];

        var base64str;

        base64str = getBase64(file);

        return base64str;

       
        
	}

    const [formData, setForm] = useState([
        //añadiremos dinámicamente los inputfields
    ])

    const controlarCambio = e =>{
        var {name,value} = e.target;
  
    if([name] == 'administrator'){
		value = e.target.checked; 
	}
	if([name] == 'imagen'){
		value = Uploaded(); 
	}
        setForm({
            ...formData,
            [name]: value
        })
        console.log(formData);
      }


    const tabs =  [{name:'Usuarios'}, {name: 'Inscripciones'} , {name: 'Eventos'}, {name: 'Comentarios'}, {name: 'Categorías'}, {name: 'Localizaciones'}];

    

    const endPointName = [
        ['Usuario'],
        ['Inscripcion'], 
        ['Evento'], 
        ['Comentario'], 
        ['Categoria'], 
        ['Localizacion']
    ];

    const endPointNameButton = [
        ['usuario'],
        ['inscripción'], 
        ['evento'], 
        ['comentario'], 
        ['categoría'], 
        ['localización']
    ];

    const fieldType = [
        [
            {
            username: "text",
            password: "text",
            email: "email",
            administrator: 'checkbox',
            nombre: "text",
            apellido: "text",
            direccion: "text",
            telefono: "tel",
            imagen: "file"
          }],
        [
            {
            usuarioId: "number",
            eventoId: "number",
            valoracion: "number"
          }], 
        [
            {
            evento: "text",
            imagen: "file",
            fecha_inic: "date",
            fecha_fin: "date",
            hora_inic: "time",
            hora_fin: "time",
            localizacionId: "number",
            descripcion: "text",
            aforo_max: "number",
            popularidad: "number",
            precio: "number",
            categoriaId: "number"
          }], 
        [
            {
            comentario_text: "text",
            eventoId: "number",
            categoriaId: "number",
            usuarioId: "number",
            fecha_comentario: "date"
          }], 
        [
            {
            categoria: "text",
            descripcion_categoria: "text"
          }], 
        [
            {
            localizacion: "text",
            latitud: "text",
            longitud: "text"
          }]
    ];

    const firstData = props.tablaData.slice(0, 1);
    
    const campos = [];

    firstData.map((tupla) => {
        Object.entries(tupla).map(([key, value]) => {
            
            campos.push(key);
        })
        })

    var whichTabla = tabs.findIndex(t => {return t.name === props.tab;});

    const obtenerDatos = async() =>{
        
        const data =  await fetch(`http://localhost:5000/api/${endPointName[whichTabla]}`);
        const tabla = await data.json()
        props.setTablaData(tabla)
        
      }

    function crearPostBody(){

        return formData
    }

    const anyadirRegistro = async() =>{

        var data = crearPostBody()
        console.log("Antes: ");
        console.log(data);

        Object.entries(data).map(([key, value]) => {


	        if(key === 'imagen'){
	            //https://www.geeksforgeeks.org/how-to-convert-image-into-base64-string-using-javascript/
	        }

        })
        console.log("Ahora: ");
        console.log(data);
        
        await axios.post(`http://localhost:5000/api/${endPointName[whichTabla]}`, data)
               .catch(function (error) {
                   alert('El registro no se puedo añadir!!!')                
               }).then(response =>{
                    return response.data;
                }).then(response=>{
                       alert('Registro añadido satisfactoriamente')

                })  
            
  
        obtenerDatos();
    }

      //console.log(fieldType[whichTabla][0])

      return (
        <>
            <form method="POST" id={'Form' + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>
            {
                fieldType[whichTabla].map(campo => (
                    Object.entries(campo).map(([key, value]) => (
                    <>
                        <label for={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>{key}:</label><br/>
                        <input type={value} id={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} name={key} onChange={controlarCambio}></input><br/>
                    </>
                        
                    ))
                    
                ))
                
            }
            <div className="row">
                <input id={'bPost' + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} onClick={() => anyadirRegistro()} className="btn" value={'Añadir ' + (endPointNameButton[whichTabla]) }/>
            </div>
            </form>
        </>
      );

   }