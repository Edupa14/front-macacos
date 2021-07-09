import React,{useEffect, useState}  from 'react';
import {Row } from 'react-bootstrap';
import editIcon from 'img/utils/edit.svg'
import './form.css'

const HeaderExterno = ({soloEdit,escritura, editar,tipoForm,cambioHeader}) => {
    const [estadoEdit,setEstadoEdit] = useState(true)
    

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
            <Row className={`borderExterno justify-content-end mb-2 ${escritura ?'':" d-none"} `}>
            
            
            {
                (soloEdit ===true || tipoForm ==="EDIT" ||  tipoForm ==="CANCEL") ? 
                    (estadoEdit) ?  <button onClick={editForm} className="btn mr-3 p-0 buttonHeaderForm">
                                        <img height="17px" className="m-1" src={editIcon} alt="editIcon" /> 
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

export default HeaderExterno;