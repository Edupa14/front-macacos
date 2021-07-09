import React from 'react';
import { Container } from 'react-bootstrap';
import Menu from 'components/menu/comercial/menu'
import HeaderMenu from 'components/menu/headermenu'

const Comercial = () => {
    
    return (
        <Container fluid>
            <HeaderMenu subtitle="Comercial"/>
            <Menu/>           
        </Container>
    );
}

export default Comercial;