import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import contabilidad from 'img/iconsMenu/contabilidad/icon-contabilidad.svg';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import {RolesPermitidos} from 'helpers/protectedView';

const ContabilidadMenu = () => {
    return (
        <Container fluid className="mb-6">
            <BreadcrumbB nivel1="Inicio" nivel2="Contabilidad"></BreadcrumbB>
            <Row className="mtmenu-6 textoMenu ">
                <Col xs={12} sm={3} lg={{span:2,offset:3}} className={`text-center ${RolesPermitidos(['USU']) ?'':"hiddenElement"}`}>
                    <Link to="/contabilidad/contabilidad">
                        <img height="120px" src={contabilidad} alt="Contabilidad"/>
                        <p className="textoMenu">Contabilidad</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default ContabilidadMenu;