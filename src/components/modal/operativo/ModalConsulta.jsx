/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Row, Col, Modal, Table, Form} from 'react-bootstrap'
import CabeceraTable from 'components/tables/cabecera'
import axiosClient from 'config/axios/axiosClient';
import alerta from 'helpers/alerts';
import swal from 'sweetalert'
import {jsPDF} from "jspdf";
import 'jspdf-autotable'
import iconEmail from "../../../img/utils/email.svg";
import {message} from "antd";

const ModalRepro = ({componente, abrirModal, propsTableData, idLiquidacionProp}) => {
    const [lgShow, setLgShow] = useState(false)
    const [montoDoc, setMontoDoc] = useState(0)
    const [montoAbo, setMontoAbo] = useState(0)
    const [mtoTotFacDesc, setMtoTotFacDesc] = useState(0)
    const [Intereses, setIntereses] = useState(0)
    const [IGV, setIGV] = useState(0)
    const [dataCabecerasConsulta, setDataCabecerasConsulta] = useState({})
    const [propsTableDataConfigModal] = useState(
        ['nroDoc', 'razonSocial', 'numUnico', 'idNumDoc', 'Fecha de vencimiento', 'TasaInteresTotal', 'moneda', 'mtoDoc', 'Intereses', 'IGV', 'mtoTotFacDesc', 'Monto_abonar'])
    const [propsTableHeadModal] = useState([
        'RUC', 'Comprador', 'Nro Unico', 'Nro Documento', 'Fecha Vencimiento', 'Tasa de Interés Total',
        'Moneda', 'Monto Documento', 'Intereses', 'IGV', 'Total Descuento', 'Neto Abonar'
    ])


    const [propsTableDataModal, setPropsTableDataModal] = useState([])
    const [dataFormulario] = useState({})

    useEffect(() => {
        listar(idLiquidacionProp)
        if (idLiquidacionProp) {
            setLgShow(true)
        }

    }, [abrirModal])

    const enviarCorreo = async () => {
        let datos = {};
        datos.nroOperacion = propsTableData[0].numOpeGlobal;
        datos.nroRegistros = propsTableDataModal.length;
        datos.ruc = propsTableData[0].nroDoc;
        datos.cliente = propsTableData[0].razonSocial;
        datos.tabla = propsTableDataModal;

        var columns = [
            {title: "RUC", dataKey: "nroDoc"},
            {title: "Comprador", dataKey: "razonSocial"},
            {title: "Nro Unico", dataKey: "numUnico"},
            {title: "Nro Documento", dataKey: "idNumDoc"},
            {title: "Fecha Vencimiento", dataKey: "Fecha de vencimiento"},
            {title: "Tasa de Interés Total", dataKey: "TasaInteresTotal"},
            {title: "Moneda", dataKey: "moneda"},
            {title: "Monto Documento", dataKey: "mtoDoc"},
            {title: "Intereses", dataKey: "Intereses"},
            {title: "IGV", dataKey: "IGV"},
            {title: "Total Descuento", dataKey: "mtoTotFacDesc"},
            {title: "Neto Abonar", dataKey: "Monto_abonar"},
        ];
        var rows = propsTableDataModal;

        var doc = new jsPDF('l', 'pt');
        doc.setFontSize(12);
        doc.text("LIQUIDACIÓN N°", 400, 50, null, null, "center");
        doc.setFontSize(10);
        doc.setFont("", "bold");
        doc.text("N° Operación:", 50, 60);
        doc.setFont("", "normal");
        doc.text("", 22, 60);
        doc.setFont("", "bold");
        doc.text("N° Registros:", 50, 75);
        doc.setFont("", "normal");
        doc.text("", 40, 75);
        doc.setFont("", "bold");
        doc.text("RUC:", 50, 90);
        doc.setFont("", "normal");
        doc.text("", 47, 90);
        doc.setFont("", "bold");
        doc.text("Cliente:", 50, 105);
        doc.setFont("", "normal");
        doc.text("", 47, 105);
        doc.autoTable(columns, rows, {
            startY: 150,
        });
        //doc.save('table.pdf');
        var pdfBase64 = doc.output('datauristring');

        const formData = new FormData();
        formData.append('files[]', pdfBase64);

        let res =  await axiosClient.post('/subir/archivo/planilla', formData);
        console.log(res)
        if (res.data.ok === true) {
            swal({
                title: "Datos enviados Exitosamente",
                text: "Nos comunicaremos contigo a la brevedad",
                icon: "success",
                button: "Ok",
            });
        }else{
            swal({
                title: "¡Algo ha fallado!",
                text: "Por favor vuelve a intentarlo",
                icon: "error",
                button: "Volver a Intentar",
            });
        }
        let paginado = {};
        let correoSponsor = await axiosClient.get(`sponsors/ruc/${propsTableData[0].nroDoc}`);
        paginado.correo = correoSponsor.data.data.correo;
        paginado.pdf = pdfBase64;
        let response = await axiosClient.post('notificacion/envioCorreoLiquidacion/', paginado);
        /*return response;*/

    }

    const listar = async (idLiquidacion) => {
        dataFormulario.idLiquidacion = idLiquidacion;
        let response = await axiosClient.post('transaccion/buscar/filtro', dataFormulario);

        if (response.data.ok === true) {
            let cabeceraConf = {}
            let datas = response.data.data
            setPropsTableDataModal(datas)


            setMontoDoc(0)
            setMontoAbo(0)
            setMtoTotFacDesc(0)
            setIntereses(0)
            setIGV(0)
            let intereses = 0
            let igv = 0
            let monto_doc = 0
            let monto_abo = 0
            let monto_desc = 0

            function moneda(moneda, cant_moneda) {
                if (moneda == 'USD') {
                    return cant_moneda * 3.74
                } else {
                    return cant_moneda
                }
            }

            datas.map((ele) => {
                if (ele.mtoDoc > 0 || ele.mtoDoc < 0) {
                    monto_doc += moneda(ele.moneda, ele.mtoDoc)
                    setMontoDoc(monto_doc)
                }
                if (ele.Intereses > 0 || ele.Monto_abonar < 0) {
                    intereses += moneda(ele.moneda, ele.Intereses)
                    setIntereses(intereses)
                }
                if (ele.IGV > 0 || ele.Monto_abonar < 0) {
                    igv += moneda(ele.moneda, ele.IGV)
                    setIGV(igv)
                }
                if (ele.Monto_abonar > 0 || ele.Monto_abonar < 0) {
                    monto_abo += moneda(ele.moneda, ele.Monto_abonar)
                    setMontoAbo(monto_abo)
                }
                if (ele.mtoTotFacDesc > 0 || ele.mtoTotFacDesc < 0) {
                    monto_desc += moneda(ele.moneda, ele.mtoTotFacDesc)
                    setMtoTotFacDesc(monto_desc)
                }
            })

            if (datas[0] !== undefined) {
                let correoSponsor = await axiosClient.get(`sponsors/ruc/${datas[0]['nroDoc']}`);
                let datos = correoSponsor.data.data;
                correoSponsor = datos.correo;
                cabeceraConf.numOpeGlobal = datas[0]['numOpeGlobal']
                cabeceraConf.numOpeSponsor = datas[0]['numOpeSponsor']
                cabeceraConf.fechaRegistro = datas[0]['Fecha de registro']
                cabeceraConf.ruc = datas[0]['nroDoc']
                cabeceraConf.razon = datas[0]['razonSocial']
                cabeceraConf.programa = datas[0]['Programa']
                cabeceraConf.producto = datas[0]['Producto']
                cabeceraConf.nroRegistros = datas.length
                cabeceraConf.correo = correoSponsor;
                setDataCabecerasConsulta(cabeceraConf)
            } else {
                setDataCabecerasConsulta({})
            }

        }
    }

    return (

        <Modal
            size="xl"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton className=" pb-0">
                <Row>
                    <Col xs={12}>
                        {
                            (componente === 'consultas')
                                ? <p className="align-middle">
                                    <b> Planilla: {dataCabecerasConsulta.numOpeGlobal}</b>
                                </p>
                                : <Modal.Title id="example-modal-sizes-title-lg">
                                    Detalle de Consulta
                                </Modal.Title>
                        }

                    </Col>
                    {
                        (componente === 'liquidacion')
                            ? <Col xs={4}>
                                <button onClick={enviarCorreo} className="btn done-btn"><strong>Enviar correo</strong>
                                </button>
                            </Col>
                            : ''
                    }

                </Row>

            </Modal.Header>
            <Modal.Body>

                <CabeceraTable data={dataCabecerasConsulta} componente={componente}></CabeceraTable>
                {
                    (componente === 'consultas')
                        ? <div className="row justify-content-between pt-3">
                            <div className="col">
                                <Form.Group as={Row} className='m-1'>
                                    <Col xs={12} md={6} lg={6}>
                                        <p className="letratable"><b>N° Registros de
                                            Procesos: {dataCabecerasConsulta.nroRegistros}</b></p>
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className="col text-right aling-center mr-2">
                                <b>Enviar Correo</b>
                                <button className="btn delete-btn p-0 ml-2" onClick={enviarCorreo}>
                                    <img height="17px" className="m-1" src={iconEmail} alt=""/>
                                </button>
                            </div>
                        </div>
                        : ''
                }
                <hr/>
                <Table className="tableexpand" striped responsive bordered hover size="sm">
                    <thead>
                    <tr>
                        {propsTableHeadModal.map((ele, index) =>
                            <th className="letratable" key={index}>{ele}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {propsTableDataModal.map((ele, index) =>
                        <tr key={index}>
                            {propsTableDataConfigModal.map((elem, inde) =>
                                <td className="letratable" key={inde}>{ele[elem]}</td>
                            )}
                        </tr>
                    )}
                    <tr class="font-weight-bold">
                        <td colspan="6" bgcolor="darkgray">
                            Total Generales
                        </td>
                        <td bgcolor="darkgray">PEN</td>
                        <td bgcolor="darkgray">{montoDoc.toFixed(2)}</td>
                        <td bgcolor="darkgray">{Intereses.toFixed(2)}</td>
                        <td bgcolor="darkgray">{IGV.toFixed(2)}</td>
                        <td bgcolor="darkgray">{mtoTotFacDesc.toFixed(2)}</td>
                        <td bgcolor="darkgray">{montoAbo.toFixed(2)}</td>
                    </tr>
                    </tbody>
                </Table>

            </Modal.Body>
        </Modal>

    );
}

export default ModalRepro;