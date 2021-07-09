/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Modal } from 'react-bootstrap'
import HeaderForm from 'components/forms/headerForm'
import setPermisosForm from 'helpers/permisosForm';
import * as yup from "yup";
import alerta from 'helpers/alerts'
import iconUser from 'img/sponsors/banco.svg'
import BuscadorTipo from 'components/buscador/buscadorPorTipo';
import { textoMayusculas } from 'helpers/reusablesForms';


const FormularioSponsors = ({ actualizarCambios, dataForm, escritura, tipo, peticion }) => {
    yup.setLocale({
        string: {
            email: 'Ingrese un email valido',
        },
    })
    // const [peticion, setPeticion] = useState(true)
    const [tipoFormulario, setTipoFormulario] = useState(tipo)
    const [formUser, setFormUser] = useState({})
    const [bancario, setBancario] = useState({})
    const [tipoCuenta, setTipoCuenta] = useState([])
    const [tipoMoneda, setTipoMoneda] = useState([])
    const [banco, setBanco] = useState([])
    const [datas, setDatas] = useState([])
    const [codigo, setCodigo] = useState([])
    const [dataBanco, setDataBanco] = useState([])
    const [verConfig, setVerConfig] = useState(false);
    const [configuracion, setConfiguracion] = useState([])

    const initialFormBanc = {
        tipCtaBan: '',
        codBanco: '',
        codMoneda: '',
        cci: '',
        ctaBanc: ''
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "nroDoc") value = textoMayusculas(value)
        setFormUser({
            ...formUser,
            [name]: value,
        });
        setCodigo(value)
        getConfiguracion(value)
    }

    const handleChangeBanc = (e) => {
        let { name, value } = e.target;

        setBancario({
            ...bancario,
            [name]: value,
        });
        // setCodigo(value)
        getConfiguracion(value)
    }

    const handleChangeConfig = (e, index) => {
        const values = [...configuracion]
        values[index][e.target.name] = e.target.value
        setConfiguracion(values)
    }

    const getConfiguracion = async (codProducto) => {
        let config = {}
        config.idSponsors = dataForm.idSponsor
        config.estado = 'ACT'
        config.producto = codProducto
        let result = await axiosClient.post(`sponsors/listConfig`, config)
        setConfiguracion(result.data.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let FORM = new FormData()
        FORM.append('idCtaBan', bancario.idCtaBan)
        FORM.append('tipCtaBan', bancario.tipCtaBan)
        FORM.append('codBanco', bancario.codBanco)
        FORM.append('codMoneda', bancario.codMoneda)
        FORM.append('cci', bancario.cci)
        FORM.append('ctaBanc', bancario.ctaBanc)
        if (tipoFormulario === "ADD") {
            await axiosClient.post('/banco/edit', FORM)

            setTipoFormulario("ADD")
            alerta("Configuracion editado exitosamente", "success")
            let responseBancos = await getListaBancos()
            setDataBanco(responseBancos)
            clearForm()
        } 

    }

    const handleSubmitConfig = async (e) => {
        e.preventDefault();
        configuracion.forEach((objeto) => {
            objeto.idUsuario = localStorage.idUsuario
        })
        let response = await axiosClient.post('/sponsors/config',configuracion)
        if (response !== undefined) {
            alerta("Configuracion editado exitosamente", "success")
            
        } else{
            alerta("Configuracion no editada", "error")
        }
    }

    const getDataUser = async () => {
        let result = await axiosClient.get(`sponsors/ruc/${dataForm.Ruc}`)

        return result.data.data
    }
    const clearForm = () => {
        setBancario({ ...initialFormBanc })
    }

    const editForm = (editTipo) => {
        setTipoFormulario(editTipo)
    }
    const getDatas = async () => {
        let config = {}
        config.idSponsors = dataForm.idSponsor
        config.estado = 'ACT'
        config.producto = formUser.producto
        let result = await axiosClient.post(`sponsors/listConfig`, config)
        setDatas(result.data.data);
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

    const obtenerDataBancos = async (datos) => {
        let confi = {}
        confi.idCtaBan = datos.idCtaBan
        if (datos.idCtaBan !== undefined) {
            let result = await axiosClient.post(`/banco/listar/`, confi)
            setBancario(result.data.data[0])
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


    useEffect(() => {
        getTipoCuenta()
        getTipoMoneda()
        getTipoBanco()


    }, [])

    useEffect(() => {
        async function loadUser() {
            let response = await getDataUser()
            if (response !== undefined) {
                if (response.nroDoc !== undefined) {
                    setTipoFormulario("ADD")
                    getDatas()
                    
                }
            }
        }
        loadUser()
    }, [peticion])

    useEffect(() => {
        async function loadListaBancos() {
            let response = await getListaBancos()
            if (response !== undefined) {
                setDataBanco(response)
            }

        }
        loadListaBancos()

    }, [peticion])

    useEffect(() => {
        let permisos = setPermisosForm(escritura, tipoFormulario)
    }, [tipoFormulario])

    return (
        <div className="test-m" >
            <HeaderForm limpiar={clearForm} editar={editForm} tipoForm={tipoFormulario}></HeaderForm>
            <div onClick={() => setVerConfig(true)} className="butonPlanilla btn w-50"><img src={iconUser} alt="img" /></div>
            <Form.Group as={Row} >

                <Col sm={4} className="pr-0">
                    <Form.Control size="sm" as="select" value={dataForm.producto} name="producto" onChange={handleChange}>
                        <option value="">Seleccionar Configuracion</option>
                        {datas.map((element, index) =>
                            <option key={index} value={element.codProducto}>{element.producto}</option>
                        )}
                    </Form.Control>

                </Col>
            </Form.Group>

            <Row className="ml-2">
                <Form onSubmit={handleSubmit} >
                    <p className="mt-3 TitleLabel"> <strong> Configuración</strong></p>
                    <Form.Group as={Row} >
                        <Form.Label column sm={5}>
                            Codigo <span className="required">*</span>
                        </Form.Label>
                        <Col sm={7}>
                            <Form.Control size="sm" readOnly={true} onChange={handleChange} name="codigo" value={codigo} type="text" placeholder="Codigo " />

                        </Col>
                    </Form.Group>
                    {configuracion.map((element, index) =>
                        <Form.Group as={Row} >

                            <Form.Label column sm={5}>
                                {element.configuracion} <span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" onChange={event => handleChangeConfig(event, index)} name="valor" value={element.valor} type="number" placeholder="Codigo " />

                            </Col>
                        </Form.Group>
                    )}
                    <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`}>
                        <Col sm={6} style={{ margin: "0px 25%" }}>
                            <button type="submit" className="btn done-btn w-100" onClick={handleSubmitConfig}  ><strong>Editar</strong></button>
                        </Col>
                    </Form.Group>
                    <Modal
                        size='lg'
                        show={verConfig}
                        onHide={() => setVerConfig(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                {dataForm.razonSocial} (Cuentas Bancarias)
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col sm={12}>
                                <Row>
                                    <Col className="px-0" sm={5}>
                                        <BuscadorTipo mostrador={'moneda'} propsBuscador={dataBanco} placeholder={'BUSCAR BANCOS'} filter={'banco'} functionSetData={obtenerDataBancos}></BuscadorTipo>
                                    </Col>
                                    <Col >
                                        <p className="mt-3 TitleLabel"> <strong> Datos del Sponsor</strong></p>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                            <Form.Label>Tipo de Cuenta</Form.Label>
                                            <Form.Control name="tipCtaBan" onChange={handleChangeBanc} value={bancario.tipCtaBan} as="select" custom>
                                                <option value=''>Seleccionar tipo</option>
                                                {tipoCuenta.map((element, index) =>
                                                    <option key={index} value={element.Valor}>{element.Descripcion}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="exampleForm.SelectCustom">
                                            <Form.Label>Banco</Form.Label>
                                            <Form.Control name="codBanco" onChange={handleChangeBanc} value={bancario.codBanco} as="select" custom>
                                                <option value=''>Seleccionar banco</option>
                                                {banco.map((element, index) =>
                                                    <option key={index} value={element.Valor}>{element.Descripcion}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="exampleForm.SelectCustom">
                                            <Form.Label>Moneda</Form.Label>
                                            <Form.Control name="codMoneda" onChange={handleChangeBanc} value={bancario.codMoneda} as="select" custom>
                                                <option value=''>Seleccionar tipo de moneda</option>
                                                {tipoMoneda.map((element, index) =>
                                                    <option key={index} value={element.Valor}>{element.Descripcion}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Row} >
                                            <Form.Label column sm={6}>
                                                Nº de cuenta<span className="required">*</span>
                                            </Form.Label>
                                            <Col sm={6}>
                                                <Form.Control size="sm" onChange={(event) => handleChangeBanc(event)} name="ctaBanc" value={bancario.ctaBanc} type="number" placeholder="Cuenta Interna" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} >
                                            <Form.Label column sm={6}>
                                                Nº de cta. interbancaria<span className="required">*</span>
                                            </Form.Label>
                                            <Col sm={6}>
                                                <Form.Control size="sm" onChange={handleChangeBanc} name="cci" value={bancario.cci} type="number" placeholder="Cuenta Interbancaria" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`}>
                                            <Col sm={6} style={{ margin: "0px 25%" }}>
                                                <button type="submit" className="btn done-btn w-100" onClick={handleSubmit}  ><strong>Editar</strong></button>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                        </Modal.Body>
                    </Modal>
                </Form>
            </Row>
        </div>
    );
}

export default FormularioSponsors;