
import React,{useState} from 'react';
import {Form,Button,Row,Container,Col} from 'react-bootstrap'
import alerta from 'helpers/alerts';

const FormularioAutorizacion = ({obtenerAutorizacion,texto}) => {
    const [dataFormulario,setDataFormulario] = useState({})


    const buscarAutorizacion =(e)=>{ 
        e.preventDefault()
        let paginado = {};
        paginado.estado = 'PEND';
        paginado.fechaInit = dataFormulario.fechaInit;
        paginado.fechaFin = dataFormulario.fechaFin;
        paginado.pagina = 1;
        paginado.fila = 10;
        if(paginado.fechaInit !== undefined && paginado.fechaFin !== undefined){
            obtenerAutorizacion(paginado)
        }else{
            alerta("Ingresar datos requeridos", "error")
        }
        
    }

    const handleChange =(e)=>{
        const { name, value } = e.target;
        
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }
    return (
        <Container>
            <p>{texto}</p>
            <Form> 
                <Row>
                    <Col xs={11} className="pr-1">
                    <Form.Group  >
                                <Form.Label column className="pl-0">
                                Fecha Registro Inicio*
                                </Form.Label>
                                <Form.Control onChange={handleChange} size="sm" type="date" name="fechaInit" />
                        </Form.Group> 
                    
                    <Form.Group  >
                                <Form.Label column className="pl-0">
                                Fecha Registro Fin*
                                </Form.Label>
                                <Form.Control onChange={handleChange} size="sm" type="date" name="fechaFin" />
                        </Form.Group> 
                    </Col>
                </Row>
                <div className="">
                <Button className="mt-3  mb-5 buttonPrincipal" variant="danger" onClick={buscarAutorizacion}>Buscar</Button>
                </div>
            </Form>  
        </Container>
    );
}

export default FormularioAutorizacion;
