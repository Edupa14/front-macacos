/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'
import TableValores from 'components/tables/tables'


const ModalValor = ({ abrirModal, dataForm , descrip}) => {
    const [lgShow, setLgShow] = useState(false)
    const [des, setDes] = useState({})
    const [nroRegistros, setnroRegistros] = useState(0)
    const [title] = useState('Detalles de los valores')
    const [propsTableDataConfig] = useState(
        ['descripcion', 'adicional', 'valor', 'fechaReg'])

    const [propsTableHead] = useState(
        ['Descripción', 'Observación', 'Valor', 'Fecha registro'])
    const [propsTableData, setPropsTableData] = useState([])

    useEffect(() => {
            setLgShow(true)
            setnroRegistros(dataForm.length)
            setPropsTableData(dataForm)
            setDes({ descripcion: descrip })
    }, [abrirModal])

    useEffect(() => {
            setLgShow(false)
            setnroRegistros(dataForm.length)
            setPropsTableData(dataForm)

    }, [])

    return (

        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            centered
        >
            <Modal.Body style={{ background: "#f8f8f8" }}>
                <Modal.Title>
                <p>{des.descripcion}</p>
                </Modal.Title>
                <TableValores size={"800"} propsTableDataConfig={propsTableDataConfig} propsTableData={propsTableData}
                    title={title} nroRegistros={nroRegistros} propsTableHead={propsTableHead}></TableValores>
            </Modal.Body>
        </Modal>

    );
}

export default ModalValor;