/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import SelectParametro from 'components/texfield/selectParametros';
import React,{useState,useEffect} from 'react';
import {Form,Row,Col} from 'react-bootstrap'
import HeaderForm from 'components/forms/headerForm'
import {useSelector} from 'react-redux';
import setPermisosForm from 'helpers/permisosForm';
import alerta,{alertaEliminar} from 'helpers/alerts' 
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from 'components/alerts/error';
import { textoMayusculas } from 'helpers/reusablesForms';
import {filterTipo} from 'helpers/filtroBuscador'

const FormularioUsuarios = ({actualizarCambios,dataForm,escritura,tipo,peticion}) => {
    const ParametroSchema = yup.object().shape({
        etiqueta: yup.string().required('El campo es requerido'), //etiqueta de la BD-> grupo
        descripcion: yup.string().required('El campo es requerido'),//descripcion -> parametro
        valor: yup.string().max(4,'Maximo 4 caracteres').required('El campo es requerido'),//valor
      });  
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(ParametroSchema)
      });
    const parametrosStore = useSelector(store=>store.parametros.array)
    const estadosStore = useSelector(store => store.mixed.estados)
    const [grupoEtiqueta,setGrupoEtiqueta] = useState([])
    const [tipoFormulario,setTipoFormulario] = useState(tipo) 
    const [readAll,setReadAll] = useState(false)
    const [readOne,setReadOne] = useState(false)
    const [cambioHeader, setCambioHeader] = useState(false)
    const [inputTipos, setInputTipos] = useState([])
    const [switchs, setSwitch] = useState([])
    const [inputs, setInputs] = useState({})
    const [inhabilitar, setInhabilitar] = useState({})
    const [dataFormulario,setDataFormulario] = useState({
        etiqueta:'',
        descripcion:'',
        valor:'',
        jerarquia:''
    })
    const initialForm = {
        etiqueta:'',
        descripcion:'',
        valor:'',
        jerarquia:''
    }

    const handleChange =(e)=>{
        let { name, value } = e.target;
         if(name === 'valor') value = textoMayusculas(value)
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });

    }
    const handleChanges =(e)=>{
        if(e){
            let { name, value, label } = e;
            setDataFormulario({
                ...dataFormulario,
                padreDescripcion: label,
                [name]: value,
            });
        }else{
            setDataFormulario({
                ...dataFormulario,
                padreDescripcion: 'Seleccione una categoría',
                idPadre: 0,
            });
        }
        

    }
    const handleChangeInput = (e)=>{
        
        if(e.target.name === 'Svalor'){
            if(e.target.checked === true){
                e.target.value = 'valor'
                setSwitch(e.target.checked)
                setInhabilitar('true') 
                setInputs(e.target.value)
            }else{
                setInhabilitar('false')
                setSwitch(false)
                e.target.value = null
                setInputs(e.target.value)
            }
        }else{
            setInputs(e.target.value) 
        }
        setDataFormulario({
            ...dataFormulario,
            tipoInput: e.target.value,
        });

    }

    const getDataParametro = async()=>{
        if(dataForm.idParametro !== undefined){
            let result = await axiosClient.get(`parametro/listar/id/${dataForm.idParametro}`)
            return result.data.data
        } 
    }

    const clearForm = (data) =>{
        setDataFormulario({...initialForm})
        if(data!==1){
            actualizarCambios()
        }
    }

    const deleteForm = async() =>{
        let eliminado = await alertaEliminar()
        if(eliminado){
            eliminarParametro()
        }
    }

    const editForm = (editTipo) =>{
        setTipoFormulario(editTipo)
    }

    const eliminarParametro =async()=>{
        try{
            let idParametro = dataForm.idParametro
            if(idParametro !== undefined){
                await axiosClient.delete(`parametro/eliminar/${idParametro}`)
                alerta("Eliminado correctamente","success")
                actualizarCambios(true)
                clearForm(1)
            } 
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
       
    }

    const guardarFormulario = async(e)=>{
        try{
            let obj = {}
            console.log(dataFormulario,'datasos')
            obj.descripcion = dataFormulario.descripcion
            obj.etiqueta = dataFormulario.etiqueta
            obj.idPadre = dataFormulario.idPadre
            obj.valor = dataFormulario.valor
            obj.tipoInput = dataFormulario.tipoInput
            if(tipoFormulario ==="ADD"){
                let res = await axiosClient.post('parametro/crear',obj)
                if(res.data.data.RSPTA !== -1){
                    alerta("Parametro añadido exitosamente","success")
                    actualizarCambios(true)
                    clearForm(1)
                }else{
                    alerta("Codigo se esta repitiendo en este grupo","error")
                }
                
            }else{
                obj.estado = dataFormulario.estado
                obj.idParametro = dataFormulario.idParametro
                await axiosClient.put('parametro/actualizar',obj)
                alerta("Parametro editado exitosamente","success")
                actualizarCambios(true)
                clearForm(1)
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
        async function loadRol(){
            let tipos = []
            tipos = ([
                {valor :"select",
                name :"Lista de opciones (combo box)"},
                {valor :"check",
                name :"Marcado múltiple (check box)"},
               {valor :"checkBox",
                name :"Marcado único (radio button)"},
                {valor :"switch",
                name :"Verdadero o falso (boolean)"}
            ])
            let response =await getDataParametro()
            console.log(response,'responsssa')
            setInputTipos(tipos); 
            if(response !==undefined ){
                let c = 0;
                
                if(response.tipoInput === null ||response.tipoInput === "NULL" || response.tipoInput === '' || response.tipoInput !=='valor' ){
                    if(response.tipoInput !== null && response.tipoInput !== "NULL" && response.tipoInput !== '' && response.tipoInput !=='valor'){
                        setInputs(response.tipoInput)
                        setSwitch(false)
                    }else{
                        setInputs("") 
                        setSwitch(false) 
                    }
                   
                } else{
                    setSwitch(true) 
                    setInputs(response.tipoInput)
                    c=2
                }
                if(c===2){
                    setInhabilitar('true')
                }else{
                    setInhabilitar('false')
                }
                setDataFormulario(response)
                setTipoFormulario("CANCEL")
            }
            setCambioHeader(!cambioHeader)
        }
        
        loadRol()
    },[peticion])

    useEffect(()=>{
        let permisos = setPermisosForm(escritura,tipoFormulario)
        setReadAll(permisos.readAll)
        setReadOne(permisos.readOne)
    },[tipoFormulario])
    
    if(dataFormulario === {}){
        return (
            <>
            </>
        )
    }else{
        const funciones = { handleChanges }
    return (
        <div className="test-m">
            <HeaderForm cambioHeader={cambioHeader} escritura={escritura} limpiar={clearForm} eliminar={deleteForm} editar={editForm} tipoForm = {tipoFormulario}></HeaderForm>
            <Form onSubmit={handleSubmit(guardarFormulario)}>
                <Form.Group as={Row} >
                    <Form.Label column xs={12} sm={3}>
                        Categoria <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" as="select" disabled={readAll} value={dataFormulario.etiqueta} onChange={handleChange} name="etiqueta">
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
                        Descripción <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" readOnly={readAll} value={dataFormulario.descripcion} onChange={handleChange} name="descripcion" type="text" placeholder="Ej. Documento nacional de identidad" />
                        <ErrorMessage mensaje={errors.descripcion?.message}></ErrorMessage>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column xs={12} sm={3}>
                        Código <span className="required">*</span>
                    </Form.Label>
                    <Col xs={12} sm={9}>
                        <Form.Control ref={register} size="sm" readOnly={readOne} value={dataFormulario.valor} onChange={handleChange} name="valor" type="text" placeholder="Ej. DNI" />
                        <ErrorMessage mensaje={errors.valor?.message}></ErrorMessage>
                    </Col>
                </Form.Group>                   
                

                <Form.Group as={Row} >
                    <Form.Label column xs={12} sm={3}>
                        Categoria superior 
                    </Form.Label>
                    <Col xs={12} sm={9} >
                        <SelectParametro funciones={funciones} defaultValue = {{label:dataFormulario.padreDescripcion, value:dataFormulario.idPadre}} size="sm" />
                        {/* {
                            cambioBusqueda?
                            <BuscadorAutocompletable mostrador={'Descripcion'} 
                                propsBuscador={parametrosStore} placeholder={'Opcional'} 
                                filter={'Etiqueta'} functionSetData={obtenerDataParametro}
                                    >          
                            </BuscadorAutocompletable>:
                            <> 
                                <span>{jerarquia.Descripcion}</span>
                                <button className="btn mb-1" onClick={()=>setCambioBusqueda(true)}>Buscar Otro</button>
                            </>
                        } */}
                    </Col>
                </Form.Group>
                <br></br>
                <Form.Group as={Row}  >
                <Form.Label column sm={3}  >
                        <span ></span>¿Valor editable?<span className="required"></span>
                </Form.Label> 
                    <Col sm={6}>
                        <Form.Check checked={switchs} name="Svalor"  size="lg" type="switch" id="custom-switch" onChange={event => handleChangeInput(event)}  />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={3}  >
                        <span >Tipo de componente</span>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control disabled={(inhabilitar === 'true')?true:false}  size="sm" as="select" value={inputs} name="valor" onChange={event => handleChangeInput(event)}>
                            <option value="" >Seleccionar</option>
                            {
                                inputTipos.map((elemento,index)=>
                                    <option value={elemento.valor} key={index}>{elemento.name} </option>
                                )
                            }
                        </Form.Control>
                    </Col>
                </Form.Group>
                
            {
                (tipoFormulario !== "ADD")?
                <Form.Group as={Row} >
                        <Form.Label column xs={12} sm={3}>
                            Estado 
                        </Form.Label>
                        <Col xs={12} sm={9}>
                        <Form.Control size="sm" as="select" disabled={readAll} value={dataFormulario.Estado} onChange={handleChange} name="Estado" >
                                    <option value="">Seleccione un estado</option>
                                    {estadosStore.map(element=>
                                        <option key={element.Valor} value={element.Valor}>{element.Descripcion}</option>
                                    )}
                        </Form.Control>
                        </Col>
                </Form.Group> : ''
            }    
            {console.log(dataFormulario,'dataFormulario')}                  

                <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`}>
                {(tipoFormulario === "ADD") ?
                    <Col sm={6} className=" border-acciones">
                        <button type="submit" className="btn w-100 done-btn">Aceptar</button>
                    </Col>:
                    <>
                        <Col sm={6} className="border-acciones">
                            <div className="btn w-100 delete-btn" onClick={deleteForm}>Eliminar Parámetro</div>
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

export default FormularioUsuarios;