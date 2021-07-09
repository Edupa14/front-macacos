import React,{useState}  from 'react';
import {Row } from 'react-bootstrap';
import clearIcon from 'img/utils/map-clear.svg'
import deleteIcon from 'img/utils/delete.svg'
import editIcon from 'img/utils/edit.svg'

const HeaderEntrada = () => {


    return (
        <>
            <Row className={`borderHeader justify-content-between mb-2 `}>
            <div>
                <button className="btn mr-1 buttonHeaderForm">
                    <img width="15px" alt=""/>
                </button>
            </div>

            </Row>
        </>
    );
}

export default HeaderEntrada;