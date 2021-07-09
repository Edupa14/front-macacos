import React from 'react';
import {  Container } from 'react-bootstrap';
import Menu from 'components/menu/riesgos/menu'
import HeaderMenu from 'components/menu/headermenu'

const Riesgos = () => {
    
    return (
        <Container fluid>
            <HeaderMenu subtitle="Riesgos"/>
            <Menu/>           
        </Container>
    );
}

export default Riesgos;