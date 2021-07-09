import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import inversionistas from 'img/iconsMenu/inversionistas/icon-inversionistas.svg';
import BreadcrumbB from 'components/breadcrumbs/nivelb';
import {RolesPermitidos} from 'helpers/protectedView';

const InversionistaMenu = () => {
    return (
        <Container fluid className="mb-6">
            <BreadcrumbB nivel1="Inicio" nivel2="Inversionistas"></BreadcrumbB>
            <Row className="mtmenu-6 textoMenu ">
                <Col xs={12} sm={3} lg={{span:2,offset:3}} className={`text-center ${RolesPermitidos(['USU']) ?'':"hiddenElement"}`}>
                    <Link to="/inversionistas/inversionistas">
                        <img height="120px" src={inversionistas} alt="inversionistas"/>
                        <p className="textoMenu">Inversionistas</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default InversionistaMenu;