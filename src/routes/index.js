import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import Home from 'views/home/home';
import Ejemplo from 'views/ejemplo/ejemplo';
import Login from 'views/login/login'
import Administrativo from 'views/administrativo/index'
import Usuarios from 'views/administrativo/usuarios/index'
import Programas from 'views/administrativo/programas/index'
import Parametros from 'views/administrativo/parametros/index'
import Auditoria from 'views/administrativo/auditoria/index';
import Notificaciones from 'views/administrativo/notificaciones/index';
import Operaciones from 'views/operaciones/index'
import Planilla from 'views/operaciones/planilla/index'
import Autorizacion from 'views/operaciones/autorizacion/index'
import Consultas from 'views/operaciones/consultas/index'
import Simulador from 'views/operaciones/simulador/index'
import Liquidacion from 'views/operaciones/liquidacion/index'
import Reprogramaciones from 'views/operaciones/reprogramacion/index'
import Riesgos from 'views/riesgos/index'
import Industrias from 'views/riesgos/industrias/index'
import Validaciones from 'views/riesgos/validaciones/index'
import Comercial from 'views/comercial/index'
import Prospectos from 'views/comercial/index'
import Sponsor from 'views/comercial/index'
import SimulacionComercial from 'views/comercial/index'
import Legal from 'views/legal/index'
import Clientes from 'views/legal/index'
import Inversionistas from 'views/legal/index'
import Formatos from 'views/legal/index'
import Contabilidad from 'views/contabilidad/index'
import ContabilidadComponent from 'views/contabilidad/index'
import Tesoreria from 'views/tesoreria/index'
import TesoreriaComponent from 'views/tesoreria/index'
import InversionistasC from 'views/inversionistas/index'
import InversionistasComponent from 'views/inversionistas/index'
import Compras from 'views/compras/index'
import ComprasComponent from 'views/compras/index'
import Ventas from 'views/ventas/index'
import VentasComponent from 'views/ventas/index'
import Reportes from 'views/reportes/index'
import ReportesComponent from 'views/reportes/index'
import FooterMenu from 'components/menu/footermenu'
import RutaPublica from 'components/rutas/rutaPublica'
import RutaPrivada  from 'components/rutas/rutaPrivada'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TiempoSesion from 'views/login/tiempoSesion'

const Routes = () =>{
    const user = useSelector(store => store.users.objecto)
    const [footerAct,setFooterAct]=useState(false)
    useEffect(()=>{
        if(localStorage.idUsuario !== undefined){
            setFooterAct(true)
        }else{
            setFooterAct(false)
        }
    },[user.idUsuario])


    useEffect(()=>{
        if(localStorage.idUsuario !== undefined){
            setFooterAct(true)
        }else{
            setFooterAct(false)
        }
        
    },[])
    return (
    <>
        <Router>
            <Switch>
                <RutaPublica exact restricted={true} component={Login} path="/login"  />
                <RutaPrivada exact roles={['*']} restricted={true} component={Home} path="/"  />
                {/* <Route exact path="/login" component={Login}/> */}
                {/* <Route exact path="/" component={Home}/>     */}
                <RutaPrivada exact path="/ejemplo" component={Ejemplo}/>
                <RutaPrivada exact roles={['PRO','NOTF','USU','PAR','AUD']} path="/administrativo" component={Administrativo}/>
                <RutaPrivada exact roles={['USU']} path="/administrativo/usuarios" component={Usuarios}/>
                <RutaPrivada exact roles={['PRO']} path="/administrativo/programas" component={Programas}/>
                <RutaPrivada exact roles={['AUD']} path="/administrativo/auditoria" component={Auditoria}/>
                <RutaPrivada exact roles={['NOTF']} path="/administrativo/notificaciones" component={Notificaciones}/>
                <RutaPrivada exact roles={['PAR']} path="/administrativo/parametros" component={Parametros}/>
                <RutaPrivada exact roles={['PLA','IND','SIM','AUT','LIQ','REP','CON']} path="/operaciones" component={Operaciones}/>
                <RutaPrivada exact roles={['PLA']} path="/operaciones/planilla" component={Planilla}/>
                <RutaPrivada exact roles={['CON']} path="/operaciones/consultas/:id?" component={Consultas}/>
                <RutaPrivada exact roles={['REP']} path="/operaciones/reprogramaciones" component={Reprogramaciones}/>
                <RutaPrivada exact roles={['AUT']} path="/operaciones/autorizacion" component={Autorizacion}/>
                <RutaPrivada exact roles={['PRO','NOTF','USU','PAR','AUD']} path="/operaciones/simulador" component={Simulador}/>
                <RutaPrivada exact roles={['PRO','NOTF','USU','PAR','AUD']} path="/operaciones/liquidacion" component={Liquidacion}/>
                <RutaPrivada exact roles={['VALD','INDU']} path="/riesgos" component={Riesgos}/>
                <RutaPrivada exact roles={['VALD']} path="/riesgos/validaciones" component={Validaciones}/>
                <RutaPrivada exact roles={['INDU']} path="/riesgos/industrias" component={Industrias}/> 
                <RutaPrivada exact roles={['PROS','SPON','SIMU','USU']} path="/comercial" component={Comercial}/>
                <RutaPrivada exact roles={['PROS']} path="/comercial/prospectos" component={Prospectos}/>
                <RutaPrivada exact roles={['SPON']} path="/comercial/sponsors" component={Sponsor}/>
                <RutaPrivada exact roles={['SIMU']} path="/comercial/simulacion" component={SimulacionComercial}/>
                <RutaPrivada exact roles={['CLIE','INVE','FORM','USU']} path="/legal" component={Legal}/>
                <RutaPrivada exact roles={['CLIE']} path="/legal/clientes" component={Clientes}/>
                <RutaPrivada exact roles={['INVE']} path="/legal/inversionistas" component={Inversionistas}/>
                <RutaPrivada exact roles={['FORM']} path="/legal/formatos" component={Formatos}/>
                <RutaPrivada exact roles={['USU']} path="/contabilidad" component={Contabilidad}/>
                <RutaPrivada exact roles={['USU']} path="/contabilidad/contabilidad" component={ContabilidadComponent}/>
                <RutaPrivada exact roles={['USU']} path="/tesoreria" component={Tesoreria}/>
                <RutaPrivada exact roles={['USU']} path="/tesoreria/tesoreria" component={TesoreriaComponent}/>
                <RutaPrivada exact roles={['USU']} path="/inversionistas" component={InversionistasC}/>
                <RutaPrivada exact roles={['USU']} path="/inversionistas/inversionistas" component={InversionistasComponent}/>
                <RutaPrivada exact roles={['USU']} path="/compras" component={Compras}/>
                <RutaPrivada exact roles={['USU']} path="/compras/compras" component={ComprasComponent}/>
                <RutaPrivada exact roles={['USU']} path="/ventas" component={Ventas}/>
                <RutaPrivada exact roles={['USU']} path="/ventas/ventas" component={VentasComponent}/>
                <RutaPrivada exact roles={['USU']} path="/reportes" component={Reportes}/>
                <RutaPrivada exact roles={['USU']} path="/reportes/reportes" component={ReportesComponent}/>
                <Redirect to="/"/>
                
            </Switch>
        </Router>

    { 
        (!footerAct)
        ? ''
        
        : <> 
            <TiempoSesion></TiempoSesion>
            <FooterMenu /> 
         </>
    }
       
    </>
    )
};
 
export default Routes;