import React from 'react';
import {  Container } from 'react-bootstrap';
import Menu from 'components/menu/ventas/menu'
import HeaderMenu from 'components/menu/headermenu'

const Ventas = () => {
    
    return (
        <Container fluid>
            <HeaderMenu subtitle="Ventas"/>
            <Menu/>           
        </Container>
    );
}

export default Ventas;