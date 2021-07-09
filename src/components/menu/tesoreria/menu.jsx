import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tesoreria from 'img/iconsMenu/tesoreria/icon-tesoreria.svg';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import {RolesPermitidos} from 'helpers/protectedView';

const TesoreriaMenu = () => {
    return (
        <Container fluid className="mb-6">
            <BreadcrumbB nivel1="Inicio" nivel2="Tesoreria"></BreadcrumbB>
            <Row className="mtmenu-6 textoMenu ">
                <Col xs={12} sm={3} lg={{span:2,offset:3}} className={`text-center ${RolesPermitidos(['USU']) ?'':"hiddenElement"}`}>
                    <Link to="/tesoreria/tesoreria">
                        <img height="120px" src={tesoreria} alt="Tesoreria"/>
                        <p className="textoMenu">Tesoreria</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default TesoreriaMenu;