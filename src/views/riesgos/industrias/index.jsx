import React, { useState } from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import BreadcrumIndustrias from 'components/breadcrumbs/nivelc'
import SidebarIndustrias from 'components/sidebars/riesgos/industrias'
import { EscrituraPermitida } from 'helpers/protectedView';
const Industrias = () => {
    const [datosBread] = useState({nivel2:'Riesgos',nivel3:'Industrias',direccion:'/riesgos'})
    const [escritura] = useState(EscrituraPermitida('INDU'))
    return (
        <Container fluid>
            <HeaderMenu title={`Riesgos`} subtitle="Industrias"/>
            <BreadcrumIndustrias datosBread={datosBread}></BreadcrumIndustrias>
            <SidebarIndustrias escritura={escritura}></SidebarIndustrias>
        </Container>
    );
}

export default Industrias;