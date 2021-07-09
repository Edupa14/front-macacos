
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react';
import {Form,Card,Accordion} from 'react-bootstrap'
import {filterTipo,filterTipoLetra} from 'helpers/filtroBuscador'
import Loading from 'components/loading/loading'
import iconA from 'img/utils/A.svg'
import './buscador.css'
const BuscadorUsableTipo = ({actualizarBuscador,filtroColor,scroll,mostrador,placeholder,propsBuscador,functionSetData,filter}) => {
    const [dataBuscador,setDatabuscador] = useState(propsBuscador)
    const [busquedaTipo,setBusquedaTipo] = useState([])
    const [busquedaVacia,setBusquedaVacia] = useState(false)
    const [loading,setLoading] = useState(true)

    const distributeTipo = (array,tipoFiltro) =>{
        return filterTipoLetra(array,'',tipoFiltro,filter)
    }
    const busquedaPorTipo=(event)=>{
        setLoading(true)  
        let palabra = event.target.value.trim()
        let letra = palabra.charAt(0).toUpperCase()
        if(letra ===''){
            setDatabuscador(propsBuscador)
            setBusquedaTipo(filterTipo(propsBuscador,filter))
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
            setBusquedaVacia(true)
        }
        setLoading(false)  
    }
    
    useEffect(()=>{   
        if(propsBuscador !== undefined){
            setDatabuscador(filterTipo(propsBuscador,filter))
        }
        setLoading(false)
    },[])


    const dataBuscadorPassed = (datapassed) =>{
        if(busquedaTipo.length===0){
            setBusquedaTipo(filterTipo(propsBuscador,filter))
        }  
        let newdataBuscador = propsBuscador.map(ele=>{
            if(ele[filtroColor]===datapassed[filtroColor]){
                ele.color = true
            }else{
                ele.color = false
            }
            return ele
        })
        setDatabuscador(newdataBuscador)
        functionSetData(datapassed)
    }

    useEffect(()=>{//iNTENTAR HACER UN CAMBIO QUE INDIQUE QUE PROPS BUSCADOR CAMBIO
        let newnewdataBuscador = propsBuscador.map(ele=>{
            ele.color = false
            return ele
        })
        setDatabuscador(newnewdataBuscador)
    },[actualizarBuscador])


    if(propsBuscador){
        return (
            <div>
                <Form>
                    <Form.Group className="mb-0 inner-addon right-addon">
                        <img className="iconoBuscar" width="15px" alt=""/>
                        <Form.Control className="buscadorUsuario" size="sm" onChange={busquedaPorTipo} type="search" placeholder={placeholder} />
                    </Form.Group>
                </Form>
                
            {(loading)? <Loading></Loading>:
            <div className={scroll?"scrollLista":""}> 
            {/* // <div className="scrollLista">  */}
                {
                    (busquedaTipo.length===0 && !busquedaVacia)
                    ?
                    filterTipo(propsBuscador,filter).map((element,index)=>
                        <Accordion key={index} defaultActiveKey={`${index}`}>   
                            <Card className="rounded-0">
                                <Accordion.Toggle className="bgBuscadorSection" as={Card.Header} eventKey={`${index}`}>
                                    {element}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={`${index}`}>
                                    <Card.Body > 
                                        {distributeTipo(propsBuscador,element).map((ele,ind)=>
                                        <div key={ind} className={`item-buscar ${ele.color? 'selectedColor' : ''}`} onClick={()=>dataBuscadorPassed(ele)}> 
                                            <p className="letterBuscador">{ele[mostrador]}</p>
                                            <img src={iconA} className="iconA" alt=""/>
                                        </div>
                                        )}
                                    </Card.Body> 
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    )
                    :   busquedaTipo.map((element,index)=>
                       <Accordion key={index} defaultActiveKey={`${index}`}>   
                            <Card className="rounded-0">
                                <Accordion.Toggle className="bgBuscadorSection" as={Card.Header} eventKey={`${index}`}>
                                    {element}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={`${index}`}>
                                    <Card.Body > 
                                        {distributeTipo(dataBuscador,element).map((ele,ind)=>
                                        <div key={ind} className={`item-buscar ${ele.color? 'selectedColor' : ''}`} onClick={()=>dataBuscadorPassed(ele)}> 
                                            <p className="letterBuscador">{ele[mostrador]}</p>
                                            <img src={iconA} className="iconA" alt=""/>
                                        </div>
                                        )}
                                    </Card.Body> 
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                )}
            </div> 
            }
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

export default BuscadorUsableTipo;