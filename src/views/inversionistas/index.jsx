import React from 'react';
import {  Container } from 'react-bootstrap';
import Menu from 'components/menu/inversionistas/menu'
import HeaderMenu from 'components/menu/headermenu'

const Inversionistas = () => {
    
    return (
        <Container fluid>
            <HeaderMenu subtitle="Inversionistas"/>
            <Menu/>           
        </Container>
    );
}

export default Inversionistas;