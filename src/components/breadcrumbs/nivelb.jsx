import React from 'react';
import {Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Folder from 'img/foldericons/folder.svg';
import FolderActive from 'img/foldericons/folderactive.svg';
import Flecha from 'img/foldericons/arrow-rigth.svg';
import './breadcrumbs.css'

const BreadcrumbnivelB = ({nivel2}) => {

    return (
        <div className="letter">
            <Breadcrumb>
                    <Link to="/"  className="spacing-title text-gillsans-light mr-3" >
                        <img src={Folder} alt=""/> 
                        <span className="px-1">Inicio</span>  <img src={Flecha} alt=""/>
                    </Link>
               
                     <img src={FolderActive} alt=""/> 
                     <span className="px-1 spacing-title text-gillsans-light">{nivel2}</span>
                
            </Breadcrumb>
          
        </div>
    );
}
export default BreadcrumbnivelB;