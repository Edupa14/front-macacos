import React, { useState } from 'react';
import { Tab, Col, Row, Nav, Form } from 'react-bootstrap';
import FormAuditoria from 'components/forms/admnistrativo/auditoria';
import FormLog from 'components/forms/admnistrativo/log';
import iconUser from 'img/usuarios/rol.svg';
import axiosClient from 'config/axios/axiosClient';
import Tables from 'components/tables/administrativo/auditoria';
import HeaderSeccion from '../headerSeccion';
import ReactPaginate from 'react-paginate';
import alerta from 'helpers/alerts';

const AuditoriaSidebar = ({ escritura }) => {
    const [pageCount,setPageCount] = useState(0)
    const [filas,setFilas] = useState(0)
    const [pagActual,setPagActual] = useState(0)
    const [dataGeneralAuditoria,setDataGeneralAuditoria] = useState({})

    const [pageCountLog,setPageCountLog] = useState(0)
    const [filasLog,setFilasLog] = useState(0)
    const [pagActualLog,setPagActualLog] = useState(0)
    const [dataGeneralLog,setDataGeneralLog] = useState({})

    const [peticion, setPeticion] = useState(true)
    const [title] = useState('Detalle de Auditoría')
    const [nroRegistros, setNroRegistros] = useState(0)
    const [nroRegistrosLog, setNroRegistrosLog] = useState(0)
    const [propsTableDataAuditoria] = useState(
        ['fecha', 'operacion', 'usuarios', 'tabla', 'descripcion'])
    const [propsTableHead] = useState(
        ['Fec. registro', 'Operación', 'Usuario', 'Tabla', 'Estado'
        ])

    const [propsTableDataLog] = useState(
        ['fechaReg', 'proceso', 'usuario', 'url'])
    const [propsTableHeadLog] = useState(
        ['Fec. registro', 'Operación', 'Usuario', 'Url'])

    const [propsTableData, setPropsTableData] = useState([])
    const [propsTableDataL, setPropsTableDataL] = useState([])

    const obtenerLog = (datos, paginado, filas) => {
        setPropsTableDataL(datos)
        setNroRegistrosLog(filas)
        setPeticion(!peticion)
        setFilasLog(paginado.fila)
        setDataGeneralLog(paginado)
        setPageCountLog(paginado.paginado)
    }

    const obtenerAuditoria = (datos,paginado, filas) => {        
        setPropsTableData(datos)
        setNroRegistros(filas)
        setPeticion(!peticion)
        setFilas(paginado.fila)
        setDataGeneralAuditoria(paginado)
        setPageCount(paginado.paginado)
    }

    const peticionTabla = async(fila,pagina)=>{
        try{
            let paginado = {}
            paginado.pagina = pagina
            paginado.fila = fila
            paginado.fechaInit = dataGeneralAuditoria.fechaInit
            paginado.fechaFin = dataGeneralAuditoria.fechaFin
            paginado.usuario = dataGeneralAuditoria.usuario
            paginado.operacion = dataGeneralAuditoria.operacion
            let response = await axiosClient.post('auditoria/listar/fecha/', paginado);
            setPropsTableData(response.data.data.data)

            // setNroRegistros(response.data.data.data.length)
            setPageCount(response.data.data.paginado)
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
      
    }

    const peticionTablaLog = async(fila,pagina)=>{
        try{
            let paginado = {}
            paginado.pagina = pagina
            paginado.fila = fila
            paginado.fechaInit = dataGeneralLog.fechaInit
            paginado.fechaFin = dataGeneralLog.fechaFin
            paginado.usuario = dataGeneralLog.usuario
            let response = await axiosClient.post('log/listar/fecha/', paginado);
            setPropsTableDataL(response.data.data.data)
            // setNroRegistrosLog(response.data.filas)
            setPageCountLog(response.data.data.paginado)
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
        
    }

    const handleChange=(e)=>{
        let {value} = e.target
        setFilas(value)
        peticionTabla(value,1)
        setPagActual(0)
    }

    const handleChangeLog=(e)=>{
        let {value} = e.target
        setFilasLog(value)
        peticionTablaLog(value,1)
        setPagActualLog(0)
    }

    const handlePageClick=(e)=>{
        peticionTabla(filas,e.selected+1)
        setPagActual(e.selected)
    }

    const handlePageClickLog=(e)=>{
        peticionTablaLog(filasLog,e.selected+1)
        setPagActualLog(e.selected)
    }

    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="auditoria">
                <Row>
                    <Col sm={3} className="background-content">
                        <div className="div-titulo-seccion">
                                <p className="titulo-seccion">Opción</p>
                                <HeaderSeccion escritura={escritura}></HeaderSeccion>
                        </div>
                        <Nav variant="pills" className="flex-column mt-4">
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="auditoria"><img src={iconUser} width="15px" className="mr-3" alt="Auditorias" />Auditoría</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="log"><img src={iconUser} width="15px" className="mr-3" alt="Log" />Log</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="auditoria">
                                <Row>
                                    <Col xs={12}>
                                        <FormAuditoria obtenerAuditoria={obtenerAuditoria}></FormAuditoria>
                                    </Col>
                                    <Col xs={12}>
                                     { (filas ===0)?'':
                                    <Row className="pl-4 pb-4">
                                        <Col xs={12} md={3}>                                        
                                            <Form.Group>
                                                <Form.Label column >
                                                    Cantidad de Registros
                                                </Form.Label>
                                                <Form.Control size="sm" as="select" value={filas} onChange={handleChange} name="filas" >
                                                        <option value="10">10</option>
                                                        <option value="20">20</option>
                                                        <option value="40">40</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                     }   
                                  
                                        <Tables size={"900px"} propsTableDataConfig={propsTableDataAuditoria} propsTableData={propsTableData} title={title} nroRegistros={nroRegistros} propsTableHead={propsTableHead}></Tables>
                                        {
                                            (pageCount===0)?'':<ReactPaginate
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
                                            activeClassName={"active"}/>
                                        }
                                        
                                    </Col>
                                </Row>

                            </Tab.Pane>

                        </Tab.Content>
                        <Tab.Content>
                            <Tab.Pane eventKey="log">
                                <Row>
                                    <Col xs={12}>
                                        <FormLog obtenerLog={obtenerLog}></FormLog>
                                    </Col>
                                    <Col xs={12}>
                                        { (filasLog ===0)?'':
                                        <Row className="pl-4 pb-4">
                                            <Col xs={12} md={3}>                                        
                                                <Form.Group>
                                                    <Form.Label column >
                                                        Cantidad de Registros
                                                    </Form.Label>
                                                    <Form.Control size="sm" as="select" value={filasLog} onChange={handleChangeLog} name="filasLog" >
                                                            <option value="10">10</option>
                                                            <option value="20">20</option>
                                                            <option value="40">40</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        }  
                                        <Tables size={"900px"} propsTableDataConfig={propsTableDataLog} propsTableData={propsTableDataL} title={title} nroRegistros={nroRegistrosLog} propsTableHead={propsTableHeadLog}></Tables>
                                        {
                                            (pageCountLog===0)?'':<ReactPaginate
                                            forcePage={pagActualLog}
                                            previousLabel={"<<"}
                                            nextLabel={">>"}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={pageCountLog}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={6}
                                            onPageChange={handlePageClickLog}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}/>
                                        }
                                    </Col>
                                </Row>

                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </>
    );
}

export default AuditoriaSidebar;

