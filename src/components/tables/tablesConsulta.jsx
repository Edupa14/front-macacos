import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import ModalConsulta from 'components/modal/operativo/ModalConsulta'
import ModalReproTable from 'components/modal/operativo/ModalReproTable'
import '../table.css'
import iconVision from 'img/planilla/vision.svg';
import iconPrinter from 'img/utils/printer.svg';
import iconExcel from 'img/utils/excel.svg';

const TableConsulta = ({ escritura, componente, size, propsTableDataConfig, title, fechas, propsTableHead, propsTableData, nroRegistros }) => {

    const [abrirModal, setAbrirModal] = useState(false);
    const [idComponenteProp, setIdComponenteProp] = useState(0)

    const verDetalle = (val) => {
        switch (componente) {
            case 'reprogramaciones':
                let obj = {}
                obj.numOpeGlobal = propsTableData[val].idLiquidacion
                obj.fechaRegistro = propsTableData[val].FechaRegistro
                obj.numOpeSponsor = propsTableData[val].numOpeSponsor
                setIdComponenteProp(obj)
                break;
            default:
                setIdComponenteProp(propsTableData[val].idLiquidacion)
        }

        setAbrirModal(!abrirModal)
    }

    const renderizador = (componentes) => {
        switch (componentes) {
            case 'consultas':
                return <ModalConsulta componente={'consultas'} abrirModal={abrirModal} propsTableData={propsTableData} idLiquidacionProp={idComponenteProp}> </ModalConsulta>
            case 'liquidacion':
                return <ModalConsulta componente={'liquidacion'} abrirModal={abrirModal} propsTableData={propsTableData} idLiquidacionProp={idComponenteProp}> </ModalConsulta>
            case 'reprogramaciones':
                return <ModalReproTable escritura={escritura} abrirModal={abrirModal} idReprogramacionProp={idComponenteProp}> </ModalReproTable>
            default: return ''

        }

    }

    if (nroRegistros === 0) {
        return (
            <p>Aún no se han registrado datos.</p>
        )
    } else {
        return (
            <>
                <span className="letratableTitle">{title}</span>
                <div className="row justify-content-between">
                    <div className="col-8">
                        <p className="letratable pt-2">N° de Registros
                            Procesados: <b>{nroRegistros}</b> &nbsp;&nbsp;|&nbsp;&nbsp; Fecha de
                            Inicio: <b>{fechas.fechaInit === undefined ? 'Hace mucho...' : fechas.fechaInit}</b>&nbsp;&nbsp;|&nbsp;&nbsp;Fecha
                            de Fin: <b>{fechas.fechaFin === undefined ? 'Hoy' : fechas.fechaFin}</b></p>
                    </div>
                    <div className="col-2 text-right">
                        <button className="btn delete-btn p-0  mr-2 " onClick={() => {

                        }}>
                            <img height="17px" className="m-1" src={iconPrinter} alt=""/>
                        </button>
                        <button className="btn delete-btn p-0" onClick={() => {

                        }}>
                            <img height="17px" className="m-1" src={iconExcel} alt=""/>
                        </button>
                    </div>
                    <div className="col-2"></div>
                </div>
                <Table style={(size) ? { width: size } : { width: "1500px" }} striped responsive bordered hover size="sm">
                    <thead>
                        <tr>
                            {propsTableHead.map((ele, index) =>
                                <th className="letratable" key={index}>{ele}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {propsTableData.map((ele, index) =>
                            <tr key={index}>
                                {propsTableDataConfig.map((elem, inde) =>
                                    <td className="letratable" key={inde}>{ele[elem]}</td>
                                )}
                                <td className="letratable" >
                                    <button className="btn delete-btn p-0 bg-light" onClick={() => {
                                        verDetalle(index);
                                    }}>
                                        Ver detalle
                                        <img height="17px" className="m-1" src={iconVision} alt="" />
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                {
                    renderizador(componente)
                }
            </>
        );
    }

}
export default TableConsulta;