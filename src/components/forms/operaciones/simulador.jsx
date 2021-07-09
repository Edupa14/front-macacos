/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col,Table } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { obtenerProgramaAction } from 'store/operativo/programaStore';
import { obtenerMonedaAction } from 'store/operativo/monedaStore';
import HeaderForm from 'components/forms/headerForm'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from 'components/alerts/error';
import alerta from 'helpers/alerts';
import { ResponsivePie } from '@nivo/pie';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
const moment = require("moment");
const FormularioSimulador = () => {
    const dispatch = useDispatch()
    const [dataFormulario, setDataFormulario] = useState({})
    const [resultados, setResultado] = useState([])
    const [productos,setProductos] = useState([])
    const [Tasa,setTasa] = useState([])
    const [MontoMinimo,setMontoMinimo] = useState([])
    const [MontoMaximo,setMontoMaximo] = useState([])
    const [ValorIGV,setValorIGV] = useState([])
    const [sponsor,setSponsor] = useState([])
    const [state,setState] = useState([])

    const ParametroSchema = yup.object().shape({
        programa: yup.string().required('El campo es requerido'),
        producto: yup.string().required('El campo es requerido'),
        moneda: yup.string().required('El campo es requerido'),
        fechaIngreso: yup.string().required('El campo es requerido'),
        fechaVencimiento: yup.string().required('El campo es requerido'),
        gastos: yup.string().required('El campo es requerido'), 
        monto: yup.number().typeError('Especificar número valido').min(MontoMinimo,`El monto debe ser mayor a ${MontoMinimo}`).max(MontoMaximo,`El monto debe ser menor a ${MontoMaximo}`),
        razonSocial: yup.string().required('El campo es requerido'),
        correo: yup.string().required('El campo es requerido'),
        ruc: yup.number().typeError('Especificar número valido').min(11,'Minimo 11 digitos').required('El campo es requerido'),
      });  
        const {register, handleSubmit, errors } = useForm({
        resolver: yupResolver(ParametroSchema)
      });

    const clearForm = () => {
        
    }

    useEffect(()=>{   
        dispatch(obtenerProgramaAction({}))
        dispatch(obtenerMonedaAction({}))
        getCodProducto("-1")
        getvalorIGV()
        setState(false)
    },[])
    var today = new Date();
    var tomorrow = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var dt = String(today.getDate()+1).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    tomorrow = yyyy + '-' + mm + '-' + dt;
    const programa = useSelector(store => store.programas.array)
    const moneda = useSelector(store => store.monedas.array)


    const generarSimulacion = async () => {
        let paginado = {};
        let datos;
        paginado.fechaIngreso = dataFormulario.fechaIngreso
        paginado.fechaVencimiento = dataFormulario.fechaVencimiento
        paginado.monto = dataFormulario.monto
        paginado.gastos = dataFormulario.gastos
        paginado.producto = dataFormulario.producto
        paginado.valorIGV = ValorIGV.valor
        paginado.tasa = document.getElementById("tea").value;
        let response = await axiosClient.post('liquidacion/simulacion/', paginado);
        if (response.data.ok === true) {
            datos = response.data.data;
            setResultado(datos);  
            setState(true);
        }
        return response;
    }


    const handleChange = (e) => {
        
        const { name, value } = e.target;
        if(name === "programa")
        {
            getCodProducto(value)
        }
        if(name === "producto")
        {   
            getDataProduct(value)
        }
        if(name === "fechaVencimiento")
        {
            let FV = moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD');
            let FI = moment(dataFormulario.fechaIngreso).format('YYYY-MM-DD'); 
            let fvFecha = moment(FV);
            let fiFecha = moment(FI);
            dataFormulario.plazo = fvFecha.diff(fiFecha,'days');
        }
        if(name === "fechaIngreso")
        {
            let FV = moment(dataFormulario.fechaVencimiento, 'YYYY-MM-DD').format('YYYY-MM-DD');
            let FI = moment(value).format('YYYY-MM-DD'); 
            let fvFecha = moment(FV);
            let fiFecha = moment(FI);
            dataFormulario.plazo = fvFecha.diff(fiFecha,'days');
        }
        // if(name === "montominimo") montominimo.valor = value

        // if(name === "montomaximo") montomaximo.valor = value
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    }

    const getCodProducto = async(idParametro)=>{

        let obj = {idPadre:idParametro, etiqueta: "PRODUCTO"}
        let response = await axiosClient.post(`parametro/listar`,obj)
        if(response.data.ok === true){
            setProductos(response.data.data)
        }
    }

    const getDataProduct = async(codVal)=>{
        setTasa(0)
        setMontoMinimo(0)
        setMontoMaximo(0)
        let config 
        let response = await axiosClient.get(`/valor/listar/codVal/${codVal}`)
        if(response.data.ok === true){
            config = response.data.data
            config.forEach((data) =>{
                let input = {tipo: data.Valor_Conf, valor: data.valor }
                
                if(input.tipo === 'TEA'){
                    setTasa(input.valor)
                } 
                if(input.tipo === 'MOM'){
                    setMontoMinimo(input.valor)
                }else
                if(input.tipo === 'MMAX'){
                    setMontoMaximo(input.valor)
                }
            })
        } 
    }

    const getvalorIGV = async()=>{

        let response = await axiosClient.get(`valor/listar/codVal/IGV`)
        if(response.data.ok === true){
            let obj = response.data.data[0]
            setValorIGV(obj)
        }
    }
    
    const BuscarSponsor = async(e)=>{
        e.preventDefault();
        let response = await axiosClient.get(`sponsors/ruc/${dataFormulario.ruc}`)
        if(response.data.ok === true){
            let obj = response.data.data;
            setSponsor({correo: obj.correo, razonSocial:obj.razonSocial})
        }
        
        if(response.data.data === "NO HAY RUC"){
            setSponsor({correo: '', razonSocial:''})
        }
    }

    const changeInput = async () => {
        let valores = {};
        valores.correo = document.getElementById("correo").value;
        valores.razonSocial = document.getElementById("razonSocial").value;
        valores.tea =  document.getElementById("tea").value;
        valores.MontoMinimo =  document.getElementById("montominimo").value;
        valores.MontoMaximo =  document.getElementById("montomaximo").value;
        setSponsor({correo: valores.correo, razonSocial:valores.razonSocial})
        setTasa(valores.tea)
        setMontoMinimo(valores.MontoMinimo)
        setMontoMaximo(valores.MontoMaximo)
    }

    const enviarCorreo = async () => {


        /*Armar PDF */

        const doc = new jsPDF()
        
        doc.setFontSize(12);
        doc.text("RESULTADO DE LA SIMULACIÓN", 105, 20, null, null, "center");
        doc.setFontSize(10);
        doc.setFont("", "bold");
        doc.text("Monto:", 10, 30);
        doc.setFont("", "normal");
        doc.text(dataFormulario.monto, 22, 30);
        doc.setFont("", "bold");
        doc.text("Fecha de ingreso:", 10, 35);
        doc.setFont("", "normal");
        doc.text(dataFormulario.fechaIngreso, 40, 35);
        doc.setFont("", "bold");
        doc.text("Fecha de vencimiento:", 10, 40);
        doc.setFont("", "normal");
        doc.text(dataFormulario.fechaVencimiento, 47, 40);
        doc.autoTable({ html: '#my-table' });

        // Or use javascript directly:
        doc.autoTable({
            startY: 50,
            head: [['Interés', 'IGV', 'Total a pagar', 'Monto a abonar']],
            body: [
                [resultados.interes,resultados.igv, resultados.td, resultados.monto],
            ],
        })
        //doc.save('table.pdf')
        
        var pdfBase64 = doc.output('datauristring');

        ///notificacion/envioCorreo
        let paginado = {};
        paginado.plantilla = "SIMU"
        paginado.correo = document.getElementById("correo").value;
        paginado.razonSocial = document.getElementById("razonSocial").value;
        paginado.interes = resultados.interes
        paginado.igv = resultados.igv
        paginado.total = resultados.td
        paginado.monto = resultados.monto
        paginado.pdf  = pdfBase64
        let response = await axiosClient.post('notificacion/envioCorreo/', paginado);
        if (response.data.ok === true) {
            alerta("Simulación enviado por correo.", "success");
        } else {
            alerta("No se pudó enviar la simulación por correo.", "danger");
        }
        return response;
    }
    return (
        <div>
            <HeaderForm limpiar={clearForm} ></HeaderForm>
            <Row className="doubleSeccion">
                <Col xs={12} lg={5} className="divSeccion">
                    <Form className="FormSimulador" onSubmit={handleSubmit(generarSimulacion)}>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3} md={3} lg={3}>
                                RUC <span className="required">*</span>
                            </Form.Label>
                            <Col sm={4} md={5} lg={5}>
                                <Form.Control ref={register} value={dataFormulario.ruc} onChange={handleChange} size="sm" type="number" name="ruc" placeholder="ruc" />
                                <ErrorMessage mensaje={errors.ruc?.message}></ErrorMessage>
                            </Col>
                            <Col sm={5} md={4} lg={4}>
                                <button className="buttonPrincipal btn mt-3 w-100" onClick={BuscarSponsor}>Buscar</button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Correo <span className="required">*</span>
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control ref={register} value={sponsor.correo} onChange={changeInput.bind(sponsor.correo)} size="sm" id="correo" type="text" name="correo" placeholder="email" />
                                <ErrorMessage mensaje={errors.correo?.message}></ErrorMessage>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Razon Social <span className="required">*</span>
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control ref={register} value={sponsor.razonSocial} onChange={changeInput.bind(sponsor.razonSocial)} size="sm" id="razonSocial" type="text" name="razonSocial" placeholder="razonSocial" />
                                <ErrorMessage mensaje={errors.razonSocial?.message}></ErrorMessage>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Programa 
                            </Form.Label>
                            <Col sm={9}>
                                
                                <Form.Control ref={register} value={dataFormulario.programa} size="sm" as="select" onChange={handleChange} name="programa" id="programa" >
                                <option value="-1">Seleccionar</option>
                                    {programa.map((ele,index)=>
                                        <option key={index} value={ele.idParametro}>{ele.Descripcion}</option>
                                    )}
                                </Form.Control>
                                <ErrorMessage mensaje={errors.programa?.message}></ErrorMessage>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Producto 
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control ref={register} value={dataFormulario.producto}  size="sm" as="select" onChange={handleChange} name="producto" >
                                    <option value="-1">Seleccionar</option>
                                    {productos.map((prod,index)=>
                                        <option key={index} value={prod.Valor}>{prod.Descripcion}</option>
                                    )}
                                </Form.Control>
                                <ErrorMessage mensaje={errors.producto?.message}></ErrorMessage>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Moneda 
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control ref={register} value={dataFormulario.moneda}  size="sm" as="select" onChange={handleChange} name="moneda" >
                                    <option value="-1">Seleccionar</option>
                                    {moneda.map((ele,index)=>
                                        <option key={index} value={ele.idParametro}>{ele.Descripcion}</option>
                                    )}
                                </Form.Control>
                                <ErrorMessage mensaje={errors.moneda?.message}></ErrorMessage>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Monto 
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control ref={register} value={dataFormulario.monto} onChange={handleChange} size="sm" type="number" name="monto" placeholder="Monto"/>
                                <ErrorMessage mensaje={errors.monto?.message}></ErrorMessage>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Fecha de Ingreso 
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control ref={register} value={dataFormulario.fechaIngreso}  onChange={handleChange} size="sm" type="date" name="fechaIngreso" placeholder="Fecha de ingreso" min={today} />
                                <ErrorMessage mensaje={errors.fechaIngreso?.message}></ErrorMessage>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Fecha de Vencimiento 
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control ref={register} value={dataFormulario.fechaVencimiento}   onChange={handleChange} size="sm" type="date" name="fechaVencimiento" placeholder="Fecha de vencimiento" min={tomorrow} />
                                <ErrorMessage mensaje={errors.fechaVencimiento?.message}></ErrorMessage>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Plazo 
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control ref={register}  disabled onChange={handleChange} size="sm" type="number" name="plazo" placeholder="Plazo" value={dataFormulario.plazo}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                TEA
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control onChange={changeInput.bind(Tasa)} size="sm" type="number" name="tea" id="tea" placeholder="Tasa %"  value={Tasa}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Monto minimo 
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control onChange={changeInput.bind(MontoMinimo)} size="sm" type="number" name="montominimo" id="montominimo" placeholder="Monto mínimo"  value={MontoMinimo}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Monto maximo 
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control onChange={changeInput.bind(MontoMaximo)} size="sm" type="number" name="montomaximo" id="montomaximo" placeholder="Monto máximo" value={MontoMaximo} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={3}>
                                Gastos <span className="required">*</span>
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control ref={register} value={dataFormulario.gastos} onChange={handleChange} size="sm" type="number" name="gastos" placeholder="Gastos" />
                                <ErrorMessage mensaje={errors.gastos?.message}></ErrorMessage>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="botonesSimulador" >
                            <Col sm={6} >
                            <button className="btn  delete-btn w-100" type="reset">Limpiar</button>
                            </Col>
                            <Col sm={6} >
                            <button type="submit"  className="btn done-btn w-100"  ><strong>Simular</strong></button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={12} lg={7} className="divSeccion" >
                <br/><br/>
                {state ? 
                
                        <div className="divTable"> 
                            <Table  striped responsive bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th className="letratable">Intereses</th> 
                                        <th className="letratable">IGV</th> 
                                        <th className="letratable">Total a pagar</th> 
                                        <th className="letratable">Monto a abonar</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    <tr>           
                                        <td className="letratable" >{resultados.interes}</td>  
                                        <td className="letratable" >{resultados.igv}</td>          
                                        <td className="letratable" >{resultados.td}</td>         
                                        <td className="letratable" >{resultados.monto}</td>                   
                                    </tr>
                                </tbody>
                            </Table>    
                            <Row className="FormSimulador" >
                                
                                <Col sm={{ span: 8, offset: 2 }} >
                                    <button onClick={enviarCorreo}  className="btn done-btn w-100"  ><strong>Enviar correo</strong></button>
                                </Col>                
                            </Row>
                        </div>
                        
                
                : null }
                
                {state ? 
                    <ResponsivePie
                            width={500}
                            height={400}
                            margin={{ top: 40, right: 0, bottom: 80, left:80 }}
                            data={[
                                {
                                    "id": "Intereses",
                                    "label": "Intereses",
                                    "value": resultados.interes,
                                    "color": "hsl(343, 70%, 50%)"
                                },
                                {
                                    "id": "IGV",
                                    "label": "IGV",
                                    "value": resultados.igv,
                                    "color": "hsl(86, 70%, 50%)"
                                },
                                {
                                    "id": "Total",
                                    "label": "Total a pagar",
                                    "value": resultados.td,
                                    "color": "hsl(7, 70%, 50%)"
                                },
                                {
                                    "id": "Monto",
                                    "label": "Monto a abonar",
                                    "value": resultados.monto,
                                    "color": "hsl(111, 70%, 50%)"
                                }
                            ]}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
                            defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'ruby'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'c'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'go'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'python'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'scala'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'lisp'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'elixir'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'javascript'
                                },
                                id: 'lines'
                            }
                        ]}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 10,
                                itemWidth: 90,
                                itemHeight: 1,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />                
                : null }  

                   
                </Col>

            </Row>
        </div>
    );
}

export default FormularioSimulador;