import React from "react";
import {Helmet} from "react-helmet";    

const HelmetComponent = ({etiquetas}) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{etiquetas.title}</title>
                <meta name="description" content={etiquetas.description}></meta>
            </Helmet>
           
        </>
    );
}
export default HelmetComponent;