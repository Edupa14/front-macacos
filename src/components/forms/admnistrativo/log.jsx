
import axiosClient from 'config/axios/axiosClient';
import React, { useState } from 'react';
import Select from 'components/texfield/selectAuditoria';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import alerta from 'helpers/alerts';

const FormularioLog = ({ obtenerLog, texto }) => {
    const [dataFormulario, setDataFormulario] = useState({})
    const [idUsuario, setIdUsuario] = useState('')


    const buscarLog = async (e) => {
        try{
            e.preventDefault()
            let paginado = {};
            paginado.fechaInit = dataFormulario.fechaInit
            paginado.fechaFin = dataFormulario.fechaFin
            if (idUsuario === '' ) {
                
                paginado.usuario = null
                
            }
            else {
                
                paginado.usuario = idUsuario
            }
            paginado.pagina = 1
            paginado.fila = 10
            if (paginado.fechaInit !== undefined && paginado.fechaFin !== undefined) {
                let response = await axiosClient.post('log/listar/fecha/', paginado);
                if (response.data.ok === true) {
                    paginado.paginado = response.data.data.paginado
                    obtenerLog(response.data.data.data, paginado, response.data.data.filas)
                }else{
                    alerta("Todos los campos son requeridos", "error")
                }
            }else{
                alerta("Ingresar datos requeridos", "error")
            }
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }
    const handleChanges = (e) => {
        if (e) {
            setIdUsuario(e.value)
        }

    }

    const funciones = { handleChanges }

    return (
            <Form>
                <p>{texto}</p>   
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
                                Fecha Registro Inicio*
                                </Form.Label>
                            <Form.Control onChange={handleChange} size="sm" type="date" name="fechaInit" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Group className="mb-2">
                            <Form.Label column >
                                Fecha Registro Fin*
                                </Form.Label>
                            <Form.Control onChange={handleChange} size="sm" type="date" name="fechaFin" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Button className="mt-5 buttonPrincipal" variant="danger" onClick={buscarLog}>Buscar</Button>
                    </Col>
                </Row>
            </Form>
    );
}

export default FormularioLog;