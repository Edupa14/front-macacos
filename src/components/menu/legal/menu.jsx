import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import clientes from 'img/iconsMenu/legal/clientes.svg';
import formatos from 'img/iconsMenu/legal/formatos.svg';
import inversionistas from 'img/iconsMenu/legal/inversionistas.svg';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import {RolesPermitidos} from 'helpers/protectedView';

const LegalMenu = () => {
    return (
        <Container fluid className="mb-6">
            <BreadcrumbB nivel1="Inicio" nivel2="Legal"></BreadcrumbB>
            <Row className="mtmenu-6 textoMenu ">
                <Col xs={12} sm={3} lg={{span:2,offset:3}} className={`text-center ${RolesPermitidos(['PROS']) ?'':"hiddenElement"}`}>
                    <Link to="/comercial/prospectos">
                        <img height="120px" src={clientes} alt="Clientes"/>
                        <p className="textoMenu">Clientes</p>
                    </Link>
                </Col>
                <Col xs={12} sm={3} lg={2} className={`text-center ${RolesPermitidos(['SPON']) ?'':"hiddenElement"}`}>
                    <Link to="/comercial/sponsors">
                        <img height="120px" src={inversionistas} alt="Inversionistas"/>
                        <p className=" textoMenu">Inversionistas</p>
                    </Link>
                </Col>
                <Col xs={12} sm={3} lg={2} className={`text-center ${RolesPermitidos(['SIMU']) ?'':"hiddenElement"}`}>
                    <Link to="/comercial/simulacion">
                        <img height="120px" src={formatos} alt="Formatos"/>
                        <p className=" textoMenu">Formatos</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default LegalMenu;