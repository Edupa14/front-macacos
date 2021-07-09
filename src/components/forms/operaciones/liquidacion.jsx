
import axiosClient from 'config/axios/axiosClient';
import React,{useState,useEffect} from 'react';
import {Form,Button,Row,Container,Col} from 'react-bootstrap'


const FormularioLiquidacion = ({obtenerPlanilla,texto}) => {
    const [dataFormulario,setDataFormulario] = useState({})

    const buscarPlanilla =async(e)=>{ 
        e.preventDefault()
        let paginado = {};
        paginado.estado = "APRO";
        paginado.fechaInit = dataFormulario.fechaRegistroInicio;
        paginado.fechaFin = dataFormulario.fechaRegistroFin;
        let response = await axiosClient.post('planilla/consultar',paginado);
        if(response.data.ok ===true){ 
            obtenerPlanilla(response.data.data)
        } 
    }

    const handleChange =(e)=>{
        let { name, value } = e.target;
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }

    useEffect(()=>{   
    },[])

    return (
        <Container>
            <p>{texto}</p>
            <Form> 
                <Row>
                    <Col xs={6} className="pr-1">
                    <Form.Group  >
                                <Form.Label column className="pl-0">
                                Fecha Registro Inicio*
                                </Form.Label>
                                <Form.Control onChange={handleChange} size="sm" type="date" name="fechaRegistroInicio" />
                        </Form.Group> 
                    </Col>
                    <Col xs={6} className="pl-1">
                    <Form.Group  >
                                <Form.Label column className="pl-0">
                                Fecha Registro Fin*
                                </Form.Label>
                                <Form.Control onChange={handleChange} size="sm" type="date" name="fechaRegistroFin" />
                        </Form.Group> 
                    </Col>
                </Row>

                <div className="">
                <Button className="mt-3  mb-5 buttonPrincipal" variant="danger" onClick={buscarPlanilla}>Buscar</Button>
                </div>
            </Form>  
        </Container>
    );
}

export default FormularioLiquidacion;
