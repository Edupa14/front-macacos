import React, { useState } from 'react';
import {Container } from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import SideBarParametro from 'components/sidebars/administrativo/parametros'
import BreadcrumParametros from 'components/breadcrumbs/nivelc'
import { EscrituraPermitida } from 'helpers/protectedView';


const Parametros = () => {
    const [datosBread] = useState({nivel1:'Inicio',nivel2:'Administrativo',nivel3:'Parámetros',direccion:'/administrativo'})
    const [escritura] = useState(EscrituraPermitida('PAR'))

    return (
        <Container fluid className="px-0">
            <HeaderMenu title={`Administrativo`} subtitle="Parámetros"/>
            <BreadcrumParametros datosBread={datosBread}></BreadcrumParametros>
            <SideBarParametro escritura={escritura}></SideBarParametro>
        </Container>
    );
}

export default Parametros;