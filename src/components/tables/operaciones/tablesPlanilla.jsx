/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Table,Form, Row, Col, Button, Modal } from 'react-bootstrap';
import CabeceraTable from 'components/tables/cabecera'
import '../table.css'
import {Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import axiosClient from "config/axios/axiosClient";

const TablePlanilla = ({size,datos, propsTableDataConfig,title,propsTableHead,propsTableData,nroRegistros}) => {
    const [fileName, setFileName] = useState('')
    const [fileDocName, setFileDocName] = useState('')
    const [habilitarBtn, setHabilitarBtn] = useState(false)
    const [lgShow, setLgShow] = useState(false);
    const handleChange = (val, doc) => {
        setFileName(val)
        setFileDocName(doc)
    }

    function imprimir(elemento) {
        if (elemento.condicion === 'REGISTRADO') {
            return (<> <Button onClick={() => {
                    handleChange("xml", elemento['numDoc']);
                    setLgShow(true);
                }} className='mt-2 succes mr-2' variant='success'>Xml</Button>
                    <Button onClick={() => {
                        handleChange("pdf", elemento['numDoc']);
                        setLgShow(true);
                    }} className='mt-2 danger' variant='danger'>PDF</Button> </>
            )
        } else {
            return (<> <Button onClick={() => {
                    handleChange("xml", elemento['numDoc']);
                    setLgShow(true);
                }} className='mt-2 succes mr-2' variant='success' disabled={true}>Xml</Button>
                    <Button onClick={() => {
                        handleChange("pdf", elemento['numDoc']);
                        setLgShow(true);
                    }} className='mt-2 danger' variant='danger' disabled={true}>PDF</Button> </>
            )
        }
    }

    let pathFile = ''
    if (fileName === 'pdf') {
        pathFile = `application/${fileName}`
    } else if (fileName === 'xml') {
        pathFile = `text/${fileName}`
    }

    const {Dragger} = Upload;

    class DragADrop extends React.Component {
        state = {
            fileList: [],
            uploading: false,
        };
        handleUpload = async () => {
            const {fileList} = this.state;
            const formData = new FormData();
            fileList.forEach(file => {
                formData.append('files[]', file);
            });

            this.setState({
                uploading: true,
            });
            let response =  await axiosClient.post('/subir/archivo/planilla', formData);
            if (response.data !== undefined && response.data.ok === true) {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('¡Carga Exitosa!');
            }else{
                this.setState({
                    uploading: false,
                });
                message.error('¡Carga Fallida!.');
            }
        }
        handleChange = info => {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);

            this.setState({fileList});
            console.log({fileList})
        };

        render() {
            const props = {
                onRemove: file => {
                    this.setState(state => {
                        const index = state.fileList.indexOf(file);
                        const newFileList = state.fileList.slice();
                        newFileList.splice(index, 1);
                        return {
                            fileList: newFileList,
                        };
                    });
                },
                beforeUpload: file => {
                    console.log(file.type,pathFile,'validando')
                    if (file.type !== pathFile) {
                        message.error(`${file.name} no es un archivo ${fileName}`);
                        setHabilitarBtn(false)
                    }else{
                        setHabilitarBtn(true)
                    }
                    this.setState(state => ({
                        fileList: [...state.fileList, file]
                    }));
                    console.log(this.state.fileList,'entrando')

                    return false;
                },
                onChange: this.handleChange,
            };
            return (
                <>
                <Dragger {...props} fileList={this.state.fileList}>
                    {console.log("DragADrop -> render -> fileList", this.state.fileList.length, this.state.fileList, 'lista')}
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
                    <p className="ant-upload-hint">
                        Solo es aceptado el siguiente tipo de archivo <b>{fileName.toUpperCase()}</b>
                    </p>
                </Dragger>
                    <Button
                        type="primary"
                        onClick={this.handleUpload}
                        disabled={this.state.fileList.length === 0 || habilitarBtn ===false}
                        loading={this.state.uploading}
                        style={{marginTop: 16}}
                    >
                        {this.state.uploading ? 'Cargando Archivo' : 'Subir Archivo'}
                    </Button>
        </>
        )
            ;
        }
    }
    const [montosTotales, setMontosTotales] = useState([])
    useEffect(()=>{
        setHabilitarBtn(false)
        datos.nroRegistros = nroRegistros
        datos.producto = datos.valor
        datos.razon = datos.idSponsor
        let montoTotal = datos.montosTotales;
        let monto = []
        if(montoTotal){
            monto = montoTotal.split('|')
            setMontosTotales([])
            monto.forEach((elemento)=>{
                if(elemento){
                    let monstosTotales = []
                    let montos = {}
                    monstosTotales = elemento.split(':')
                    if(monstosTotales[0] === 'USD'){
                        montos.moneda = 'Dólares'
                    }
                    if(monstosTotales[0] === 'PEN'){
                        montos.moneda = 'Soles'
                    }
                    montos.monto = monstosTotales[1]
                    setMontosTotales(montosTotales=>[...montosTotales,montos])
                }
            })
        }
    },[propsTableData, datos])
    if(nroRegistros===true){
        return( 
            <p>Aún no se han registrado datos.</p>
        )
    }else if(nroRegistros>0){ 
        return (
            <>
                <span className="letratableTitle">{title}</span>
                <CabeceraTable data={datos}></CabeceraTable>
               
                <hr/>
               
                <Table style={(size)? {width:size} : {width:"1500px"}}  striped responsive bordered hover size="sm">
                    <thead>
                        <tr>
                            {propsTableHead.map((ele,index)=>
                                <th className="letratable" key={index}>{ele}</th>
                            )}
                            <th className="letratable" key={100}>Documentos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propsTableData.map((ele,index)=>
                        <tr key={index}>
                            {propsTableDataConfig.map((elem,inde)=>
                                <td className="letratable" key={inde}>{ele[elem]}</td>
                            )} 
                             <td className="letratable">
                                {imprimir(ele)}
                            </td>                       
                        </tr>
                        )}
                        
                    </tbody>
                    <tfoot>
                        {montosTotales && montosTotales.map((elemento,index)=>
                                <tr key={index}>
                                    {index === 0 && 
                                        <td colSpan={5} rowSpan={montosTotales.length+1}>
                                            <b>Total</b>
                                        </td>
                                    }
                                    <td>
                                        <b>{elemento.moneda}</b>    
                                    </td>
                                    <td>
                                        <b>{elemento.monto}</b>
                                    </td>
                                    <td colSpan={4}>
                                    </td> 
                                </tr>
                            )}
                    </tfoot>
                </Table>
                <Modal
                    size="xs"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Subir archivo a {fileDocName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        {/*<Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
                            <p className="ant-upload-hint">
                                Solo es aceptado el siguiente tipo de archivo <b>{fileName.toUpperCase()}</b>
                            </p>
                        </Dragger>*/}
                        <DragADrop/>

                    </Modal.Body>
                </Modal>
            </>
        );
    }
    
}
export default TablePlanilla;