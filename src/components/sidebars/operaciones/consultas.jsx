import React from 'react';
import FormConsultas from 'components/forms/operaciones/consultas'
import {Container, Form} from 'react-bootstrap'
import 'components/sidebars/sidebars.css'
import iconPrinter from "../../../img/utils/printer.svg";

const SidebarConsulta = ({enviarPlanilla}) => {

    const obtenerPlanilla =(data,paginado,filas,fechas)=>{
        enviarPlanilla(data,paginado,filas,fechas)
    }
    
    return (
        <>  
            <div className="">
                <div className="row justify-content-between  pl-4">
                    <div className="col-6 pl-4 pt-3 mt-1">
                        <Form.Group className="mb-0">
                            <Form.Control  name="estado" as="select" size="sm" >
                                <option value="-1">Todos</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-6 text-right pt-3 pr-4 mt-1">
                        <button className="btn delete-btn p-0  mr-2 " onClick={() => {

                        }}>
                            <img height="17px" className="m-1" src={iconPrinter} alt=""/>
                        </button>
                        <button className="btn delete-btn p-0" onClick={() => {

                        }}>
                            <img height="17px" className="m-1" src="/static/media/excel.72d48c57.svg" alt=""/>
                        </button>
                    </div>
                </div>
                <hr/>
                <p className="titleSidebar pl-4"> <strong>Buscar Consultas</strong></p>
                <hr/>
                <Container>
                    <FormConsultas obtenerPlanilla={obtenerPlanilla}></FormConsultas>
                </Container>
                
            </div>
            
        </>
    );
}

export default SidebarConsulta;