import React, { useState } from 'react';
import HeaderMenu from 'components/menu/headermenu'
import BreadcrumPlanilla from 'components/breadcrumbs/nivelc'
import { EscrituraPermitida } from 'helpers/protectedView';
import SidebarReprogramacion from 'components/sidebars/operaciones/reprogramaciones'

const Reprogramacion = () => {
    const [escritura] = useState(EscrituraPermitida('REP'))
    const [datosBread] = useState({nivel1:'Home',nivel2:'Operaciones',nivel3:'Reprogramación',direccion:'/operaciones'})

    return (
        <div>
            <HeaderMenu title={`Operativo`} subtitle="Realiza la Reprogramación"/>
            <BreadcrumPlanilla datosBread={datosBread}></BreadcrumPlanilla>
            <SidebarReprogramacion escritura={escritura}></SidebarReprogramacion>   
            
        </div>
    );
}

export default Reprogramacion;