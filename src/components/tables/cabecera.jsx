/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Form, Row, Col} from 'react-bootstrap'
import iconPrinter from "../../img/utils/printer.svg";
import iconEmail from "img/utils/email.svg";


const CabeceraTable = ({data, componente}) => {
    if (data.numOpeGlobal !== undefined) {
        if(componente === 'consultas' ) {
            return <>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} md={6} lg={4}>
                        <p className="letratable"> <b>Ruc: {data.ruc}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <p className="letratable"> <b>Registros Procesados: {data.nroRegistros}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <p className="letratable"> <b>Fecha de registro: {data.fechaRegistro}</b></p>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} md={6} lg={4}>
                        <p className="letratable"> <b>Programa: {data.programa}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <p className="letratable"> <b>Cliente: {data.razon}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <p className="letratable"> <b>Producto :{data.producto}</b></p>
                    </Col>
                </Form.Group>
            </>
        }else if (componente === 'liquidacion'){
            return <>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} md={6} lg={3}>
                        <p className="letratable">Planilla: <b>{data.numOpeGlobal}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <p className="letratable">Planilla cliente: <b>{data.numOpeSponsor}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={5}>
                        <p className="letratable">Fecha de registro: <b>{data.fechaRegistro}</b></p>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} md={6} lg={3}>
                        <p className="letratable">Ruc: <b>{data.ruc}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <p className="letratable">Cliente: <b>{data.razon}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <p className="letratable">Correo: <b>{data.correo}</b></p>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} md={6} lg={7}>
                        <p className="letratable">Programa: <b>{data.programa}</b></p>
                    </Col>

                    <Col xs={12} md={6} lg={5}>
                        <p className="letratable">Producto: <b>{data.producto}</b></p>
                    </Col>
                </Form.Group>
                <div className="row justify-content-between  ">
                    <div className="col">
                        <Form.Group as={Row} className='m-1'>
                            <Col xs={12} md={6} lg={6}>
                                <p className="letratable">N° Registros de Procesos: <b>{data.nroRegistros}</b></p>
                            </Col>
                        </Form.Group>
                    </div>
                    <div className="col text-right">
                        Enviar Correo
                        <button className="btn delete-btn p-0" onClick={() => {

                        }}>
                            <img height="17px" className="m-1" src={iconEmail} alt=""/>
                        </button>
                    </div>
                </div>
            </>
        }else{
            return <>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} md={6} lg={3}>
                        <p className="letratable">Planilla: <b>{data.numOpeGlobal}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <p className="letratable">Planilla cliente: <b>{data.numOpeSponsor}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={5}>
                        <p className="letratable">Fecha de registro: <b>{data.fechaRegistro}</b></p>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} md={6} lg={3}>
                        <p className="letratable">Ruc: <b>{data.ruc}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <p className="letratable">Cliente: <b>{data.razon}</b></p>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <p className="letratable">Correo: <b>{data.correo}</b></p>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} md={6} lg={7}>
                        <p className="letratable">Programa: <b>{data.programa}</b></p>
                    </Col>

                    <Col xs={12} md={6} lg={5}>
                        <p className="letratable">Producto: <b>{data.producto}</b></p>
                    </Col>
                </Form.Group>
                   <div className="row justify-content-between  ">
                    <div className="col">
                        <Form.Group as={Row} className='m-1'>
                            <Col xs={12} md={6} lg={6}>
                                <p className="letratable">N° Registros de Procesos: <b>{data.nroRegistros}</b></p>
                            </Col>
                        </Form.Group>
                    </div>
                    <div className="col text-right">
                        Enviar Correo
                        <button className="btn delete-btn p-0" onClick={() => {

                        }}>
                            <img height="17px" className="m-1" src={iconEmail} alt=""/>
                        </button>
                    </div>
                </div>
            </>
        }
    } else {
        return 'No hay Registros'
    }
}

export default CabeceraTable;