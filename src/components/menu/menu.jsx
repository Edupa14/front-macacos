import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import administrativo from 'img/iconsMenu/icon-administrativo.svg';
import operativo from 'img/iconsMenu/icon-operaciones.svg';
import riesgos from 'img/iconsMenu/icon-riesgos.svg';
import legal from 'img/iconsMenu/icon-legal.svg';
import tesoreria from 'img/iconsMenu/icon-tesoreria.svg';
import compras from 'img/iconsMenu/icon-compras.svg';
import comercial from 'img/iconsMenu/icon-comercial.svg';
import contabilidad from 'img/iconsMenu/icon-contabilidad.svg';
import inversionistas from 'img/iconsMenu/icon-inversionistas.svg';
import ventas from 'img/iconsMenu/icon-ventas.svg';
import reportes from 'img/iconsMenu/icon-reportes.svg';
import { RolesPermitidos } from 'helpers/protectedView';
import { funcionLog } from 'helpers/log';

import './menu.css';

const Menu = () => {
    const setLog = (procesos, url) =>{
        let datas = {};
        datas.proceso = procesos
        datas.url = url
        funcionLog(datas);
    }
    
    return (
        <Container className="my-auto ">
            <Row className="my-5 textoMenu  text-gillsans-medium">
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['PRO','NOTF','USU','PAR','AUD']) ?'':" d-none"}`} >
                    <Link to="/administrativo" onClick={setLog('acceso modulo Administrativo', 'administrativo')}> 
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={administrativo} alt="Administrativo" className="py-2" />
                            <h1 className="text-gillsans-bold">Administrativo</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['PLA','IND','SIM','AUT','LIQ','REP','CON']) ?'':" d-none"}`}>
                    <Link to="/operaciones" onClick={setLog('acceso modulo operaciones', 'operaciones')}>
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={operativo} alt="Operaciones" className="py-2" />
                            <h1 className="text-gillsans-bold">Operativo</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['VALD','INDU']) ?'':" d-none"}`}>
                    <Link to="/riesgos" onClick={setLog('acceso modulo riesgos', 'riesgos')}>
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={riesgos} alt="Riesgos" className="py-2" />
                            <h1 className="text-gillsans-bold">Riesgos</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['PROS','SPON','SIMU','NOTF']) ?'':" d-none"}`}>
                    <Link to="/comercial" onClick={setLog('acceso modulo comercial', 'comercial')}>
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={comercial} alt="Comercial" className="py-2" />
                            <h1 className="text-gillsans-bold">Comercial</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['CLIE','INVE','FORM','NOTF']) ?'':" d-none"}`}>
                    <Link to="/legal" onClick={setLog('acceso modulo legal', 'legal')}>
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={legal} alt="Legal" className="py-2" />
                            <h1 className="text-gillsans-bold">Legal</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['NOTF']) ?'':" d-none"}`}>
                    <Link to="/ventas">
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={ventas} alt="Ventas" className="py-2" />
                            <h1 className="text-gillsans-bold">Ventas</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['NOTF']) ?'':" d-none"}`}>
                    <Link to="/tesoreria">
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={tesoreria} alt="Tesoreria" className="py-2" />
                            <h1 className="text-gillsans-bold">Tesorería</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['NOTF']) ?'':" d-none"}`}>
                    <Link to="/compras">
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={compras} alt="Compras" className="py-2" />
                            <h1 className="text-gillsans-bold">Compras</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['NOTF']) ?'':" d-none"}`}>
                    <Link to="/contabilidad">
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={contabilidad} alt="Contabilidad" className="py-2" />
                            <h1 className="text-gillsans-bold">Contabilidad</h1>
                        </Button>
                    </Link>
                </Col>
            {/* </Row>
            <Row className="mt-5 "> */}
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['NOTF']) ?'':" d-none"}`}>
                    <Link to="/inversionistas">
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={inversionistas} alt="Inversionistas" className="py-2" />
                            <h1 className="text-gillsans-bold">Inversionistas</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={2} className={`text-center my-4 ${RolesPermitidos(['NOTF']) ?'':" d-none"}`}>
                    <Link to="/reportes">
                        <Button className="buttonMenu">
                            <img width="110px" height="110px" src={reportes} alt="Reportes" className="py-2" />
                            <h1 className="text-gillsans-bold">Reportes</h1>
                        </Button>
                    </Link>
                </Col>

            </Row>
        </Container>
    );
}

export default Menu;