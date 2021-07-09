import React, { useState } from 'react';
import {Container } from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import SideBarNotificaciones from 'components/sidebars/administrativo/notificaciones'
import BreadcrumNotificaciones from 'components/breadcrumbs/nivelc'
import { EscrituraPermitida } from 'helpers/protectedView';

const Notificaciones = () => {
    const [datosBread] = useState({nivel1:'Home',nivel2:'Administrativo',nivel3:'Notificaciones',direccion:'/administrativo'})
    const [escritura] = useState(EscrituraPermitida('NOTF'))

    return (
        <Container fluid className="px-0">
            <HeaderMenu title={`Administrativo`} subtitle="Notificaciones"/>
            <BreadcrumNotificaciones datosBread={datosBread}></BreadcrumNotificaciones>
            <SideBarNotificaciones escritura={escritura}></SideBarNotificaciones>

        </Container>
    );
}

export default Notificaciones;