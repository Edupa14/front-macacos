import React from 'react';
// import FormLiquidacion from 'components/forms/operaciones/liquidacion'
import FormConsulta from 'components/forms/operaciones/consultas'
import {Container} from 'react-bootstrap'
import 'components/sidebars/sidebars.css'

const SidebarLiquidacion = ({enviarPlanilla}) => {

    const obtenerPlanilla =(data,paginado,filas,fechas)=>{
        enviarPlanilla(data,paginado,filas,fechas)
    }
    
    return (
        <>  
            <div className="">
                <hr/>
                <p className="titleSidebar pl-4"> <strong>Buscar </strong></p>
                <hr/>
                <Container>
                    {/* <FormLiquidacion obtenerPlanilla={obtenerPlanilla}></FormLiquidacion> */}
                    <FormConsulta obtenerPlanilla={obtenerPlanilla}></FormConsulta>
                </Container>
                
            </div>
        </>
    );
}

export default SidebarLiquidacion;