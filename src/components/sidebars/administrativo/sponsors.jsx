import React, { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav, Container } from 'react-bootstrap';
import Buscador from 'components/buscador/buscador';
import axiosClient from 'config/axios/axiosClient';
import iconUser from 'img/usuarios/users.svg'
import HeaderSeccion from 'components/sidebars/headerSeccion'
import Formulario from 'components/forms/admnistrativo/sponsors'

const SponsorsSidebar = ({ escritura }) => {
    const [peticion, setPeticion] = useState(true)
    const [peticionAxios, setPeticionAxios] = useState(true)
    const [dataTercero, setDataTercero] = useState([])
    const [dataFormTercero, setDataFormTercero] = useState({})


    const getListaTerceros = async () => {
        let body = {}
        let response = await axiosClient.post('sponsors/proveedores',body)
        let rpta = undefined
        if (response.data.ok === true) {
            rpta = response.data.data
        }
        return rpta
    }

    useEffect(() => {
        async function loadListaTercero() {
            let response = await getListaTerceros()
            if (response !== undefined) {
                setDataTercero(response)
            }
        }
        loadListaTercero()

    }, [peticionAxios])

    const obtenerDataTercero = (datos) => {
        setDataFormTercero(datos)
        setPeticion(!peticion)
    }


    return (
        <>

            <Tab.Container id="left-tabs-example" defaultActiveKey="sponsors">
                <Row>
                    <Col sm={3} className="background-content">
                        <div className="div-titulo-seccion">
                            <p className="titulo-seccion">Opción</p>
                            <HeaderSeccion escritura={escritura}></HeaderSeccion>
                        </div>
                        <Nav variant="pills" className="flex-column mt-4">
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="sponsors"><img src={iconUser} className="mr-3 icono-boton" alt="Usuarios Externos" />Sponsors</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="sponsors" >
                                <Row>
                                    <Col xs={12} md={4} className="px-0">
                                        <Buscador propsBuscador={dataTercero} placeholder={'Buscador Usuario Externo'} filterName={'razonSocial'} functionSetData={obtenerDataTercero} ></Buscador>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <Formulario peticion={peticion} dataForm={dataFormTercero} escritura={escritura} tipo="ADD" ></Formulario>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}

export default SponsorsSidebar;