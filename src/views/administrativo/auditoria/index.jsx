import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import BreadcrumAuditorias from 'components/breadcrumbs/nivelc'
import SidebarAuditoria from 'components/sidebars/administrativo/auditoria'
import { EscrituraPermitida } from 'helpers/protectedView';

const Auditoria = () => {
    const [datosBread] = useState({ nivel1: 'Home', nivel2: 'Administrativo', nivel3: 'Auditorias', direccion: '/administrativo' })
    const [escritura] = useState(EscrituraPermitida('USU'))
    return (

        <Container fluid className="px-0">
            <HeaderMenu title={`Auditorias`} subtitle="Gestiona y visualiza auditorias" />
            <BreadcrumAuditorias datosBread={datosBread}></BreadcrumAuditorias>
            <SidebarAuditoria escritura={escritura}></SidebarAuditoria>
        </Container>
    );
}

export default Auditoria;