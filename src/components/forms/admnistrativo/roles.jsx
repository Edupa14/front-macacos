/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import HeaderForm from 'components/forms/headerForm'
import CheckBoxRol from 'components/checks/roles'
import CheckBoxRolEdit from 'components/checks/editrol'
import { useSelector } from 'react-redux';
import setPermisosForm from 'helpers/permisosForm';
import alerta, { alertaEliminar } from 'helpers/alerts'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from 'components/alerts/error';
import { textoMayusculas } from 'helpers/reusablesForms';


const FormularioRoles = ({ actualizarCambios, dataForm, escritura, tipo, peticion }) => {
    const RolSchema = yup.object().shape({
        valor: yup.string().required('El campo es requerido').max(4, 'Máximo 4 caracteres'),
        descripcion: yup.string().required('El campo es requerido')
    });
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(RolSchema)
    });
    const user = useSelector(store => store.users.objecto)
    const estadosStore = useSelector(store => store.mixed.estados)
    const [tipoFormulario, setTipoFormulario] = useState(tipo)
    const [readAll, setReadAll] = useState(false)
    const [readOne, setReadOne] = useState(false)
    const [cambioHeader, setCambioHeader] = useState(false)
    const [listadoAccesos, setListadoAccesos] = useState([])
    const [accesosEdit, setAccesosEdit] = useState([])
    const [dataFormulario, setDataFormulario] = useState({
        etiqueta: '',
        valor: '',
        descripcion: ''
    })
    const initialForm = {
        etiqueta: '',
        valor: '',
        descripcion: ''
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'valor') value = textoMayusculas(value)
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }

    const getDataRol = async () => {
        if (dataForm.idParametro !== undefined) {
            let result = await axiosClient.get(`parametro/listar/id/${dataForm.idParametro}`)
            return result.data.data
        }
    }

    const clearForm = (data) => {
        setDataFormulario({ ...initialForm })
        setTipoFormulario("ADD")
        if (data !== 1) {
            actualizarCambios()
        }
    }

    const deleteForm = async () => {
        let eliminado = await alertaEliminar()
        if (eliminado) {
            eliminarRol()
        }

    }

    const editForm = (editTipo) => {
        setTipoFormulario(editTipo)
    }

    const eliminarRol = async () => {
        try {
            let idParametro = dataForm.idParametro
            if (idParametro !== undefined) {
                await axiosClient.delete(`parametro/eliminar/${idParametro}`)
                alerta('Rol eliminado exitosamente', 'success')
                actualizarCambios(true)
                clearForm(1)
            }
        } catch (error) {
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }

    }

    const guardarFormulario = async (e) => {
        try {
            let FORM = new FormData()
            FORM.append('idPadre', 0)
            FORM.append('descripcion', dataFormulario.descripcion)
            FORM.append('valor', dataFormulario.valor)
            FORM.append('etiqueta', "ROL")
            if (tipoFormulario === "ADD") {
                let nuevoArray = listadoAccesos.map(element => {
                    return { ...element, codRol: dataFormulario.valor, idUsuReg: user.idUsuario, idUsuAct: user.idUsuario }
                })
                let veri = verificarNoVacio(nuevoArray)
                if (veri.length === 0) {
                    alerta('Debe seleccionar al menos 1 acceso', 'error')
                } else {
                    await axiosClient.post('parametro/crear', FORM)
                    let respAcceso = await axiosClient.post('acceso/registrar', nuevoArray)
                    if (respAcceso.data.data !== 'Ya existe el codigo') {
                        alerta("Rol añadido exitosamente", "success")
                        actualizarCambios(true)
                        clearForm(1)
                    } else {
                        alerta(respAcceso.data.data, "error")
                    }
                }

            } else {
                FORM.append('estado', dataFormulario.estado)
                FORM.append('idParametro', dataFormulario.idParametro)
                let nuevoArray = listadoAccesos.map(element => {
                    return { ...element, codRol: dataFormulario.valor, idUsuAct: user.idUsuario }
                })
                let veri = verificarNoVacio(nuevoArray)
                if (veri.length === 0) {
                    alerta('Debe seleccionar al menos 1 acceso', 'error')
                } else {
                    await axiosClient.put('parametro/actualizar', FORM)
                    await axiosClient.put('acceso/actualizar', nuevoArray)
                    alerta("Rol editado exitosamente", "success")
                    actualizarCambios(true)
                    clearForm(1)
                }
            }
        } catch (error) {
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }

    }


    const verificarNoVacio = (array) => {
        let rpta = []
        rpta = array.filter(element => element.lectura !== 0 || element.escritura !== 0)
        return rpta
    }


    useEffect(() => {
        async function loadRol() {
            let response = await getDataRol()
            if (response !== undefined) {

                setDataFormulario(response)
                setTipoFormulario("CANCEL")
                let codRol = response.valor
                let accesosRol = await axiosClient.get(`acceso/id/${codRol}`)
                setAccesosEdit(accesosRol.data.data)
                setCambioHeader(!cambioHeader)
            }
        }

        loadRol()
    }, [peticion])

    useEffect(() => {
        let permisos = setPermisosForm(escritura, tipoFormulario)
        setReadAll(permisos.readAll)
        setReadOne(permisos.readOne)
    }, [tipoFormulario])

    const obtenerAccesos = (listadodeaccesos) => {
        setListadoAccesos(listadodeaccesos)
    }

    if (dataFormulario === {}) {
        return (
            <>
            </>
        )
    } else {
        return (
            <div className="test-m">
                <HeaderForm cambioHeader={cambioHeader} escritura={escritura} limpiar={clearForm} eliminar={deleteForm} editar={editForm} tipoForm={tipoFormulario}></HeaderForm>
                <Form onSubmit={handleSubmit(guardarFormulario)}>
                    <Form.Group as={Row} className="px-5 pt-5 " >
                        <Form.Label column xs={12} sm={3}>
                            Código <span className="required">*</span>
                        </Form.Label>
                        <Col xs={12} sm={9}>
                            <Form.Control ref={register} readOnly={readOne} size="sm" value={dataFormulario.valor} onChange={handleChange} name="valor" type="text" placeholder="Código de perfil" />
                            {/* {formErrors.valor ? <ErrorMessage mensaje={formErrors.valor}></ErrorMessage> : null} */}
                            <ErrorMessage mensaje={errors.valor?.message}></ErrorMessage>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="px-5" >
                        <Form.Label column xs={12} sm={3}>
                            Descripción <span className="required">*</span>
                        </Form.Label>
                        <Col xs={12} sm={9}>
                            <Form.Control ref={register} size="sm" readOnly={readAll} value={dataFormulario.descripcion} onChange={handleChange} name="descripcion" type="text" placeholder="Descripción del perfil" />
                            {/* {formErrors.descripcion ? <ErrorMessage mensaje= {formErrors.descripcion}></ErrorMessage> : null} */}
                            <ErrorMessage mensaje={errors.descripcion?.message}></ErrorMessage>
                        </Col>
                    </Form.Group>
                    {(tipoFormulario !== "ADD") ?
                        <Form.Group as={Row} className="px-5" >
                            <Form.Label column sm={3}>
                                Estado
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control size="sm" as="select" disabled={readAll} value={dataFormulario.estado} onChange={handleChange} name="estado" placeholder="Tipo Doc" >
                                    {estadosStore.map(element =>
                                        <option key={element.Valor} value={element.Valor}>{element.Descripcion}</option>
                                    )}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        : ''}
                    {(tipoFormulario !== "ADD") ?
                        <CheckBoxRolEdit readOnly accesosEdit={accesosEdit} dataChecks={[{ 'rol': 'r' }]} listadoRoles={obtenerAccesos}></CheckBoxRolEdit>

                        : <CheckBoxRol readOnly dataChecks={[{ 'rol': 'r' }]} listadoRoles={obtenerAccesos}></CheckBoxRol>}
                    <Form.Group as={Row} className={`${escritura ? '' : "d-none"}`}>
                        {(tipoFormulario === "ADD") ?
                            <Col sm={6} className=" border-acciones">
                                <button type="submit" className="btn w-100 done-btn">Aceptar</button>
                            </Col> :
                            <>
                                {(tipoFormulario === "EDIT") ?
                                    <Col sm={6} className="border-acciones">
                                        <div className="btn w-100 delete-btn" onClick={deleteForm}>Eliminar perfil</div>
                                    </Col>
                                    : <></>}
                                {(tipoFormulario === "EDIT") ?
                                    <Col sm={6} className="border-acciones">
                                        <button type="submit" className="btn w-100 done-btn"><strong>Aceptar</strong></button>
                                    </Col>
                                    : <>
                                    </>}
                            </>
                        }
                    </Form.Group>

                </Form>

            </div>
        );
    }
}

export default FormularioRoles;