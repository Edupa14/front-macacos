import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LinkTo from '../../components/linkTo/linkTo';

const Ejemplo = () => {
    const [nombre,setNombre] = useState("")

    useEffect(()=>{
        setNombre("Camilo")
    },[])
    return (
        <Container fluid>
            <Row>
                <Col xs={12} className="text-center mt-4">
                    <h1>Vista Ejemplo, Bienvenido a {nombre}</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="text-center">
                    <LinkTo irHacia="/" text="Volver al home" />
                </Col>
            </Row>
        </Container>
    );
}

export default Ejemplo;