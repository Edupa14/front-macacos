/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Modal } from 'react-bootstrap'
import setPermisosForm from 'helpers/permisosForm';
import TablePlanilla from 'components/tables/tables';
import alerta from 'helpers/alerts'
import iconUser from 'img/planilla/vision.svg'
import iconError from 'img/datos.png'

const FormularioPlanillas = ({ tipo, peticion, dataForm, escritura, relist, limpieza }) => {

    const [tipoFormulario, setTipoFormulario] = useState(tipo)
    const [readOne, setReadOne] = useState(false)
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const [verPlani, setVerPlani] = useState(false);
    const [montoMin, setMontoMin] = useState('')
    const [montoMax, setMontoMax] = useState('')
    const [nroRegistros,setNroRegistros] = useState(0)
    const [propsTableDataPlanilla] = useState(
        ['nroDoc', 'razonSocial', 'numUnico', 'tipDoc', 'idNumDoc',
            'mtoDoc', 'Fecha de emision', 'Fecha de registro'])
    const [propsTableHead] = useState(
        ['Nro. Documento', 'Razon Social', 'Numero Unico', 'Tipo Documento', 'Numero Documento', 'Monto', 'Fecha Emicion', 'Fecha Registro'
        ])
    const [propsTableData, setPropsTableData] = useState([])
    const [dataFormulario, setDataFormulario] = useState({
        nroDoc: '',
        razonSocial: '',
        numOpeGlobal: '',
        numOpeSponsor: '',
        mtoPlanilla: '',
        estado: '',
        FechaRegistro: '',
        Observacion: '',
        montoMin: '',
        montoMax: '',
        tasaAnua: ''
    })


    const initialForm = {
        nroDoc: '',
        razonSocial: '',
        numOpeGlobal: '',
        numOpeSponsor: '',
        mtoPlanilla: '',
        estado: '',
        FechaRegistro: '',
        Observacion: '',
        montoMin: '',
        montoMax: '',
        tasaAnua: ''
    }
    const clearForm = () => {
        setDataFormulario({ ...initialForm })
        setMontoMax('')
        setMontoMin('')
        // setTasaAnual('')

    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }

    const getDataPlanilla = async () => {
        let planilla = {}
        planilla.idLiquidacion = dataForm.idLiquidacion;
        planilla.pagina = 1;
        planilla.fila = 10;
        let result = await axiosClient.post('planilla/consultar', planilla)
        return result.data.data.data
    }

    const getDatosPlanillas = async () => {
        let planilla = {}
        planilla.idLiquidacion = dataForm.idLiquidacion;
        let result = await axiosClient.post('transaccion/buscar/filtro', planilla)
        return result.data.data
    }

    useEffect(() => {
        let permisos = setPermisosForm(escritura, tipoFormulario)
        setReadOne(permisos.readOne)
    }, [tipoFormulario])

    useEffect(() => {
        setTimeout(() => clearForm(), 500)

    }, [limpieza])

    useEffect(() => {
        async function loadPlanilla() {
            let response = await getDataPlanilla()
            if (dataForm !== undefined) {
                if (dataForm.numOpeGlobal !== undefined) {
                    setTipoFormulario("CANCEL")
                    getDatas()
                    setDataFormulario(response[0])
                    getMontoMin()
                    getMontoMax()
                    getTasaAnual()
                }
            }
        }
        async function loadRegistrosPla() {
            let response = await getDatosPlanillas()
            if (dataForm !== undefined) {
                if (dataForm.idLiquidacion !== undefined) {
                    setPropsTableData(response)
                    setNroRegistros(response.length)
                }
            }
        }
        loadPlanilla()
        loadRegistrosPla()

    }, [peticion])

    const aprobarPlantilla = async (e) => {
        try{
            e.preventDefault()
            let FORM = new FormData()
            FORM.append('idLiquidacion', dataForm.idLiquidacion)
            FORM.append('estado', 'APRO')
            FORM.append('observacion', dataFormulario.Observacion)
            await axiosClient.post('liquidacion/editar', FORM)
            relist()
            alerta("Planilla aprobada", "success")
            setTimeout(() => {
                clearForm()
                setSmShow(false)
            }, 2000)
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
      
    }

    const rechazarPlantilla = async (e) => {
        try{
            e.preventDefault()
            let FORM = new FormData()
            FORM.append('idLiquidacion', dataForm.idLiquidacion)
            FORM.append('estado', 'RECH')
            FORM.append('observacion', 'No fue aceptada')
            await axiosClient.post('liquidacion/editar', FORM)
            relist()
            alerta("Planilla rechazada", "success")
            setTimeout(() => {
                clearForm()
                setLgShow(false)
            }, 2000)
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }

    }

    const getDatas = async () => {
        let config = {}
        config.idSponsors = dataForm.idSponsor
        config.estado = 'ACT'
        config.producto = 'PPR'
        await axiosClient.post(`sponsors/listConfig`, config)
    }

    const getMontoMin = async () => {
        let config = {}
        config.idSponsor = dataForm.idSponsor
        config.codigoPro = dataForm.codProd
        config.valor = 'MOM'
        let result = await axiosClient.post(`/parametro/listar/valores`, config)
        if (result) {
            setMontoMin(result.data.data.valor);
        }
    }
    const getMontoMax = async () => {
        let config = {}
        config.idSponsor = dataForm.idSponsor
        config.codigoPro = dataForm.codProd
        config.valor = 'MMAX'
        let result = await axiosClient.post(`/parametro/listar/valores`, config)
        if (result) {
            setMontoMax(result.data.data.valor);
        }
    }

    const getTasaAnual = async () => {
        let config = {}
        config.idSponsor = dataForm.idSponsor
        config.codigoPro = dataForm.codProd
        config.valor = 'TEA'
        let result = await axiosClient.post(`/parametro/listar/valores`, config)
        if (result) {
            // setTasaAnual(result.data.data.valor * 100);
        }
    }

    return (
        <div className="test-m" >
            <Row>
                <Col sm={1}></Col>
                <Col sm={9} className="marginFormRight">
                    <div onClick={() => setVerPlani(true)} className="butonPlanilla btn w-50"><img src={iconUser} alt="img" /></div>
                    <Form >
                        <p className="mt-3 TitleLabel"> <strong> Datos  de Planilla</strong></p>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Documento oficial de identidad<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" readOnly={readOne} value={dataFormulario.nroDoc} onChange={handleChange} name="nroDoc" type="text" placeholder="Número de Documento" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Razon Social<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" readOnly={readOne} value={dataFormulario.razonSocial} onChange={handleChange} name="RazonSocial" type="text" placeholder="Razon Social" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Estado<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" readOnly={readOne} value={dataFormulario.estado} onChange={handleChange} name="Estado" type="text" placeholder="Estado de plantilla" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Fecha de Registro<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" readOnly={readOne} value={dataFormulario.FechaRegistro} onChange={handleChange} name="FechaReg" type="text" placeholder="Fecha de Registro" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Observación<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" readOnly={readOne} value={dataFormulario.Observacion} onChange={handleChange} name="Observacion" type="text" placeholder="Observación" />
                            </Col>
                        </Form.Group>
                        <p className="mt-3 TitleLabel"> <strong> Datos del Creditos</strong></p>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Monto Minimo<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" readOnly={readOne} value={montoMin} onChange={handleChange} name="MontoMin" type="text" placeholder="Monto Minimo" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Monto Maximo<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" readOnly={readOne} value={montoMax} onChange={handleChange} name="MontoMin" type="text" placeholder="Monto Maximo" />
                            </Col>
                        </Form.Group>

                        {/* <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Tasa Efectiva Anual<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <InputGroup size="sm">
                                    <Form.Control size="sm" readOnly={readOne} value={tasaAnual} onChange={handleChange} name="TasaAnual" type="text" placeholder="Tasa Efectiva Anual" />
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Col>
                        </Form.Group> */}

                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Monto total<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" readOnly={readOne} value={dataFormulario.mtoPlanilla} onChange={handleChange} name="MtoPlanilla" type="text" placeholder="Monto de Planilla" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >

                            <Col sm={6} >
                                <div onClick={() => setSmShow(true)} className="btn done-btn w-100">Aprobar</div>
                            </Col>
                            <Col sm={6} >
                                <div onClick={() => setLgShow(true)} className="btn delete-btn w-100">Rechazar</div>
                            </Col>

                            <Modal
                                size="lg"
                                show={smShow}
                                onHide={() => setSmShow(false)}
                                aria-labelledby="example-modal-sizes-title-lg"
                            >
                                <Modal.Body>
                                    {
                                        (dataForm.idLiquidacion === undefined) ? 'NO HAY DATOS, SELECCIONA UNA PLANILLA' :
                                            <>
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="example-modal-sizes-title-lg">
                                                        {dataFormulario.razonSocial}
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={5}>
                                                            Estado<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={7}>
                                                            <Form.Control size="sm" readOnly={readOne} value={dataFormulario.estado} onChange={handleChange} name="Estado" type="text" placeholder="Estado de plantilla" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={5}>
                                                            Observación<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={7}>
                                                            <Form.Control size="sm" value={dataFormulario.Observacion} onChange={handleChange} name="Observacion" type="text" placeholder="Observación" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Col sm={6} style={{ margin: "20px 25%", width: "1024px", height: "34px" }}>
                                                        <button onClick={aprobarPlantilla} className="btn done-btn w-100">Aprobar</button>
                                                    </Col>
                                                </Modal.Body>
                                            </>
                                    }
                                </Modal.Body>
                            </Modal>
                            <Modal
                                size="lg"
                                show={lgShow}
                                onHide={() => setLgShow(false)}
                                aria-labelledby="example-modal-sizes-title-lg"
                            >
                                <Modal.Body>
                                    {
                                        (dataForm.idLiquidacion === undefined) ? 'NO HAY DATOS, SELECCIONA UNA PLANILLA' :
                                            <>
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="example-modal-sizes-title-lg">
                                                        {dataFormulario.razonSocial}
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={5}>
                                                            Estado<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={7}>
                                                            <Form.Control size="sm" readOnly={readOne} value={dataFormulario.estado} onChange={handleChange} name="Estado" type="text" placeholder="Estado de plantilla" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={5}>
                                                            Observación<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={7}>
                                                            <Form.Control size="sm" value={dataFormulario.Observacion} onChange={handleChange} name="Observacion" type="text" placeholder="Observación" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Col sm={6} style={{ margin: "20px 25%", width: "1024px", height: "34px" }}>
                                                        <div onClick={rechazarPlantilla} className="btn delete-btn w-100">Rechazar</div>
                                                    </Col>
                                                </Modal.Body>
                                            </>
                                    }
                                </Modal.Body>
                            </Modal>
                            <Modal
                                size="lg"
                                show={verPlani}
                                onHide={() => setVerPlani(false)}
                                aria-labelledby="example-modal-sizes-title-lg"

                            >
                                <Modal.Body style={{ background: "#f8f8f8" }}>
                                    {
                                        (dataForm.idLiquidacion === undefined) ?
                                            <>
                                                <img src={iconError} alt="img" style={{ margin: "5% 25%", width: "50%", height: "30%" }} />
                                                <h3 style={{ width: "100%", height: "20%", margin: "0% 23%" }}>No se han encontraron resutados</h3>
                                                <h6 style={{ width: "100%", height: "20%", margin: "0% 20%", color: "#ababab" }}>Selecciona una plantilla o prueba con otra para visualizar los datos</h6>
                                                <br />
                                            </> :
                                            <>
                                                <Modal.Header closeButton>

                                                    <Modal.Title id="example-modal-sizes-title-lg">
                                                        {dataFormulario.razonSocial}
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <TablePlanilla size={"735px"} propsTableDataConfig={propsTableDataPlanilla} propsTableData={propsTableData} nroRegistros={nroRegistros} propsTableHead={propsTableHead}></TablePlanilla>
                                                </Modal.Body>
                                            </>
                                    }
                                </Modal.Body>
                            </Modal>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default FormularioPlanillas;