import React, { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav, Container } from 'react-bootstrap';
import Buscador from 'components/buscador/buscador';
import Formulario from 'components/forms/admnistrativo/usuarios'
import Formulariorole from 'components/forms/admnistrativo/roles'
import FormularioExterno from 'components/forms/admnistrativo/externo'
import iconUser from 'img/usuarios/users.svg'
import iconRol from 'img/usuarios/rol.svg'
import axiosClient from 'config/axios/axiosClient';
import HeaderSeccion from 'components/sidebars/headerSeccion'

const UsuariosSidebar = ({escritura}) => {
    const [peticion, setPeticion] = useState(true)
    const [peticionAxios, setPeticionAxios] = useState(true)
    const [dataUser, setDatauser] = useState([])
    const [dataRole, setDatarole] = useState([])
    const [allRoles, setAllRoles] = useState([])
    const [dataTercero, setDataTercero] = useState([])
    const [placeholderUser] = useState('Buscar usuarios')
    const [placeholderRol] = useState('Búsqueda de perfiles')
    const [dataFormUser, setDataFormUser] = useState({})
    const [dataFormRol, setDataFormRol] = useState({})
    const [dataFormTercero, setDataFormTercero] = useState({})

    const [actualizarBuscadorGlob,setActualizarBuscadorGlob] = useState(false)
  
    const getListaUsuarios = async () => {
        let response = await axiosClient.get('usuario/listar')
        let rpta = undefined
        if (response.data.ok === true) {
            rpta = response.data.data
        }
        return rpta
    }
    const getListaRoles = async () => {
        let body = { idPadre: 0, etiqueta: "ROL"}
        let response = await axiosClient.post('parametro/listar', body) 
        let rpta = undefined
        if (response.data.ok === true) {
            rpta = response.data.data
        }
        return rpta
    }
    const getListaAllRoles = async () => {
        let body = { idPadre: 0, etiqueta: "ROL", validacion: 2}
        let response = await axiosClient.post('parametro/listar', body)
        let rpta = undefined
        if (response.data.ok === true) {
            rpta = response.data.data
        }
        return rpta
    }

    const getListaTerceros = async () => {
        let response = await axiosClient.post('sponsors/proveedores',{})
        let rpta = undefined
        if (response.data.ok === true) {
            rpta = response.data.data
        }
        return rpta
    }

    useEffect(() => {
        async function loadAllRoles() {
            let response = await getListaAllRoles()
            if (response !== undefined) {
                setAllRoles(response)
            }
        }
        async function loadListaUser() {
            let response = await getListaUsuarios()
            if (response !== undefined) {
                setDatauser(response)
            }
        }
        async function loadListaRol() {
            let response = await getListaRoles()
            if (response !== undefined) {
                setDatarole(response)
            }
        }
        async function loadListaTercero() {
            let response = await getListaTerceros()
            if (response !== undefined) {
                setDataTercero(response)
            }
        }
        loadListaUser()
        loadListaRol()
        loadAllRoles()
        loadListaTercero()

    }, [peticionAxios])
 
    const actualizarCambios = (siPeticion) =>{
        setPeticionAxios(!peticionAxios)
        if(siPeticion){
            setTimeout(()=>{
                setActualizarBuscadorGlob(!actualizarBuscadorGlob)
            },2000)
        }if(siPeticion===undefined){
            setActualizarBuscadorGlob(!actualizarBuscadorGlob)
        }
    }

    const obtenerDataUsuario = (datos) => {
        setDataFormUser(datos)
        setPeticion(!peticion)
    }

    const obtenerDataRol = (datos) => {
        setDataFormRol(datos)
        setPeticion(!peticion)
    }

    const obtenerDataTercero = (datos) => {
        setDataFormTercero(datos)
        setPeticion(!peticion)
    }


    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="usuario">
                <Row>
                    <Col sm={3} className="background-content">
                        <div className="div-titulo-seccion">
                            <p className="titulo-seccion">Opción</p>
                            <HeaderSeccion escritura={escritura}></HeaderSeccion>
                        </div>
                        <Nav variant="pills" className="flex-column mt-4">
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="usuario"><img src={iconUser} className="mr-3 icono-boton" alt="Usuarios Internos"/>Usuarios internos</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="externo"><img src={iconUser} className="mr-3 icono-boton" alt="Usuarios Externos"/>Usuarios externos</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="roles"><img src={iconRol} className="mr-3 icono-boton" alt="Perfiles y Permisos"/>Perfiles y permisos</Nav.Link>
                            </Nav.Item>
                            
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="usuario" >
                                <Row>
                                    <Col xs={12} md={4} className="px-0">
                                        <Buscador actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idUsuario'} propsBuscador={dataUser} placeholder={placeholderUser} filterName={'Nombre'} filterOpcional={'apePat'} functionSetData={obtenerDataUsuario} ></Buscador>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <Formulario actualizarCambios={actualizarCambios} todosRoles={dataRole} allRoles ={allRoles} peticion={peticion} dataForm={dataFormUser} escritura={escritura} tipo="ADD" ></Formulario>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="externo" >
                                <Row>
                                    <Col xs={12} md={4} className="px-0">
                                        <Buscador actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idSponsor'} propsBuscador={dataTercero} placeholder={'Buscador usuario externo'} filterName={'razonSocial'}  functionSetData={obtenerDataTercero} ></Buscador>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <FormularioExterno actualizarCambios={actualizarCambios} todosRoles={dataRole} peticion={peticion} dataForm={dataFormTercero} escritura={escritura} tipo="ADD" ></FormularioExterno>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="roles">
                                <Row>
                                    <Col xs={12} md={4} className="px-0">
                                        <Buscador actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idParametro'} propsBuscador={dataRole} placeholder={placeholderRol} filterName={'Descripcion'} functionSetData={obtenerDataRol}></Buscador>
                                    </Col>
                                    <Col xs={12} md={8} className="pl-0">
                                        <Container>
                                            <Formulariorole actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormRol} escritura={escritura} tipo="ADD" ></Formulariorole>
                                        </Container>
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

export default UsuariosSidebar;