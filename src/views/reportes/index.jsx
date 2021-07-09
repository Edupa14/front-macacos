import React from 'react';
import {  Container } from 'react-bootstrap';
import Menu from 'components/menu/reportes/menu'
import HeaderMenu from 'components/menu/headermenu'

const Reportes = () => {
    
    return (
        <Container fluid>
            <HeaderMenu subtitle="Reportes"/>
            <Menu/>           
        </Container>
    );
}

export default Reportes;