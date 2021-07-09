import React, { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav } from 'react-bootstrap';
import Buscador from 'components/buscador/buscador';
import iconAprobado from 'img/riesgos/aprobadas.svg'
import iconVetado from 'img/riesgos/vetadas.svg'
import axiosClient from 'config/axios/axiosClient';

import FormularioVetadas from 'components/forms/riesgos/vetadas'
const IndustriasSidebar = ({escritura}) => {
    const [peticion, setPeticion] = useState(true)
    const [peticionAxios, setPeticionAxios] = useState(true)
    const [dataRole, setDatarole] = useState([])
    const [dataFormIndustrias, setDataFormIndustrias] = useState({})
    const [dataIndustrias, setDataIndustrias] = useState([])
    const [data, setData] = useState([])

    const [actualizarBuscadorGlob,setActualizarBuscadorGlob] = useState(false)
    const getListaRoles = async () => {
        let body = { idPadre: 0, etiqueta: "ROL" }
        let response = await axiosClient.post('parametro/listar', body)
        let rpta = undefined
        if (response.data.ok === true) {
            rpta = response.data.data
        }
        return rpta
    }

    const getListaIndustrias = async () => {
        let body = { idPadre: 283, etiqueta: "INDUSTRIAS", "estado": "VET"}
        let response = await axiosClient.post('parametro/listar', body)
        
        let rpta = undefined
        if (response.data.ok === true) {
            rpta = response.data.data
            
            
        }
        setData(rpta)
        return rpta
    }
    useEffect(() => {
        async function loadListaRol() {
            let response = await getListaRoles()
            if (response !== undefined) {
                setDatarole(response)
            }
        }
        
        async function loadListaIndustrias() {
            let response = await getListaIndustrias()

            if (response !== undefined) {
                setDataIndustrias(response)
            }
            
        }
        loadListaIndustrias()
        loadListaRol()

    }, [peticionAxios])

    const actualizarCambios = (siPeticion) =>{
        setPeticionAxios(!peticionAxios)
        if(siPeticion){
            setTimeout(()=>{
                setActualizarBuscadorGlob(!actualizarBuscadorGlob)
            },2000)
        }if(siPeticion===undefined){
            setActualizarBuscadorGlob(!actualizarBuscadorGlob)
        }
    }

    const obtenerDataRol = () => {
        setPeticion(!peticion)
    }

    
    const obtenerDataIndustrias = (datos) => {
        setDataFormIndustrias(datos)
        setPeticion(!peticion)
    }
    
    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="vetadas">
                <Row>
                    <Col sm={3} className="background-content">
                        <Nav variant="pills" className="flex-column">
                            <p className="my-3 ml-3">Opción</p>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="vetadas"><img src={iconVetado} width="15px" className="mr-3" alt="Vetadas"/>Vetadas</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="aprobadas"><img src={iconAprobado} width="15px" className="mr-3" alt="Aprobadas"/>Aprobadas</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="vetadas">
                                <Row>
                                    <Col xs={12} md={4}>
                                        <Buscador actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idParametro'}  propsBuscador={dataIndustrias} placeholder='Búsqueda Vetadas' filterName={'Descripcion'}  functionSetData={obtenerDataIndustrias}></Buscador>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        
                                        <FormularioVetadas actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormIndustrias} escritura={escritura} tipo="ADD" ></FormularioVetadas> 
                                        
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="aprobadas">
                                <Row>
                                    <Col xs={12} md={4}>
                                        {/* <Buscador propsBuscador={dataIndustrias} placeholder='Búsqueda Aprobadas' functionSetData={obtenerDataIndustrias}></Buscador>*/}
                                    </Col>
                                    <Col xs={12} md={8}>
                                        {/* <FormularioAprobadas actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormRol} escritura={escritura} tipo="ADD" ></FormularioAprobadas> */}
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

export default IndustriasSidebar;