import React,{ useState } from 'react';
import {  Container } from 'react-bootstrap';
import Menu from 'components/menu/administrativo/menu'
import HeaderMenu from 'components/menu/headermenu'
import HelmetComponent from 'components/helmet/helmet'

const Administrativo = () => {
    const [etiquetas] = useState({title:'Panel Administrativo', description:'Panel Administrativo AC Factoring', content:'CONTENIDO'})

    return (
        <Container fluid className="px-0">
            <HelmetComponent etiquetas={etiquetas}></HelmetComponent>
            <HeaderMenu subtitle="Administración"/>
            <Menu/>           
        </Container>
    );
}

export default Administrativo   ;