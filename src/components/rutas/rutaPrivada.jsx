import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from 'helpers/loginFuctions';
import { RolesPermitidos } from 'helpers/protectedView';

const RutaPrivada = ({roles:Roles,component: Component, ...rest}) => {

    return (
        <Route {...rest} render={props => (
            isLogin() ?
                RolesPermitidos(Roles) ?
                <Component {...props} />
                :<Redirect to="/" />
            : <Redirect to="/login" />
        )} />
    );
};

export default RutaPrivada;