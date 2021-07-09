import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import FormConsultas from 'components/forms/operaciones/consultas'
import TableConsultas from 'components/tables/operaciones/tablesConsulta'
import ReactPaginate from 'react-paginate';

import 'components/sidebars/sidebars.css'
import axiosClient from 'config/axios/axiosClient';
import alerta from 'helpers/alerts';

const SidebarReprogramacion = ({ escritura }) => {
    const [filas, setFilas] = useState(0)
    const [pagActual, setPagActual] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [dataGeneralRepro, setDataGeneralRepro] = useState({})
    const [dataFechas, setDataFechas] = useState({})

    const [title] = useState('Detalles de la planilla')
    const [nroRegistros, setnroRegistros] = useState(0)

    const [propsTableDataConfig] = useState(
        ['nroDoc', 'razonSocial', 'numOpeGlobal', 'numOpeSponsor'])

    const [propsTableHead] = useState(
        ['Ruc', 'Razón Social', 'N° Operación Global', 'N° Operación Sponsor', 'Acciones'])

    const [propsTableData, setPropsTableData] = useState([])

    const obtenerDataPlanillaConsulta = (datos, paginado, filas,fechas) => {
        setPropsTableData(datos)
        setFilas(paginado.fila)
        setDataGeneralRepro(paginado)
        setnroRegistros(filas)
        setPageCount(paginado.paginado)
        setDataFechas(fechas)
    }

    const peticionTabla = async (fila, pagina) => {
        try {
            let paginado = {}
            paginado = dataGeneralRepro
            paginado.pagina = pagina
            paginado.fila = fila
            let response = await axiosClient.post('planilla/consultar', paginado);
            setPropsTableData(response.data.data.data)
            setPageCount(response.data.data.paginado)
        } catch (error) {
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
    }

    const handlePageClick = (e) => {
        peticionTabla(filas, e.selected + 1)
        setPagActual(e.selected)
    }

    const handleChange = (e) => {
        let { value } = e.target
        setFilas(value)
        peticionTabla(value, 1)
        setPagActual(0)
    }

    return (
        <>
            <div className="">

                <Row className="ml-1">
                    <Col md={4} >
                        <hr />
                        <p className="titleSidebar "> <strong>Buscar Planilla</strong></p>
                        <hr />
                        <FormConsultas obtenerPlanilla={obtenerDataPlanillaConsulta}></FormConsultas>
                    </Col>
                    <Col md={8} className="px-4">
                        {(filas === 0) ? '' :
                            <Row>
                                <Form.Label className="col-3 col-md-2"  >
                                    Cantidad de Registros
                                        </Form.Label>
                                <Form.Control className="col-2" size="sm" as="select" value={filas} onChange={handleChange} name="filas" >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="40">40</option>
                                </Form.Control>
                            </Row>
                        }
                        <TableConsultas escritura={escritura} componente={"reprogramaciones"} size={"800px"} 
                        propsTableDataConfig={propsTableDataConfig} propsTableData={propsTableData} fechas={dataFechas}
                        title={title} nroRegistros={nroRegistros} propsTableHead={propsTableHead}>
                        </TableConsultas>
                        {
                            (pageCount === 0) ? '' : <ReactPaginate
                                forcePage={pagActual}
                                previousLabel={"<<"}
                                nextLabel={">>"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={6}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"} />
                        }

                    </Col>
                </Row>
            </div>
        </>
    );
}

export default SidebarReprogramacion;