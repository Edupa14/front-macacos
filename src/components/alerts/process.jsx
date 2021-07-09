import React from 'react';
import procesando from 'img/procesando.svg'
import './alert.css'

const Process = () => {
    
    return (
        <>
            <div className="floate">
                <img className="my-float" height="20px" src={procesando} alt=""/>
            </div>
        </>
    );
}

export default Process;