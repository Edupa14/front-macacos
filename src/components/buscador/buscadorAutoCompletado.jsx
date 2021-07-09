
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react';
import {Form,Card,Accordion} from 'react-bootstrap'
import {filterTipo,filterTipoLetra} from 'helpers/filtroBuscador'
import './buscador.css'
const BuscadorAutocompletado = ({mostrador,placeholder,propsBuscador,functionSetData,filter}) => {
    const [dataBuscador,setDatabuscador] = useState(propsBuscador)
    const [busquedaTipo,setBusquedaTipo] = useState([])

    const distributeTipo = (array,tipoFiltro) =>{
        return filterTipoLetra(array,'',tipoFiltro,filter)
    }
    const busquedaPorTipo=(event)=>{ 
        let palabra = event.target.value.trim()
        let letra = palabra.charAt(0).toUpperCase()
        if(letra ===''){
            setDatabuscador([])
            setBusquedaTipo([])
        }else{
            let arr = []
            propsBuscador.forEach(element=> {
                let rest= element[mostrador].toUpperCase().indexOf(palabra.toUpperCase())
                if(rest !== -1){
                    arr.push(element)
                }
            })
            setBusquedaTipo(filterTipo(arr,filter))
            setDatabuscador(arr)
            
        }  
    }
    
    useEffect(()=>{   
        if(propsBuscador !== undefined){
            setDatabuscador(filterTipo(propsBuscador,filter))
            
        }
    },[])


    const dataBuscadorPassed = (datapassed) =>{
        functionSetData(datapassed)
    }


    if(propsBuscador){
        return (
            <div>

                    <Form.Group className="mb-0">
                            <Form.Control size="sm" onChange={busquedaPorTipo} type="search" placeholder={placeholder} />
                    </Form.Group>

                {
                busquedaTipo.map((element,index)=>
                       <Accordion key={index} defaultActiveKey={`${index}`}>   
                            <Card className="rounded-0">
                                <Accordion.Toggle className="bgBuscadorSection" as={Card.Header} eventKey={`${index}`}>
                                    {element}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={`${index}`}>
                                    <Card.Body > 
                                        {distributeTipo(dataBuscador,element).map((ele,ind)=>
                                        <div key={ind}> 
                                            <p onClick={()=>dataBuscadorPassed(ele)} className="letterBuscador">{ele[mostrador]}</p>
                                            <hr className="borderhr"/> 
                                        </div>
                                        )}
                                    </Card.Body> 
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                )}
            </div>
        );
    }
    else{
        return (
            <div>
                <p>No hay datos disponibles</p>
            </div>
        )  
    }
}

export default BuscadorAutocompletado;