import React,{useState, useEffect} from "react";
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import MUIDataTable from "mui-datatables";


export default function ShowTableContent(props) {

  useEffect(()=>{
        
        $( '.imgCopy' ).tooltip();


  } ,[])
 
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
    
    const columns = [];

    firstData.map((tupla) => {
        Object.entries(tupla).map(([key, value]) => {
            columns.push({name: key,
                        });
            })
        });

    var whichTabla = tabs.findIndex(t => {return t.name === props.tab;});

    var auxTablaData = props.tablaData;

    auxTablaData.map((tupla) => {
      if('imagen' in tupla){
        if(tupla['imagen'] != null){
          if(tupla['imagen'] != ''){
            if(!(tupla['imagen'] instanceof Object)){

              tupla['imagen'] = (<td><img title="click para copiar en portapapeles" className="imgCopy" src={tupla['imagen']} alt="Imagen" width="50" height="50" onClick={(event) => {copyImage(event)}}/></td>) ;
            }
            
          }
        }
      }
    });
      
console.log(auxTablaData)

    // función que copia en el portapapeles una imagen

    function copyImage(imagen) {
        
       //navigator.clipboard.write(imagen.value);

       // deseleccionamos todos los rangos por si acaso hay algo seleccionado y nos ahorramos errores

       window.getSelection().removeAllRanges();

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
       
          <MUIDataTable
          title={tabs[whichTabla].name}
          data={auxTablaData}
          columns={columns}
          options={{
            selectableRows: false, // <===== will turn off checkboxes in rows
            selectableRowsHeader: false,
            isRowSelectable: false
          }}
        />       
        
    );

   }