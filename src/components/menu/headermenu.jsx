/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import logo from 'img/logo/logo-white.svg';
import avatar from 'img/iconsMenu/avatar.png';
import { obtenerUsersAction } from 'store/administrativo/userStore';
import { logout } from 'helpers/loginFuctions';
import './menu.css';
import { obtenerEstadosAction,obtenerTipoDocumentoAction } from 'store/globales/mixStore';
import { obtenerParametrosAction } from 'store/administrativo/parametroStore';

const HeaderMenu = ({title,subtitle}) => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.users.objecto)
    const history = useHistory()
    const [Nombre,setNombre]=useState(user.Nombre)
    const [Apellido,setApellido]=useState(user.apePat)

    useEffect(()=>{
        if(user.Nombre === undefined && localStorage.Nombre!== undefined && localStorage.idUsuario !== undefined && user.idUsuario === undefined){
            let objectUser = {
                Nombre:localStorage.Nombre,
                apePat:localStorage.apePat,
                apeMat:localStorage.apeMat,
                correo: localStorage.correo,
                accesos: JSON.parse(localStorage.accesos),
                idUsuario: localStorage.idUsuario,
             }
            dispatch(obtenerUsersAction(objectUser))
            setNombre(localStorage.Nombre)
            setApellido(localStorage.apePat)  
        }  
        dispatch(obtenerEstadosAction())
        dispatch(obtenerTipoDocumentoAction())
        dispatch(obtenerParametrosAction())  

    },[])

    const salir = () =>{
        let objectUser={}
        dispatch(obtenerUsersAction(objectUser))
        logout()
        history.push("/login");
    }
    
    return (
        <>
        {/* <TiempoSesion></TiempoSesion> */}
        <div className="bgmenu">
            <Row className="py-3 mx-0">
                <Col xs={12} sm={4} className="" >
                    <Link to="/">
                        <img  height="80px" className="pl-5" src={logo} alt="Logo"/>
                    </Link>
                </Col>
                {
                    (title !== undefined) ? 
                    <Col xs={12} sm={4} className="text-center mt-1">
                        <span className="headerMenuText spacing-title"> <strong>{title}</strong> </span>
                        <p className="spacing-subtitle text-white text-gillsans-light">{subtitle}</p>
                    </Col>
                    : 
                    <Col xs={12} sm={4} className="text-center mt-1">
                        <span className="headerMenuText spacing-title"> <strong>Bienvenido {Nombre}</strong> </span>
                        <p className="spacing-subtitle text-white text-gillsans-light">{subtitle}</p>
                    </Col>
                }
                
                <Col onClick={salir} xs={12} sm={4} className="text-right my-auto">
                    <img height="55px" src={avatar} alt="Logo"/>
                    <span className="pl-2 pr-5 text-white spacing-subtitle text-gillsans-light">{Nombre} {Apellido}</span>
                </Col>
            </Row>
        </div>
        <hr className="hrmenuheader" />
        </>
    );
}

export default HeaderMenu;