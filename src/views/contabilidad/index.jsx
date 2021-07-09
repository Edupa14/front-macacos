import React from 'react';
import {  Container } from 'react-bootstrap';
import Menu from 'components/menu/contabilidad/menu'
import HeaderMenu from 'components/menu/headermenu'

const Contabilidad = () => {
    
    return (
        <Container fluid>
            <HeaderMenu subtitle="Contabilidad"/>
            <Menu/>           
        </Container>
    );
}

export default Contabilidad;