import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ventas from 'img/iconsMenu/ventas/icon-ventas.svg';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import {RolesPermitidos} from 'helpers/protectedView';

const VentasMenu = () => {
    return (
        <Container fluid className="mb-6">
            <BreadcrumbB nivel1="Inicio" nivel2="Ventas"></BreadcrumbB>
            <Row className="mtmenu-6 textoMenu ">
                <Col xs={12} sm={3} lg={{span:2,offset:3}} className={`text-center ${RolesPermitidos(['USU']) ?'':"hiddenElement"}`}>
                    <Link to="/ventas/ventas">
                        <img height="120px" src={ventas} alt="Ventas"/>
                        <p className="textoMenu">Ventas</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default VentasMenu;