import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import compras from 'img/iconsMenu/compras/icon-compras.svg';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import {RolesPermitidos} from 'helpers/protectedView';

const ComprasMenu = () => {
    return (
        <Container fluid className="mb-6">
            <BreadcrumbB nivel1="Inicio" nivel2="Compras"></BreadcrumbB>
            <Row className="mtmenu-6 textoMenu ">
                <Col xs={12} sm={3} lg={{span:2,offset:3}} className={`text-center ${RolesPermitidos(['USU']) ?'':"hiddenElement"}`}>
                    <Link to="/compras/compras">
                        <img height="120px" src={compras} alt="Compras"/>
                        <p className="textoMenu">Compras</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default ComprasMenu;