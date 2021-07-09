import React from 'react';
import {Spinner} from 'react-bootstrap'

function Loading() {
    return (
        <div className="text-center mt-4">
            <Spinner animation="border" />         
        </div>
    );
}

export default Loading;