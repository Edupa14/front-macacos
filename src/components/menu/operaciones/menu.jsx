import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import autorizacion from 'img/iconsMenu/operativo/icon-autorizacion.svg';
import consultas from 'img/iconsMenu/operativo/icon-consultas.svg';
import liquidacion from 'img/iconsMenu/operativo/icon-liquidacion.svg';
import planilla from 'img/iconsMenu/operativo/icon-planilla.svg';
import reprogramacion from 'img/iconsMenu/operativo/icon-reprogramacion.svg';
import simulacion from 'img/iconsMenu/operativo/icon-simulacion.svg';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import {RolesPermitidos} from 'helpers/protectedView';
import { funcionLog } from 'helpers/log';

const OperacionesMenu = () => {
    const setLog = (procesos, url) =>{
        let datas = {};
        datas.proceso = procesos
        datas.url = url
        funcionLog(datas);
    }
    
    return (
        <Container fluid className="">
            <BreadcrumbB nivel1="Inicio" nivel2="Operativo"></BreadcrumbB>
            <hr className="hrmenuheader"></hr>
            <Row className="my-2 textoMenu justify-content-md-center text-gillsans-medium ">                
                    <Row>
                        <Col xs={12} sm={3} lg={3} className={`text-center my-4 ${RolesPermitidos(['PLA']) ?'':" d-none"}`}>
                            <Link to="/operaciones/planilla" onClick={setLog('acceso seccion planilla', 'operaciones/planilla')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={planilla} alt="Planilla" className="py-2"/>
                                    <h1 className="text-gillsans-bold">Planilla</h1>
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={3} lg={3} className={`text-center my-4 ${RolesPermitidos(['SIM']) ?'':" d-none"}`}>
                            <Link to="/operaciones/simulador" onClick={setLog('acceso seccion simulador', 'operaciones/simulador')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={simulacion} alt="Simulación" className="py-2"/>
                                    <h1 className="text-gillsans-bold">Simulación</h1>
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={3} lg={3} className={`text-center my-4 ${RolesPermitidos(['AUT']) ?'':" d-none"}`}>
                            <Link to="/operaciones/autorizacion" onClick={setLog('acceso seccion autorizacion', 'operaciones/autorizacion')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={autorizacion} alt="Autorización" className="py-2"/>
                                    <h1 className="text-gillsans-bold">Autorización</h1>
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={3} lg={3} className={`text-center my-4 ${RolesPermitidos(['LIQ']) ?'':" d-none"}`}>
                            <Link to="/operaciones/liquidacion" onClick={setLog('acceso seccion liquidacion', 'operaciones/liquidacion')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={liquidacion} alt="Liquidación" className="py-2"/>
                                    <h1 className="text-gillsans-bold">Liquidación</h1>
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={3} lg={3} className={`text-center my-4 ${RolesPermitidos(['REP']) ?'':" d-none"}`}>
                            <Link to="/operaciones/reprogramaciones" onClick={setLog('acceso seccion reprogramaciones', 'operaciones/reprogramaciones')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={reprogramacion} alt="Reprogramación" className="py-2"/>
                                    <h1 className="text-gillsans-bold">Reprogramación</h1>
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={3} lg={3} className={`text-center my-4 ${RolesPermitidos(['CON']) ?'':" d-none"}`}>
                            <Link to="/operaciones/consultas" onClick={setLog('acceso seccion consultas', 'operaciones/consultas')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={consultas} alt="Consultas" className="py-2"/>
                                    <h1 className="text-gillsans-bold">Consultas</h1>
                                </Button>
                            </Link>
                        </Col>
                    </Row>  
            </Row>
        </Container>
    );
}

export default OperacionesMenu;