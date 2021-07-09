import React, { useState } from 'react';
import { Container} from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import BreadcrumAutorizacion from 'components/breadcrumbs/nivelc'
import SidebarAutorizacion from 'components/sidebars/operaciones/autorizacion'
import { EscrituraPermitida } from 'helpers/protectedView';

const Autorizacion = () => {
    const [datosBread] = useState({ nivel1: 'Home', nivel2: 'Operaciones', nivel3: 'Autorizacion', direccion: '/operaciones' })
    const [escritura] = useState(EscrituraPermitida('AUT'))
    return ( 

        <Container fluid className="px-0">
            <HeaderMenu title={`Operaciones`} subtitle="Gestiona y visualiza autorizaciones" />
            <BreadcrumAutorizacion datosBread={datosBread}></BreadcrumAutorizacion>
            <SidebarAutorizacion escritura={escritura}></SidebarAutorizacion>
        </Container>
    );
}

export default Autorizacion;