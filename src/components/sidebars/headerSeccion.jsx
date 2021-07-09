import React from 'react';
import {Row } from 'react-bootstrap';
import printIcon from 'img/utils/printer.svg'
import excelIcon from 'img/utils/excel.svg'
import './sidebars.css'

const HeaderSeccion = () => {


    return (
        <>
            <Row className={`div-buttons-seccion justify-content-between py-auto `}>
                <button className="btn mr-2 buttonHeaderSeccion">
                    <img height="17px" className="m-1" src={printIcon} alt=""/>
                </button>
                <button className="btn mr-3 buttonHeaderSeccion">
                    <img height="17px" className="m-1" src={excelIcon} alt=""/>
                </button>
            </Row>
        </>
    );
}

export default HeaderSeccion;