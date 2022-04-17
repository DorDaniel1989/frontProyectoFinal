import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import Tabs from "./Tabs";
import parseHTML from 'html-react-parser'


export default function ShowTableContent(props) {

    const [tablaData , getRegistros] = useState([])
 
    const tabs =  [{name:'Usuarios'}, {name: 'Inscripciones'} , {name: 'Eventos'}, {name: 'Comentarios'}, {name: 'Categorías'}, {name: 'Localizaciones'}];

    const endPointName = [
        ['Usuario'],
        ['Inscripcion'], 
        ['Evento'], 
        ['Comentario'], 
        ['Categoria'], 
        ['Localizacion']
    ];

    const fields = 
                [
                    ['usuarioId', 'username', 'password', 'email', 'administrator', 'nombre', 'apellido', 'direccion', 'telefono', 'imagen'],
                    ['inscripcionId', 'usuarioId', 'eventoId', 'valoracion'], 
                    ['eventoId', 'evento', 'imagen', 'fecha_inic', 'fecha_fin', 'hora_inic', 'hora_fin', 'localizacionId', 'descripcion', 'aforo_max', 'popularidad', 'precio', 'categoriaId'], 
                    ['comentarioId', 'comentario_text', 'eventoId', 'categoriaId', 'usuarioId', 'fecha_comentario'], 
                    ['categoriaId', 'categoria', 'descripcion_categoria'], 
                    ['localizacionId', 'localizacion', 'latitud', 'longitud']
                ];

    var whichTabla = tabs.findIndex(t => {return t.name === props.tab;});

    useEffect(()=>{
        obtenerDatos();
        $('.imgCopy').tooltip();
    } ,[])
   

    const obtenerDatos = async() =>{
        
        const data =  await fetch(`http://localhost:5000/api/${endPointName[whichTabla]}`);
        const tabla = await data.json()
        getRegistros(tabla)
        
      }

    function copyImage(elemento) {
        navigator.clipboard.writeText(elemento).then(
            function() {
              /* clipboard successfully set */
              window.alert('Success! The text was copied to your clipboard') 
            }, 
            function() {
              /* clipboard write failed */
              window.alert('Opps! Your browser does not support the Clipboard API')
            }
        )
    }
     

    function dataCollector(arrayDoObjetos) {
        var res = "";
        tablaData.map(tupla => {

            res += "<tr>";
            
            for (var [key, value] of Object.entries(tupla)){

                res += "<td>";

                if(key == 'imagen'){
                    res += `<img title="click para copiar en portapapeles" className="imgCopy" src="${value}" alt="${endPointName[whichTabla]}Imagen" width="50" height="50" onClick={copyImage(${value})}>`;
                }else{
                    res += value;
                }

                res += "</td>";
            }

            res += "</tr>";
        }
            
        )
        return res;
    }

      return (
        <table className="tDatosbbdd">
            <tr>
            {
                
                fields[whichTabla].map(campos => (
                    
                    <>
                        <th>
                            {campos}
                        </th>
                    </>
    
                ))
                }
            </tr>

            {
                parseHTML(dataCollector(tablaData))
            }
            
        </table>
    );

    
   }