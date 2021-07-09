import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import reportes from 'img/iconsMenu/reportes/icon-reportes.svg';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import {RolesPermitidos} from 'helpers/protectedView';

const ReportesMenu = () => {
    return (
        <Container fluid className="mb-6">
            <BreadcrumbB nivel1="Inicio" nivel2="Reportes"></BreadcrumbB>
            <Row className="mtmenu-6 textoMenu ">
                <Col xs={12} sm={3} lg={{span:2,offset:3}} className={`text-center ${RolesPermitidos(['USU']) ?'':"hiddenElement"}`}>
                    <Link to="/reportes/reportes">
                        <img height="120px" src={reportes} alt="Reportes"/>
                        <p className="textoMenu">Reportes</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default ReportesMenu;