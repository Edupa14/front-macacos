import React, { useState } from 'react';
import { Container, Row, Col,Form } from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import BreadcrumConsultas from 'components/breadcrumbs/nivelc'
import TableConsultas from 'components/tables/operaciones/tablesConsulta'
import SidebarConsultas from 'components/sidebars/operaciones/consultas'
import { useParams } from 'react-router-dom';
import { EscrituraPermitida } from 'helpers/protectedView';
import ReactPaginate from 'react-paginate';
import alerta from 'helpers/alerts';
import axiosClient from 'config/axios/axiosClient';

const Consultas = () => {
    const { id } = useParams()
    const [escritura] = useState(EscrituraPermitida('CON'))
    const [datosBread] = useState({ nivel1: 'Home', nivel2: 'Operaciones', nivel3: 'Consultas', direccion: '/operaciones' })
    const [title] = useState('Detalles de la planilla')
    const [nroRegistros, setnroRegistros] = useState(0)
    const [propsTableDataConfig] = useState(
        ['nroDoc', 'razonSocial', 'numOpeGlobal', 'numOpeSponsor'])

    const [propsTableHead] = useState(
        ['Ruc', 'Razón Social', 'N° Operación Global', 'N° Operación Sponsor', 'Acciones'])
    const [propsTableData, setPropsTableData] = useState([])

    const [filas, setFilas] = useState(0)
    const [pagActual, setPagActual] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [dataGeneralConsulta, setDataGeneralConsulta] = useState({})
    const [dataFechas, setDataFechas] = useState({})


    const enviarPlanilla = (data, paginado, filas, fechas) => {
        setnroRegistros(filas)
        setPropsTableData(data)
        setDataFechas(fechas)
        setFilas(paginado.fila)
        setDataGeneralConsulta(paginado)
        setPageCount(paginado.paginado)
    }

    const peticionTabla = async(fila,pagina)=>{
        try{
            let paginado = {}
            paginado = dataGeneralConsulta
            paginado.pagina = pagina
            paginado.fila = fila
            let response = await axiosClient.post('planilla/consultar', paginado);
            setPropsTableData(response.data.data.data)
            setPageCount(response.data.data.paginado)
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        } 
    }

    const handlePageClick=(e)=>{
        peticionTabla(filas,e.selected+1)
        setPagActual(e.selected)
    }

    const handleChange=(e)=>{
        let {value} = e.target
        setFilas(value)
        peticionTabla(value,1)
        setPagActual(0)
    }

    return (

        <Container fluid className="px-0">
            <HeaderMenu title={`Consultas`} subtitle="Gestiona y visualiza planillas" />
            <BreadcrumConsultas datosBread={datosBread}></BreadcrumConsultas>
            <p>{id}</p>
            <Row>
                <Col lg={4} className="background-content pl-0 pr-0">
                    <SidebarConsultas escritura={escritura} enviarPlanilla={enviarPlanilla}></SidebarConsultas>
                </Col>
                <Col lg={8}>
                    {/*(filas === 0) ? '' :
                        <Row>
                            <Form.Label className="col-3 col-md-2" >
                                Cantidad de Registros
                                        </Form.Label>
                            <Form.Control className="col-2" size="sm" as="select" value={filas} onChange={handleChange} name="filas" >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="40">40</option>
                            </Form.Control>
                        </Row>
                    */}
                    {<TableConsultas componente={'consultas'} size={"820px"} propsTableDataConfig={propsTableDataConfig} 
                    propsTableData={propsTableData} title={title} fechas={dataFechas} nroRegistros={nroRegistros} 
                    propsTableHead={propsTableHead}></TableConsultas>}
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

        </Container>
    );
}

export default Consultas;