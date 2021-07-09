/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import HeaderForm from 'components/forms/headerForm'
import alerta from 'helpers/alerts'
import adds from 'img/utils/map-clear.svg'
import rem from 'img/utils/delete.svg';

const FormularioProductos = ({ dataForm, tipo, peticion, escritura }) => {
    const [tipoFormulario, setTipoFormulario] = useState(tipo)
    const [formProducto, setFormProducto] = useState({
        valor: ''
    })
    const [configuracion, setDataConfiguracion] = useState([{data:''}])
    const [bool, setBool] = useState(true)
    const [formConfiguracion, setFormConfiguracion] = useState({data:''})
    const [dataConfig, setDataConfig] = useState({data:''})
    const [formErrors] = useState('');
    const [labelConf, labelConfiguracion] = useState('')
    const [inputTipos, setinputTipos] = useState('')
    const [val, setVal] = useState(false)
    const [inputFields, setInputFields] = useState([{
        codVal: '',
        idParametro: undefined,
        valor: '',
        labels: '',
        tipo: '',
        tipoInput: ''
    }]);


    const initialForm = {
        valor: ''
    }

    const dataConfiguracion = async () => {
        let conf = {};
        conf.idPadre = 0;
        conf.etiqueta = "CONFIGURACIÓN";
        conf.estado = 'ACT'
        let result = await axiosClient.post(`parametro/listar`, conf)
        setDataConfiguracion(result.data.data);
    }
    const handleChange = (e) => {
        let { name, value } = e.target;
        let arreglovalue = []
        let cadena = e.target.value
        arreglovalue = cadena.split(',')
        if (arreglovalue[1] !== 'null') {
            setinputTipos(arreglovalue[1])
        } else {
            setinputTipos('null')
        }
        let index = e.target.selectedIndex;
        labelConfiguraciones(e.target.options[index].text);
        setFormConfiguracion(arreglovalue[0]);

        setDataConfig({
            ...dataConfig,
            [name]: value,
        });
    }


    const labelConfiguraciones = (label) => {
        labelConfiguracion(label);

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputFields.length>0){
            if(formProducto.valor && formProducto.valor !== '' && formProducto.valor !== null){
                guardarValor(inputFields);
            }else{
                alerta('Seleccionar un producto','error')
            }
        }else{
            alerta('Seleccionar agregar almenos una configuracion','error')
        }
        
    }
    const getDataProducto = async () => {
        if (dataForm.idParametro !== undefined) {
            let result = await axiosClient.get(`parametro/listar/id/${dataForm.idParametro}`);
            setFormProducto(result.data.data)
            return result.data.data
        }
    }
    const getDataconfigucacion = async () => {
        if(dataForm.Valor !== undefined){ 
            let result = await axiosClient.get(`/valor/listar/codVal/${dataForm.Valor}`)
            return result.data.data
        }
        
    }
    const clearForm = () => {
        setFormProducto({ ...initialForm })
        let array = [];
        setInputFields(array);
    }

    const editForm = (editTipo) => {
        setTipoFormulario(editTipo)
    }

    const guardarValor = async (data) => {
        try{
            if (Object.keys(formErrors).length === 0) {
                if (tipoFormulario === "ADD") {
                    data.forEach((objeto) =>{
                        objeto.idUsuario = localStorage.idUsuario
                    })
                    await axiosClient.post('valor/registro/array', data)
                    clearForm()
                    setTipoFormulario("ADD")
                    alerta("Configuracion añadido exitosamente", "success")
                } else {
    
                    clearForm()
                    setTipoFormulario("ADD")
                    alerta("Configuracion editado exitosamente", "success")
                }
            }
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
        
    }
    useEffect(() => {
        async function loadConfiguracion() {
            let response = await getDataconfigucacion()
            let responses = await getDataProducto()
            if (responses !== undefined) {
                if (responses.idParametro !== undefined) {
                    setTipoFormulario("ADD") // cambiarlo a cancel despues
                }
            }
            let inputs = []
            if (response !== undefined) {
                if (response.length > 0) {
                        response.forEach((data) => {
                            setTipoFormulario("ADD") // cambiarlo a cancel despues
                            let input = {
                                codVal: data.codVal, idParametro: data.idConfiguracion,
                                valor: data.valor, labels: data.descripcion, tipo: data.descripcion, tipoInput: data.tipoInput
                            }
                            inputs.push(input);
                        })
                        setInputFields(inputs);
                    
                } else {
                    setInputFields(inputs);
                }
            }
        }
        loadConfiguracion()
        setBool(false)
    }, [peticion])

    useEffect(() => {
        dataConfiguracion()
        setBool(true)
    }, [])

    useEffect(() => {

        setVal(true)
    }, [peticion])

    const handleChangeSwitch = (index, e) => {
        const values = [...inputFields];
        if (e.target.checked === false) {
            values[index][e.target.name] = 'false'
        } if (e.target.checked === true) {
            values[index][e.target.name] = true
        }
        setInputFields(values);
    }

    const handleChangeChk = (index, e, valor) => {
        const values = [...inputFields];
        if (e.target.checked === true) {
            values[index][e.target.name] = valor
        }
        setInputFields(values);
    }

    const handleChangeInput = (index, e) => {
        const values = [...inputFields];
        values[index][e.target.name] = e.target.value;
        setInputFields(values);
    }
    const handleAddFields = async () => {
        let validar = 0;
        inputFields.forEach((elemento) => {
            if (labelConf === elemento.labels) {
                validar++;
            }
        })
        if(labelConf !== 'Seleccionar configuración'){
            if (validar === 0) {
                if (labelConf.length > 0) {
                    setInputFields([...inputFields, {
                        codVal: formProducto.valor, idParametro: formConfiguracion,
                        valor: '', labels: labelConf, tipo: labelConf, tipoInput: inputTipos
                    }])
                } else {
                    alerta("Debe elegir una configuracion", "error")
                }
    
            } else {
                alerta("Configuracion ya se encuentra listado", "error")
            }
        }else{
            alerta("Debe elegir una configuracion", "error")
        }
        

    }
    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }
    const funciones = { handleChangeInput, handleRemoveFields, handleChangeSwitch, handleChangeChk }

    return (
        <div className="test-m px-5" >
            <HeaderForm limpiar={clearForm} editar={editForm} tipoForm={tipoFormulario}></HeaderForm>            
            <Form.Group as={Row} >
                <Col sm={12} className="pb-1">                     
                    <Form.Label>
                        Seleccione el parámetro que desee agregar a la configuración actual del producto: 
                    </Form.Label>
                </Col>
                <Col sm={4} className="pr-0">
                    <Form.Control size="sm" as="select" value={configuracion.idParametro} name="conf" onChange={handleChange}>
                        <option value="">Seleccionar configuración</option>
                        {
                            configuracion.map((elemento, index) =>
                                <option  key={index} value={elemento.idParametro + ',' + elemento.tipoInput}>{elemento.Descripcion} </option>
                            )
                        }
                    </Form.Control>
                </Col>
                <Col sm={2} className="pl-auto" hidden={(escritura === true) ? false : true}>
                    <button title="Agregar configuración" className="btn p-0 buttonHeaderForm" type="submit" onClick={() => handleAddFields()} ><img alt="Agregar configuración" src={adds} height="17px" className="m-1" /></button>
                </Col>
            </Form.Group>
            <hr/>
            <Form onSubmit={handleSubmit}>
                <p className="mt-4"> <strong> Configuración</strong></p>
                <Form.Group as={Row} >
                    <Form.Label column sm={3}>
                    Producto<span className="required">*</span>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control readOnly size="sm" value={formProducto.descripcion} onChange={handleChange} name="codVal" type="text" placeholder="codigo" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={3}>
                      Código de producto<span className="required">*</span>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control readOnly size="sm" value={formProducto.valor} onChange={handleChange} name="desc" type="text" placeholder="descripcion" />
                    </Col>
                </Form.Group>
                {inputFields.map((inputField, Index) => {
                    switch (inputField.tipoInput) {
                        case 'input':
                            return <InputEntrada key={Index} inputField={inputField} Index={Index} funciones={funciones} escritura={escritura} />

                        case 'select':
                            return <SelectEntrada key={Index} inputField={inputField} Index={Index} funciones={funciones} escritura={escritura} />

                        case 'switch':
                            return <InputSwitch key={Index} inputField={inputField} Index={Index} funciones={funciones} escritura={escritura} />

                        case 'check':
                            return <InputCheck key={Index} inputField={inputField} Index={Index} funciones={funciones} escritura={escritura} />

                        default:
                            return (inputField.idParametro ? <InputEntrada key={Index} inputField={inputField} Index={Index} funciones={funciones} escritura={escritura} /> : null)
                    
                    }                
                }

                )}
                <Form.Group as={Row} hidden={(val === true) ? false : true}>
                    {(tipoFormulario === "ADD") ?
                        <Col sm={6} className=" border-acciones" hidden={(escritura === true) ? false : true}>
                            <button hidden={bool} className="btn done-btn w-100" type="submit" onClick={handleSubmit} >Aceptar</button>
                        </Col> :
                        <>
                            <Col sm={6} className="border-acciones" hidden={(escritura === true) ? false : true} >
                                <button hidden={bool} className="btn done-btn w-100" type="submit" onClick={handleSubmit} ><strong>Aceptar</strong></button>
                            </Col>
                        </>
                    }
                </Form.Group>
            </Form>
        </div>
    );

}

