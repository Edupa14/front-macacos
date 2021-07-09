import React from 'react';
import {  Container } from 'react-bootstrap';
import Menu from 'components/menu/compras/menu'
import HeaderMenu from 'components/menu/headermenu'

const Compras = () => {
    
    return (
        <Container fluid>
            <HeaderMenu subtitle="Compras"/>
            <Menu/>           
        </Container>
    );
}

export default Compras;