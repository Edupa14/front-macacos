import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import HeaderForm from 'components/forms/headerForm'
import { useSelector } from 'react-redux';
import setPermisosForm from 'helpers/permisosForm';
import alerta from 'helpers/alerts'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from 'components/alerts/error';
import { textoMayusculas } from 'helpers/reusablesForms';


 const FormularioVetadas = ({ actualizarCambios, dataForm, escritura, tipo, peticion }) => {
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
    const [dataFormulario, setDataFormulario] = useState({})
    const initialForm = {
        descripcion: ''
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'descripcion') value = textoMayusculas(value)
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });

    }

    const getDataDescripcion = async () => {
        if (dataForm.idParametro !== undefined) {
            let result = await axiosClient.get(`parametro/listar/id/${dataForm.idParametro}`)
            return result.data.data
        }
    }

    const clearForm = () => {
        setDataFormulario({ ...initialForm })
        setTipoFormulario("ADD")
    }

    const deleteForm = () => {
        eliminarDescripcion()
    }

    const editForm = (editTipo) => {
        setTipoFormulario(editTipo)
    }

    const eliminarDescripcion = async () => {
        let idParametro = dataForm.idParametro
        if (idParametro !== undefined) {
            await axiosClient.delete(`parametro/eliminar/${idParametro}`)
            alerta('Rol eliminado exitosamente','success')
            actualizarCambios()
        }
    }

    const guardarFormulario = async (e) => {
        let FORM = new FormData()
        FORM.append('idPadre', 0)
        FORM.append('descripcion', dataFormulario.descripcion)
        FORM.append('valor', dataFormulario.valor)
        FORM.append('etiqueta', "ROL")
        if (tipoFormulario === "ADD") {
            alerta("Descripción añadida exitosamente", "success")
            actualizarCambios()
            clearForm()
            
        }else {
            alerta("Rol editado exitosamente", "success")
            actualizarCambios()
            clearForm()
        }
    }


    useEffect(() => {
        async function loadRol() {
            let response = await getDataDescripcion()
            if (response !== undefined) {
                setDataFormulario(response)
                setTipoFormulario("CANCEL")
            }
        }

        loadRol()
    }, [peticion])

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
            <div className="test-m">
                <HeaderForm escritura={escritura} limpiar={clearForm} eliminar={deleteForm} editar={editForm} tipoForm={tipoFormulario}></HeaderForm>
                <Form onSubmit={handleSubmit(guardarFormulario)}>
                    <Form.Group as={Row} >
                        <Form.Label column xs={12} sm={3}>
                            Descripcion Vetada<span className="required">*</span>
                        </Form.Label>
                        <Col xs={12} sm={9}>
                            <Form.Control ref={register} size="sm" readOnly={readAll} value={dataFormulario.descripcion} onChange={handleChange} name="descripcion" type="text" placeholder="Descripcion del Rol" />
                            <ErrorMessage mensaje={errors.descripcion?.message}></ErrorMessage>
                        </Col>
                    </Form.Group>
                    <Form.Group  >
                        <Form.Check name="industria" value="VET" label="Vetada" type="radio" id="vetada" />
                        <Form.Check name="industria" value="APR" label="Aprobada" type="radio" id="aprobada" />           
                    </Form.Group>
                    {(tipoFormulario !== "ADD") ?
                        <Form.Group as={Row} >
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
                    <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`}>
                        {(tipoFormulario === "ADD") ?
                            <Col sm={6} className="border-left  border-acciones">
                                <button type="submit" className="btn w-100 done-btn">Aceptar</button>
                            </Col> :
                            <>
                                <Col sm={6} className="border-acciones">
                                    <a className="btn w-100 delete-btn" onClick={eliminarDescripcion}>Eliminar Descripción</a>
                                </Col>
                                <Col sm={6} className="border-acciones">
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

 export default FormularioVetadas;