import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import axios from 'axios';
import Swal from 'sweetalert2'



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

    function controlarCambio(e){
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

      function putDataInfo(DOM){
        var id = DOM.target.value;
        
        var preparedData;
        
        props.tablaData.map(tupla => {
          
          if (Object.entries(tupla)[0][1] === +(id)) {

            preparedData = tupla;

            

            setForm(preparedData);
            console.log(formData);
            return true;
          }
        });

        var inputData = document.getElementsByClassName(props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + props.method);
        let data = Object.entries(preparedData);

        for (var i = 1; i < inputData.length; i++) {

          if (inputData[i].name === 'imagen') {
            if (data[i][1] !== null && data[i][1] !== ''){

              preparedData['imagen'] = data[i][1].props.children.props.src;
              setForm(preparedData);
            }
          }else{
            if (inputData[i].name === 'administrator') {
              if (data[i][1] === 'True') {
                $(`#${inputData[i].id}`).prop('checked', true);
                preparedData['administrator'] = true;
              } else {
                $(`#${inputData[i].id}`).prop('checked', false);
                preparedData['administrator'] = false;
              }
              setForm(preparedData);
            }
            inputData[i].value = data[i][1]; 
          }
        }
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
                usuarioId: "number",
                fecha_comentario: "date",
                hora_comentario: "time"
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
                   
                
                Swal.fire({
                  title:'Algo salió mal y no se pudo añadir el registro',
                  icon: 'error',
                  iconColor: 'red',
                  showConfirmButton: false,
                  position: 'top-end',
                  color: "#cb990f",
                  background: "linear-gradient(360deg, #000000d0, transparent)",
                  timer: 1000
                })
              

               }).then(response =>{
                    return response.data;
                }).then(response=>{
                  Swal.fire({
                    title:'Registro añadido satisfactoriamente',
                    icon: 'success',
                    iconColor:"#39FF1A" ,
                    position: 'top-end',
                    showConfirmButton: false,
                    color: "#cb990f",
                    background: "linear-gradient(360deg, #000000d0, transparent)",
                    timer: 1000
                  })

                })  
        }else{
            
            var tabla = endPointName[whichTabla] + "";
            tabla = tabla.toLowerCase()
            var id = tabla + 'Id';

            await axios.put(`http://localhost:5000/api/${endPointName[whichTabla]}/${formData[id]}`, data)
               .catch(function (error) {
                Swal.fire({
                  title:'Algo salió mal y no se pudo añadir el registro',
                  icon: 'error',
                  showConfirmButton: false,
                  position: 'top-end',
                  color: "#cb990f",
                  background: "linear-gradient(360deg, #000000d0, transparent)",
                  timer: 1000
                })       
               }).then(response =>{
                    return response.data;
                }).then(response=>{
                  Swal.fire({
                    title:'Registro añadido satisfactoriamente',
                    icon: 'success',
                    iconColor:"#39FF1A" ,
                    showConfirmButton: false,
                    position: 'top-end',
                    color: "#cb990f",
                    background: "linear-gradient(360deg, #000000d0, transparent)",
                    timer: 1000
                  })

                })  
        }
            
  
        obtenerDatos();
    }

      var tableIDs = [];

      props.tablaData.map(tupla => {
        tableIDs.push(Object.entries(tupla)[0][1])
      })

      tableIDs = tableIDs.sort((a, b) => a - b);
      
      //console.log(tableIDs)

      return (
        <div className="container border border-dark rounded-1">
            <form method={props.method} id={'Form' + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")} className="formEdit">
            {//Object.entries(campo)[0][0] mediante esto obtendremos el nombre de la PK de la tabla
                fieldType[whichTabla].map(campo => (
                    Object.entries(campo).map(([key, value]) => (
                    <div className="dDataInput d-flex flex-column align-items-center">
                        <label for={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g,"")}>{key}:</label><br/>
                        {
                          (props.method === 'PUT') ?
                            (
                              (Object.entries(campo)[0][0]== key) ? 
                              
                                (<select id={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + props.method} name={key} className={props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + props.method} onChange={(e) => { controlarCambio(e); putDataInfo(e)}} >
                                  <option value={0} selected></option>
                                  {
                                    tableIDs.map(id => (
                                      <option value={id} >{id}</option>
                                    ))
                                  }
                                  </select>) 
                                  : 
                                (<><input type={value} id={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + props.method} name={key} className={props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + props.method} onChange={(e) => { controlarCambio(e) }} ></input><br /></>)
                              
                            ) : (<><input type={value} id={key + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + props.method} name={key} className={props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + props.method} onChange={(e) => { controlarCambio(e) }} ></input><br /></>)
                        }
                    </div>
                        
                    ))
                    
                ))
                
            }
            <div className="dDataInput dDataInputBtn d-flex flex-column align-items-center">
              <input id={'bPost' + props.tab.normalize('NFD').replace(/[\u0300-\u036f]/g, "")} onClick={() => anyadirRegistro()} className="btn btn-danger border border-warning bg-transparent" value={(props.method === 'PUT') ? ('Modificar ') + (endPointNameButton[whichTabla]) : ('Añadir ') + (endPointNameButton[whichTabla]) }/>
            </div>
            </form>
        </div>
      );

   }