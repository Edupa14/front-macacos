import React from 'react';
import {Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FolderActive from 'img/foldericons/folderactive.svg';
import './breadcrumbs.css'

const BreadcrumbnivelA = ({nivel1}) => {

    return (
        <div className="letter">
            <Breadcrumb>
 
                    <Link to="/" className="spacing-title text-gillsans-light" >
                    <img src={FolderActive} alt=""/> 
                    {nivel1}</Link>

            </Breadcrumb>
        </div>
    );
}
export default BreadcrumbnivelA;