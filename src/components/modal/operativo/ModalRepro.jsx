/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Form } from 'react-bootstrap'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import setPermisosForm from 'helpers/permisosForm';
import axiosClient from 'config/axios/axiosClient';
import {validarFechaMinima,fechaValida} from 'helpers/fechas'
import alerta from 'helpers/alerts';

const ModalRepro = ({actualizarCambios, idPlanilla,escritura, abrirModal, tipo, dataForm }) => {
    const [lgShow, setLgShow] = useState(false)
    const [tipoFormulario] = useState(tipo)
    const [readAll, setReadAll] = useState(false)
    const [readOne, setReadOne] = useState(false)
    const [dataFormulario, setDataFormulario] = useState({
        observacion: ''
    })
    const [fechaMin,setFechaMin] = useState('')

    const ReprogramacionSchema = yup.object().shape({
    });
    const {  handleSubmit } = useForm({
        resolver: yupResolver(ReprogramacionSchema)
    });

    useEffect(() => {
        let permisos = setPermisosForm(escritura, tipo)
        setReadAll(permisos.readAll)
        setReadOne(permisos.readOne)
    }, [tipoFormulario])

    useEffect(() => {
        if(dataForm.nroDoc){
            setFechaMin(validarFechaMinima(dataForm['Fecha de Vencimiento']))
            let newDataForm = dataForm
            newDataForm.observacion = ''
            setDataFormulario(dataForm)
            setLgShow(true)
        }    
        
    }, [abrirModal])

    const handleChange =(e)=>{
        let { name, value } = e.target;
        if(name === 'reprogramacion'){
            if(fechaValida(value)){
                setDataFormulario({
                    ...dataFormulario,
                    [name]: value,
                });
                
            }else{
                setDataFormulario({
                    ...dataFormulario,
                    [name]: undefined,
                });
            }
        }else{
            setDataFormulario({
                ...dataFormulario,
                [name]: value,
            });
        }
    }

    const guardarFormulario=async(e)=>{
        try{
            if([undefined,null,''].includes(dataFormulario.reprogramacion) || [undefined,null,''].includes(dataFormulario.observacion) ){
                alerta('La reprogramación y observación deben ser definidos','error')         
            }else{    
                let FORM = new FormData()
                FORM.append('idPlanilla',idPlanilla)
                FORM.append('idTransaccion',dataFormulario.idTransaccion)
                FORM.append('numDoc',dataFormulario.idNumDoc)
                FORM.append('fecVen',dataFormulario.reprogramacion)
                FORM.append('idUsuario',localStorage.idUsuario)
                FORM.append('observacion',dataFormulario.observacion)
                await axiosClient.post('planilla/reprocesar',FORM)
                alerta('Reprogramación realizada','success')
                actualizarCambios()
                setLgShow(false)
            }
        }catch(error){
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
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
                    <div className="text-center">Reprogramaciones</div>
                </Modal.Title>
                <Form onSubmit={handleSubmit(guardarFormulario)}>
                    <Form.Group as={Row} >
                        <Form.Label column xs={12} sm={4}>
                            RUC
                            </Form.Label>
                        <Col xs={12} sm={8}>
                            <Form.Control readOnly={readOne} size="sm" value={dataFormulario.nroDoc} name="valor" type="text" placeholder="RUC" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column xs={12} sm={4}>
                            Cliente
                            </Form.Label>
                        <Col xs={12} sm={8}>
                            <Form.Control readOnly={readOne} size="sm" value={dataFormulario.razonSocial} name="valor" type="text" placeholder="Cliente" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column xs={12} sm={4}>
                            Número de operación
                            </Form.Label>
                        <Col xs={12} sm={8}>
                            <Form.Control readOnly={readOne} size="sm" value={dataFormulario.numOpeGlobal} name="valor" type="text" placeholder="Número de Operación" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column xs={12} sm={4} >
                            Fecha reprogramación
                        </Form.Label>
                        <Col xs={12} sm={8}>
                            <Form.Control min={fechaMin} readOnly={readAll} onChange={handleChange}  size="sm" type="date" name="reprogramacion" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column xs={12} sm={4}>
                            Fecha emisión
                            </Form.Label>
                        <Col xs={12} sm={8}>
                            <Form.Control readOnly={readOne} size="sm" value={dataFormulario['Fecha de emision']} name="valor" type="text" placeholder="Fecha Emisión" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column xs={12} sm={4}>
                            Fecha registro
                            </Form.Label>
                        <Col xs={12} sm={8}>
                            <Form.Control readOnly={readOne} size="sm" value={dataFormulario['Fecha de Vencimiento']} name="valor" type="text" placeholder="Fecha Registro" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column xs={12} sm={4}>
                            Observación
                            </Form.Label>
                        <Col xs={12} sm={8}>
                            <Form.Control readOnly={readAll} size="sm"  onChange={handleChange} value={dataFormulario.observacion} name="observacion" type="text" placeholder="Observacion" />
                        </Col>
                    </Form.Group>
                    <Row className="mt-5">
                        <Col sm={6} className="border-acciones">
                            <div className="btn w-100 delete-btn" onClick={() => setLgShow(false)}>Cancelar</div>
                        </Col>
                        <Col sm={6} className="border-acciones">
                            <button type="submit" className="btn w-100 done-btn"><strong>Guardar</strong></button>
                        </Col>
                    </Row>
                </Form>
                </Container>
            </Modal.Body>
        </Modal>


    );
}

export default ModalRepro;