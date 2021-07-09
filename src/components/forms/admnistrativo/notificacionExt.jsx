/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import HeaderForm from 'components/forms/headerForm';
import setPermisosForm from 'helpers/permisosForm';
import * as yup from "yup";
import alerta, { alertaEliminar } from 'helpers/alerts';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { textoMayusculas, arregloTString, stringTArreglo } from 'helpers/reusablesForms';
import Index from 'components/texfield/index';
import Select from 'components/texfield/select';
import ErrorMessage from 'components/alerts/error';
import {validateCorreos} from './validarNotis'

const FormularioNotificacionExt = ({ actualizarCambios, dataForm, escritura, tipo, peticion }) => {

    const NotSchema = yup.object().shape({
        notificacion: yup.string().required('El siguiente campo es requerido'),
        tipNotEtiqueta: yup.string().required('El siguiente campo es requerido'),
        asunto: yup.string().required('El siguiente campo es requerido'),
        //para: yup.string().required('El siguiente campo es requerido')
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(NotSchema)
    });
    const [limpieza, setLimpieza] = useState(false)
    const [peticiones, setPeticiones] = useState(true)
    const [tipoFormulario, setTipoFormulario] = useState(tipo)
    const [readAll, setReadAll] = useState(false)
    const [readOne, setReadOne] = useState(false)
    const [cambioHeader, setCambioHeader] = useState(false)
    const [dataHtml, setDataHtml] = useState('')
    const [dataMultiP, setDataMultiP] = useState('')
    const [dataMultiCC, setDataMultiCC] = useState('')
    const [dataMultiCCO, setDataMultiCCO] = useState('')
    const [para, setPara] = useState([])
    const [cc, setCc] = useState([])
    const [cco, setCco] = useState([])
    const [dataFormulario, setDataFormulario] = useState({
        notificacion: '',
        tipNotEtiqueta: '',
        asunto: '',
        para: [],
        cc: [],
        cco: [],
        mensaje: ''
    })
    const initialForm = {
        notificacion: '',
        tipNotEtiqueta: '',
        asunto: '',
        para: [],
        cc: [],
        cco: [],
        mensaje: '',
        idNotificacion: undefined
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "nroDoc") value = textoMayusculas(value)
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }

    const getDataNot = async () => {
        let response = await axiosClient.get(`/notificacion/id/${dataForm.idNotificacion}`)
        return response.data.data
    }

    const clearForm = (data) => {
        setDataFormulario({ ...initialForm })
        setPara([])
        setCc([])
        setCco([])
        setDataMultiP([])
        setDataMultiCC([])
        setDataMultiCCO([])
        setDataHtml('')
        setLimpieza(!limpieza)
        setPeticiones(!peticiones)
        if (data !== 1) {
            actualizarCambios()
        }
    }

    const deleteForm = () => {
        eliminarNot()
    }

    const editForm = (editNot) => {
        setTipoFormulario(editNot)
    }

    const eliminarNot = async () => {
        let eliminado = await alertaEliminar()
        if (eliminado) {
            try {
                let idNotificacion = dataForm.idNotificacion
                if (idNotificacion !== undefined) {
                    await axiosClient.delete(`notificacion/eliminar/${idNotificacion}`)
                    alerta("Notificación eliminada exitosamente", "success")
                    actualizarCambios(true)
                    clearForm(1)
                }
            } catch (error) {
                alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
            }
    
        }
    }

    const guardarFormulario = async (e) => {
        try {
            let valid = [validateCorreos(dataMultiP),validateCorreos(dataMultiCC)].includes(false)
            if(valid){
                alerta('Llenar los campos de destinatarios,','error')
            }else{
                let objecto = {
                    notificacion: dataFormulario.notificacion,
                    tipNotEtiqueta: dataFormulario.tipNotEtiqueta,
                    idUsuario: localStorage.idUsuario,
                    asunto: dataFormulario.asunto,
                    de: 'notificaciones@gmail.com',
                    para: dataMultiP,
                    cc: dataMultiCC,
                    cco: dataMultiCCO,
                    mensaje: dataHtml,
                    tipNotif: 'EXT',
                    fecDesde: '2020-03-12',
                    fecHasta: '2020-03-31'
                }
                if (tipoFormulario === "ADD") {
                    await axiosClient.post('notificacion/registrar', objecto)
                    alerta("Notificación añadido exitosamente", "success")
                    actualizarCambios(true)
                    clearForm(1)

                } else {

                    let objectoAct = {
                        idNotificacion: dataForm.idNotificacion,
                        notificacion: dataFormulario.notificacion,
                        idUsuAct: localStorage.idUsuario,
                        asunto: dataFormulario.asunto,
                        para: dataMultiP,
                        cc: dataMultiCC,
                        cco: dataMultiCCO,
                        mensaje: dataHtml,
                        fecDesde: '2020-03-12',
                        fecHasta: '2020-03-31',
                        estadoNot: 'ACT',
                        estado: 'ACT'
                    }
                    await axiosClient.put('notificacion/actualizar', objectoAct)
                    alerta("Notificación editada exitosamente", "success")
                    setTipoFormulario("ADD")
                    actualizarCambios(true)
                    clearForm(1)
                }
            }    
        } catch (error) {
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }

    }

    const cambiarHTML = (dataHijoHtml) => {
        setDataHtml(dataHijoHtml)
    }

    const mSelect = (dataHijoMultiP) => {
        setDataMultiP(arregloTString(dataHijoMultiP, 'value'))
    }
    const mSelectCC = (dataHijoMultiCC) => {
        setDataMultiCC(arregloTString(dataHijoMultiCC, 'value'))
    }
    const mSelectCCO = (dataHijoMultiCCO) => {
        setDataMultiCCO(arregloTString(dataHijoMultiCCO, 'value'))
    }

    useEffect(() => {
        async function loadNot() {
            let response = await getDataNot()
            if (dataForm !== undefined) {
                if (dataForm.idNotificacion !== undefined) {
                    setTipoFormulario("CANCEL")
                    setDataFormulario(response)
                    setPara(convertirTextoToArray(stringTArreglo(response.para)))
                    setCc(convertirTextoToArray(stringTArreglo(response.cc)))
                    setCco(convertirTextoToArray(stringTArreglo(response.cco)))
                    setPeticiones(!peticiones)
                    setCambioHeader(!cambioHeader)
                }
            }
        }
        loadNot()
    }, [peticion])

    const convertirTextoToArray = (array) => {
        let newArray = array.map(element => {
            return { value: element, label: element }
        })
        return newArray
    }

    useEffect(() => {
        let permisos = setPermisosForm(escritura, tipoFormulario)
        setReadAll(permisos.readAll)
        setReadOne(permisos.readOne)
    }, [tipoFormulario])

    if (dataFormulario === {}) {
        return (
            <>
            </>
        )
    } else {
        return (
            <div className="test-m" >
                <HeaderForm cambioHeader={cambioHeader} escritura={escritura} limpiar={clearForm} eliminar={deleteForm} editar={editForm} tipoForm={tipoFormulario}></HeaderForm>
                <Form onSubmit={handleSubmit(guardarFormulario)}>
                    <Form.Group as={Row} >
                        <Form.Label column sm={3}>
                            Nombre de la notificación<span className="required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control ref={register} size="sm" readOnly={readAll} value={dataFormulario.notificacion} onChange={handleChange} name="notificacion" type="text" placeholder="" />
                            <ErrorMessage mensaje={errors.notificacion?.message}></ErrorMessage>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm={3}>
                            Codigo de notificación<span className="required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control ref={register} size="sm" readOnly={readOne} value={dataFormulario.tipNotEtiqueta} onChange={handleChange} name="tipNotEtiqueta" type="text" placeholder="" />
                            <ErrorMessage mensaje={errors.tipNotEtiqueta?.message}></ErrorMessage>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm={3}>
                            Asunto<span className="required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control ref={register} size="sm" readOnly={readAll} value={dataFormulario.asunto} onChange={handleChange} name='asunto' type="text" placeholder="" />
                            <ErrorMessage mensaje={errors.asunto?.message}></ErrorMessage>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} >
                        <Form.Label column sm={3}>
                            Para<span className="required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                            <Select select={mSelect} limpieza={limpieza} dataOptions={para} peticiones={peticiones} tipoFormulario={tipoFormulario} name='para' />
                            <ErrorMessage mensaje={errors.para?.message}></ErrorMessage>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} >
                        <Form.Label column sm={3}>
                            CC
                        </Form.Label>
                        <Col sm={9}>
                            <Select select={mSelectCC} limpieza={limpieza} dataOptions={cc} peticiones={peticiones} />
                            {/* <Form.Control ref={register} size="sm" readOnly={readAll} value={dataFormulario.cc} onChange={handleChange} name="cc" type="email" placeholder="" /> */}
                            {/* {formErrors.correo ? <ErrorMessage mensaje={formErrors.correo}></ErrorMessage> : null} */}
                            {/* <ErrorMessage mensaje={errors.cc?.message}></ErrorMessage> */}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} >
                        <Form.Label column sm={3}>
                            CCO
                        </Form.Label>
                        <Col sm={9}>
                            <Select select={mSelectCCO} limpieza={limpieza} dataOptions={cco} peticiones={peticiones} />
                            {/* <Form.Control ref={register} size="sm" readOnly={readAll} value={dataFormulario.cco} onChange={handleChange} name="cco" type="email" placeholder="" /> */}
                            {/* {formErrors.correo ? <ErrorMessage mensaje={formErrors.correo}></ErrorMessage> : null} */}
                            {/* <ErrorMessage mensaje={errors.cco?.message}></ErrorMessage> */}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm={12}>
                            Mensaje<span className="required">*</span>
                        </Form.Label>
                        <Col sm={12}>
                            <Index cambiarHTML={cambiarHTML} limpieza={limpieza} mensaje={dataFormulario.mensaje} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`}>
                        {(tipoFormulario === "ADD") ?
                            <Col sm={6} className=" ">
                                <button type="submit" className="btn w-100 done-btn"  >Aceptar</button>
                            </Col> :
                            <>
                                <Col sm={6} >
                                    <div className="btn  delete-btn w-100" onClick={eliminarNot}>Eliminar Notificación</div>
                                </Col>
                                <Col sm={6} >
                                    <button type="submit" className="btn w-100 done-btn"><strong>Aceptar</strong></button>
                                </Col>
                            </>
                        }
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default FormularioNotificacionExt;