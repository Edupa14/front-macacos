/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Form } from 'react-bootstrap'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from 'config/axios/axiosClient';
import alerta from 'helpers/alerts';

const ModalUsuario = ({actualizarCambios, abrirModal, dataForm, limpiar }) => {
    const [lgShow, setLgShow] = useState(false)
    const [dataFormulario, setDataFormulario] = useState({})

    const usuarioSchema = yup.object().shape({
       // observacion: yup.string().required('El campo observacion es requerido'),
    });
    const {  handleSubmit } = useForm({
        resolver: yupResolver(usuarioSchema) 
    });
    useEffect(() => {
        setDataFormulario(dataForm)
        if(dataForm.idUsuario){
            setLgShow(true)
        }    
    }, [abrirModal])

    const handleChange =(e)=>{
        let { name, value } = e.target;
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }

    const eliminarUsuario=async()=>{
        let eliminar = {}
        eliminar.idUsuario = dataForm.idUsuario
        eliminar.observacion = dataFormulario.observacion
        if (eliminar.idUsuario !== undefined) {
            await axiosClient.post(`usuario/eliminar`, eliminar)
            alerta('Usuario eliminado correctamente', 'success')
            dataFormulario.observacion = '' 
            setLgShow(false)
            actualizarCambios()
        }
        
    }

    return (

        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            centered
        >
            <Modal.Body>
                <Container className="px-5 ">
                <Modal.Title className="pb-5">
                    <div className="text-center">Motivo</div>
                </Modal.Title>
                <Form onSubmit={handleSubmit(eliminarUsuario)}>
                <Form.Group as={Row} >
                            <Col sm={12}>
                                <Form.Control size="sm"  value={dataFormulario.observacion} onChange={handleChange} name="observacion"  as="textarea" rows={3} type="text" placeholder="Motivo el cual se elimina el usuario" />
                            </Col>
                        </Form.Group>
                    <Row className="mt-5">
                        <Col sm={6} className="border-acciones">
                            <div className="btn w-100 delete-btn" onClick={() => setLgShow(false)}>Cancelar</div>
                        </Col>
                        <Col sm={6} className="border-acciones">
                            <button type="submit" className="btn w-100 done-btn"><strong>Confirmar</strong></button>
                        </Col>
                    </Row>
                </Form>
                </Container>
            </Modal.Body>
        </Modal>


    );
}

export default ModalUsuario;