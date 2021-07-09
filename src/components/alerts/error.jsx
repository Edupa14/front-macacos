import React from 'react';

const ErrorMessage = ({mensaje}) => {
    
    return (
        <>
            <p className="text-danger mb-0">
            {mensaje}
            </p>
        </>
    );
}

export default ErrorMessage;