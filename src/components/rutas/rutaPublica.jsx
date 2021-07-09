import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from 'helpers/loginFuctions';

const RutaPublica = ({component: Component, restricted, ...rest}) => {

    return (

        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default RutaPublica;