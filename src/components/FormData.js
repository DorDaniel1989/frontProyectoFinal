import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import axios from 'axios';


export default function FormData(props) {


    function getBase64(objeto, metodo) {

      console.log(objeto)

        // declaramos variable del tipo clave valor

        var {name,value} = objeto;

        //seleccionamos el objeto imagen de dentro del DOM de la etiqueta HTML

        var file = document.querySelector(`#imagen${props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}${metodo}`)['files'][0];

        // creamos un reader y convertimos la imagen en string base64

        var reader = new FileReader();
        reader.readAsDataURL(file);

        // cargamos el string y lo extraemos en el hook de react para el formulario

        reader.onload = function () {
          setForm({
            ...formData,
            [name]: reader.result
        })
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
          setForm({
            ...formData,
            [name]: null
        })
        };
    }

    const [formData, setForm] = useState([
        //añadiremos dinámicamente los inputfields
    ])

    const controlarCambio = e =>{
        var {name,value} = e.target;

        if(name.includes("fecha")){
            var fecha = new Date(value);

            var fechaCorrecta = fecha.toLocaleDateString("es-ES", { // se podría no poner locale, pero se aconseja
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            
		    value = fechaCorrecta; 
	    }
        if([name] == 'administrator'){
		    value = e.target.checked; 
	    }
	    if([name] != 'imagen'){
		    setForm({
                ...formData,
                [name]: value
            })
	    }else{
            getBase64(e.target, props.method); 
        }

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

    var fieldType = [];

    if(props.method == 'POST'){
        fieldType = [
            [
                {
                username: "text",
                password: "text",
                email: "email",
                administrator: 'checkbox',
                nombre: "text",
                apellido: "text",
                about_me: "text",
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
                fecha_comentario: "date",
                hora_comentario: "time"
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
    }else{
        fieldType = [
            [
                {
                usuarioId: "number",
                username: "text",
                password: "text",
                email: "email",
                administrator: 'checkbox',
                nombre: "text",
                apellido: "text",
                about_me: "text",
                direccion: "text",
                telefono: "tel",
                imagen: "file"
              }],
            [
                {
                inscripcionId: "number",
                usuarioId: "number",
                eventoId: "number",
                valoracion: "number"
              }], 
            [
                {
                eventoId: "number",
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
                comentarioId: "number",
                comentario_text: "text",
                eventoId: "number",
                categoriaId: "number",
                usuarioId: "number",
                fecha_comentario: "date"
              }], 
            [
                {
                categoriaId: "number",
                categoria: "text",
                descripcion_categoria: "text"
              }], 
            [
                {
                localizacionId: "number",
                localizacion: "text",
                latitud: "text",
                longitud: "text"
              }]
        ];
    }

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

        Object.entries(data).map(([key, value]) => {


	        if(key === 'imagen'){
	            //https://www.geeksforgeeks.org/how-to-convert-image-into-base64-string-using-javascript/
	        }

        })

        if(props.method == 'POST'){
            await axios.post(`http://localhost:5000/api/${endPointName[whichTabla]}`, data)
               .catch(function (error) {
                   alert('El registro no se puedo añadir!!!')                
               }).then(response =>{
                    return response.data;
                }).then(response=>{
                       alert('Registro añadido satisfactoriamente')

                })  
        }else{
            
            var tabla = endPointName[whichTabla] + "";
            tabla = tabla.toLowerCase()
            var id = tabla + 'Id';

            await axios.put(`http://localhost:5000/api/${endPointName[whichTabla]}/${formData[id]}`, data)
               .catch(function (error) {
                   alert('El registro no se puedo añadir!!!')                
               }).then(response =>{
                    return response.data;
                }).then(response=>{
                       alert('Registro añadido satisfactoriamente')

                })  
        }
            
  
        obtenerDatos();
    }

      //console.log(fieldType[whichTabla][0])

      return (
        <div className="container">
            <form method={props.method} id={'Form' + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>
            {
                fieldType[whichTabla].map(campo => (
                    Object.entries(campo).map(([key, value]) => (
                    <>
                        <label for={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>{key}:</label><br/>
                        <input type={value} id={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"") + props.method} name={key} onChange={controlarCambio}></input><br/>
                    </>
                        
                    ))
                    
                ))
                
            }
            <div className="row">
                <input id={'bPost' + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} onClick={() => anyadirRegistro()} className="btn" value={'Añadir ' + (endPointNameButton[whichTabla]) }/>
            </div>
            </form>
        </div>
      );

   }