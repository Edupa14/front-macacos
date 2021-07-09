import React, { useState } from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import BreadcrumValidaciones from 'components/breadcrumbs/nivelc'
import SidebarValidaciones from 'components/sidebars/riesgos/validaciones'
import { EscrituraPermitida } from 'helpers/protectedView';
const Validaciones = () => {
    const [datosBread] = useState({nivel2:'Riesgos',nivel3:'Validaciones',direccion:'/riesgos'})
    const [escritura] = useState(EscrituraPermitida('VALD'))
    return (
        <Container fluid>
            <HeaderMenu title={`Riesgos`} subtitle="Validaciones"/>
            <BreadcrumValidaciones datosBread={datosBread}></BreadcrumValidaciones>
            <Row>
                <Col md={12}>
                    <SidebarValidaciones escritura={escritura}></SidebarValidaciones>
                </Col>
                
            </Row>
            
        </Container>
    );
}

export default Validaciones;