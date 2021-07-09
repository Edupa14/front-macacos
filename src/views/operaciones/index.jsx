import React from 'react';
import {  Container } from 'react-bootstrap';
import Menu from 'components/menu/operaciones/menu'
import HeaderMenu from 'components/menu/headermenu'

const Operaciones = () => {
    
    return (
        <Container fluid className="px-0">
            <HeaderMenu subtitle="Operativo"/>
            <Menu/>           
        </Container>
    );
}

export default Operaciones;