
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import {Table } from 'react-bootstrap';
import Loading from 'components/loading/loading'
import './check.css'
const CheckBoxRolEdit = ({dataChecks,listadoRoles,accesosEdit}) => {
    const [listarModulos,setListarModulos] = useState([])
    const [loading,setLoading] = useState(true)
    const [checked,setChecked] = useState({
        lectura: 0,
        escritura:0
    })

    const getModulos = async(accesosEditados)=>{
        setLoading(true)
        if(accesosEditados!== undefined || accesosEditados.length >0){
            let getSeccionesListado = []
            accesosEditados.forEach(element=>{
                let objectoModulo = {estado:undefined,idAcceso:undefined,modulo: element.Modulo 
                            ,codModulo:element.codModulo,seccion:'',escritura:0,lectura:0}
                getSeccionesListado.push(objectoModulo)
                element.secciones.forEach(seccion=>{
                    let objeto = {estado:seccion.estado,idAcceso:seccion.idAcceso,modulo: seccion.Modulo,seccion:seccion.Seccion 
                    ,codModulo:seccion.codModulo,codSeccion:seccion.codSeccion,escritura:seccion.perEscr,lectura:seccion.perLect}
                    getSeccionesListado.push(objeto)
                })
            })
            setListarModulos(getSeccionesListado)
            let listaEnviada = getSeccionesListado.filter(element=>element.codSeccion !==undefined)
            listadoRoles(listaEnviada)
        }
        setLoading(false)
    }
    
    useEffect(()=>{
        
        async function loadRol(){
            await getModulos(accesosEdit) 
        }
        loadRol() 
        
    },[accesosEdit])

    const moduloSelected = (evento,modulo,tipo)=>{
        let event = evento.target.checked
        let value = 0
        let seleccionado = []
        let result = listarModulos.filter(element => element.modulo === modulo && element.seccion !=='')
        if(result.length!==0){
            if(event === true){
                value = 1
                if(tipo==='escritura'){//HACER OTRA VALIDACION MAS PARA SABER SI ES MODULO O SECCION
                    seleccionado = listarModulos.map(element=>{
                      if(element.modulo === modulo ){ //&& element.seccion !==''
                        return {estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                                ,codModulo:element.codModulo,codSeccion:element.codSeccion,escritura:1,lectura:1}
                      }else{
                        return {estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                            ,codModulo:element.codModulo,codSeccion:element.codSeccion   ,escritura:element.escritura,lectura:element.lectura}
                      }
                    })
                }else{
                    seleccionado = listarModulos.map(element=>{
                        if(element.modulo === modulo ){ //&& element.seccion !==''
                          return {estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                                ,codModulo:element.codModulo,codSeccion:element.codSeccion,lectura:value,escritura:element.escritura}
                        }else{
                          return {estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                                ,codModulo:element.codModulo,codSeccion:element.codSeccion,lectura:element.lectura,escritura:element.escritura}
                        }
                      })
                }
            }else{
                value = 0
                if(tipo==='escritura'){//HACER OTRA VALIDACION MAS PARA SABER SI ES MODULO O SECCION
                    seleccionado = listarModulos.map(element=>{
                      if(element.modulo === modulo ){ //&& element.seccion !==''
                        return {estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                                ,codModulo:element.codModulo,codSeccion:element.codSeccion,escritura:value,lectura:element.lectura}
                      }else{
                        return {estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                            ,codModulo:element.codModulo,codSeccion:element.codSeccion ,escritura:value,lectura:element.lectura}
                      }
                    })
                }else{
                    seleccionado = listarModulos.map(element=>{
                        if(element.modulo === modulo ){ //&& element.seccion !==''
                          return {estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                                ,codModulo:element.codModulo,codSeccion:element.codSeccion,lectura:0,escritura:0}
                        }else{
                          return {estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                                ,codModulo:element.codModulo,codSeccion:element.codSeccion,lectura:element.lectura,escritura:element.escritura}
                        }
                      })
                }
            }
            setListarModulos(seleccionado)
            let selectedList = seleccionado.filter(element=>element.codSeccion !==undefined)
            listadoRoles(selectedList)
            // let selectedList = seleccionado.filter(element=>element.escritura !==0 || element.lectura!==0)
        }   
    }
    const seccionSelected = (evento,seccion,tipo)=>{
        let event = evento.target.checked
        let value = 0
        let objecto =  {}
        let result = listarModulos.find(element => element.seccion === seccion)
        if (event === true){
            value = 1
            if(tipo === 'escritura'){
                objecto = {
                    estado:result.estado,idAcceso:result.idAcceso,modulo: result.modulo,seccion:result.seccion 
                    ,codModulo:result.codModulo,codSeccion:result.codSeccion,lectura: 1, escritura: value}
            }else{
                objecto = {estado:result.estado,idAcceso:result.idAcceso,modulo: result.modulo,seccion:result.seccion 
                    ,codModulo:result.codModulo,codSeccion:result.codSeccion,lectura: value, escritura: result.escritura}
            }
        } else {
            value = 0
            if(tipo === 'escritura'){
                objecto = {
                    estado:result.estado,idAcceso:result.idAcceso,modulo: result.modulo,seccion:result.seccion 
                    ,codModulo:result.codModulo,codSeccion:result.codSeccion,lectura: result.lectura, escritura: value}
            }else{
                objecto = {estado:result.estado,idAcceso:result.idAcceso,modulo: result.modulo,seccion:result.seccion 
                    ,codModulo:result.codModulo,codSeccion:result.codSeccion,lectura: value, escritura: 0}
            }
        }
        
        let indice = listarModulos.findIndex((elemento)=>
            elemento.codSeccion === objecto.codSeccion 
        )
        let listanueva = listarModulos
        listanueva[indice] = objecto
        setListarModulos(listanueva)
        let selectedList = listanueva.filter(element=>element.codSeccion !==undefined)
        listadoRoles(selectedList)
        // let selectedList = listanueva.filter(element=>element.escritura !==0 || element.lectura!==0)
    }

    const selectedAll = (evento,tipo)=>{
        let seleccionado = []
        let event = evento.target.checked
        let value = 0
        if (event === true) {
            value = 1
            if(tipo === 'escritura'){
                seleccionado = listarModulos.map(element=>{
                    return {
                        estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                                ,codModulo:element.codModulo,codSeccion:element.codSeccion,escritura:1,lectura:1
                    }
                })
                setChecked({
                    lectura:1,
                    escritura: 1
                })
                
            }else{
                seleccionado = listarModulos.map(element=>{
                    return {
                        estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                                ,codModulo:element.codModulo,codSeccion:element.codSeccion,lectura:value,escritura:element.escritura
                    }
                })
                setChecked({
                    ...checked,
                    lectura: value,
                    escritura: checked.escritura
                })
            }
        } else {
            value = 0
            if(tipo === 'escritura'){
                seleccionado = listarModulos.map(element=>{
                    return {
                        estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                                ,codModulo:element.codModulo,codSeccion:element.codSeccion,escritura:value,lectura:element.lectura
                    }
                })
                setChecked({
                    lectura:checked.lectura,
                    escritura: value
                })
                
            }else{
                seleccionado = listarModulos.map(element=>{
                    return {
                        estado:element.estado,idAcceso:element.idAcceso,modulo: element.modulo,seccion:element.seccion 
                                ,codModulo:element.codModulo,codSeccion:element.codSeccion,lectura:0,escritura:0
                    }
                })
                setChecked({
                    ...checked,
                    lectura:0,
                    escritura: 0
                })
            }
        }
        
        setListarModulos(seleccionado)
        let selectedList = seleccionado.filter(element => element.codSeccion !== undefined)
        listadoRoles(selectedList)
    }

    if(dataChecks){
        return (
            <>
                <p className="pt-4"></p>

                {(loading)? <Loading></Loading>:
                    <Table striped borderless hover size="sm">
                    <thead>
                        <tr className="bgCheck pl-3 pt-2 pb-2 mb-0">
                            <th className="px-3 py-2" style={{letterSpacing: '1.85px'}}>Permisos</th>
                            <th className="px-3 py-2" style={{letterSpacing: '1.85px'}}>Operativo</th>
                            <th className="px-3 py-2" style={{letterSpacing: '1.85px'}}>Consulta</th>
                        </tr>
                        <tr>
                            <td> <p className="pl-3 mb-0">Seleccionar todo</p></td>
                            <td className="px-3"><input checked={(checked.escritura === 1) ? true : false} onChange={(e) => selectedAll(e,  'escritura')} type="checkbox" id={'checkeds'} />
                                <label className="labelcheck" htmlFor={'checkeds'}></label>
                            </td>
                            <td className="px-3"><input checked={(checked.lectura === 1) ? true : false} onChange={(e) => selectedAll(e, 'lectura')} type="checkbox" id={'checkedsa'} />
                                <label className="labelcheck" htmlFor={'checkedsa'}></label>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                            
                        {
                            listarModulos.map((elemento,index)=>
                            (elemento.seccion === '') ?
                                <tr key={index}>
                                    <td><strong className="pl-3" style={{letterSpacing: '1.45px'}}> Módulo {elemento.modulo} </strong></td>
                                    <td className="px-3"><input checked={(elemento.escritura === 1) ? true : false} onChange={(e)=>moduloSelected(e,elemento.modulo,'escritura')} type="checkbox" id={elemento.modulo+'m'} />
                                        <label  className="labelcheck" htmlFor={elemento.modulo+'m'}></label> 
                                    </td>
                                    <td className="px-3"><input checked={(elemento.lectura === 1) ? true : false} onChange={(e)=>moduloSelected(e,elemento.modulo,'lectura')}  type="checkbox" id={elemento.modulo+'ma'} />
                                        <label className="labelcheck" htmlFor={elemento.modulo+'ma'}></label>
                                    </td>
                                    
                                </tr>
                            :
                                <tr key={index}>
                                    <td> <span className="pl-4">{elemento.seccion}</span> </td>
                                    <td className="px-3"><input checked={(elemento.escritura===1)?true:false} onChange={(e)=>seccionSelected(e,elemento.seccion,'escritura')} type="checkbox" id={elemento.seccion} />
                                        <label  className="labelcheck" htmlFor={elemento.seccion}></label> 
                                    </td>
                                    <td className="px-3"><input checked={(elemento.lectura===1)?true:false} onChange={(e)=>seccionSelected(e,elemento.seccion,'lectura')}  type="checkbox" id={elemento.seccion+'a'} />
                                        <label className="labelcheck" htmlFor={elemento.seccion+'a'}></label>
                                    </td>
                                    
                                </tr>
                            )
                        }
                    </tbody>
                  </Table>
                } 

            </>
        );
    }else{
        return (
            <>
            </>
        );
    }
    
}

export default CheckBoxRolEdit;