import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { Col, Container, Row,Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import logo from 'img/login/logo-white.svg';
import AxiosClient from 'config/axios/axiosClient';
import { obtenerUsersAction } from 'store/administrativo/userStore';
import { login } from 'helpers/loginFuctions';
import alerta from 'helpers/alerts'
import { funcionLog } from 'helpers/log';
import * as yup from "yup";
import ErrorMessage from 'components/alerts/error';
import './login.css';


const Login = () => {
    const [formErrors, setFormErrors] = useState({});
    yup.setLocale({
        string: {
            email: 'Ingrese un email valido',
          },
    })
    const LoginSchema = yup.object().shape({
        correo: yup.string().email().required('El campo es requerido'),
        clave: yup.string().required('El campo es requerido')
      });
    const dispatch = useDispatch()
    const history = useHistory()

    const [inputValues, setInputValues] = useState({
        correo: '', clave: ''
      });

      async function validateForm() {
        let errores = {};
        try {
            const res = await LoginSchema.validate(inputValues, {abortEarly: false});
            setInputValues(res);
            errores = {}
            setFormErrors(errores);
        } catch (e) {
            
            e.inner.forEach(err => {
                errores[err.path] = err.message;
            });
            setFormErrors(errores);
        }
    } 
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
      };
    
    const submitLogin = async()=>{
        validateForm()
        let errores = formErrors
        if(Object.keys(errores).length === 0){
            try {
            let response = await AxiosClient.post('usuarios/login',inputValues)
                if(response.status === 200){
                    // if(response.data.ok === true){
                        dispatch(obtenerUsersAction(response.data.data))
                        login()
                        let datas = {};
                        datas.proceso = 'acceso inicio de sesion'
                        datas.url = 'login' 
                        funcionLog(datas);
                        history.push("/");
                    // }
                }else{
                        alerta("Correo o Contraseña incorrectos","error")
                    }
            } catch (error) {
                alerta("Correo o Contraseña incorrectos","error")
            }
        }
        
    }

    return (
        <Container className="loginbody" fluid>
            <Row className="pt-5">
                <Col xs={12} className="text-center pt-5">
                    <img className="imglogin" src={logo} alt="Logo" />
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="text-center mt-4">
                    <p className="plogin text-white text-gillsans-light spacing-title ">Inicio sesión</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="text-center">   
                    <input onChange={handleOnChange} className="logininput text-gillsans-light" type="text" name="correo" placeholder="Correo electrónico"></input><br />
                    {formErrors.correo ? <ErrorMessage mensaje= {formErrors.correo}></ErrorMessage> : null}
                </Col>
                <Col xs={12} className="text-center my-2">
                    <input onChange={handleOnChange} className="logininput text-gillsans-light" type="password" name="clave" placeholder="Contraseña"></input>
                    {formErrors.clave ? <ErrorMessage mensaje= {formErrors.clave}></ErrorMessage> : null}
                </Col>
            </Row>

            {/* <Row>
                <Col xs={12} className="text-center mt-4">
                    <div className="logindiv text">
                    <Link to="/" className="textLogin">
                        Olvide mi contraseña
                    </Link>
                    </div>
                </Col>
            </Row> */}
            <Row>
                <Col xs={12} className="text-center mt-4">
                    <Button onClick={submitLogin} variant="danger" className="loginbutton py-1 text-gillsans-bold"> Ingresar </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;