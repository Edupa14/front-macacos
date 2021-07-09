/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import BuscadorTipo from 'components/buscador/buscadorPorTipo';
import HeaderForm from 'components/forms/headerForm'
import axiosClient from 'config/axios/axiosClient';
import alerta, { alertaEliminar } from 'helpers/alerts'
import iconError from 'img/datos.png'
import * as yup from "yup";
import setPermisosForm from 'helpers/permisosForm';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from 'components/alerts/error';
import { tipeoNumero } from 'helpers/validations'
import '../table.css'

const TableExterno = ({ nroRegistros, dataForm, tipo, peticion, escritura, actualizarCambios }) => {

    yup.setLocale({
        string: {
            email: 'Ingrese un email valido',
        },
    })
    const UserSchema = yup.object().shape({
        // tipCtaBan: yup.string().required('El campo dirección es requerido'),
        // codBanco: yup.string().required('El campo dirección es requerido'),
        // codMoneda: yup.string().required('El campo dirección es requerido'),
        // cci: yup.string().required('El campo codigo interbancario es requerido').min(20, 'Deben ser 20 digitos'),
        // ctaBanc: yup.string().required('El campo Nº de cuenta es requerido').min(14, 'Deben ser 14 digitos')
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(UserSchema)
    });

    const [dataBanco, setDataBanco] = useState([])
    const [tipoFormulario, setTipoFormulario] = useState(tipo)
    const [bancario, setBancario] = useState({})
    const [cambioHeader, setCambioHeader] = useState(false)
    const [tipoCuenta, setTipoCuenta] = useState([])
    const [tipoMoneda, setTipoMoneda] = useState([])
    const [banco, setBanco] = useState([])
    const [moneda, setMoneda] = useState('')
    const [readAll, setReadAll] = useState(false)
    //const [vacio, setVacio] = useState(0)
    const [errores, setErrores] = useState(true)
    const [errores2, setErrores2] = useState(true)
    const [actualizarBuscadorGlob, setActualizarBuscadorGlob] = useState(false)

    const initialFormBanc = {
        tipCtaBan: '',
        codBanco: '',
        codMoneda: '',
        cci: '',
        ctaBanc: ''
    }

    const handleChangeBanc = (e) => {
        let { name, value } = e.target;
        if(name === 'ctaBanc'){
            if(value.length < 10){
                setErrores(false)
            }else{
                setErrores(true)
            }   
        }
        if(name === 'cci'){
            if(value.length < 20){
                setErrores2(false)
            }else{
                setErrores2(true)
            } 
        }
        
        setBancario({
            ...bancario,
            [name]: value,
        });
    }
    const clearFormSponsor = () => {
        setBancario({ ...initialFormBanc })
        setActualizarBuscadorGlob(!actualizarBuscadorGlob)
        setMoneda('')
    }

    const getTipoCuenta = async () => {
        let conf = {};
        conf.idPadre = 0;
        conf.etiqueta = "TIPOCUENTA";
        conf.estado = 'ACT'
        let result = await axiosClient.post(`parametro/listar`, conf)

        setTipoCuenta(result.data.data);
    }
    const getTipoMoneda = async () => {
        let conf = {};
        conf.idPadre = 0;
        conf.etiqueta = "MONEDA";
        conf.estado = 'ACT'
        let result = await axiosClient.post(`parametro/listar`, conf)
        setTipoMoneda(result.data.data);
    }
    const getTipoBanco = async () => {
        let conf = {};
        conf.idPadre = 0;
        conf.etiqueta = "BANCO";
        conf.estado = 'ACT'
        let result = await axiosClient.post(`parametro/listar`, conf)
        setBanco(result.data.data);
    }

    useEffect(() => {
        getTipoCuenta()
        getTipoMoneda()
        getTipoBanco()
    }, [])

    const editarCuentasBanco = async (SPONSOR) => {
        await axiosClient.post('/banco/edit', SPONSOR)
        setTipoFormulario("ADD")
        alerta("Configuracion editado exitosamente", "success")
        let responseBancos = await getListaBancos()
        setDataBanco(responseBancos)
        clearFormSponsor()
        setErrores(true)
            setErrores2(true)
    }

    const handleSubmitSponsor = async (e) => {
        e.preventDefault();
        let SPONSOR = new FormData()
        SPONSOR.append('idCtaBan', bancario.idCtaBan)
        SPONSOR.append('tipCtaBan', bancario.tipCtaBan)
        SPONSOR.append('codBanco', bancario.codBanco)
        SPONSOR.append('codMoneda', bancario.codMoneda)
        SPONSOR.append('cci', bancario.cci)
        SPONSOR.append('ctaBanc', bancario.ctaBanc)
        if (tipoFormulario === "EDIT" && bancario.idCtaBan !== undefined) {
            if((bancario.ctaBanc === '' || bancario.ctaBanc === undefined) && (bancario.cci !== '' || bancario.cci !== undefined)){
                if(errores2 === true){
                    editarCuentasBanco(SPONSOR)
                }
            }
            if((bancario.cci === '' || bancario.cci === undefined) && (bancario.ctaBanc !== '' || bancario.ctaBanc !== undefined)){
                if(errores === true){
                    editarCuentasBanco(SPONSOR)
                }
            }
            if((bancario.cci.length === 0 || bancario.cci === undefined) && (bancario.ctaBanc.length === 0 || bancario.ctaBanc === undefined)){
                alerta("Error, todos los datos son obligatorios", "error")
            }
            if((bancario.cci !== '' || bancario.cci !== undefined) && (bancario.ctaBanc !== '' || bancario.ctaBanc !== undefined)){
                if(errores === true && errores2 === true){
                    editarCuentasBanco(SPONSOR)
                }
            }
           
        } else {
            alerta("Selecciona un banco para ver su información", "error")
        }

    }

    const deleteForm = async () => {
        let eliminado = await alertaEliminar()
        if (eliminado) {
            eliminarBan()
        }
    }

    const eliminarBan = async () => {
        let idCtaBan = bancario.idCtaBan
        if (idCtaBan !== undefined) {
            await axiosClient.delete(`/banco/eliminar/${idCtaBan}`)
            alerta("Banco fue eliminado exitosamente", "success")
            let responseBancos = await getListaBancos()
            setDataBanco(responseBancos)
            clearFormSponsor()

        }
    }
    const guardarNuevoBanco = async (SPONSOR) => {
        let bancos = await axiosClient.post('/banco/crear', SPONSOR)
        if (bancos.data.data.RSPTA === -1) {
            alerta("Las cuentas ya existen", "error")
        } else {
            setTipoFormulario("ADD")
            alerta("Cuenta bancaria registrada exitosamente", "success")
            let responseBancos = await getListaBancos()
            setDataBanco(responseBancos)
            clearFormSponsor()
            setErrores(true)
            setErrores2(true)
        }
    }

    const handleSubmitBanco = async () => {
        //e.preventDefault();
        let SPONSOR = {}
        SPONSOR.idSponsor = dataForm.idSponsor
        SPONSOR.ccb = 0
        SPONSOR.tipCtaBan = bancario.tipCtaBan
        SPONSOR.codBanco = bancario.codBanco
        SPONSOR.codMoneda = bancario.codMoneda
        SPONSOR.ctaBanc = bancario.ctaBanc
        SPONSOR.cci = bancario.cci
        SPONSOR.swift = 0
        SPONSOR.idUsuario = localStorage.idUsuario
        if ( (SPONSOR.codBanco === '' && SPONSOR.codMoneda === '' && SPONSOR.cci === '') || (SPONSOR.tipCtaBan === undefined || SPONSOR.codBanco === undefined || SPONSOR.codMoneda === undefined)) {
            alerta("Error, no puedes ingresar datos vacios", "error")
        } else {
            if (SPONSOR.tipCtaBan === '' || SPONSOR.codBanco === '' || SPONSOR.codMoneda === '' || SPONSOR.ctaBanc === '' || SPONSOR.cci === '') {
                alerta("Error, todos los datos son obligatorios", "error")
            } else {
                if ((tipoFormulario === "ADD" && dataForm.idSponsor !== undefined) || dataForm.idSponsor !== '') {
                    if((SPONSOR.ctaBanc === '' || SPONSOR.ctaBanc === undefined) && (SPONSOR.cci !== '' || SPONSOR.cci !== undefined)){
                        if(errores2 === true){
                            guardarNuevoBanco(SPONSOR)
                        }
                    }
                    if((SPONSOR.cci === '' || SPONSOR.cci === undefined) && (SPONSOR.ctaBanc !== '' || SPONSOR.ctaBanc !== undefined)){
                        if(errores === true){
                            guardarNuevoBanco(SPONSOR)
                        }
                    }
                    if((SPONSOR.cci === '' || SPONSOR.cci === undefined) && (SPONSOR.ctaBanc === '' || SPONSOR.ctaBanc === undefined)){
                        alerta("Error, todos los datos son obligatorios", "error")
                    }
                    if((SPONSOR.cci !== '' || SPONSOR.cci !== undefined) && (SPONSOR.ctaBanc !== '' || SPONSOR.ctaBanc !== undefined)){
                        if(errores === true && errores2 === true){
                            guardarNuevoBanco(SPONSOR)
                        }
                    }
                } else {
                    alerta("Cuenta bancaria no registrada, verificar los datos ingresados", "error")
                }
            }
        }

    }

    const obtenerDataBancos = async (datos) => {
        let confi = {}
        confi.idCtaBan = datos.idCtaBan
        if (datos.idCtaBan !== undefined) {
            let result = await axiosClient.post(`/banco/listar/`, confi)
            setBancario(result.data.data[0])
            setTipoFormulario('CANCEL')
            if (result.data.data[0].moneda === 'Soles') {
                setMoneda('MN')

            } else {
                setMoneda('ME')
            }

        }


    }
    const getListaBancos = async () => {
        let confi = {}
        confi.idSponsor = dataForm.idSponsor
        if (dataForm.idSponsor !== undefined) {
            let result = await axiosClient.post(`/banco/listar/`, confi)
            return result.data.data
        }
    }
    const editForm = (editTipo) => {
        setTipoFormulario(editTipo)
    }

    useEffect(() => {
        async function loadListaBancos() {
            let response = await getListaBancos()
            if (response !== undefined) {
                setDataBanco(response)
                setCambioHeader(!cambioHeader)
                //setVacio(bancario.cci)
            }

        }
        loadListaBancos()

    }, [peticion])

    useEffect(() => {
        let permisos = setPermisosForm(escritura, tipoFormulario)
        setReadAll(permisos.readAll)
    }, [tipoFormulario])

    if (dataBanco.length === 0) {
        return (
            <>
                <img src={iconError} alt="img" style={{ margin: "5% 25%", width: "50%", height: "30%" }} />
                <h3 style={{ width: "100%", height: "20%", margin: "0% 23%" }}>No se han encontraron resutados</h3>
                <h6 style={{ width: "100%", height: "20%", margin: "0% 20%", color: "#ababab" }}>Selecciona un sponsor o prueba con otro para visualizar los datos</h6>
                <br />
            </>
        )
    } else {
        return (
            <div>
                <Col sm={12}>
                    <Row >
                        <Col className="px-0" sm={5}>
                            <BuscadorTipo actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idCtaBan'} mostrador={'moneda'} propsBuscador={dataBanco} placeholder={'Búsqueda de bancos'} filter={'banco'} functionSetData={obtenerDataBancos}></BuscadorTipo>
                        </Col>
                        <Col sm={7} >
                            <HeaderForm cambioHeader={cambioHeader} limpiar={clearFormSponsor} escritura={escritura} eliminar={deleteForm} editar={editForm} tipoForm={tipoFormulario}></HeaderForm>
                            <p className="mt-3 TitleLabel"> <strong> Datos Bancarios</strong></p>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Tipo de cuenta</Form.Label>
                                <Form.Control ref={register} name="tipCtaBan" disabled={readAll} onChange={handleChangeBanc} value={bancario.tipCtaBan} as="select" custom>
                                    <option value={-1} >Seleccionar tipo</option>
                                    {tipoCuenta.map((element, index) =>
                                        <option key={index} value={element.Valor}>{element.Descripcion}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Banco</Form.Label>
                                <Form.Control ref={register} name="codBanco" disabled={readAll} onChange={handleChangeBanc} value={bancario.codBanco} as="select" custom>
                                    <option value={-1}>Seleccionar banco</option>
                                    {banco.map((element, index) =>
                                        <option key={index} value={element.Valor}>{element.Descripcion}</option>
                                    )}
                                    <ErrorMessage mensaje={errors.codBanco?.message}></ErrorMessage>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Moneda</Form.Label>
                                <Form.Control ref={register} name="codMoneda" disabled={readAll} onChange={handleChangeBanc} value={bancario.codMoneda} as="select" custom>
                                    <option value={-1}>Seleccionar tipo de moneda</option>
                                    {tipoMoneda.map((element, index) =>
                                        <option key={index} value={element.Valor}>{element.Descripcion}</option>
                                    )}
                                    <ErrorMessage mensaje={errors.codMoneda?.message}></ErrorMessage>
                                </Form.Control>
                            </Form.Group>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm={6}>
                                            Nº de cuenta 
                                        </Form.Label>
                                        <Col sm={6}>
                                            <Form.Control ref={register} size="sm" readOnly={readAll} onChange={(event) => handleChangeBanc(event)} name="ctaBanc" value={bancario.ctaBanc} type="text" onKeyPress={e => tipeoNumero(e)} maxLength={14} placeholder="Cuenta Interna" />
                                            {(errores === true) ? <ErrorMessage mensaje=''></ErrorMessage> : <h8 className='pMensaje'>Deben ser min. 10 y máx. 14 dígitos</h8>}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm={6}>
                                            Código de cuenta interbancaria(C.C.I) {moneda}
                                        </Form.Label>
                                        <Col sm={6}>
                                            <Form.Control ref={register} size="sm" readOnly={readAll} onChange={handleChangeBanc} name="cci" value={bancario.cci} type="text" onKeyPress={e => tipeoNumero(e)} maxLength={20} placeholder="Cuenta Interbancaria" />
                                            {(errores2 === true) ? <ErrorMessage mensaje=''></ErrorMessage> : <h8 className='pMensaje'>Deben ser 20 dígitos</h8>}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} >
                                        {(tipoFormulario === "ADD") ?
                                            <>
                                                <Col sm={6} style={{ left: '25%' }}>
                                                    <button type="submit" className="btn done-btn w-100" onClick={handleSubmit(handleSubmitBanco)} ><strong>Registrar</strong></button>
                                                </Col>
                                            </> :
                                            <></>}
                                        {(tipoFormulario === "EDIT" || tipoFormulario === "CANCEL") ?
                                            <>
                                                <Col sm={6}>
                                                    <button type="submit" className="btn delete-btn w-100" onClick={deleteForm}  ><strong>Eliminar</strong></button>
                                                </Col>
                                                <Col sm={6} >
                                                    <button type="submit" className="btn done-btn w-100" onClick={handleSubmitSponsor}  ><strong>Guardar</strong></button>
                                                </Col>
                                            </> :
                                            <></>}

                                    </Form.Group>
                        </Col>
                    </Row >
                </Col >
            </div >
        );
    }

}
export default TableExterno;