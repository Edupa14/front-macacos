import axiosClient from 'config/axios/axiosClient';
import React, { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav, Container } from 'react-bootstrap';
import BuscadorTipo from 'components/buscador/buscadorPorTipo';
import FormularioParametro from 'components/forms/admnistrativo/parametros'
import FormularioValores from 'components/forms/admnistrativo/valores'
import FormularioValidaciones from 'components/forms/admnistrativo/validacion'
import iconRol from 'img/usuarios/rol.svg'
import { useSelector,useDispatch } from 'react-redux';
import { obtenerParametrosAction } from 'store/administrativo/parametroStore';
import HeaderSeccion from 'components/sidebars/headerSeccion'
import alerta from 'helpers/alerts';

const ParametrosSidebar = ({escritura}) => {
    const dispatch = useDispatch()
    const parametros = useSelector(store=>store.parametros.array)
    const [peticion, setPeticion] = useState(true)
    const [placeholderParametro] = useState('Búsqueda de variables')
    const [dataFormParametro, setDataFormParametro] = useState({})
    const [dataFormValores, setDataFormValores] = useState({})
    const [dataFormValidaciones, setDataFormValidaciones] = useState({})
    const [dataValores, setDataValores] = useState([])
    const [dataValidaciones, setDataValidaciones] = useState([])

    const [actualizarBuscadorGlob,setActualizarBuscadorGlob] = useState(false)

    const actualizarCambios = (siPeticion) =>{
        dispatch(obtenerParametrosAction())
        getDataValores()
        getDataValidaciones()
        if(siPeticion){
            setTimeout(()=>{
                setActualizarBuscadorGlob(!actualizarBuscadorGlob)
            },2000)
        }if(siPeticion===undefined){
            setActualizarBuscadorGlob(!actualizarBuscadorGlob)
        }
    }

    const obtenerDataParametro = (datos) => {
        setDataFormParametro(datos)
        setPeticion(!peticion)
    }
    const getDataValores = async()=>{
        try{
            let conf = {}; 
            conf.tipoInput = "valor";
            conf.idPadre = 0;
            let result = await axiosClient.post(`parametro/listar`,conf) 
            setDataValores(result.data.data);
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
       
    }

    const getDataValidaciones = async()=>{
        try{
            let conf = {}; 
            conf.etiqueta = "VALIDACIONES";
            conf.validacion = 1;
            let result = await axiosClient.post(`parametro/listar`,conf) 
            setDataValidaciones(result.data.data);
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
       
    }

    const obtenerDataValor = (datos) => {
        setDataFormValores(datos)
        setPeticion(!peticion)
    }

    const obtenerDataValidacion = (datos) => {
        setDataFormValidaciones(datos)
        setPeticion(!peticion)
    }

    useEffect(()=>{
        getDataValores()
        getDataValidaciones()
    },[])

    return (
        <>

            <Tab.Container id="left-tabs-example" defaultActiveKey="parametro">
                <Row>
                    <Col sm={3} className="background-content">
                        <div className="div-titulo-seccion">
                                <p className="titulo-seccion">Opción</p>
                                <HeaderSeccion escritura={escritura}></HeaderSeccion>
                        </div>
                        <Nav variant="pills" className="flex-column mt-4">
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="parametro"><img src={iconRol} width="15px" className="mr-3" alt="Parametro"/>Variables del sistema</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="valor"><img src={iconRol} width="15px" className="mr-3" alt="Valor"/>Valores</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="validaciones"><img src={iconRol} width="15px" className="mr-3" alt="Validaciones"/>Mensajes de validaciones</Nav.Link>
                            </Nav.Item>
                        </Nav>      
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="parametro">
                                <Row>
                                    <Col xs={12} md={4} className="px-0">
                                        <BuscadorTipo scroll={true} actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idParametro'} mostrador={'Descripcion'} propsBuscador={parametros} placeholder={placeholderParametro} filter={'Etiqueta'} functionSetData={obtenerDataParametro}></BuscadorTipo>
                                    </Col>
                                    <Col xs={12} md={8} className="pl-0">
                                        <Container>
                                            <FormularioParametro actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormParametro} escritura={escritura} tipo="ADD" ></FormularioParametro>
                                        </Container>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="valor">
                                <Row>
                                    <Col xs={12} md={4} className="px-0">
                                        <BuscadorTipo scroll={true} actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idParametro'} mostrador={'Descripcion'} propsBuscador={dataValores} placeholder={'Búsqueda de valores'} filter={'Etiqueta'} functionSetData={obtenerDataValor}></BuscadorTipo>
                                    </Col>
                                    <Col xs={12} md={8} className="pl-0">
                                        <Container> 
                                            <FormularioValores actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormValores} escritura={escritura} tipo="ADD" ></FormularioValores>
                                        </Container>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="validaciones">
                                <Row>
                                    <Col xs={12} md={4} className="px-0">
                                        <BuscadorTipo scroll={true} actualizarBuscador={actualizarBuscadorGlob} filtroColor={'idHijo'} mostrador={'hijo'} propsBuscador={dataValidaciones} placeholder={'Búsqueda de Validaciones'} filter={'Descripcion'} functionSetData={obtenerDataValidacion}></BuscadorTipo>
                                    </Col>
                                    <Col xs={12} md={8} className="pl-0">
                                        <Container> 
                                            <FormularioValidaciones actualizarCambios={actualizarCambios} peticion={peticion} dataForm={dataFormValidaciones} escritura={escritura} tipo="ADD" ></FormularioValidaciones>
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

export default ParametrosSidebar;