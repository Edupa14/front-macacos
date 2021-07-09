import React,{useEffect, useState}  from 'react';
import {Row } from 'react-bootstrap';
import clearIcon from 'img/utils/map-clear.svg'
import editIcon from 'img/utils/edit.svg'
import './form.css'

const HeaderBanco = ({soloEdit,escritura,limpiar,eliminar,editar,tipoForm,cambioHeader}) => {
    const [estadoEdit,setEstadoEdit] = useState(true)

    const clearForm = () =>{
        editar("ADD")
        limpiar()
    }

    const deleteData = () =>{
        eliminar()
    }

    const editForm = () =>{
        editar("EDIT")
        setEstadoEdit(false)
    }

    const cancelEdit = () =>{
        editar("CANCEL")
        setEstadoEdit(true)
    }

    useEffect(()=>{
        setEstadoEdit(true)
    },[cambioHeader])
    return (
        <>
            <Row className={`borderHeader justify-content-between mb-2 ${escritura ?'':" d-none"} `}>
            {
                (soloEdit ===true)? '':
                <div>
                <button onClick={clearForm} className="btn ml-3 mr-2 p-0 buttonHeaderForm">
                    <img height="17px" className="m-1" src={clearIcon} alt=""/>
                </button>
                
                </div>
            }
            
            {
                (tipoForm ==="EDIT" ||  tipoForm ==="CANCEL") ? 
                    (estadoEdit) ?  <button onClick={editForm}  className="btn mr-3 p-0 buttonHeaderForm">
                                        <img height="17px" className="m-1" src={editIcon} alt=""/> 
                                    </button>      
                                : <button onClick={cancelEdit}  className="btn mr-3 p-0 buttonHeaderForm">
                                        <span className="m-1 mx-2">X</span>
                                    </button>
                : ''
            }  
            </Row>
        </>
    );
}

export default HeaderBanco;