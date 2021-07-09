
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react';
import {Form,Card,Accordion} from 'react-bootstrap'
import {filterAbecedario} from 'helpers/filtroBuscador'
import iconA from 'img/utils/A.svg'
import Loading from 'components/loading/loading'
import './buscador.css'
const BuscadorUsable = ({actualizarBuscador,filtroColor,placeholder,propsBuscador,functionSetData,filterName,filterOpcional}) => {
    const [dataBuscador,setDatabuscador] = useState([])
    const [busquedaAbec,setBusquedaAbec] = useState([])
    const [busquedaVacia,setBusquedaVacia] = useState(false)
    const [loading,setLoading] = useState(true)

    const distributeLetter = (array,letra) =>{
        return array.filter(element => element[filterName].charAt(0).toUpperCase() === letra); 
    }
    const busquedaLetra=(event)=>{ 
        setLoading(true)
        let palabra = event.target.value.trim()
        let letra = palabra.charAt(0).toUpperCase()
        if(letra ===''){
            setDatabuscador(propsBuscador)
            setBusquedaAbec(filterAbecedario(propsBuscador,filterName))
        }else{
            if(filterOpcional === undefined){
                let arr = []
                propsBuscador.forEach(element=> {
                    let rest= element[filterName].toUpperCase().indexOf(palabra.toUpperCase())
                    if(rest !== -1){
                        arr.push(element)
                    }
                })
                setDatabuscador(arr)
                setBusquedaAbec([letra])
            }else{
                let arr = []
                let arrLetras = []
                propsBuscador.forEach(element=> {
                    let rest= element[filterName].toUpperCase().indexOf(palabra.toUpperCase())
                    if(rest !== -1){
                        arr.push(element)
                    }
                })
                propsBuscador.forEach(element=> {
                    let rest= element[filterOpcional].toUpperCase().indexOf(palabra.toUpperCase())
                    if(rest !== -1){
                        arr.push(element)
                    }
                })
                arr.forEach(element=>{
                    arrLetras.push(element[filterName])
                })
                arr = Array.from(new Set(arr))
                setDatabuscador(arr)
                setBusquedaAbec(filterAbecedario(arr,filterName))
            }
            setBusquedaVacia(true) 
        }  
        setLoading(false)
    }
    
    useEffect(()=>{   
        if(propsBuscador !== undefined){
            setDatabuscador(propsBuscador)
        }
        setLoading(false)
    },[])


    const dataBuscadorPassed = (datapassed) =>{
        if(busquedaAbec.length===0){
            setBusquedaAbec(filterAbecedario(propsBuscador,filterName))    
        }
        setDatabuscador(propsBuscador) 
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
        setBusquedaAbec(filterAbecedario(newnewdataBuscador,filterName))
    },[actualizarBuscador])


    if(propsBuscador){
        return (
            <div>
                <Form>
                    <Form.Group className="mb-0 inner-addon right-addon">
                        <Form.Control className="buscadorUsuario" size="sm" onChange={busquedaLetra} type="search" placeholder={placeholder} />
                    </Form.Group>
                    
                </Form>
            
            {(loading)? <Loading></Loading>:
            <div className="scrollLista"> 
                {
                    (busquedaAbec.length===0 && !busquedaVacia)
                    ?
                    filterAbecedario(propsBuscador,filterName).map((element,index)=>
                        <Accordion key={index} defaultActiveKey={`${index}`}>   
                            <Card className="rounded-0">
                                <Accordion.Toggle className="bgBuscadorSection" as={Card.Header} eventKey={`${index}`}>
                                    {element}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={`${index}`}>
                                    <Card.Body > 
                                       
                                        {distributeLetter(propsBuscador,element).map((ele,ind)=>
                                        <div key={ind} className={`item-buscar ${ele.color? 'selectedColor' : ''}`} onClick={()=>dataBuscadorPassed(ele)}> 
                                            <p className="letterBuscador">{ele[filterName]} {ele[filterOpcional]}</p>
                                            <img src={iconA} className="iconA" alt=""/>
                                        </div>
                                        )}
                                    </Card.Body> 
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    )
                    :
                       busquedaAbec.map((element,index)=>
                       <Accordion key={index} defaultActiveKey={`${index}`}>   
                       
                            <Card className="rounded-0">
                                <Accordion.Toggle className="bgBuscadorSection" as={Card.Header} eventKey={`${index}`}>
                                    {element}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={`${index}`}>
                                    <Card.Body > 
                                        {distributeLetter(dataBuscador,element).map((ele,ind)=>
                                        <div key={ind} className={`item-buscar ${ele.color? 'selectedColor' : ''}`}  onClick={()=>dataBuscadorPassed(ele)} > 
                                            <p className="letterBuscador">{ele[filterName]} {ele[filterOpcional]}</p>
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

export default BuscadorUsable;