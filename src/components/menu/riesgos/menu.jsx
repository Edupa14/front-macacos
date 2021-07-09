import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import industrias from 'img/iconsMenu/riesgos/industrias.svg';
import validaciones from 'img/iconsMenu/riesgos/validaciones.svg';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import {RolesPermitidos} from 'helpers/protectedView';

const RiesgosMenu = () => {
    return (
        <Container fluid className="mb-6">
            <BreadcrumbB nivel1="Inicio" nivel2="Riesgos"></BreadcrumbB>
            <Row className="mtmenu-6 textoMenu ">
                <Col xs={12} sm={3} lg={{span:2,offset:4}} className={`text-center ${RolesPermitidos(['VALD']) ?'':"hiddenElement"}`}>
                    <Link to="/riesgos/validaciones">
                        <img height="120px" src={validaciones} alt="Validaciones"/>
                        <p className="textoMenu">Validaciones</p>
                    </Link>
                </Col>
                <Col xs={12} sm={3} lg={2} className={`text-center ${RolesPermitidos(['INDU']) ?'':"hiddenElement"}`}>
                    <Link to="/riesgos/industrias">
                        <img height="120px" src={industrias} alt="Industrias"/>
                        <p className=" textoMenu">Industrias</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default RiesgosMenu;