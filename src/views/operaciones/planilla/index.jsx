import React, { useState } from 'react';
import {Row,Col } from 'react-bootstrap';
import HeaderMenu from 'components/menu/headermenu'
import BreadcrumPlanilla from 'components/breadcrumbs/nivelc'
import TablePlanilla from 'components/tables/operaciones/tablesPlanilla'
import SidebarPlanilla from 'components/sidebars/operaciones/planilla'
import { EscrituraPermitida } from 'helpers/protectedView';

const Planilla = () => {
    const [escritura] = useState(0)
    const [datos, setDatos] = useState({})
    const [datosBread] = useState({nivel1:'Home',nivel2:'Operaciones',nivel3:'Planilla',direccion:'/operaciones'})
    const [title] = useState('Detalle del archivo')
    const [nroRegistros,setnroRegistros] = useState(EscrituraPermitida('PLA'))
    const [propsTableDataConfig, setPropsTableDataConfig] = useState([''])
    const [propsTableHead, setPropsTableHead]  = useState([''])
    const [propsTableData,setPropsTableData] = useState([])


    const obtenerPlanilla=(datos)=>{
        setnroRegistros(datos.length)
        setPropsTableData(datos)
        let valida = 0;
        datos.forEach((ele)=>{
            if(ele.condicion === 'VALIDADO'){
                valida = 0;
            }else if(ele.condicion === "REGISTRADO"){
                valida = 1;
            }
        })
        if(valida === 1){
            setPropsTableDataConfig(['ruc','razonSocial','numDoc','emision','vencimiento','tipoMoneda','montoDoc'
            ,'mtoTotFacDesc','mtoTea','mtoNetoFinan','condicion'])
        
            setPropsTableHead([
            'RUC','Razón Social','Número Doc', 'Emisión','Vencimiento','Moneda','Monto'
            , 'Total descuento','Intereses','Neto a financiar','Estado'
        ])
        }else if(valida === 0){
            setPropsTableDataConfig(
            ['ruc','razonSocial','numDoc','emision','vencimiento','tipoMoneda','montoDoc','condicion','observacion'])
        
            setPropsTableHead([
            'RUC','Razón Social','Número Doc', 'Emisión','Vencimiento','Moneda','Monto','Estado','Observacion'])
        }
    }
    const dataPla=(datos)=>{
        setDatos(datos)
    }

    return (
        <div>
            <HeaderMenu title={`Operativo`} subtitle="Gestiona y visualiza planillas"/>
            <BreadcrumPlanilla datosBread={datosBread}></BreadcrumPlanilla>
            <Row>
                <Col md={3} className="background-content pr-0" >
                    <SidebarPlanilla escritura={escritura} obtenerPlanilla={obtenerPlanilla} dataPla = {dataPla}></SidebarPlanilla>
                </Col>
                <Col md={9} className="px-4">
                    <TablePlanilla size={"1100px"} datos= {datos} propsTableDataConfig={propsTableDataConfig} propsTableData={propsTableData} title={title} nroRegistros={nroRegistros} propsTableHead={propsTableHead}></TablePlanilla>
                </Col>
                
            </Row>
            
        </div>
    );
}

export default Planilla;