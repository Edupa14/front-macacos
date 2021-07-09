import React from 'react';
import {  Container } from 'react-bootstrap';
import Menu from 'components/menu/legal/menu'
import HeaderMenu from 'components/menu/headermenu'

const Legal = () => {
    
    return (
        <Container fluid>
            <HeaderMenu subtitle="Legal"/>
            <Menu/>           
        </Container>
    );
}

export default Legal;