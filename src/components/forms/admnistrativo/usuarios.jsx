/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap'
import HeaderForm from 'components/forms/headerForm'
import setPermisosForm from 'helpers/permisosForm';
import ModalUsuario from 'components/modal/administrativo/ModalUsuario';
import { useSelector } from 'react-redux';
import alerta from 'helpers/alerts'
import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
import { textoMayusculas } from 'helpers/reusablesForms';
import { validarRepassword, validarPassword } from 'helpers/validations';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { trim } from 'jquery';

const FormularioUsuarios = ({ actualizarCambios, allRoles, dataForm, escritura, tipo, peticion }) => {
    yup.setLocale({
        string: {
            email: 'Ingrese un email válido',
        },
    })
    // const UserSchema = yup.object().shape({
    //     apePat: yup.string().required('El campo Apellido paterno es requerido'),
    //     apeMat: yup.string().required('El campo Apellido materno es requerido'),
    //     Nombre: yup.string().required('El campo Nombre es requerido'),
    //     nroDoc: yup.string().required('El campo Número de documento es requerido').min(8, 'Mínimo 8 dígitos'),
    //     Telefono: yup.string().required('El campo Teléfono es requerido').min(9, 'Mínimo 9 dígitos'),
    //     correo: yup.string().email().required('El campo Correo es requerido'),
    //     codRol: yup.string().required('El campo Perfil es requerido'),
    //     clave: yup.string().required('El campo Contraseña es requerido')
    // });

    const user = useSelector(store => store.users.objecto)
    const estadosStore = useSelector(store => store.mixed.estados)
    const tipoDocStore = useSelector(store => store.mixed.tipo_docs)
    const [tipoFormulario, setTipoFormulario] = useState(tipo)
    const [cambioHeader, setCambioHeader] = useState(false)
    const [modales, setModal] = useState(false)
    const [readAll, setReadAll] = useState(false)
    const [readOne, setReadOne] = useState(false)
    const [updates, setUpdates] = useState('')

    const [validated, setValidated] = useState(false);
    const [validatedPass, setValidatedPass] = useState(false);
    const [validateDOI, setValidateDOI] = useState({
        minLength: 8,
        maxLength: 8,
        pattern: '[0-9]{8}'
    });
    const [errorPass, setErrorPass] = useState({
        isInvalid: false,
        mensaje: 'Debes ingresar una contraseña'
    });
    const [errorPassRep, setErrorPassRep] = useState({
        isInvalid: false,
        mensaje: 'Debes ingresar una contraseña'
    });
    const [showPass, setShowPass] = useState('password');
    const [showPassRep, setShowPassRep] = useState('password');
    const [formUser, setFormUser] = useState(
        {
            tipDoc: "DNI",
            apePat: '',
            apeMat: '',
            correo: '',
            Nombre: '',
            Telefono: '',
            nroDoc: '',
            clave: '',
            idUsuario: undefined,
            fechaReg: ''
        })

    const initialForm = {
        apePat: '',
        apeMat: '',
        correo: '',
        Nombre: '',
        Telefono: '',
        nroDoc: '',
        tipDoc: 'DNI',
        clave: '',
        idUsuario: undefined,
        fechaReg: ''
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if(name==='tipDoc'){
            if(value === 'RUC'){
                setValidateDOI({...validateDOI, pattern:'[0-9]{11}', minLength: 11, maxLength: 11})
            } else if(value === 'DNI'){
                setValidateDOI({...validateDOI, pattern:'[0-9]{8}', minLength: 8, maxLength: 8})
            } else {
                setValidateDOI({...validateDOI, pattern:'[A-za-z0-9]{8,15}', minLength: 8, maxLength: 15})
            }
        }
        if (name === "nroDoc") value = textoMayusculas(value)
        setFormUser({
            ...formUser,
            [name]: value,
        });
    }

    const getDataUser = async () => {
        let result = await axiosClient.get(`usuario/id/${dataForm.idUsuario}`)
        return result.data.data
    }

    const clearForm = (data) => {
        setFormUser({ ...initialForm })
        if (data !== 1) {
            actualizarCambios()
        }
        setValidated(false)
        setValidatedPass(false)
        setErrorPass({ ...errorPass, isInvalid: false, mensaje: '' })
        setErrorPassRep({ ...errorPassRep, isInvalid: false, mensaje: '' })        
        setValidateDOI({...validateDOI, pattern:'[0-9]{8}', minLength: 8, maxLength: 8})
    }


    const deleteForm = () => {
        eliminarUsuario()
    }

    const editForm = (editTipo) => {
        setTipoFormulario(editTipo)
        
        setValidated(false)
        setErrorPass({ ...errorPass, isInvalid: false, mensaje: '' })
    }

    const eliminarUsuario = () => {
        setModal(!modales)
    }
    const cambiarContra = () => {
        setUpdates('updates')
    }
    const actualizarCambios2 = () => {
        actualizarCambios(true)
        clearForm(1)
    }
    const handleShowPass = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let tipo = (showPass === 'input' ? 'password' : 'input')
        setShowPass(tipo)
    }
    const handleShowPassRep = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let tipo = (showPassRep === 'input' ? 'password' : 'input')
        setShowPassRep(tipo)
    }
    const guardarFormulario = async (e) => {
        const form = e.currentTarget;
        e.preventDefault()
        e.stopPropagation()
        if (form.checkValidity() === false) {
            setValidated(true)
        } else {
            setValidated(false)
            try {
                if (tipoFormulario !== "ADD") setFormUser({ ...formUser, clave: 'asfdafdff', });
                let FORM = new FormData()
                FORM.append('codRol', formUser.codRol)
                FORM.append('nombre', formUser.Nombre)
                FORM.append('apePat', formUser.apePat)
                FORM.append('apeMat', formUser.apeMat)
                // FORM.append('razonSocial',formUser.razonSocial)
                FORM.append('numeroDoc', formUser.nroDoc)
                FORM.append('correo', formUser.correo)
                FORM.append('tipoDoc', formUser.tipDoc)
                FORM.append('telefono', formUser.Telefono)
                FORM.append('idUsuAct', user.idUsuario)
                FORM.append('tipTercero', 'NAT')
                if (tipoFormulario === "ADD") {
                    if (validarPassword(formUser.clave)) {                        
                        setValidated(false)
                        setErrorPass({ ...errorPass, isInvalid: false, mensaje: '' })
                        FORM.append('clave', formUser.clave)
                        FORM.append('idUsuReg', user.idUsuario)
                        let resp = await axiosClient.post('usuarios/crear', FORM)
                        if (resp.data.data.RSPTA !== -1) {
                            setTipoFormulario("ADD")
                            setUpdates('')
                            alerta("Usuario añadido exitosamente", "success")
                            actualizarCambios(true)
                            clearForm(1)
                        } else {
                            alerta("DOI o correo ya existen", "error")
                        }
                    } else {
                        setValidated(true)
                        setErrorPass({ ...errorPass, isInvalid: true, mensaje: 'Formato no válido, mínimo debe tener una mayúscula, una minúscula, un número, y 8 dígitos' })
                    }
        
                } else {
                    FORM.append('estado', formUser.estado) //estadoT ?
                    FORM.append('estadoT', formUser.estado) //estadoT ?
                    FORM.append('idUsuario', formUser.idUsuario)
                    const res = await axiosClient.put('usuario/actualizar', FORM)
                    if (res && res.status && res.status === 201) {
                        let respuesta = res.data.data
                        if (respuesta && respuesta.RSPTA === 0) {
                            setTipoFormulario("ADD")
                            setUpdates('')
                            alerta("Usuario editado exitosamente", "success")
                            actualizarCambios(true)
                            clearForm(1)
                        } else {
                            alerta("Hubo un error el usuario no existe", "error")
                        }
                    } else {
                        alerta("Hubo error al editar usuario", "error")
                    }

                }

            } catch (error) {
                alerta("Ocurrió un error inesperado, inténtelo nuevamente más tarde", "error")
            }

        }


    }

    useEffect(() => {
        async function loadUser() {
            let response = await getDataUser()
            if (response !== undefined) {
                if (response.idUsuario !== undefined) {
                    setTipoFormulario("CANCEL")
                    setFormUser(response)
                    setCambioHeader(!cambioHeader)
                }
            }
        }
        loadUser()
    }, [peticion])

    useEffect(() => {
        let permisos = setPermisosForm(escritura, tipoFormulario)
        setReadAll(permisos.readAll)
        setReadOne(permisos.readOne)
        setUpdates('')
    }, [tipoFormulario])

    const guardarPass = async (e) => {
        const form = e.currentTarget;
        e.preventDefault()
        e.stopPropagation()
        if (form.checkValidity() === false) {
            setValidatedPass(true)
        } else {
            let FORM = new FormData()
            // if (formUser.clavenueva === formUser.claverep && ![undefined, null, ''].includes(formUser.claverep)) {
            if (validarRepassword(formUser.clavenueva, formUser.claverep)) {
                if (validarRepassword(formUser.clavenueva, formUser.claverep) !== -1 && validarRepassword(formUser.clavenueva, formUser.claverep) !== -2) {
                    setValidatedPass(false)
                    setErrorPass({ ...errorPass, isInvalid: false, mensaje: '' })
                    setErrorPassRep({ ...errorPassRep, isInvalid: false, mensaje: '' })
                    FORM.append('clave', formUser.clavenueva)
                    FORM.append('idUsuAct', user.idUsuario)
                    FORM.append('idUsuario', formUser.idUsuario)
                    let res = await axiosClient.put('usuario/actualizar/contrasenia', FORM);                    
                    if (res && res.status && res.status === 201) {
                        let respuesta = res.data.data
                        if (respuesta && respuesta.RSPTA === 0) {
                            setTipoFormulario("CANCEL")
                            setUpdates('')
                            actualizarCambios(true)
                            setShowPassRep('password')
                            setShowPass('password')
                            formUser.clavenueva = ''
                            formUser.claverep = ''
                            alerta("Contraseña editada exitosamente", "success")
                        } else {
                            alerta("Hubo un error al cambiar contraseña", "error")
                        }
                    } else {
                        alerta("Hubo un error al cambiar contraseña", "error")
                    }                    
                } else {
                    setValidatedPass(true)
                    setErrorPass({ ...errorPass, isInvalid: true, mensaje: 'Formato no válido, mínimo debe tener una mayúscula, una minúscula, un número, y 8 dígitos' })
                }

            } else {
                setValidatedPass(true)
                setErrorPassRep({ ...errorPassRep, isInvalid: true, mensaje: 'Las contraseñas deben ser iguales' })
                setErrorPass({ ...errorPass, isInvalid: true, mensaje: 'Las contraseñas deben ser iguales' })
            }
        }

    }

    return (
        <div className="test-m" >
            <HeaderForm cambioHeader={cambioHeader} escritura={escritura} limpiar={clearForm} eliminar={deleteForm} editar={editForm} tipoForm={tipoFormulario}></HeaderForm>
            <Row>
                {/* <Col sm={3} className="marginFormLeft">
                    <div className="Elipse100">
                        <p className="textAddPhoto">Añadir foto</p>
                    </div>
                </Col> */}
                <Col sm={12} className="marginFormRight">
                    <Form onSubmit={guardarFormulario} noValidate validated={validated}>
                        <p className="mt-3 TitleLabel"> <strong> Datos  generales</strong></p>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                DOI
                                </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" as="select" disabled={readOne} value={formUser.tipDoc} onChange={handleChange} name="tipDoc" >
                                    {tipoDocStore.map(element =>
                                        <option key={element.Valor} value={element.Valor}>{element.Descripcion}</option>
                                    )}

                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='numeroDOI'>
                            <Form.Label column sm={5} >
                                Número DOI<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control required size="sm" readOnly={readOne} value={formUser.nroDoc} onChange={handleChange} name="nroDoc" type='text' minLength={validateDOI.minLength} maxLength={validateDOI.maxLength} pattern={validateDOI.pattern} placeholder="Número de documento" />
                                <Form.Control.Feedback type='invalid'>Debe ingresar número DOI válido</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Nombres<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control required size="sm" readOnly={readAll} value={formUser.Nombre} onChange={handleChange} name="Nombre" type="text" placeholder="Nombres" />
                                <Form.Control.Feedback type='invalid'>Debe ingresar nombres</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Apellido paterno<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control required size="sm" readOnly={readAll} value={formUser.apePat} onChange={handleChange} name="apePat" type="text" placeholder="Apellido paterno" />
                                <Form.Control.Feedback type='invalid'>Debe ingresar apellido paterno</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Apellido materno<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control required size="sm" readOnly={readAll} value={formUser.apeMat} onChange={handleChange} name="apeMat" type="text" placeholder="Apellido materno" />
                                <Form.Control.Feedback type='invalid'>Debe ingresar apellido materno</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Teléfono
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control size="sm" readOnly={readAll} value={formUser.Telefono} onChange={handleChange} name="Telefono" type="text" placeholder="Teléfono" />
                                <Form.Control.Feedback type='invalid'>Debe ingresar número de teléfono</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <p className="TitleLabel"> <strong> Datos de usuario </strong></p>
                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Perfil<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                {
                                    (allRoles !== undefined) ?
                                        <>
                                        <Form.Control required size="sm" as="select" value={formUser.codRol} onChange={handleChange} name="codRol" disabled={readAll} >
                                            <option value="">Seleccionar perfil</option>
                                            {
                                                allRoles.map((elemento, index) =>
                                                    <option value={elemento.Valor} key={index}>{elemento.Descripcion}</option>
                                                )
                                            }
                                        </Form.Control>
                                        <Form.Control.Feedback type='invalid'>Debe seleccionar un perfil</Form.Control.Feedback>
                                        </>
                                        : ''
                                }

                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                            <Form.Label column sm={5}>
                                Email<span className="required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control required size="sm" readOnly={readOne} value={formUser.correo} onChange={handleChange} name="correo" type="email" placeholder="Email" />
                                <Form.Control.Feedback type='invalid'>Debe ingresar un correo</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {(tipoFormulario !== "ADD") ?
                            <div>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={5}>
                                        Estado
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control size="sm" as="select" disabled={readAll} value={trim(formUser.estado)} onChange={handleChange} name="estado" >
                                            {estadosStore.map(element =>
                                                <option key={element.Valor} value={element.Valor}>{element.Descripcion}</option>
                                            )}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={5}>
                                        Fecha de registro<span className="required">*</span>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control size="sm" disabled={true} value={formUser.fechaReg} onChange={handleChange} name="fechaReg" type="text" placeholder="Fecha de registro" />
                                    </Col>
                                </Form.Group>
                            </div>
                            : <Form.Group as={Row} >
                                <Form.Label column sm={5}>
                                    Contraseña<span className="required">*</span>
                                </Form.Label>
                                <InputGroup as={Col} sm={7}>
                                    <Form.Control isInvalid={errorPass.isInvalid} required size="sm" readOnly={readAll} value={formUser.clave} onChange={handleChange} name="clave" type={showPass} placeholder="alfanumérica - min. 8 dígitos" />
                                    <InputGroup.Prepend>
                                        <Button className='px-2 py-0 btnIcon' onClick={handleShowPass} >{showPass === 'input' ? <EyeOutlined /> : <EyeInvisibleOutlined />}</Button>
                                    </InputGroup.Prepend>
                                    <Form.Control.Feedback type='invalid'>{errorPass.mensaje}</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        }
                        <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`}>
                            {(tipoFormulario === "ADD") ?
                                <Col sm={6} className=" border-acciones">
                                    <button type="submit" className="btn done-btn w-100" >Aceptar</button>
                                </Col> :
                                <>
                                    {(tipoFormulario === "EDIT") ?
                                        <Col sm={6} className="border-acciones">
                                            <button type="submit" className="btn done-btn w-100"  ><strong>Aceptar</strong></button>
                                        </Col>
                                        : <></>}
                                    {(tipoFormulario === "EDIT") ?
                                        <Col sm={6} className="  border-acciones">
                                            <div className="btn  delete-btn w-100" onClick={cambiarContra}>Cambiar contraseña</div>
                                        </Col>
                                        : <></>}
                                </>
                            }
                        </Form.Group>
                    </Form>
                    <ModalUsuario actualizarCambios={actualizarCambios2} abrirModal={modales} dataForm={formUser} limpiar={clearForm}></ModalUsuario>
                    <Form onSubmit={guardarPass} noValidate validated={validatedPass}>
                        {(updates === "updates") ?
                            <div>
                                <p className="TitleLabel"><strong> Cambiar Contraseña</strong></p>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={5}>
                                        Contraseña
                                    </Form.Label>
                                    <InputGroup hasValidation as={Col} sm={7}>
                                        <Form.Control isInvalid={errorPass.isInvalid} required size="sm" readOnly={readAll} value={formUser.clavenueva} onChange={handleChange} name="clavenueva" type={showPass} maxLength={16} placeholder="Alfanumérica - min. 8 dígitos" />
                                        <InputGroup.Prepend>
                                            <Button className='px-2 py-0 btnIcon' onClick={handleShowPass} >{showPass === 'input' ? <EyeOutlined /> : <EyeInvisibleOutlined />}</Button>
                                        </InputGroup.Prepend>
                                        <Form.Control.Feedback type='invalid'>{errorPass.mensaje}</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={5}>
                                        Repetir Contraseña
                                    </Form.Label>
                                    <InputGroup hasValidation as={Col} sm={7}>
                                        <Form.Control isInvalid={errorPassRep.isInvalid} required size="sm" readOnly={readAll} value={formUser.claverep} onChange={handleChange} name="claverep" type={showPassRep} maxLength={16} placeholder="Repetir Contraseña" />
                                        <InputGroup.Prepend>
                                            <Button className='px-2 py-0 btnIcon' onClick={handleShowPassRep} >{showPassRep === 'input' ? <EyeOutlined /> : <EyeInvisibleOutlined />}</Button>
                                        </InputGroup.Prepend>
                                        <Form.Control.Feedback type='invalid'>{errorPassRep.mensaje}</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Col sm={6} className={`ml-auto border-acciones ${escritura ? '' : "hiddenElement"}`}>
                                        <button type="submit" className="btn done-btn w-100"  ><strong>Aceptar</strong></button>
                                    </Col>
                                </Form.Group>
                            </div>
                            : ''
                        }
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default FormularioUsuarios;