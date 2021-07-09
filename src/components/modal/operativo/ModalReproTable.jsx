/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'
import ModalReprogramaciones from 'components/modal/operativo/ModalRepro'
import TableReprogramacion from 'components/tables/operaciones/tablesRepro'
import axiosClient from 'config/axios/axiosClient';
import alerta from 'helpers/alerts';

const ModalRepro = ({ abrirModal, idReprogramacionProp,escritura }) => {
    const [lgShow, setLgShow] = useState(false)
    const [modales, setModal] = useState(false)
    const [formModal, setFormModal] = useState(false)
    const [title] = useState('Detalles de la planilla')
    const [nroRegistros, setnroRegistros] = useState(0)
    const [propsTableDataConfig] = useState(
        ['nroDoc', 'razonSocial', 'tipDoc', 'idNumDoc', 'Fecha de emision', 'Fecha de Vencimiento',
            'monto', 'numOpeGlobal', 'numUnico', 'Programa', 'Producto'])

    const [propsTableHead] = useState(
        ['Ruc', 'Cliente', 'T. Doc.', 'Documento', 'Fec. Emisión', 'Fec. Vencimiento', 'Monto Documento', 'Num. Ope',
            'Número unico', 'Programa', 'Producto'
        ])
    const [propsTableData,setPropsTableData] = useState([])
    const [idPlanilla,setIDPlanilla] = useState(0)
    const [datosCabeceraTabla,setDataCabecerasTabla] = useState({})

    const actualizarCambios = async () => {
        try {
            let obj = {
                "idPlanilla": idPlanilla
            }
            let response = await axiosClient.post('planilla/obtener', obj)
            let data = response.data.data
            setnroRegistros(data.length)
            setPropsTableData(data)
            setFormModal({})
        } catch (error) {
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
    }

    const obtenerDataPlanilla = async (datos) => {
        try {
            setIDPlanilla(datos.idPlanilla)
            let obj = {
                "idPlanilla": datos.idPlanilla
            }
            let response = await axiosClient.post('planilla/obtener', obj)
            let data = response.data.data
            setnroRegistros(data.length)
            setPropsTableData(data)
            if (response.data.data.length > 0) {
                let planillaUnica = data[0]
                let datosTabla = {}
                let correoSponsor = await axiosClient.get(`sponsors/ruc/${data[0]['nroDoc']}`);
                let datosCorreo = correoSponsor.data.data;
                correoSponsor = datosCorreo.correo;
                datosTabla.numOpeGlobal = data[0].numOpeGlobal
                datosTabla.numOpeSponsor = idReprogramacionProp.numOpeSponsor
                datosTabla.fechaRegistro = idReprogramacionProp.fechaRegistro
                datosTabla.ruc = data[0].nroDoc
                datosTabla.programa = planillaUnica.Programa
                datosTabla.producto = planillaUnica.Producto
                datosTabla.razon = data[0].razonSocial
                datosTabla.nroRegistros = data.length
                datosTabla.correo = correoSponsor;
                setDataCabecerasTabla(datosTabla)
            }
            setFormModal({})
        } catch (error) {
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
    }

    useEffect(() => {
        setFormModal({})
        let datos ={}
        datos.idPlanilla = idReprogramacionProp.numOpeGlobal
        obtenerDataPlanilla(datos)
        if (idReprogramacionProp) {
            setLgShow(true)
        }
    }, [abrirModal])

    const abrirModalRepros = (datos) => {
        setModal(!modales)
        setFormModal(datos)
    }

    return (

        <Modal
            size="xl"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Detalle de Reprogramación
                    </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <TableReprogramacion funciones={abrirModalRepros} nombreFuncion="Reprogramar" propsTableDataConfig={propsTableDataConfig}
                    propsTableData={propsTableData} title={title} nroRegistros={nroRegistros} propsTableHead={propsTableHead}
                    datos={datosCabeceraTabla}>
                </TableReprogramacion>


                <ModalReprogramaciones actualizarCambios={actualizarCambios} idPlanilla={idPlanilla}
                    escritura={escritura} abrirModal={modales} dataForm={formModal} tipo={"EDIT"}>
                </ModalReprogramaciones>
            </Modal.Body>
        </Modal>

    );
}

export default ModalRepro;