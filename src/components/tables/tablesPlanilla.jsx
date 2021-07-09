import React, {useState, useEffect} from 'react';
import {Table, Form, Row, Col, Button, Modal} from 'react-bootstrap';
import './table.css'
import {Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import axiosClient from "../../config/axios/axiosClient";

const TablePlanilla = ({datos, propsTableDataConfig, title, propsTableHead, propsTableData, nroRegistros}) => {

    const [fileName, setFileName] = useState('')
    const [fileDocName, setFileDocName] = useState('')
    const [lgShow, setLgShow] = useState(false);
    const handleChange = (val, doc) => {
        setFileName(val)
        setFileDocName(doc)
    }

    function imprimir(elemento) {
        if (elemento.condicion === 'VALIDADO') {
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
            let response =  await axiosClient.post('/subir/archivo/planillaa', formData);
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
                    if (file.type !== pathFile) {
                        message.error(`${file.name} no es un archivo ${fileName}`);
                    }
                    this.setState(state => ({
                        fileList: [...state.fileList, file],
                    }));
                    return false;
                },
                onChange: this.handleChange,
            };
            return (
                <>
                <Dragger {...props} fileList={this.state.fileList}>
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
                        disabled={this.state.fileList.length === 0}
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

    /* const handleChanges = info => {
         let fileList = [...info.fileList];

         // 1. Limit the number of uploaded files
         // Only to show two recent uploaded files, and old ones will be replaced by the new
         fileList = fileList.slice(-2);

         // 2. Read from response and show file link
         fileList = fileList.map(file => {
             if (file.response) {
                 // Component will show file.url as link
                 file.url = file.response.url;
             }
             return file;
         });

         this.setState({ fileList });
     };*/
    /* const props = {
         action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
         /!*handleChange(info) {
             let fileList = [...info.fileList];

             // 1. Limit the number of uploaded files
             // Only to show two recent uploaded files, and old ones will be replaced by the new
             fileList = fileList.slice(-2);

             this.setState({ fileList });
         },*!/
         beforeUpload: file => {
             if (file.type !== pathFile) {
                 message.error(`${file.name} no es un archivo ${fileName}`);
             }
             return file.type === pathFile ? true : Upload.LIST_IGNORE;
         },
         /!*onChange : handleChanges*!/
         /!*onChange(info) {
             const {status} = info.file;
             /!*if (status !== 'uploading') {
             }*!/
             if (status === 'done') {
                 message.success(`${info.file.name} archivo cargado exitosamente.`);
             } else if (status === 'error') {
                 message.error(`${info.file.name} la carga del archivo falló.`);
             }
         },*!/
     };*/
    const [montosTotales, setMontosTotales] = useState([])
    const fecha = new Date();
    const hoy = fecha.getDate();
    useEffect(() => {
        let montoTotal = '';
        propsTableData.forEach((ele) => {
            montoTotal = ele.montoTotal
        })
        let monto = []
        monto = montoTotal.split('|')
        setMontosTotales([])
        monto.forEach((elemento, index) => {
            if (elemento) {
                let monstosTotales = []
                let montos = {}
                monstosTotales = elemento.split(':')
                if (monstosTotales[0] === 'USD') {
                    montos.moneda = 'Dólares'
                }
                if (monstosTotales[0] === 'PEN') {
                    montos.moneda = 'Soles'
                }
                montos.monto = monstosTotales[1]
                setMontosTotales(montosTotales => [...montosTotales, montos])
            }
        })
    }, [propsTableData])
    if (nroRegistros === true) {
        return (
            <p>Aún no se han registrado datos.</p>
        )
    } else if (nroRegistros > 0) {
        return (
            <>
                <span className="letratableTitle">{title}</span>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} sm={3}>
                        <p className="letratable">Nº operacion global: <b>{nroRegistros}</b></p>
                    </Col>
                    <Col xs={12} sm={4}>
                        <p className="letratable">Nº operacion sponsor: <b>{nroRegistros}</b></p>
                    </Col>
                    <Col xs={12} sm={5}>
                        <p className="letratable">Fecha de
                            registro: <b>{hoy}/{fecha.getMonth() + 1}/{fecha.getFullYear()}</b></p>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} sm={3}>
                        <p className="letratable">Ruc: <b>{datos.ruc}</b></p>
                    </Col>
                    <Col xs={12} sm={9}>
                        <p className="letratable">Cliente: <b>{datos.idSponsor}</b></p>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} sm={3}>
                        <p className="letratable">Programa: <b>{datos.programa}</b></p>
                    </Col>

                    <Col xs={12} sm={5}>
                        <p className="letratable">Producto: <b>{datos.valor}</b></p>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='m-1'>
                    <Col xs={12} sm={3}>
                        <p className="letratable">Registros procesados: <b>{nroRegistros}</b></p>
                    </Col>
                </Form.Group>

                <hr/>

                <Table className="tableexpand" striped responsive bordered hover size="sm">
                    <thead>
                    <tr>
                        {propsTableHead.map((ele, index) =>
                            <th className="letratable" key={index}>{ele}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {propsTableData.map((ele, index) =>
                        <tr key={index}>
                            {propsTableDataConfig.map((elem, inde) =>
                                <td className="letratable" key={inde}>{ele[elem]}</td>
                            )}
                            <td className="letratable">
                                {imprimir(ele)}
                            </td>
                        </tr>
                    )}

                    </tbody>
                    <tfoot>
                    {montosTotales && montosTotales.map((elemento, index) =>
                        <tr key={index}>
                            {index === 0 &&
                            <td colSpan={5} rowSpan={montosTotales.length + 1}>
                                <b>Total</b>
                            </td>
                            }
                            <td>
                                <b>{elemento.moneda}</b>
                            </td>
                            <td>
                                <b>{elemento.monto}</b>
                            </td>
                            <td colSpan={2}>
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
