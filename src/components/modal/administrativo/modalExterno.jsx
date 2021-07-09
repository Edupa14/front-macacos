/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'
import FormBancos from 'components/tables/administrativo/formBancos'
import iconError from 'img/datos.png'

const ModalExterno = ({ idDataForm, abrirModal, idDataBanc, razonS, sponsor, escritura, actualizarCambios }) => {

    const [verConfig, setVerConfig] = useState(false);
    const [dataForm, setDataForm] = useState({})
    const [spon, setSpon] = useState({})
    const [razon, setRazon] = useState({})

    useEffect(() => {
        setDataForm({ idSponsor: idDataForm })
        setSpon({ razonSocial: sponsor })
        setRazon({razonSoci: razonS})
        setVerConfig(true)
    }, [abrirModal])

    useEffect(() => {
        setVerConfig(false)
    }, [])

    return (
        <Modal
            size='lg'
            show={verConfig}
            onHide={() => setVerConfig(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Body style={{ background: "#f8f8f8" }}>

                {
                    (dataForm.idSponsor === undefined) ?
                        <>
                            <img src={iconError} alt="img" style={{ margin: "5% 25%", width: "50%", height: "30%" }} />
                            <h3 style={{ width: "100%", height: "20%", margin: "0% 23%" }}>No se han encontraron resultados</h3>
                            <h6 style={{ width: "100%", height: "20%", margin: "0% 20%", color: "#ababab" }}>Selecciona un sponsor o prueba con otro para visualizar los datos</h6>
                            <br />
                        </> :
                        <>
                            <Modal.Title id="example-custom-modal-styling-title">
                                {(sponsor !== undefined && razonS === undefined)?<><p>{spon.razonSocial}</p></>:<><p>{razon.razonSoci}</p></>}
                            </Modal.Title>
                            <FormBancos dataForm={dataForm} actualizarCambios={actualizarCambios} escritura={escritura} tipo={'ADD'} size={"800"}></FormBancos>
                        </>
                }

            </Modal.Body>
        </Modal>
    );
}
export default ModalExterno;