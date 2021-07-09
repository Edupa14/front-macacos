import React, { useEffect, useState } from 'react';
import {Tab,Col,Row,Nav } from 'react-bootstrap';
import Buscador from 'components/buscador/buscador';
import axiosClient from 'config/axios/axiosClient';
import FormularioProducto from 'components/forms/admnistrativo/productos';
import iconExter from 'img/usuarios/rol.svg'
import HeaderSeccion from '../headerSeccion';
import alerta from 'helpers/alerts';

const ProgramaSidebar = ({escritura}) => {
    const [peticion, setPeticion] = useState(true)
    const [dataFICO, setDataFICO] = useState([])
    const [dataFIVE, setDataFIVE] = useState([])
    const [dataPRES, setDataPRES] = useState([])
    const [dataFormProductoFIVE, setDataFormProductoFIVE] = useState({})
    const [dataFormProductoFICO, setDataFormProductoFICO] = useState({})
    const [dataFormProductoPRES, setDataFormProductoPRES] = useState({})
    const [placeholder] = useState('Búsqueda de productos')
    const getListarProductosFICO = async () => {
        try{
            let dataParametro = {};
            dataParametro.idPadre = 2;
            dataParametro.etiqueta = 'PRODUCTO'
            dataParametro.estado = 'ACT'
            let response = await axiosClient.post('parametro/listar', dataParametro)
            let rpta = undefined
            if (response.data.ok === true) {
                rpta = response.data.data
            }
            return rpta
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
        
    }
    const getListarProductosFIVE = async () => {
        try{
            let dataParametro = {};
            dataParametro.idPadre = 3;
            dataParametro.etiqueta = 'PRODUCTO'
            dataParametro.estado = 'ACT'
            let response = await axiosClient.post('parametro/listar', dataParametro)
            let rpta = undefined
            if (response.data.ok === true) {
                rpta = response.data.data
            }
            return rpta
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
        
    }
    const getListarProductosPRES = async () => {
        try{
            let dataParametro = {};
            dataParametro.idPadre = 4;
            dataParametro.etiqueta = 'PRODUCTO'
            dataParametro.estado = 'ACT'
            let response = await axiosClient.post('parametro/listar', dataParametro)
            let rpta = undefined
            if (response.data.ok === true) {
                rpta = response.data.data
            }
            return rpta
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
        
    }
    useEffect(()=>{
        async function listarProductoFICO() {
            let response = await getListarProductosFICO()
            if (response !== undefined) {
                setDataFICO(response)
            }
        }
        async function listarProductoFIVE() {
            let response = await getListarProductosFIVE()
            if (response !== undefined) {
                setDataFIVE(response)
            }
        }
        async function listarProductoPRES() {
            let response = await getListarProductosPRES()
            if (response !== undefined) {
                setDataPRES(response)
            }
        }
        listarProductoFICO()
        listarProductoFIVE()
        listarProductoPRES()
    },[])
    const obtenerDataProductoFICO = (datos) => {
        setDataFormProductoFICO(datos)
        setPeticion(!peticion)
    }
    const obtenerDataProductoFIVE = (datos) => {
        setDataFormProductoFIVE(datos)
        setPeticion(!peticion)
    }
    const obtenerDataProductoPRES = (datos) => {
        setDataFormProductoPRES(datos)
        setPeticion(!peticion)
    } 
    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="fico">
                <Row>
                    <Col sm={3} className="background-content">
                        <div className="div-titulo-seccion">
                                <p className="titulo-seccion">Opción</p>
                                <HeaderSeccion escritura={escritura}></HeaderSeccion>
                        </div>
                        <Nav variant="pills" className="flex-column mt-4">
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="fico"><img src={iconExter} width="15px" className="mr-3" alt="Exter" />Financiamiento de compra</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="five"><img src={iconExter} width="15px" className="mr-3" alt="Exter1" />Financiamiento de venta</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="prestamos"><img src={iconExter} width="15px" className="mr-3" alt="Exter2" />Préstamos</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="fico">
                                <Row>
                                    <Col xs={12} md={4} style={ {height:"500px"}} className="px-0">
                                        <Buscador filtroColor={'idParametro'} placeholder={placeholder} propsBuscador={dataFICO} filterName={'Descripcion'} functionSetData={obtenerDataProductoFICO} ></Buscador>
                                    </Col>  
                                    <Col xs={12} md={8}>
                                        <FormularioProducto escritura={escritura} peticion={peticion} dataForm={dataFormProductoFICO}  tipo="ADD" ></FormularioProducto>
                                    </Col> 
                                </Row>                     
                            </Tab.Pane>
                            <Tab.Pane eventKey="five">
                                <Row>
                                    <Col className="px-0" style={ {height:"500px"}}>
                                        <Buscador filtroColor={'idParametro'} placeholder={placeholder} propsBuscador={dataFIVE} filterName={'Descripcion'}  functionSetData={obtenerDataProductoFIVE} ></Buscador>
                                    </Col>  
                                    <Col xs={12} md={8}>
                                        <FormularioProducto escritura={escritura} peticion={peticion} dataForm={dataFormProductoFIVE}  tipo="ADD" ></FormularioProducto>
                                    </Col>  
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="prestamos">
                                <Row>
                                    <Col className="px-0" style={ {height:"500px"}}>
                                        <Buscador filtroColor={'idParametro'} placeholder={placeholder} propsBuscador={dataPRES} filterName={'Descripcion'}  functionSetData={obtenerDataProductoPRES} ></Buscador>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <FormularioProducto escritura={escritura} peticion={peticion} dataForm={dataFormProductoPRES}  tipo="ADD" ></FormularioProducto>
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

export default ProgramaSidebar;