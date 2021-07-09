import React, { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav,Container } from 'react-bootstrap';
import Buscador from 'components/buscador/buscador';
import Formulario from 'components/forms/admnistrativo/notificacion'; 
import FormularioExt from 'components/forms/admnistrativo/notificacionExt';
import iconInter from 'img/notificacion/interno.svg';
import iconExter from 'img/notificacion/externo.svg';
import axiosClient from 'config/axios/axiosClient';
import HeaderSeccion from '../headerSeccion';
import alerta from 'helpers/alerts';

const NotificacionesSidebar = ({ escritura }) => {
    const [peticion, setPeticion] = useState(true)
    const [peticionAxios, setPeticionAxios] = useState(true)
    const [dataNot, setDatanot] = useState([])
    const [dataNotEx, setDatanotex] = useState([])
    const [dataFormNot, setDataFormNot] = useState([])
    const [dataFormNotEx, setDataFormNotEx] = useState([])
    const [placeholderNotificacion] = useState('Búsqueda de notificaciones')
    const [placeholderNotificacionExt] = useState('Búsqueda de notificaciones externas')
    const [actualizarBuscadorGlob,setActualizarBuscadorGlob] = useState(false)

    const getListaNotificacionesInt = async () => {
        try{
            let notificacion = {}
            notificacion.tipNotif = 'INT'
            let response = await axiosClient.post('notificacion/listar', notificacion)
            let rpta = undefined
            if (response.data.ok === true) {
                rpta = response.data.data
            }
            return rpta
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
      
    }

    const getListaNotificacionesExt = async () => {
        try{
            let notificacion = {}
            notificacion.tipNotif = 'EXT'
            let response = await axiosClient.post('notificacion/listar', notificacion)
            let rpta = undefined
            if (response.data.ok === true) {
                rpta = response.data.data
            }
            return rpta
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
        
    }

    useEffect(() => {

        async function loadListaNot() {
            let response = await getListaNotificacionesInt()
            if (response !== undefined) {
                setDatanot(response)
            }
        }
        async function loadListaNotEx() {
            let response = await getListaNotificacionesExt()
            if (response !== undefined) {
                setDatanotex(response)
            }
        }
        loadListaNot()
        loadListaNotEx()

    }, [peticionAxios])

    const actualizarCambios = (siPeticion) => {
       setPeticionAxios(!peticionAxios)
        if(siPeticion){
            setTimeout(()=>{
                setActualizarBuscadorGlob(!actualizarBuscadorGlob)
            },2000)
        }if(siPeticion===undefined){
            setActualizarBuscadorGlob(!actualizarBuscadorGlob)
        }
    }

    const obtenerDataInt = (datos) => {

        setDataFormNot(datos)
        setPeticion(!peticion)
    }

    const obtenerDataExt = (datos) => {

        setDataFormNotEx(datos)
        setPeticion(!peticion)
    }

    return (
        <>

            <Tab.Container id="left-tabs-example" defaultActiveKey="interno">
                <Row>
                    <Col sm={3} className="background-content">
                        <div className="div-titulo-seccion">
                            <p className="titulo-seccion">Opción</p>
                            <HeaderSeccion escritura={escritura}></HeaderSeccion>
                        </div>
                        <Nav variant="pills" className="flex-column mt-4">
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="interno"><img src={iconInter} width="15px" className="mr-3" alt="Inter" />Internas</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="externo"><img src={iconExter} width="15px" className="mr-3" alt="Exter" />Externas</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content> 
                            <Tab.Pane eventKey="interno">
                                <Row>
                                    <Col xs={12} md={4} style={ {height:"500px"}} className="px-0">
                                        <Buscador actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idNotificacion'} propsBuscador={dataNot} placeholder={placeholderNotificacion} filterName={'notificacion'} functionSetData={obtenerDataInt} ></Buscador>
                                    </Col>
                                    <Col xs={12} md={8} className="pl-0">
                                        <Container>
                                            <Formulario actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormNot} escritura={escritura} tipo="ADD" ></Formulario>
                                        </Container>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="externo">
                                <Row>
                                    <Col xs={12} md={4} style={ {height:"500px"}} className="px-0">
                                        <Buscador actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idNotificacion'} propsBuscador={dataNotEx} placeholder={placeholderNotificacionExt} filterName={'notificacion'} functionSetData={obtenerDataExt} ></Buscador>
                                    </Col>
                                    <Col xs={12} md={8} className="pl-0">
                                        <Container>
                                            <FormularioExt actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormNotEx} escritura={escritura} tipo="ADD" ></FormularioExt>
                                        </Container>
                                    </Col>
                                </Row>

                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

            {/* <Procesando></Procesando> */}
        </>
    );
}

export default NotificacionesSidebar;