import React, { useState } from 'react';
// import Procesando from 'components/alerts/process'
import axiosClient from 'config/axios/axiosClient';
import FormAutorizacion from 'components/forms/operaciones/autorizacion'
import FormularioPlanillas from 'components/forms/operaciones/planilla'
import BuscadorTipo from 'components/buscador/buscadorPorTipo';
import { Tab, Row, Col } from 'react-bootstrap'
import 'components/sidebars/sidebars.css'
import alerta from 'helpers/alerts';

const SidebarAutorizacion = ({ escritura, clearForm }) => {
    const [peticion, setPeticion] = useState(true)
    const [dataAutorizacion, setAutorizacion] = useState([])
    const [placeholderAutorizacion] = useState('Buscar Autorización')
    
    const [dataFormAutorizacion, setDataFormAutorizacion] = useState({})
    const [planillaFrom, setPlanillaFrom] = useState({})

    const [limpiezaHijo, setLimpiezaHijo] = useState(false)

    const [actualizarBuscadorGlob,setActualizarBuscadorGlob] = useState(false)
    const relist = () => {
        obtenerAutorizacion(planillaFrom)
    }

    const obtenerAutorizacion = async (data) => {
        try{
            let response = await axiosClient.post('planilla/consultar',data);
            
            if(response.data.ok === true){ 
                setAutorizacion(response.data.data.data)                
                setPlanillaFrom(data)                
                setPeticion(!peticion)
                setActualizarBuscadorGlob(!actualizarBuscadorGlob)
            }
            setLimpiezaHijo(!limpiezaHijo)
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }

        
    }
    const obtenerPlanilla = (data) => {
        setPeticion(!peticion)
    }
    const obtenerDataAutorizacion = (datos) => {
        setDataFormAutorizacion(datos)
        setPeticion(!peticion)
    }

    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="autorizacion">
                <div className="">
                    <Row>
                        <Col sm={3} className="background-content">
                            <hr />
                            <p className="titleSidebar pl-4"> <strong>Buscar </strong></p>
                            <hr />
                            <Col>
                                <FormAutorizacion obtenerAutorizacion={obtenerAutorizacion}></FormAutorizacion>
                            </Col>
                        </Col>
                        <Col md={3}>
                            <BuscadorTipo actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idLiquidacion'} mostrador={'numOpeGlobal'} propsBuscador={dataAutorizacion} placeholder={placeholderAutorizacion} filter={'razonSocial'} functionSetData={obtenerDataAutorizacion}></BuscadorTipo>

                        </Col>
                        <Col md={6}>
                            <FormularioPlanillas relist= {relist} limpieza={limpiezaHijo} tipo="EDIT" dataForm={dataFormAutorizacion}  peticion ={peticion}  obtenerPlanilla={obtenerPlanilla}></FormularioPlanillas>
                        </Col>
                    </Row>
                </div>
            </Tab.Container>
        </>
    );
}

export default SidebarAutorizacion;