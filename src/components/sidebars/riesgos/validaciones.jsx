import React, { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav, Container } from 'react-bootstrap';
import BuscadorTipo from 'components/buscador/buscadorPorTipo';
// import FormularioParametro from 'components/forms/admnistrativo/parametros'
import iconAprobacion from 'img/riesgos/filtro-aprobacion.svg'
import iconRol from 'img/usuarios/rol.svg'
import { useSelector } from 'react-redux';


const ParametrosSidebar = ({escritura}) => {

    const parametros = useSelector(store=>store.parametros.array)
    const [peticion, setPeticion] = useState(true)

    useEffect(() => {
        

    }, [])

    const obtenerDataParametro = () => {
        setPeticion(!peticion)
    }

    return (
        <>

            <Tab.Container id="left-tabs-example" defaultActiveKey="aprobacion">
                <Row>
                    <Col sm={3} className="background-content">
                        <Nav variant="pills" className="flex-column">
                            <p className="my-3 ml-3">Opción</p>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="aprobacion"><img src={iconRol} width="15px" className="mr-3" alt="Parametro"/>Filtros de Aprobación</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="mandatorios"><img src={iconAprobacion} width="15px" className="mr-3" alt="Valor"/>Parámetros Mandatorios</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="mejoras"><img src={iconAprobacion} width="15px" className="mr-3" alt="Valor"/>Parámetros de Mejoras</Nav.Link>
                            </Nav.Item>
                        </Nav>      
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="aprobacion">
                                <Row>
                                    <Col xs={12} md={4} className="px-0">
                                        <BuscadorTipo mostrador={'Descripcion'} propsBuscador={parametros} placeholder="Búsqueda Aprobación" filter={'Etiqueta'} functionSetData={obtenerDataParametro}></BuscadorTipo>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <Container>
                                            {/* <FormularioParametro actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormParametro} escritura={escritura} tipo="ADD" ></FormularioParametro> */}
                                        </Container>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="mandatorios">
                                <Row>
                                    <Col xs={12} md={4} className="px-0">
                                        <BuscadorTipo mostrador={'Descripcion'} propsBuscador={parametros} placeholder="Búsqueda Mandatorias" filter={'Etiqueta'} functionSetData={obtenerDataParametro}></BuscadorTipo>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <Container>
                                            {/* <FormularioParametro actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormParametro} escritura={escritura} tipo="ADD" ></FormularioParametro> */}
                                        </Container>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="mejoras">
                                <Row>
                                    <Col xs={12} md={4} className="px-0">
                                        <BuscadorTipo mostrador={'Descripcion'} propsBuscador={parametros} placeholder="Búsqueda Mejoras" filter={'Etiqueta'} functionSetData={obtenerDataParametro}></BuscadorTipo>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <Container>
                                            {/* <FormularioParametro actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormParametro} escritura={escritura} tipo="ADD" ></FormularioParametro> */}
                                        </Container>
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

export default ParametrosSidebar;