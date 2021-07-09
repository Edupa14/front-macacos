import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import industrias from 'img/iconsMenu/riesgos/industrias.svg';
import simulacion from 'img/iconsMenu/comercial/simulacion.svg';
import prospectos from 'img/iconsMenu/comercial/prospectos.svg';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import {RolesPermitidos} from 'helpers/protectedView';

const ComercialMenu = () => {
    return (
        <Container fluid className="mb-6">
            <BreadcrumbB nivel1="Inicio" nivel2="Comercial"></BreadcrumbB>
            <Row className="mtmenu-6 textoMenu ">
                <Col xs={12} sm={3} lg={{span:2,offset:3}} className={`text-center ${RolesPermitidos(['PROS']) ?'':"hiddenElement"}`}>
                    <Link to="/comercial/prospectos">
                        <img height="120px" src={prospectos} alt="Prospectos"/>
                        <p className="textoMenu">Prospectos</p>
                    </Link>
                </Col>
                <Col xs={12} sm={3} lg={2} className={`text-center ${RolesPermitidos(['SPON']) ?'':"hiddenElement"}`}>
                    <Link to="/comercial/sponsors">
                        <img height="120px" src={industrias} alt="Sponsor"/>
                        <p className=" textoMenu">Sponsors</p>
                    </Link>
                </Col>
                <Col xs={12} sm={3} lg={2} className={`text-center ${RolesPermitidos(['SIMU']) ?'':"hiddenElement"}`}>
                    <Link to="/comercial/simulacion">
                        <img height="120px" src={simulacion} alt="Simulación"/>
                        <p className=" textoMenu">Simulación</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default ComercialMenu;