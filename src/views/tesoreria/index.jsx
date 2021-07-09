import React from 'react';
import {  Container } from 'react-bootstrap';
import Menu from 'components/menu/tesoreria/menu'
import HeaderMenu from 'components/menu/headermenu'

const Tesoreria = () => {
    
    return (
        <Container fluid>
            <HeaderMenu subtitle="Tesoreria"/>
            <Menu/>           
        </Container>
    );
}

export default Tesoreria;