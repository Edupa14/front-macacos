/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { obtenerSponsorAction } from 'store/operativo/sponsorStore';
import { obtenerProductoAction } from 'store/operativo/productoStore';
import { textoMayusculas } from 'helpers/reusablesForms';
import alerta from 'helpers/alerts';

const FormularioConsultas = ({ obtenerPlanilla, texto }) => {
    const dispatch = useDispatch()
    const [dataFormulario, setDataFormulario] = useState({})
    const [fechas,setFechas] = useState({})

    const buscarConsulta = async (e) => {
        try {
            if([undefined,null].includes(dataFormulario.fechaFin) || [undefined,null].includes(dataFormulario.fechaInit)){
                alerta('Los campos de fecha son obligatorios','error')
            }else{
                e.preventDefault()
                let paginado = {};
                dataFormulario.pagina = 1;
                dataFormulario.fila = 10;
                let response = await axiosClient.post('planilla/consultar', dataFormulario);
                if (response.data.ok === true) {
                    let data = response.data.data
                    paginado = dataFormulario
                    paginado.paginado = data.paginado
                    obtenerPlanilla(data.data,paginado,data.filas, fechas)
                }
            }
            

        } catch (error) {
            alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
        }

    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if(name === 'fechaInit' || name === 'fechaFin' ){
            setFechas({
                ...fechas,
                [name]: value,
            });
        }
        if(name === 'numDocu') value = textoMayusculas(value)
        if(name === "idSponsor")
        {
            getCodProveedor(value)
        }
        if(value === '' || value === '-1'){
            delete dataFormulario[name]
        }else {
            setDataFormulario({
                ...dataFormulario,
                [name]: value,
            });
        }
    }

    const getCodProveedor = async (idSponsor) => {
        let obj = { idSponsor: idSponsor }
        let response = await axiosClient.post('sponsors/proveedores', obj)
        if (response.data.ok === true) {

        }
    }

    useEffect(() => {
        dispatch(obtenerProductoAction({}))
        dispatch(obtenerSponsorAction({}))
        getCodProveedor("-1")
    }, [])
    const sponsor = useSelector(store => store.sponsors.array)

    return (
        <Container>
            <p>{texto}</p>
            <Form>
                <Row>
                    <Col xs={6} className="pr-1">
                        <Form.Group>
                            <Form.Label column className="pl-0">
                                Estado
                            </Form.Label>
                            <Form.Control onChange={handleChange} name="estado" as="select" size="sm" >
                                <option value="-1">Seleccionar</option>
                                <option value="APRO">APROBADO</option>
                                <option value="PEND">PENDIENTE</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={6} className="pr-1">       </Col>
                    <Col xs={6} >
                        <Form.Group>
                            <Form.Label column className="pl-0">
                                Sponsor
                            </Form.Label>
                            <Form.Control onChange={handleChange} name="idSponsor" as="select" size="sm"  >
                                <option value="-1">Seleccionar</option>
                                {
                                    sponsor.map((ele, index) =>
                                        <option value={ele.idSponsor} key={index} >{ele.razonSocial}</option>
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={6} className="pl-1">
                        <Form.Group>
                            <Form.Label column className="pl-0">
                                Número Documento
                            </Form.Label>
                            <Form.Control onChange={handleChange} size="sm" type="text" placeholder="Número Documento" name="numDocu" />
                        </Form.Group>
                    </Col>

                    <Col xs={6} className="pr-1">

                        <Form.Group  >
                            <Form.Label column className="pl-0">
                                Fecha Registro Inicio*
                                </Form.Label>

                            <Form.Control onChange={handleChange} size="sm" type="date" name="fechaInit" />
                        </Form.Group>
                    </Col>
                    <Col xs={6} className="pl-1">
                        <Form.Group  >
                            <Form.Label column className="pl-0">
                                Fecha Registro Fin*
                                </Form.Label>
                            <Form.Control onChange={handleChange} size="sm" type="date" name="fechaFin" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>

                    <Col xs={6} className="pr-1">
                        <Form.Group>
                            <Form.Label column className="pl-0">
                                Número Operación
                                </Form.Label>
                            <Form.Control onChange={handleChange} size="sm" type="text" placeholder="Número Operación Global" name="numOperacion" />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="">
                    <Button className="mt-3  mb-5 buttonPrincipal" variant="danger" onClick={buscarConsulta}>Buscar</Button>
                </div>
            </Form>
        </Container>
    );
}

export default FormularioConsultas;