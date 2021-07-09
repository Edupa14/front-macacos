import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const LinkTo = ({irHacia, text}) => {
    if(!irHacia) return <h5>Debes ingresar una dirección para utilzar este componente</h5>
    return ( 
        <Link to={irHacia}>
            <Button>Ir a {text}</Button>
        </Link>
     );
}
 
export default LinkTo;