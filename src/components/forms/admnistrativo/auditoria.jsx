
import axiosClient from 'config/axios/axiosClient';
import React, { useState } from 'react';
import Select from 'components/texfield/selectAuditoria';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import alerta from 'helpers/alerts';

const FormularioAuditoria = ({ obtenerAuditoria, texto }) => {
    const [dataFormulario, setDataFormulario] = useState({operacion:''})
    const [idUsuario, setIdUsuario] = useState('')
    const [fechaInicio, setfechaInicio] = useState(new Date())
    const [fechaTermino, setfechaTermino] = useState(new Date())

    const buscarAuditoria = async (e) => {
        try {
            e.preventDefault()
            let paginado = {};
            paginado.fechaInit = dataFormulario.fechaInit
            paginado.fechaFin = dataFormulario.fechaFin
            if (idUsuario === '') {
                paginado.usuario = null
            }
            else {
                paginado.usuario = idUsuario
            }
            if(dataFormulario.operacion !== ''){
                paginado.operacion = dataFormulario.operacion
            }else{
                paginado.operacion = null
            }
            paginado.pagina = 1
            paginado.fila = 10
            if (paginado.fechaInit !== undefined && paginado.fechaFin !== undefined) {
                let response = await axiosClient.post('auditoria/listar/fecha/', paginado);
                if (response.data.ok === true) {
                    paginado.paginado = response.data.data.paginado
                    obtenerAuditoria(response.data.data.data, paginado, response.data.data.filas)
                } else {
                    alerta("Todos los campos son requeridos", "error")
                }
            } else {
                alerta("Ingresar datos requeridos", "error")
            }
        } catch (error) {
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
        setfechaInicio(value)
    }
    const handleChangeFin = (e) => {
        const { name, value } = e.target;
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
        setfechaTermino(value)
    }
    const handleChanges = (e) => {
        if (e) {
            setIdUsuario(e.value)
        }
    }
    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }

    const funciones = { handleChanges }

    return (
            <Form>         
                <Row>  
                    <Col md={12}><p classname="letratableTitle"><strong>Filtros</strong></p></Col>    
                </Row>      
                <Row className="pl-4">
                    <Col xs={12} md={4}>
                        <Form.Group className="mb-2">
                            <Form.Label column >
                                Usuario
                                </Form.Label>
                            <Select funciones={funciones} size="sm" />
                        </Form.Group>
                    </Col>
                </Row>  
                <Row className="pl-4">
                    <Col xs={12} md={4}>
                        <Form.Group className="mb-2">
                            <Form.Label column >
                                Fecha de registro inicio*
                                </Form.Label>
                            <Form.Control value={fechaInicio} onChange={handleChange} size="sm" type="date" name="fechaInit" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Group className="mb-2">
                            <Form.Label column >
                                Fecha de registro fin*
                                </Form.Label>
                            <Form.Control value={fechaTermino} onChange={handleChangeFin} size="sm" type="date" name="fechaFin" />
                        </Form.Group>
                    </Col>
                </Row>                        
                <Row className="pl-4">
                    <Col xs={6} md={4}>
                        <Form.Group className="mb-2">
                            <Form.Label column >
                                Acciones
                                </Form.Label>
                            <Form.Control value={dataFormulario.operacion} onChange={handleChangeForm} as="select" size="sm" name="operacion">
                                <option value="">Escoge una opción</option>
                                <option value="Act">Actualizar</option>
                                <option value="Lis">Listar</option>
                                <option value="Cre">Crear</option>
                                <option value="Reg">Registrar</option>
                                <option value="Edi">Editar</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Button className="mt-5 buttonPrincipal" variant="danger" onClick={buscarAuditoria}>Buscar</Button>
                </Row>
            </Form>
    );
}

export default FormularioAuditoria;