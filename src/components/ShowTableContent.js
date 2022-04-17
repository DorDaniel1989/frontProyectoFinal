import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import Tabs from "./Tabs";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


export default function ShowTableContent(props) {
 
    const tabs =  [{name:'Usuarios'}, {name: 'Inscripciones'} , {name: 'Eventos'}, {name: 'Comentarios'}, {name: 'Categorías'}, {name: 'Localizaciones'}];

    

    const endPointName = [
        ['Usuario'],
        ['Inscripcion'], 
        ['Evento'], 
        ['Comentario'], 
        ['Categoria'], 
        ['Localizacion']
    ];

    const firstData = props.tablaData.slice(0, 1);
    

    var whichTabla = tabs.findIndex(t => {return t.name === props.tab;});

    useEffect(()=>{
        
        $( '.imgCopy' ).tooltip();
        
    } ,[])




      
    // función que copia en el portapapeles una imagen

    function copyImage(imagen) {
        
       //navigator.clipboard.write(imagen.value);

        // recogemos el DOM de la imagen (la etiqueta HTML)

        var range = document.createRange();  

        // recogemos la imagen como objeto

        range.selectNode(imagen.target);  

        // la guardamos

        window.getSelection().addRange(range);  

       try {  

        // tras copiar la imagen se ejecuta el comando de copiar en el portapapeles

        var successful = document.execCommand('copy');  
        var msg = successful ? 'successful' : 'unsuccessful';  
        console.log('Copy image command was ' + msg);  

      } catch(err) {  

        console.log('Oops, unable to copy');  
      }  

      window.getSelection().removeAllRanges(); 

    }

      return (
        
        <table className="tDatosbbdd display" onLoad={() =>{$( '.tDatosbbdd' ).DataTable();}}>
            <thead>
                <tr>
                    {

                        <>
                        {
                            firstData.map((tupla) => (
                                Object.entries(tupla).map(([key, value]) => (
                                    <th>
                                        {key}
                                    </th>
                                    
                                ))
                            ))
                        }
                            
                        </>

                    }
                </tr>
            </thead>

            <tbody>

            {
                props.tablaData.map((tupla) => (
                    <tr>
                        {
                            Object.entries(tupla).map(([key, value]) => (
                                key === 'imagen' ? (<td><img title="click para copiar en portapapeles" className="imgCopy" src={value} alt="Imagen" width="50" height="50" onClick={(event) => {copyImage(event)}}/></td>) : (<td>{value}</td>)
                            
                            ))
                        }
                    
                    </tr>
                ))
    
            }
            </tbody>

            <tfoot>
                <tr>
                    {

                        firstData.map((tupla) => (
                            Object.entries(tupla).map(([key, value]) => (
                                <>
                                    <th>
                                        {key}
                                    </th>
                                </>
                            ))
                        ))
                        
                    }
                </tr>
            </tfoot>
            
        </table>
        
    );

   }