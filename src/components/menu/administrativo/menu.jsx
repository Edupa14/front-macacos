import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import programas from 'img/iconsMenu/administrativo/icon-programas.svg';
import usuarios from 'img/iconsMenu/administrativo/icon-usuarios.svg';
import notificaciones from 'img/iconsMenu/administrativo/icon-notificaciones.svg';
import parametros from 'img/iconsMenu/administrativo/icon-parametros.svg';
import auditoria from 'img/iconsMenu/administrativo/icon-auditoria.png';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import { RolesPermitidos } from 'helpers/protectedView';
import './menu.css';
import { funcionLog } from 'helpers/log';
const AdministrativoMenu = () => {
        const setLog = (procesos, url) =>{
            let datas = {};
            datas.proceso = procesos
            datas.url = url
            funcionLog(datas);
        }
    return (
        <Container fluid>
            <BreadcrumbB nivel1="Inicio" nivel2="Administrativo"></BreadcrumbB>
            <hr className="hrmenuheader"></hr>
            <Row className="my-2 justify-content-md-center  text-gillsans-medium">
                    <Row>
                        <Col xs={12} sm={4} lg={4} className={`text-center my-4  ${RolesPermitidos(['USU']) ? '' : " d-none"}`}>
                            <Link to="/administrativo/usuarios" onClick={setLog('acceso seccion usuarios', 'administrativo/usuarios')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={usuarios} alt="Usuarios" className="py-2" />
                                    <h1 className="text-gillsans-bold">Usuarios {'&'} Configuración</h1>
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={4} lg={4} className={`text-center my-4  ${RolesPermitidos(['PAR']) ? '' : " d-none"}`}>
                            <Link to="/administrativo/parametros" onClick={setLog('acceso seccion parametros', 'administrativo/parametros')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={parametros} alt="Parámetros" className="py-2" />
                                    <h1 className="text-gillsans-bold">Parámetros</h1>
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={4} lg={4} className={`text-center my-4  ${RolesPermitidos(['PRO']) ? '' : " d-none"}`}>
                            <Link to="/administrativo/programas" onClick={setLog('acceso seccion programas', 'administrativo/programas')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={programas} alt="Programas" className="py-2" />
                                    <h1 className="text-gillsans-bold">Programas</h1>
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={4} lg={4} className={`text-center my-4  ${RolesPermitidos(['NOTF']) ? '' : " d-none"}`}>
                            <Link to="/administrativo/notificaciones" onClick={setLog('acceso seccion notificaciones', 'administrativo/notificaciones')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={notificaciones} alt="Notificaciones" className="py-2" />
                                    <h1 className="text-gillsans-bold">Notificaciones</h1>
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={4} lg={4} className={`text-center my-4 ${RolesPermitidos(['AUD']) ? '' : " d-none"}`}>
                            <Link to="/administrativo/auditoria" onClick={setLog('acceso seccion auditoria', 'administrativo/auditoria')}>
                                <Button className="buttonMenu">
                                    <img width="110px" height="110px" src={auditoria} alt="Auditoría" className="py-2" />
                                    <h1 className="text-gillsans-bold">Auditoría</h1>
                                </Button>
                            </Link>
                        </Col>
                        
                    </Row>
            </Row>
         
        </Container>
    );
}

export default AdministrativoMenu;