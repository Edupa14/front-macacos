import React, { useState } from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import BreadcrumPrograma from 'components/breadcrumbs/nivelc'
import SidebarPrograma from 'components/sidebars/administrativo/programas.jsx'
import { EscrituraPermitida } from 'helpers/protectedView';
const Programas = () => {
    const [datosBread] = useState({nivel1:'Home',nivel2:'Administrativo',nivel3:'Programas',direccion:'/administrativo'})
    const [escritura] = useState(EscrituraPermitida('PRO'))

    return (
        <Container fluid className="px-0">
            <HeaderMenu title={`Administrativo`} subtitle="Gestiona y visualiza los programas"/>
            <BreadcrumPrograma datosBread={datosBread}></BreadcrumPrograma>
            <Row>
                <Col md={12}>
                    <SidebarPrograma escritura={escritura}></SidebarPrograma>
                </Col>
                
            </Row>
            
        </Container>
    );
}

export default Programas;