/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React,{useState,useEffect} from 'react';
import {Form,Row,Col} from 'react-bootstrap'
import HeaderForm from 'components/forms/headerForm'
import {useSelector} from 'react-redux';
import setPermisosForm from 'helpers/permisosForm';
import alerta from 'helpers/alerts'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from 'components/alerts/error';
import { textoMayusculas } from 'helpers/reusablesForms';
import {filterTipo} from 'helpers/filtroBuscador'
import ModalValores from 'components/modal/administrativo/modalValor'
import iconVision from 'img/planilla/vision.svg'

const FormularioValores = ({actualizarCambios,dataForm,escritura,tipo,peticion}) => {
    const ValoresSchema = yup.object().shape({
        valor: yup.string().required('El campo es requerido'),//descripcion -> parametro
        observacion: yup.string().required('El campo es requerido'),//valor
      });  
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(ValoresSchema)
      });
    const [propsTableData,setPropsTableData] = useState([])

    const parametrosStore = useSelector(store=>store.parametros.array)
    const [grupoEtiqueta,setGrupoEtiqueta] = useState([])
    const [tipoFormulario,setTipoFormulario] = useState(tipo) 
    const [readAll,setReadAll] = useState(false)
    const [readOne,setReadOne] = useState(false)
    const [cambioHeader, setCambioHeader] = useState(false)
    const [modales,setModal] = useState(false)
    const [dataFormulario,setDataFormulario] = useState({
        etiqueta:'',
        descripcion:'',
        parametro:'',
        observacion:'',
        valor:''
    })
    const initialForm = {
        etiqueta:'',
        descripcion:'',
        parametro:'',
        observacion:'',
        valor:''
    }

    const handleChange =(e)=>{
        let { name, value } = e.target;
         if(name === 'valor') value = textoMayusculas(value)
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }

    const getDataParametro = async()=>{
        if(dataForm.idParametro !== undefined){
            let result = await axiosClient.get(`parametro/listar/id/${dataForm.idParametro}`)
            let resultV = await axiosClient.get(`valor/listar/codVal/${dataForm.Valor}`)
            let resultTabla = await axiosClient.get(`valor/listarInhabilitados/codVal/${dataForm.Valor}`)
            let data = resultTabla.data.data
            setPropsTableData(data)
            let result2 = []
            let result1 = []
            if(result.data.data !==undefined){
                result1 = result.data.data
            }
            if(resultV.data.data.length>0){
                result2 = resultV.data.data
            }
            let respuesta = {response:result1,response2:result2}
            return respuesta
        } 
    }

    const clearForm = () =>{
        setDataFormulario({...initialForm})
    }

    const deleteForm = () =>{

    }

    const editForm = (editTipo) =>{
        setTipoFormulario(editTipo)
    }

    const guardarFormulario = async(e)=>{
        try{
            let array = []
            let obj = {
                codVal:dataFormulario.parametro,
                idParametro:dataFormulario.idParametro,
                valor:dataFormulario.valor,
                adicional:dataFormulario.observacion
            }
            array.push(obj)
            if(tipoFormulario !=="ADD"){
                await axiosClient.post('valor/registro/array',array)
                clearForm()
                alerta("Valor editado exitosamente","success")
                actualizarCambios()
            }
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
        
    }

    useEffect(()=>{
        let nombreGrupoEtiquetas = filterTipo(parametrosStore,'Etiqueta')
        setGrupoEtiqueta(nombreGrupoEtiquetas)
    },[parametrosStore])


    useEffect(()=>{
        async function loadParametro(){
            let respuesta = await getDataParametro() 
            if(respuesta!==undefined){
            let response = respuesta.response
            let response2 = respuesta.response2
                let objetoParametro = {idParametro:response.idParametro,etiqueta:response.etiqueta,descripcion:response.descripcion,estado:response.estado,
                    parametro:response.valor,valor:'',observacion:''}
                setDataFormulario(objetoParametro)
                setTipoFormulario("CANCEL")
                if(response2.length > 0){
                    setDataFormulario({idParametro:response.idParametro,etiqueta:response.etiqueta,descripcion:response.descripcion,estado:response.estado,
                        parametro:response.valor,valor:response2[0].valor,observacion:response2[0].adicional})
                }
            }
        }
        setCambioHeader(!cambioHeader)
        loadParametro()
    },[peticion])

    useEffect(()=>{
        let permisos = setPermisosForm(escritura,tipoFormulario)
        setReadAll(permisos.readAll)
        setReadOne(permisos.readOne)
    },[tipoFormulario])

    const abrirModal = ()=>{
        setModal(!modales)
    }

    if(dataFormulario === {}){
        return (
            <>
            </>
        )
    }else{
    return (
        <div className="test-m">
            <HeaderForm cambioHeader={cambioHeader} soloEdit={true} escritura={escritura} limpiar={clearForm} eliminar={deleteForm} editar={editForm} tipoForm = {tipoFormulario}></HeaderForm>
            <div onClick={() => abrirModal()} className="pb-5 butonPlanilla btn w-50"><img src={iconVision} alt="img" /></div>
            <br/>
            <br/>
            <Form onSubmit={handleSubmit(guardarFormulario)}>
                <Form.Group as={Row} >
                    <Form.Label column xs={12} sm={3}>
                        Categoria de la variable <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" as="select" disabled={readOne} value={dataFormulario.etiqueta} onChange={handleChange} name="etiqueta">
                            <option value="">Seleccionar</option>
                            {grupoEtiqueta.map(element=>
                                <option key={element} value={element}>{element}</option>
                            )}
                        </Form.Control> 
                        {(tipoFormulario==="ADD")?<ErrorMessage mensaje={errors.etiqueta?.message}></ErrorMessage>
                        :''}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column xs={12} sm={3}>
                        Descripción de la variable <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" readOnly={readOne} value={dataFormulario.descripcion} onChange={handleChange} name="descripcion" type="text" placeholder="Descripción del Parámetro" />
                        <ErrorMessage mensaje={errors.descripcion?.message}></ErrorMessage>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column xs={12} sm={3}>
                        Código de la variable <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" readOnly={readOne} value={dataFormulario.parametro} onChange={handleChange} name="parametro" type="text" placeholder="Parámetro" />
                        <ErrorMessage mensaje={errors.parametro?.message}></ErrorMessage>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column xs={12} sm={3}>
                        Valor <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" readOnly={readAll} value={dataFormulario.valor} onChange={handleChange} name="valor" type="text" placeholder="Valor" />
                        <ErrorMessage mensaje={errors.valor?.message}></ErrorMessage>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column xs={12} sm={3}>
                        Observación <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" readOnly={readAll} value={dataFormulario.observacion} onChange={handleChange} name="observacion" type="text" placeholder="Observación" />
                        <ErrorMessage mensaje={errors.observacion?.message}></ErrorMessage>
                    </Col>
                </Form.Group>                    
                <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`}>
                {(tipoFormulario === "ADD") ?
                    '':
                    <>
                     {(tipoFormulario === "EDIT") ?
                     <>
                        <Col sm={6} className="border-acciones">
                            <button type="submit" className="btn w-100 done-btn"><strong>Aceptar</strong></button>
                        </Col>
                    </>:<></>
                     }
                        
                    </>
                }
                </Form.Group>
                
            </Form>
            <ModalValores abrirModal={modales} dataForm={propsTableData} descrip={dataFormulario.descripcion}></ModalValores>
            
        </div>
    );
}
}

export default FormularioValores;