const SelectEntrada = ({ inputField, Index, funciones, escritura }) => {
    const [hijos, setHijos] = useState([{valor: ''}])
    useEffect(async () => {
        let conf = {};
        let result = [];
        conf.idPadre = inputField.idParametro;
        conf.estado = 'ACT'
        result = await axiosClient.post(`parametro/listar`, conf)
        setHijos(result.data.data)
    }, [])
    return (
        <Form.Group as={Row} >
            <Form.Label column sm={3} >
                <span ></span>{inputField.labels}<span className="required">*</span>
            </Form.Label>
            <Col sm={6}>
                <Form.Control size="sm" as="select" value={inputField.valor} name="valor" onChange={event => funciones.handleChangeInput(Index, event)}>
                    <option value="" >Seleccionar</option>
                    {
                        hijos.map((elemento, index) =>
                            <option value={elemento.Valor} key={index}>{elemento.Descripcion} </option>
                        )
                    }
                </Form.Control>
            </Col>
            <Col sm={1} className="pl-0">
                <div hidden={(escritura === true) ? false : true} title="Eliminar configuración" className="btn p-0 buttonHeaderForm" onClick={() => funciones.handleRemoveFields(Index)} ><img alt="Eliminar configuración" src={rem} height="17px" className="m-1" /></div>
            </Col>
        </Form.Group>
    )
}

