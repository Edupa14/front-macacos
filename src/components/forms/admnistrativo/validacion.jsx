/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import HeaderForm from 'components/forms/headerForm'
import setPermisosForm from 'helpers/permisosForm';
import alerta,{alertaEliminar} from 'helpers/alerts'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from 'components/alerts/error';
import { textoMayusculas } from 'helpers/reusablesForms';

const FormularioValidaciones = ({ actualizarCambios, dataForm, escritura, tipo, peticion }) => {
    const ValoresSchema = yup.object().shape({
        idPadre: yup.string().required('El campo es requerido'), 
        valor: yup.string().max(4,'Maximo 4 caracteres').required('El campo es requerido'),
        descripcion: yup.string().required('El campo es requerido')
    });
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(ValoresSchema)
      });


    const [tipoFormulario,setTipoFormulario] = useState(tipo) 
    const [readAll,setReadAll] = useState(false)
    const [readOne,setReadOne] = useState(false)
    const [cambioHeader, setCambioHeader] = useState(false)
    const [bool,setBool] = useState(true)
    const [validaciones,setValidaciones] = useState([])
    const [codigo,setCodigo] = useState('')
    const [dataFormulario,setDataFormulario] = useState({
        etiqueta:'',
        descripcion:'',
        parametro:'',
        observacion:'',
        valor:'',
        idPadre:''
    })
    const initialForm = {
        etiqueta: '',
        descripcion: '',
        valor: '',
        estado: 'ACT',
        idPadre:''
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'valor') value = textoMayusculas(value)
        let index = ''
        if(name === 'idPadre'){
             index = e.target.selectedIndex;
            setCodigo(textoMayusculas(e.target.options[index].text))
        }
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }

    const getDataParametro = async () => {
        if (dataForm.idParametro !== undefined) {
            let result = await axiosClient.get(`parametro/listar/id/${dataForm.idHijo}`)
            let result1 = []
            if (result.data.data !== undefined) {
                result1 = result.data.data
            }
            let respuesta = { response: result1 }
            return respuesta
        }
    }

    const clearForm = (data) => {
        setDataFormulario({ ...initialForm })
        if(data!==1){
            actualizarCambios()
        }
    }

    const deleteForm = async() => {
        let eliminado = await alertaEliminar()
        if(eliminado){
            eliminarParametro()
        }
    }

    const editForm = (editTipo) => {
        setTipoFormulario(editTipo)
    }

    const eliminarParametro = async () => {
        try{
            let idParametro =  dataFormulario.idParametro
            if (idParametro !== undefined) {
                await axiosClient.delete(`parametro/eliminar/${idParametro}`)
                alerta("Eliminado correctamente", "success")
                actualizarCambios(true)
                clearForm(1)
            }
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
       
    }

    const guardarFormulario = async (e) => {
        try{
            let FORM = new FormData()
            if (tipoFormulario === "ADD") {
                FORM.append('etiqueta', 'VALIDACIONES')
                if(dataFormulario.idPadre!==''){
                    let datas = {}
                    datas.idPadre = dataFormulario.idPadre
                    datas.etiqueta = codigo
                    datas.valor = dataFormulario.valor
                    datas.descripcion = dataFormulario.descripcion
                    await axiosClient.post('parametro/crear', datas)
                    alerta("Validacion añadida exitosamente", "success")
                    actualizarCambios(true)
                    clearForm(1)
                }else{
                    alerta('Seleccionar una Categoria','error')
                }
    
            } else {
                let data = {}
                data.idPadre = dataFormulario.idPadre
                data.descripcion = dataFormulario.descripcion
                data.idParametro = dataFormulario.idParametro
                if(codigo !==''){
                    data.etiqueta = codigo
                }else{
                    data.etiqueta = dataFormulario.codigopadreDescripcion
                }
                await axiosClient.put('parametro/actualizar', data)
                clearForm()
                alerta("Validacion editada exitosamente", "success")
                setBool(true)
                actualizarCambios(true)
                clearForm(1)
            }
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }

    }
    const getDataValidaciones = async()=>{
        let conf = {}; 
        conf.estado = "ACT";
        conf.idPadre = 0;
        conf.etiqueta = "VALIDACIONES";
        let result = await axiosClient.post(`parametro/listar`,conf) 
        setValidaciones(result.data.data);
    }


    useEffect(() => {
        async function loadParametro() {
            let respuesta = await getDataParametro()
            if (respuesta !== undefined) {
                let response = respuesta.response
                setDataFormulario(response)
                setTipoFormulario("CANCEL")
            }
        }
        setBool(false)
        loadParametro()
        setCambioHeader(!cambioHeader)
    }, [peticion])

    useEffect(() => {
        let permisos = setPermisosForm(escritura, tipoFormulario)
        setReadAll(permisos.readAll)
        setReadOne(permisos.readOne)
    }, [tipoFormulario])


    useEffect(()=>{
        getDataValidaciones()
        setBool(false)
        setTipoFormulario("ADD")
    }, [])

    if(dataFormulario === {}){
        return (
            <>
            </>
        )
    }else{
    return (
        <div className="test-m">
            <HeaderForm cambioHeader={cambioHeader} escritura={escritura} limpiar={clearForm} eliminar={deleteForm} editar={editForm} tipoForm = {tipoFormulario}></HeaderForm>
            <Form onSubmit={handleSubmit(guardarFormulario)}>
            <Form.Group as={Row} >
                    <Form.Label column xs={12} sm={3}>
                        Categoria <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" as="select" disabled={readAll} value={dataFormulario.idPadre} onChange={handleChange} name="idPadre">
                            <option value="">Seleccionar</option>
                            {validaciones.map((element,index)=>
                                <option key={index} value={element.idParametro}>{element.Descripcion}</option>
                            )}
                        </Form.Control> 
                        {(tipoFormulario==="ADD")?<ErrorMessage mensaje={errors.idPadre?.message}></ErrorMessage>
                        :''}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column xs={12} sm={3}>
                        Descripción del mensaje <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" readOnly={readAll} value={dataFormulario.descripcion} onChange={handleChange} name="descripcion" type="text" placeholder="Descripción del Parámetro" />
                        <ErrorMessage mensaje={errors.descripcion?.message}></ErrorMessage>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column xs={12} sm={3}>
                        Código de mensaje <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" readOnly={readOne} value={dataFormulario.valor} onChange={handleChange} name="valor" type="text" placeholder="cod mensaje" />
                        <ErrorMessage mensaje={errors.valor?.message}></ErrorMessage>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`}>
                    
                {(tipoFormulario === "ADD") ?
                
                        <Col sm={6} className="border-acciones">
                            <button hidden={bool} type="submit" className="btn w-100 done-btn"><strong>Aceptar</strong></button>
                        </Col>:
                    <>
                        <Col sm={6} className="border-acciones">
                            <button hidden={bool} type="submit" className="btn w-100 done-btn"><strong>Editar</strong></button>
                                </Col>
                            </>
                        }
                    </Form.Group>

                </Form>

            </div>
        );
    }
}

export default FormularioValidaciones;