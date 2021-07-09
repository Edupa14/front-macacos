import React, { useState } from 'react';
import {Container } from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import SideBarUsuario from 'components/sidebars/administrativo/usuarios'
import BreadcrumUsuario from 'components/breadcrumbs/nivelc'
import { EscrituraPermitida } from 'helpers/protectedView';

const Usuarios = () => {
    const [datosBread] = useState({nivel1:'Home',nivel2:'Administrativo',nivel3:'Usuarios',direccion:'/administrativo'})
    const [escritura] = useState(EscrituraPermitida('USU'))

    return (
        <Container fluid className="px-0">
            <HeaderMenu title={`Administrativo`} subtitle="Usuarios"/>
            <BreadcrumUsuario datosBread={datosBread}></BreadcrumUsuario>
            <SideBarUsuario escritura={escritura}></SideBarUsuario>
        </Container>
    );
}

export default Usuarios;