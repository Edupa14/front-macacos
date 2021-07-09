import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import BreadcrumSimulador from 'components/breadcrumbs/nivelc'
import SidebarSimulador from 'components/sidebars/operaciones/simulador'
import { EscrituraPermitida } from 'helpers/protectedView';

const Simulador = () => {
    const [datosBread] = useState({ nivel1: 'Home', nivel2: 'Operaciones', nivel3: 'Simulador', direccion: '/operaciones' })
    const [escritura] = useState(EscrituraPermitida('USU'))
    return (

        <Container fluid className="px-0">
            <HeaderMenu title={`Simulador`} subtitle="Gestiona y visualiza la simulación" />
            <BreadcrumSimulador datosBread={datosBread}></BreadcrumSimulador>
            <SidebarSimulador escritura={escritura}></SidebarSimulador>
        </Container>
    );
}

export default Simulador;