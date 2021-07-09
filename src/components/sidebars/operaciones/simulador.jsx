import React from 'react';
import { Tab, Col, Row, Nav } from 'react-bootstrap';
import FormSimulador from 'components/forms/operaciones/simulador';
import iconUser from 'img/usuarios/rol.svg';
import HeaderSeccion from 'components/sidebars/headerSeccion'
const SimuladorSidebar = ({ escritura }) => {


    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="simulador">
                <Row>
                    <Col sm={3} className="background-content">
                        <div className="div-titulo-seccion">
                            <p className="titulo-seccion">Opción</p>
                            <HeaderSeccion></HeaderSeccion>
                        </div>
                        <Nav variant="pills" className="flex-column">
                            <p className="my-3 ml-3"></p>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="simulador"><img src={iconUser} width="15px" className="mr-3" alt="Simulador" />Simulador</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="simulador">
                                <Row className={`justify-content-between`}>
                                    <Col xs={12} lg={5} className="headerForm">
                                        <div>
                                            <p className="letratableTitle">Entrada</p>
                                            <p className="letratable">Ingresar datos</p>
                                        </div>
                                    </Col>
                                    <Col xs={12} lg={7} className="headerForm">
                                        <div>
                                            <p className="letratableTitle">Resultado</p>
                                            <p className="letratable">Visualizar datos</p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={12} className="padding-0">
                                        <FormSimulador></FormSimulador>
                                    </Col>
                                </Row>

                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

            {/* <Procesando></Procesando> */}
        </>
    );
}

export default SimuladorSidebar;