const InputEntrada = ({ inputField, Index, funciones, escritura }) => {
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={3}  >
                <span ></span>{inputField.labels}<span className="required">*</span>
            </Form.Label>

            <Col sm={6}>
                <Form.Control size="sm" value={inputField.valor} onChange={event => funciones.handleChangeInput(Index, event)} name="valor" type="text" placeholder="Valor" />
            </Col>
            <Col sm={1} className="pl-0">
                <div hidden={(escritura === true) ? false : true} title="Eliminar configuración" className="btn p-0 buttonHeaderForm" onClick={() => funciones.handleRemoveFields(Index)} ><img alt="Eliminar configuración" src={rem} height="17px" className="m-1" /></div>
            </Col>
        </Form.Group>
    )
}

const InputSwitch = ({ inputField, Index, funciones, escritura }) => {
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={3} >
                <span ></span>{inputField.labels}<span className="required">*</span>
            </Form.Label>
            <Col sm={6}>
                <Form.Check name="valor" size="lg" type="switch" id="custom-switch" defaultChecked={(inputField.valor === 'false') ? false : inputField.valor} onChange={event => funciones.handleChangeSwitch(Index, event)} />
            </Col>
            <Col sm={1} className="pl-0">
                <div hidden={(escritura === true) ? false : true} title="Eliminar Configuración" className="btn p-0 buttonHeaderForm" onClick={() => funciones.handleRemoveFields(Index)} ><img alt="Eliminar Configuracion" src={rem} height="17px" className="m-1" /></div>
            </Col>
        </Form.Group>
    )
}

const InputCheck = ({ inputField, Index, funciones, escritura }) => {
    const [hijos, setHijos] = useState([{valor: ''}])
    useEffect(async () => {
        let conf = {};
        let result = [];
        conf.idPadre = inputField.idParametro;
        conf.estado = 'ACT'
        result = await axiosClient.post(`parametro/listar`, conf)
        setHijos(result.data.data)
    }, [])
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={3} >
                <span ></span>{inputField.labels}<span className="required">*</span>
            </Form.Label>
            <Col sm={6}>
                {
                    hijos.map((elemento, index) =>
                        <Form.Check defaultChecked={(elemento.Valor === inputField.valor) ? true : false} name="valor" label={elemento.Descripcion} custom inline key={index} size="lg" type="radio" id={index + 1} onChange={event => funciones.handleChangeChk(Index, event, elemento.Valor)} />
                    )
                }
            </Col>
            <Col sm={1} className="pl-0">
                <div hidden={(escritura === true) ? false : true} title="Eliminar configuración" className="btn p-0 buttonHeaderForm" onClick={() => funciones.handleRemoveFields(Index)} ><img alt="Eliminar configuración" src={rem} height="17px" className="m-1" /></div>
            </Col>
        </Form.Group>
    )
}
export default FormularioProductos;