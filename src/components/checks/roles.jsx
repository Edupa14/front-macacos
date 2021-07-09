
/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Loading from 'components/loading/loading'
import './check.css'
const CheckBoxRol = ({ dataChecks, listadoRoles }) => {
    const [listarModulos, setListarModulos] = useState([])
    const [loading, setLoading] = useState(true)
    const [checked,setChecked] = useState({
        lectura: 1,
        escritura:1
    })

    const getModulos = async () => {
        setLoading(true)
        const data = { idPadre: 0, etiqueta: "MODULOS" }
        let result = await axiosClient.post(`parametro/listar/`, data)
        let resultado = result.data.data
        let getSeccionesListado = []
        resultado.forEach(async (element) => {
            let secciones = await getSecciones(element.idParametro)
            let objectoModulo = {
                modulo: element.Descripcion
                , codModulo: element.Valor, seccion: '', escritura: 1, lectura: 1
            }
            getSeccionesListado.push(objectoModulo)
            secciones.forEach(seccion => {
                let objeto = {
                    modulo: element.Descripcion, seccion: seccion.Descripcion
                    , codModulo: element.Valor, codSeccion: seccion.Valor, escritura: 1, lectura: 1
                }
                getSeccionesListado.push(objeto)
            })

        });
        setTimeout(() => {
            setListarModulos(getSeccionesListado)
            setLoading(false)
            let listaEnviada = getSeccionesListado.filter(element=>element.codSeccion !==undefined)
            listadoRoles(listaEnviada)
        }, 2500)

        return getSeccionesListado
    }

    const getSecciones = async (idParametro) => {
        let obj = { idPadre: idParametro, etiqueta: "SECCIONES" }
        let resultSec = await axiosClient.post(`parametro/listar/`, obj)
        return resultSec.data.data
    }

    useEffect(() => {
        getModulos()
    }, [])

    const moduloSelected = (evento, modulo, tipo) => {
        let event = evento.target.checked
        let value = 0
        let seleccionado = []
        let result = listarModulos.filter(element => element.modulo === modulo && element.seccion !== '')
        if (result.length !== 0) {


            if (event === true) {
                value = 1
                if (tipo === 'escritura') {
                    seleccionado = listarModulos.map(element => {
                        if (element.modulo === modulo) { //&& element.seccion !==''
                            return {
                                modulo: element.modulo, seccion: element.seccion
                                , codModulo: element.codModulo, codSeccion: element.codSeccion, escritura: 1, lectura: 1
                            }
                        } else {
                            return {
                                modulo: element.modulo, seccion: element.seccion
                                , codModulo: element.codModulo, codSeccion: element.codSeccion, escritura: element.escritura, lectura: element.lectura
                            }
                        }
                    })
                } else {
                    seleccionado = listarModulos.map(element => {
                        if (element.modulo === modulo) { //&& element.seccion !==''
                            return {
                                modulo: element.modulo, seccion: element.seccion
                                , codModulo: element.codModulo, codSeccion: element.codSeccion, lectura: value, escritura: element.escritura
                            }
                        } else {
                            return {
                                modulo: element.modulo, seccion: element.seccion
                                , codModulo: element.codModulo, codSeccion: element.codSeccion, escritura: element.escritura, lectura: element.lectura
                            }
                        }
                    })
                }
            } else {
                value = 0
                if (tipo === 'escritura') {
                    seleccionado = listarModulos.map(element => {
                        if (element.modulo === modulo) { //&& element.seccion !==''
                            return {
                                modulo: element.modulo, seccion: element.seccion
                                , codModulo: element.codModulo, codSeccion: element.codSeccion, escritura: value, lectura: element.lectura
                            }
                        } else {
                            return {
                                modulo: element.modulo, seccion: element.seccion
                                , codModulo: element.codModulo, codSeccion: element.codSeccion, escritura: element.escritura, lectura: element.lectura
                            }
                        }
                    })
                } else {
                    seleccionado = listarModulos.map(element => {
                        if (element.modulo === modulo) { //&& element.seccion !==''
                            return {
                                modulo: element.modulo, seccion: element.seccion
                                , codModulo: element.codModulo, codSeccion: element.codSeccion, lectura: 0, escritura: 0
                            }
                        } else {
                            return {
                                modulo: element.modulo, seccion: element.seccion
                                , codModulo: element.codModulo, codSeccion: element.codSeccion, escritura: element.escritura, lectura: element.lectura
                            }
                        }
                    })
                }
            }
            setListarModulos(seleccionado)
            // let selectedList = seleccionado.filter(element=>element.escritura !==0 || element.lectura!==0)
            let selectedList = seleccionado.filter(element => element.codSeccion !== undefined)
            listadoRoles(selectedList)
        }
    }
    const seccionSelected = (evento, seccion, tipo) => {
        let event = evento.target.checked
        let value = 0
        let objecto = {}
        let result = listarModulos.find(element => element.seccion === seccion)
        if (event === true) {
            value = 1
            if (tipo === 'escritura') {
                objecto = {
                    modulo: result.modulo, seccion: result.seccion
                    ,codModulo: result.codModulo, codSeccion: result.codSeccion, lectura: 1, escritura: value
                }
            } else {
                objecto = {
                    modulo: result.modulo, seccion: result.seccion
                    , codModulo: result.codModulo, codSeccion: result.codSeccion, lectura: value, escritura: result.escritura
                }
            }
        } else {
            value = 0
            if (tipo === 'escritura') {
                objecto = {
                    modulo: result.modulo, seccion: result.seccion
                    ,codModulo: result.codModulo, codSeccion: result.codSeccion, lectura: result.lectura, escritura: value
                }
            } else {
                objecto = {
                    modulo: result.modulo, seccion: result.seccion
                    , codModulo: result.codModulo, codSeccion: result.codSeccion, lectura: value, escritura: 0
                }
            }
        }
             
        
        let indice = listarModulos.findIndex((elemento) =>
            elemento.codSeccion === objecto.codSeccion
        )
        let listanueva = listarModulos
        listanueva[indice] = objecto
        setListarModulos(listanueva)
        // let selectedList = listanueva.filter(element=>element.escritura !==0 || element.lectura!==0)
        let selectedList = listanueva.filter(element => element.codSeccion !== undefined)
        listadoRoles(selectedList)
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
                        modulo: element.modulo, seccion: element.seccion
                        , codModulo: element.codModulo, codSeccion: element.codSeccion, escritura: 1, lectura: 1
                    }
                })
                setChecked({
                    lectura:1,
                    escritura: 1
                })
                
            }else{
                seleccionado = listarModulos.map(element=>{
                    return {
                        modulo: element.modulo, seccion: element.seccion
                        , codModulo: element.codModulo, codSeccion: element.codSeccion, escritura: element.escritura, lectura: value
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
                        modulo: element.modulo, seccion: element.seccion
                        , codModulo: element.codModulo, codSeccion: element.codSeccion, escritura: value, lectura: element.lectura
                    }
                })
                setChecked({
                    lectura:checked.lectura,
                    escritura: value
                })
                
            }else{
                seleccionado = listarModulos.map(element=>{
                    return {
                        modulo: element.modulo, seccion: element.seccion
                        , codModulo: element.codModulo, codSeccion: element.codSeccion, escritura: 0, lectura: 0
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

    if (dataChecks) {
        return (
            <>
                <p className="pt-4"></p>
                {(loading) ? <Loading></Loading> :
                    <Table striped borderless hover size="sm">
                        <thead>
                            <tr className="bgCheck pl-3 py-3 mb-0">
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

                            {listarModulos.map((elemento, index) =>
                                (elemento.seccion === '') ?
                                    <tr key={index}>
                                        <td> <strong className="pl-3" style={{letterSpacing: '1.45px'}}> Módulo {elemento.modulo}</strong></td>
                                        <td className="px-3"><input checked={(elemento.escritura === 1) ? true : false} onChange={(e) => moduloSelected(e, elemento.modulo, 'escritura')} type="checkbox" id={elemento.modulo + 'm'} />
                                            <label className="labelcheck" htmlFor={elemento.modulo + 'm'}></label>
                                        </td>
                                        <td className="px-3"><input checked={(elemento.lectura === 1) ? true : false} onChange={(e) => moduloSelected(e, elemento.modulo, 'lectura')} type="checkbox" id={elemento.modulo + 'ma'} />
                                            <label className="labelcheck" htmlFor={elemento.modulo + 'ma'}></label>
                                        </td>

                                    </tr>
                                    :
                                    <tr key={index}>
                                        <td> <span className="pl-4">{elemento.seccion}</span> </td>
                                        <td className="px-3"><input checked={(elemento.escritura === 1) ? true : false} onChange={(e) => seccionSelected(e, elemento.seccion, 'escritura')} type="checkbox" id={elemento.seccion} />
                                            <label className="labelcheck" htmlFor={elemento.seccion}></label>
                                        </td>
                                        <td className="px-3"><input checked={(elemento.lectura === 1) ? true : false} onChange={(e) => seccionSelected(e, elemento.seccion, 'lectura')} type="checkbox" id={elemento.seccion + 'a'} />
                                            <label className="labelcheck" htmlFor={elemento.seccion + 'a'}></label>
                                        </td>

                                    </tr>

                            )
                            }
                        </tbody>
                    </Table>
                }
            </>
        );
    } else {
        return (
            <>
            </>
        );
    }

}

export default CheckBoxRol;