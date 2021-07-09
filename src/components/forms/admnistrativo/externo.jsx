
/* eslint-disable react-hooks/exhaustive-deps */

import axiosClient from 'config/axios/axiosClient';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Tab, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderForm from 'components/forms/headerForm'
import setPermisosForm from 'helpers/permisosForm';
import { useSelector } from 'react-redux';
import alerta, { alertaEliminar } from 'helpers/alerts'
import * as yup from "yup";
import AxiosClient from 'config/axios/axiosClient'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from 'components/alerts/error';
import { textoMayusculas } from 'helpers/reusablesForms';
import clearIcon from 'img/utils/map-clear.svg';
import deleteIcon from 'img/utils/delete.svg';
import iconUser from 'img/sponsors/banco.svg'
import editIcon from 'img/utils/edit.svg'
import ModalExterno from 'components/modal/administrativo/modalExterno'
import adds from 'img/utils/map-clear.svg'
import rem from 'img/utils/delete.svg';
import '../form.css'


const FormularioUsuarios = ({ actualizarCambios, dataForm, escritura, tipo, peticion }) => {
    yup.setLocale({
        string: {
            email: 'Ingrese un email valido',
        },
    })
    const UserSchema = yup.object().shape({
        // direccion: yup.string().required('El campo dirección es requerido'),
        // telefono: yup.string().required('El campo Teléfono es requerido').min(9, 'Minimo 9 digitos'),
        // correo: yup.string().email().required('El campo Correo es requerido'),
        // Ruc: yup.string().required('El campo Número de documento es requerido').min(8, 'Mínimo 8 dígitos'),
        // razonSocial: yup.string().required('El campo razon social es requerido'),
        // tipDoc: yup.string().required('El campo tipo documento es requerido'),
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(UserSchema)
    });
    const user = useSelector(store => store.users.objecto)
    const [tipoFormulario, setTipoFormulario] = useState(tipo)
    const [readAll, setReadAll] = useState(false)
    const [readOne, setReadOne] = useState(false)
    const [dataFormularioPro, setDataFormularioPro] = useState({})
    const [cambioHeader, setCambioHeader] = useState(false)
    const [habilitar, setHabilitar] = useState(false)
    const tipoDocStore = useSelector(store => store.mixed.tipo_docs)
    const [indexRepresentantes, setIndexRepresentantes] = useState(0)
    const [indexProveedor, setIndexProveedor] = useState(0)
    const [formRepresentante, setFormRepresentante] = useState([])
    const [formProveedor, setFormProveedor] = useState([])
    const [labelConf, labelConfiguracion] = useState([])
    const [formConfiguracion, setFormConfiguracion] = useState({})
    const [inputTipos, setinputTipos] = useState({})
    const [nombre, setNombre] = useState('')
    const [inputFields, setInputFields] = useState([
        //Aqui llamare al listado para editar conf del producto // combode configraciones otro state    
    ]);
    const [key, setKey] = useState('general')

    //SPONSOR
    const [dataPrograma, setDataPrograma] = useState([])
    const [datas, setDatas] = useState([])
    const [proveedor, setProveedor] = useState([])
    const [codPRogramas, setCodPrograma] = useState('')
    const [codigo, setCodigo] = useState([])
    const [estadoEdit, setEstadoEdit] = useState(true)
    const [configuracion, setConfiguracion] = useState([])
    const [configuracions, setDataConfiguracion] = useState([])
    const [provedoresId, setProvedores] = useState({})
    const [ocultar, setOcultar] = useState(true)
    const [NoEscribir, setEscribir] = useState(true)
    const [objeto, setObjeto] = useState({})
    const [idTercero, setIdTercero] = useState([])
    const [idSponsor, setIdSponsor] = useState(0)
    const [pro, setPro] = useState('')
    const [ter, setTer] = useState({
        nombre: '',
        apeMat: '',
        apePat: '',
        correo: '',
        tipDoc: '',
        nroDoc: '',
        telefono: ''
    })
    //-------
    const [modales, setModal] = useState(false)
    const [modales2, setModal2] = useState(false)
    const [formUser, setFormUser] = useState(
        {
            correo: '',
            telefono: '',
            nroDoc: '',
            razonSocial: '',
            direccion: '',
            cci: '',
            ctaBanc: '',
            tipCtaBan: '',
            codBanco: '',
            codMoneda: ''
        })

    const initialForm = {
        correo: '',
        telefono: '',
        nroDoc: '',
        razonSocial: '',
        direccion: ''
    }
    const initialFormRepresentante = [{
        correo: '',
        telefono: '',
        nroDoc: '',
        nombre: '',
        apePat: '',
        apeMat: '',
        tipDoc: ''
    }]

    const initialFormProveedor = {
        tipDoc: '',
        Ruc: '',
        razonSocial: '',
        direccion: '',
        correo: '',
        telefono: ''
    }

    const initialProveedor = {
        nombre: '',
        apeMat: '',
        apePat: '',
        correo: '',
        tipDoc: '',
        nroDoc: '',
        telefono: ''
    }

    const initialFormProv = {
        tipDoc: '',
        Ruc: '',
        razonSocial: '',
        direccion: '',
        correo: '',
        telefono: ''
    }

    const dataConfiguracion = async () => {
        let conf = {};
        conf.idPadre = 0;
        conf.etiqueta = "CONFIGURACIÓN";
        conf.estado = 'ACT'
        let result = await axiosClient.post(`parametro/listar`, conf)
        
        setDataConfiguracion(result.data.data);
    }

    const proveedorFull = async (value) => {
        if (value > 0) {
            let conf = {};
            conf.idSponsor = value;
            conf.estado = 'ACT'
            let result = await axiosClient.post(`/sponsors/proveedores/id`, conf)
            setProvedores(result.data.data);
            setIdTercero(result.data.data.idTercero)
            setObjeto(result.data.data);
            setFormProveedor(result.data.data.responsables)
        } else {
            setProvedores({ ...initialFormProveedor })
            setObjeto({ ...initialFormProv })
            setFormProveedor([])
        }
        
    }

    const handleChangeProvedor = async (e) => {
        let { name, value } = e.target;
        if (name === "proveedores") {
            proveedorFull(value)
            setIdSponsor(value)
        }
    }

    const handleChangeSponsor = (e) => {
        let { name, value } = e.target;
        if (name === "nroDoc") value = textoMayusculas(value)
        setFormUser({
            ...formUser,
            [name]: value,
        });
        setObjeto({
            ...objeto,
            [name]: value
        })
        setCodigo(value)
        getConfiguracion(value)
        let index = e.target.selectedIndex;
        if (index) {
            if (e.target.options[index].text === 'Seleccionar producto') {
                setOcultar(true)
            } else {
                setOcultar(false)
            }
        }

    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        //getListarPrograma(value)
        if (name === 'conf') {

            let arreglovalue = []
            let cadena = e.target.value
            arreglovalue = cadena.split(',')
            if (arreglovalue[1] !== 'null') {
                setinputTipos(arreglovalue[1])
            } else {
                setinputTipos('null')
            }
            let index = e.target.selectedIndex;
            labelConfiguracion(e.target.options[index].text);
            setFormConfiguracion(arreglovalue[0]);
        } else {
            if (name === "nroDoc") value = textoMayusculas(value)
            setFormUser({
                ...formUser,
                [name]: value,
            });
        }

    }

    const handleSubmitConfig = async (e) => {
        e.preventDefault();
        inputFields.forEach((objeto) => {
            objeto.idUsuario = localStorage.idUsuario
        })
        let response = await axiosClient.post('/sponsors/config', inputFields)

        if (response !== undefined) {

            alerta("Configuracion editado exitosamente", "success")
            clearFormConfig()
            getCodProducto(codPRogramas)
            getProveedor(codPRogramas)
            setOcultar(true)
        } else {
            alerta("Configuracion no editada", "error")
        }
    }

    const handleChangeRepresentante = (e, index) => {
        let { name, value } = e.target;
        const array = [...formRepresentante];
        array[index][name] = value
        setFormRepresentante(array);
    }

    const handleChangeRepresentanteNuevo = (e) => {
        let { name, value } = e.target;
        const array = [...formRepresentante];
        array[0][name] = value
        setFormRepresentante(array);
    }

    const handleChangeProveedor = (e, index) => {
        let { name, value } = e.target;
        const array = [...formProveedor];
        array[index][name] = value
        setFormProveedor(array);
    }

    const handleChangeProveedorNuevo = (e) => {
        let { name, value } = e.target;

        // array[0][name] = value
        // setFormProveedor(array);
        setTer({
            ...ter,
            [name]: value,
        });
    }

    const getConfiguracion = async (codProducto) => {
        let config = {}
        config.idSponsors = dataForm.idSponsor
        config.estado = 'ACT'
        config.producto = codProducto
        let response = await axiosClient.post(`sponsors/listConfig`, config)
        let responses = response.data.data
        let inputs = []
        if (responses.length > 0) {
            if (responses !== undefined) {
                responses.forEach((data) => {
                    setTipoFormulario("CANCEL") // cambiarlo a cancel despues
                    let input = {
                        codProducto: data.codProducto, idParametro: data.idParametro,
                        valor: data.valor, labels: data.configuracion, idSponsor: data.idSponsor, tipoInput: data.tipoInput
                    }
                    inputs.push(input);
                })
                setInputFields(inputs);
            }
        } else {
            setInputFields(inputs);
        }
        setConfiguracion(response.data.data);
    }

    const changeRepresentante = (e) => {
        let { value } = e.target;
        setIndexRepresentantes(value)

    }

    const changeProveedor = (e) => {
        let { value } = e.target;
        setIndexProveedor(value)
    }

    const getDataUser = async () => {
        if (dataForm.Ruc !== undefined) {
            let result = await axiosClient.post(`/sponsors/proveedores/id`,dataForm)
            return result.data.data
        }

    }

    const BuscarSponsor = async (e) => {
        e.preventDefault();
        if (formUser.nroDoc === objeto.Ruc) {
            alerta('El proveedor no puede ser el mismo sponsor seleccionado actualmente', 'error')
        } else {
            let response = await axiosClient.get(`sponsors/ruc/${objeto.Ruc}`)
            if (response.data.ok === true) {
                let obj = response.data.data;
                setObjeto(obj);
            }

            if (response.data.data === "NO HAY RUC") {
                //setSponsor({correo: '', razonSocial:''})
            }
        }
    }
    const getProveedor = async (codPrograma) => {
        let config = {}
        config.idSponsor = dataForm.idSponsor
        config.estado = 'ACT'
        config.codPrograma = codPrograma
        let result = await axiosClient.post(`/sponsors/proveedores`, config)
        setProveedor(result.data.data);
    }

    // const getDataUserSponsor = async () => {
    //     let result = await axiosClient.get(`sponsors/ruc/${dataForm.Ruc}`)

    //     return result.data.data
    // }


    const cancelarAdd = () => {
        clearForm()
        setTipoFormulario("ADD")
        actualizarCambios()
    }

    const cacelarProd = () => {
        //clearForm()
        setTipoFormulario("CANCEL")
        proveedorFull(idSponsor)
        setHabilitar(true)
        getProveedor(codPRogramas)

    }
    // useEffect(() => {
    //     async function loadUser() {
    //         let response = await getDataUserSponsor()
    //         let arreglo = []
    //         if (response !== undefined) {
    //             if (response.nroDoc !== undefined) {
    //                 setTipoFormulario("ADD")
    //                 setNombre('')
    //                 setDataPrograma(arreglo)
    //                 clearFormSponsorPro()
    //                 getListarPrograma(response.idSponsor)
    //                 setFormRepresentante(response.responsables)
    //                 setProvedores({ ...initialFormProveedor })
    //                 setObjeto({ ...initialFormProv })
    //                 clearFormConfig()
    //             }
    //         }
    //     }
    //     loadUser()
    //     setKey('general')
    // }, [peticion])

    useEffect(() => {
        dataConfiguracion()
        //setBool(true)
    }, [])

    const clearForm = () => {
        setFormUser({ ...initialForm })
        setFormRepresentante(initialFormRepresentante)
    }
    const clearFormSponsor = () => {
        let arreglo = []
        setProvedores({ ...initialFormProveedor })
        setObjeto({ ...initialFormProv })
        setFormProveedor(arreglo)
        setProveedor(arreglo)
    }

    const clearFormSponsorPro = () => {
        let arreglo = []
        setFormProveedor(arreglo)
    }

    const clearFormConfig = () => {
        let arreglo = []
        setCodigo(arreglo)
        setConfiguracion(arreglo)
        setDatas(arreglo)
        setProveedor(arreglo)
        setInputFields(arreglo);
        setEscribir(true)
        formUser.producto = null
    }
    const añadirRep = () => {
        setFormRepresentante(initialFormRepresentante)
        setTipoFormulario("ADDS")
        setHabilitar(false)
    }

    const añadirProvedor = () => {
        let arreglo = []
        setTer(initialProveedor)
        setFormProveedor(arreglo)
        setTipoFormulario("ADDS")
        setHabilitar(false)
    }

    const añadirPro = () => {
        clearFormSponsor()
        setTipoFormulario("ADD")
    }
    const eliminarContactoProv = async () => {
        if (formProveedor[indexProveedor].idTercero !== undefined) {
            let eliminado = await alertaEliminar()
            if (eliminado) {
                let result = await axiosClient.delete(`tercero/eliminar/${formProveedor[indexProveedor].idTercero}`)
                if (result.data.data.RSPTA === 0) {
                    alerta("Contacto eliminado correctamente", "success")
                    clearForm()
                    setTipoFormulario("EDIT")
                    actualizarCambios()
                    clearFormSponsorPro()
                } else {
                    alerta("Contacto no pudo eliminarse", "error")
                }
            }
        } else {
            alerta("Este sponsor aun no tiene responsables", "error")
        }

    }

    const eliminarRep = async () => {
        if (formRepresentante[indexRepresentantes].idTercero !== undefined) {
            let eliminado = await alertaEliminar()
            if (eliminado) {
                let result = await axiosClient.delete(`tercero/eliminar/${formRepresentante[indexRepresentantes].idTercero}`)
                if (result.data.data.RSPTA === 0) {
                    alerta("Responsable eliminado correctamente", "success")
                    clearForm()
                    setTipoFormulario("ADD")
                    actualizarCambios()
                } else {
                    alerta("Responsable no pudo eliminarse", "error")
                }
            }
        } else {
            alerta("Este sponsor aun no tiene responsables", "error")
        }

    }

    const getListarPrograma = async (idSponsor) => {
        let dataParametro = {};
        dataParametro.idSponsor = dataForm.idSponsor;
        dataParametro.estado = 'ACT'
        let response = await AxiosClient.post('sponsors/listPrograma', dataParametro)
        let rpta = undefined
        if (response.data.ok === true) {
            rpta = response.data.data
            setDataPrograma(rpta);
        }
    }

    const getCodProducto = async (valor) => {
        let dataParametro = {};
        dataParametro.idSponsor = dataForm.idSponsor;
        dataParametro.estado = 'ACT'
        dataParametro.codPrograma = valor
        let response = await AxiosClient.post('sponsors/listPrograma', dataParametro)
        let rpta = undefined
        if (response.data.ok === true) {
            rpta = response.data.data
            setDatas(rpta);
        }
    }

    const handleChangePro = (e) => {
        const { name, value } = e.target;
        getCodProducto(value)
        getProveedor(value)
        setCodPrograma(value)
        setDataFormularioPro({
            ...dataFormularioPro,
            [name]: value,
        });
        setPro(value)
        if (value === 'FIVE') {
            setNombre('Compradores')
        }
        if (value === 'FICO') {
            setNombre('Proveedores')
        }
        // let index = e.target.selectedIndex;
        // if (name === 'valor') {
        //     setDatas({
        //         ...datas,
        //         programa: e.target.options[index].text
        //     });
        // }
    }

    const handleAddFields = async () => {
        let validar = 0;
        inputFields.forEach((elemento) => {
            if (labelConf === elemento.labels) {
                validar++;
            }
        })
        if (labelConf !== 'Seleccionar configuración') {
            if (validar === 0) {
                if (labelConf.length > 0) {
                    setInputFields([...inputFields, {
                        codProducto: datas[0].codProducto, idParametro: formConfiguracion,
                        valor: '', labels: labelConf, idSponsor: configuracion[0].idSponsor, tipoInput: inputTipos
                    }])
                } else {
                    alerta("Debe elegir una configuracion", "error")
                }

            } else {
                alerta("Configuracion ya se encuentra listado", "error")
            }
        } else {
            alerta("Debe elegir una configuracion", "error")
        }


    }

    const editForm = (editTipo) => {
        setTipoFormulario(editTipo)
        setEscribir(false)
    }

    const validarRepresentantes = (array) => {
        let rptaForm = false
        if (array.length === 0) {
            let rptas = array.map(element => {
                return [undefined, null, ''].includes(element.correo) || [undefined, null, ''].includes(element.telefono) || [undefined, null, ''].includes(element.nombre)
            })
            rptaForm = rptas.includes(true)

        } else {
            return rptaForm
        }


    }


    const guardarFormulario = async (e) => {
        let rptaForm = validarRepresentantes(formRepresentante)
        if (rptaForm) {
            alerta('Llenar los campos correo, telefono y nombres de todos los representantes con un formato correcto', 'error')
        } else {

            let FORM = new FormData()
            FORM.append('idUsuAct', user.idUsuario)
            FORM.append('idTercero', formUser.idTercero)
            FORM.append('telefono', formUser.telefono)
            FORM.append('correo', formUser.correo)
            FORM.append('nroDoc', formUser.nroDoc)
            FORM.append('direccion', formUser.direccion)
            FORM.append('razonSocial', formUser.razonSocial)
            FORM.append('tipoCuenta', formUser.tipCtaBan)
            FORM.append('banco', formUser.codBanco)
            FORM.append('moneda', formUser.codMoneda)
            FORM.append('cci', formUser.cci)
            FORM.append('idCtaBan', formUser.idCtaBan)
            FORM.append('cuentaInterna', formUser.ctaBanc)
            FORM.append('idSponsor', formUser.idSponsor)
            if (tipoFormulario !== "ADD" && tipoFormulario !== "ADDS") {
                await axiosClient.put('tercero/actualizar', FORM)

                // let correoF = '';
                // let valida = 0;
                formRepresentante.forEach(async (element) => {
                    element.idUsuAct = user.idUsuario
                    await axiosClient.put('tercero/actualizar', element)
                    return false;
                })

                alerta("Usuario editado exitosamente", "success")
                clearForm()
                setTipoFormulario("ADD")
                actualizarCambios()
            } else if (tipoFormulario === "ADDS") {
                // let correoF = '';
                // let valida = 0;
                let tercero = {}
                formRepresentante.forEach(async (element) => {
                    element.idUsuAct = user.idUsuario
                    tercero.tipTercero = 'NAT'
                    tercero.nombre = element.nombre
                    tercero.apePat = element.apePat
                    tercero.apeMat = element.apeMat
                    tercero.numeroDoc = element.nroDoc
                    tercero.correo = element.correo
                    tercero.tipDoc = element.tipDoc
                    tercero.telefono = element.telefono
                    tercero.idPadre = formUser.idTercero
                    tercero.idUsuAct = user.idUsuario
                    tercero.idUsuReg = user.idUsuario
                    await axiosClient.post('tercero/crear', tercero)
                    return false;
                })
                alerta("Responsable creado exitosamente", "success")
                clearForm()
                setTipoFormulario("EDIT")
                actualizarCambios()
            }
        }

    }


    const guardarProveedor = async (e) => {
        let rptaForm = validarRepresentantes(formProveedor)
        if (rptaForm) {
            alerta('Llenar los campos correo y telefono de todos los representantes con un formato correcto', 'error')
        } else {

            let prov = {}
            prov.idUsuAct = user.idUsuario
            prov.idTercero = idTercero
            prov.telefono = objeto.telefono
            prov.correo = objeto.correo
            prov.nroDoc = objeto.Ruc
            prov.direccion = objeto.direccion
            prov.razonSocial = objeto.razonSocial
            prov.idSponsor = objeto.idSponsor
            if (tipoFormulario !== "ADD" && tipoFormulario !== "ADDS") {
                await axiosClient.put('tercero/actualizar', prov)
                formProveedor.forEach(async (element) => {
                    element.idUsuAct = user.idUsuario
                    await axiosClient.put('tercero/actualizar', element)
                    return false;
                })

                alerta("Usuario editado exitosamente", "success")
                //clearForm()
                setTipoFormulario("CANCEL")
                actualizarCambios()
            } else if (tipoFormulario === "ADDS") {
                let provee = {}
                provee.tipTercero = 'NAT'
                provee.nombre = ter.nombre
                provee.apePat = ter.apePat
                provee.apeMat = ter.apeMat
                provee.numeroDoc = ter.nroDoc
                provee.correo = ter.correo
                provee.tipDoc = ter.tipDoc
                provee.telefono = ter.telefono
                provee.idPadre = idTercero
                provee.idUsuAct = user.idUsuario
                provee.idUsuReg = user.idUsuario
                if (provee.nombre === '' && provee.apePat === '' && provee.apeMat === '' && provee.correo === '' && provee.telefono === '') {
                    alerta("Error, no puedes ingresar datos vacios", "error")
                } else {
                    if (provee.nombre === '' || provee.apePat === '' || provee.apeMat === '' || provee.correo === '' || provee.telefono === '') {
                        alerta("Error, todos los datos son obligatorios", "error")
                    } else {
                        await axiosClient.post('tercero/crear', provee)

                        alerta("Responsable creado exitosamente", "success")
                       // clearForm()
                        setTipoFormulario("CANCEL")
                        actualizarCambios()
                        return false;
                    }
                }
            }
        }

    }

    const registrarProv = async () => {

        let tercero = {}
        tercero.idUsuAct = user.idUsuario
        tercero.idTercero = idTercero
        tercero.telefono = objeto.telefono
        tercero.correo = objeto.correo
        tercero.codPrograma = pro
        tercero.tipoDoc = objeto.tipDoc
        tercero.numeroDoc = objeto.Ruc
        tercero.direccion = objeto.direccion
        tercero.razonSocial = objeto.razonSocial
        tercero.idUsuReg = user.idUsuario
        tercero.idSponsor = formUser.idSponsor
        if (tercero.tipoDoc === '' && tercero.telefono === '' && tercero.numeroDoc === '' && tercero.razonSocial === '' && tercero.direccion === '') {
            alerta("Error, no puedes ingresar datos vacios", "error")
        } else {
            if (tercero.tipoDoc === '' || tercero.telefono === '' || tercero.numeroDoc === '' || tercero.razonSocial === '' || tercero.direccion === '') {
                alerta("Error, todos los datos son obligatorios", "error")
            } else {
                if(objeto.idSponsor > 0){
                    tercero.idSponsorExiste = objeto.idSponsor
                    tercero.numeroDoc = objeto.nroDoc
                    tercero.idTercero = objeto.idTercero
                }else{
                    tercero.idSponsorExiste = 0
                }
                await axiosClient.post('/sponsor/tercero/crear', tercero)
                alerta("Responsable creado exitosamente", "success")
                clearForm()
                setTipoFormulario("CANCEL")
                getProveedor(codPRogramas)
                actualizarCambios()
            }
        }
    }

    useEffect(() => {
        async function loadUser() {
            let response = await getDataUser()
            if (response !== undefined) {
                if (response.nroDoc !== undefined) {
                    setTipoFormulario("CANCEL")
                    setNombre('')
                    setDataPrograma([])
                    clearFormSponsorPro()
                    getListarPrograma(response.idSponsor)
                    setFormUser(response)
                    setFormRepresentante(response.responsables)
                    setCambioHeader(!cambioHeader)
                    setHabilitar(true)
                    setProvedores({ ...initialFormProveedor })
                    setObjeto({ ...initialFormProv })
                    clearFormConfig()
                }
            }
        }
        loadUser()
        setKey('general')
    }, [peticion])

    const abrirModal = () => {
        setModal(!modales)
    }

    const abrirModal2 = () => {
        setModal2(!modales2)
    }

    const deleteForm = async () => {
        let eliminado = await alertaEliminar()
        if (eliminado) {
            eliminarProveedor()
        }
    }

    const eliminarProveedor = async () => {
        let idSponsor = provedoresId.idSponsor
        if (idSponsor !== undefined) {
            await axiosClient.delete(`/sponsors/proveedores/estado/${idSponsor}`)
            alerta("Proveedor eliminado exitosamente", "success")
            clearFormSponsor()

        }
    }

    useEffect(() => {
        let permisos = setPermisosForm(escritura, tipoFormulario)
        setReadAll(permisos.readAll)
        setReadOne(permisos.readOne)
    }, [tipoFormulario])

    const handleEdit = () => {
        editForm("EDIT")
        setEstadoEdit(false)
        setEscribir(false)
    }
    const handleCancel = () => {
        editForm("CANCEL")
        setEstadoEdit(true)
        setEscribir(true)
    }

    useEffect(() => {
        setEstadoEdit(true)
    }, [cambioHeader])

    const handleChangeInput = (index, e) => {
        const values = [...inputFields];
        values[index][e.target.name] = e.target.value;
        setInputFields(values);
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }
    const handleChangeSwitch = (index, e) => {
        const values = [...inputFields];
        if (e.target.checked === false) {
            values[index][e.target.name] = 'false'
        } if (e.target.checked === true) {
            values[index][e.target.name] = true
        }
        setInputFields(values);
    }
    const handleChangeChk = (index, e, valor) => {
        const values = [...inputFields];
        if (e.target.checked === true) {
            values[index][e.target.name] = valor
        }
        setInputFields(values);
    }

    const funciones = { handleChangeInput, handleRemoveFields, handleChangeSwitch, handleChangeChk }

    return (
        <>
            <ModalExterno abrirModal={modales2} razonS={objeto.razonSocial} actualizarCambios={actualizarCambios} idDataForm={objeto.idSponsor} escritura={escritura} idDataBanc={dataForm.idCtaBan} sponsor={dataForm.razonSocial}></ModalExterno>

            <ModalExterno abrirModal={modales} actualizarCambios={actualizarCambios} idDataForm={dataForm.idSponsor} idTercero={idTercero} escritura={escritura} idDataBanc={dataForm.idCtaBan} sponsor={dataForm.razonSocial}></ModalExterno>
            {/* <HeaderExterno soloEdit={true} cambioHeader={cambioHeader} escritura={escritura} limpiar={clearForm}  editar={editForm} tipoForm={tipoFormulario}></HeaderExterno> */}

            <Tab.Container id="left-tabs-example" activeKey={key} onSelect={(k) => setKey(k)}>
                <Row className={`borderExterno`}>
                    <Col sm={10} className="pr-0">
                        <Nav variant="pills" className='navForm' >
                            <Nav.Item >
                                <Nav.Link name='gen' eventKey="general"  >Datos generales</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mx-2">
                                <Nav.Link  name='config' eventKey="config" >Configuración</Nav.Link>
                            </Nav.Item>
                            {(nombre !== '') ?
                                <Nav.Item>
                                    <Nav.Link  name='proveedoress' eventKey="proveedores">{nombre}</Nav.Link>
                                </Nav.Item>
                                : ''}

                        </Nav>
                    </Col>
                    <Col sm={2}>
                        <Row className={`justify-content-end mb-2 ${escritura ? '' : " d-none"} `}>
                            <button onClick={() => abrirModal()} className="btn mr-3 p-0 buttonHeaderForm">
                                <img height="17px" className="m-1" src={iconUser} alt="img" />
                            </button>
                            {
                                (tipoFormulario === "EDIT" || tipoFormulario === "CANCEL") ?
                                    (estadoEdit) ? <button onClick={handleEdit} className="btn mr-3 p-0 buttonHeaderForm">
                                        <img height="17px" className="m-1" src={editIcon} alt="img" />
                                    </button>
                                        : <button onClick={handleCancel} className="btn mr-3 p-0 buttonHeaderForm">
                                            <span className="m-1 mx-2">X</span>
                                        </button>
                                    : ''
                            }
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Tab.Content>
                            <Tab.Pane eventKey="general" >
                                <Row className="mx-5 px-5">
                                    <Form className="w-100" onSubmit={handleSubmit(guardarFormulario)}>
                                        <Col sm={12}>
                                            <p className="mt-5 TitleLabel"> <strong>Datos del Sponsor (Cliente)</strong></p>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4}>DOI</Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control size="sm" as="select" disabled={readOne} value={formUser.tipDoc} onChange={handleChange} name="tipDoc" >
                                                        {tipoDocStore.map(element =>
                                                            <option key={element.Valor} value={element.Valor}>{element.Descripcion}</option>
                                                        )}

                                                    </Form.Control>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4}>
                                                    Número DOI
                                                </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control size="sm" readOnly={readOne} disabled={readOne} value={formUser.nroDoc} onChange={handleChange} name="nroDoc" placeholder="Documento oficial de identidad"></Form.Control>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4} >
                                                    Razon social<span className="required">*</span>
                                                </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control size="sm" readOnly={readOne} value={formUser.razonSocial} onChange={handleChange} name="razonSocial" type="text" placeholder="Razón Social" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4}>
                                                    Dirección
                                                </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control ref={register} size="sm" readOnly={readAll} value={formUser.direccion} onChange={handleChange} name="direccion" type="text" placeholder="Dirección" />
                                                    <ErrorMessage mensaje={errors.direccion?.message}></ErrorMessage>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4}>
                                                    Correo <span className="required">*</span>
                                                </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control ref={register} size="sm" readOnly={(tipoFormulario === 'ADD') ? false : true} value={formUser.correo} onChange={handleChange} name="correo" type="email" placeholder="Correo Corporativo" />
                                                    <ErrorMessage mensaje={errors.correo?.message}></ErrorMessage>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4}>
                                                    Teléfono
                                                </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control ref={register} size="sm" readOnly={readAll} value={formUser.telefono} onChange={handleChange} name="telefono" type="text" placeholder="Teléfono" />
                                                    <ErrorMessage mensaje={errors.telefono?.message}></ErrorMessage>
                                                </Col>
                                            </Form.Group>

                                            <p className="TitleLabel pt-4"> <strong> Datos de Contacto </strong></p>
                                            {/* <Form.Label>Representantes</Form.Label> */}
                                            <Form.Group as={Row}>

                                                <Col sm={7}>
                                                    <Form.Control onChange={changeRepresentante} as="select" custom value={indexRepresentantes} >
                                                        <option >Selecciona un contacto</option>
                                                        {formRepresentante && formRepresentante.map((element, index) =>
                                                            element.nombre ? <option key={index} value={index}>{element.nombre + ' ' + element.apePat}</option> : null
                                                        )}
                                                    </Form.Control>
                                                </Col>
                                                {(tipoFormulario === "EDIT") ?
                                                    <>
                                                        <Col sm={"auto"} className={`${escritura ? '' : "hiddenElement"}`}>
                                                            <div onClick={añadirRep} className="btn ml-3 mr-2 p-0 buttonHeaderForm" title='Agregar Nuevo Representante'>
                                                                <img height="17px" className="m-1" src={clearIcon} alt="Img" />
                                                            </div>
                                                        </Col>
                                                        {(formRepresentante[indexRepresentantes] !== undefined) ?
                                                            <Col sm={"auto"} className={`${escritura ? '' : "hiddenElement"}`}>
                                                                <div onClick={eliminarRep} className="btn p-0  buttonHeaderForm">
                                                                    <img height="17px" className="m-1 mx-2" src={deleteIcon} alt="" />
                                                                </div>
                                                            </Col>
                                                            : ''}
                                                    </>
                                                    : <></>}

                                            </Form.Group>
                                            {(formRepresentante[indexRepresentantes] !== undefined) ?
                                                <div>
                                                    {/* <p>Datos del Representante: {formRepresentante[indexRepresentantes].nombre+' '+formRepresentante[indexRepresentantes].apePat}</p> */}
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={4}>
                                                            Nombres<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={8}>
                                                            <Form.Control size="sm" readOnly={(habilitar === false) ? false : readAll} value={formRepresentante[indexRepresentantes].nombre} onChange={(event) => handleChangeRepresentante(event, indexRepresentantes)} name="nombre" type="text" placeholder="Nombres" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={4}>
                                                            Apellido paterno<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={8}>
                                                            <Form.Control size="sm" readOnly={(habilitar === false) ? false : readAll} value={formRepresentante[indexRepresentantes].apePat} onChange={(event) => handleChangeRepresentante(event, indexRepresentantes)} name="apePat" type="text" placeholder="Apellido paterno" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={4}>
                                                            Apellido materno<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={8}>
                                                            <Form.Control size="sm" readOnly={(habilitar === false) ? false : readAll} value={formRepresentante[indexRepresentantes].apeMat} onChange={(event) => handleChangeRepresentante(event, indexRepresentantes)} name="apeMat" type="text" placeholder="Apellido materno" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={4}>
                                                            Email<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={8}>
                                                            <Form.Control size="sm" readOnly={(habilitar === false) ? false : readAll} value={formRepresentante[indexRepresentantes].correo} onChange={(event) => handleChangeRepresentante(event, indexRepresentantes)} name="correo" type="email" placeholder="Email" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={4}>
                                                            Teléfono<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={8}>
                                                            <Form.Control size="sm" readOnly={(habilitar === false) ? false : readAll} value={formRepresentante[indexRepresentantes].telefono} onChange={(event) => handleChangeRepresentante(event, indexRepresentantes)} name="telefono" type="text" placeholder="Teléfono" />
                                                        </Col>
                                                    </Form.Group>

                                                </div>
                                                :
                                                (formRepresentante.length !== 0) ?
                                                    <div>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Nombres<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={formRepresentante[0].nombre} readOnly={habilitar} size="sm" onChange={(event) => handleChangeRepresentanteNuevo(event, indexRepresentantes)} name="nombre" type="text" placeholder="Nombres" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Apellido Paterno<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={formRepresentante[0].apePat} readOnly={habilitar} size="sm" onChange={(event) => handleChangeRepresentanteNuevo(event, indexRepresentantes)} name="apePat" type="text" placeholder="Apellido paterno" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Apellido Materno<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={formRepresentante[0].apeMat} readOnly={habilitar} size="sm" onChange={(event) => handleChangeRepresentanteNuevo(event, indexRepresentantes)} name="apeMat" type="text" placeholder="Apellido materno" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Tipo Documento
                                    </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control size="sm" as="select" readOnly={habilitar} value={formUser.tipDoc} onChange={(event) => handleChangeRepresentanteNuevo(event, indexRepresentantes)} name="tipDoc" >
                                                                    {tipoDocStore.map(element =>
                                                                        <option key={element.Valor} value={element.Valor}>{element.Descripcion}</option>
                                                                    )}

                                                                </Form.Control>
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Documento oficial de identidad<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={formRepresentante[0].nroDoc} readOnly={habilitar} size="sm" onChange={(event) => handleChangeRepresentanteNuevo(event, indexRepresentantes)} name="nroDoc" type="text" placeholder="Número de documento" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Email<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={formRepresentante[0].correo} readOnly={habilitar} size="sm" onChange={(event) => handleChangeRepresentanteNuevo(event, indexRepresentantes)} name="correo" type="email" placeholder="Email" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Teléfono<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={formRepresentante[0].telefono} readOnly={habilitar} size="sm" onChange={(event) => handleChangeRepresentanteNuevo(event, indexRepresentantes)} name="telefono" type="text" placeholder="Teléfono" />
                                                            </Col>
                                                        </Form.Group>

                                                    </div> : ''
                                            }

                                            <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`}>
                                                {(tipoFormulario === "EDIT") ?
                                                    <>
                                                        <Col sm={6} className="border-acciones mt-3 ml-auto">
                                                            <button type="submit" className="btn done-btn w-100"  ><strong>{(tipoFormulario === 'ADDS') ? 'Aceptar' : 'Aceptar'}</strong></button>
                                                        </Col>
                                                    </> : <></>
                                                }
                                                {(tipoFormulario === "ADDS") ?
                                                    <>
                                                        <Col sm={6} className="border-acciones">
                                                            <div type="submit" className="btn  delete-btn w-100" onClick={cancelarAdd} ><strong>Cancelar</strong></div>
                                                        </Col>
                                                        <Col sm={6} className="border-acciones">
                                                            <button type="submit" className="btn done-btn w-100"  ><strong>Aceptar</strong></button>
                                                        </Col>
                                                    </> : <></>
                                                }
                                            </Form.Group>
                                        </Col>
                                    </Form>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="config">
                                <HeaderForm editar={editForm} tipoForm={tipoFormulario}></HeaderForm>

                                <Form.Group as={Row} className="mx-3 px-3">
                                    <Col sm={4} className="pr-0 mb-3">
                                        <Form.Label>
                                            <p className="mt-3 TitleLabel mb-0"> <strong> Programa</strong></p>
                                        </Form.Label>
                                        <Form.Control onChange={handleChangePro} name="valor" as="select" size="sm"  >
                                            <option value="-1">Seleccionar Programa</option>
                                            {
                                                dataPrograma && dataPrograma.map((ele, index) =>
                                                    <option value={ele.codPrograma} key={index} >{ele.programa}</option>
                                                )
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col sm={4} className="pr-0 ml-5 mb-3">
                                        <Form.Label>
                                            <p className="mt-3 TitleLabel mb-0"> <strong> Producto</strong></p>
                                        </Form.Label>
                                        <Form.Control size="sm" as="select" value={dataForm.producto} name="producto" onChange={handleChangeSponsor}>
                                            <option value="">Seleccionar producto</option>
                                            {datas && datas.map((element, index) =>
                                                <option key={index} value={element.codProducto}>{element.producto}</option>
                                            )}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mx-3 px-3" hidden={ocultar}>
                                    <Col sm={12} className="pr-0">
                                        <Form.Label>
                                            Seleccione el parámetro que desee agregar a la configuración actual del sponsor:
                                    </Form.Label>
                                    </Col>
                                    <Col sm={4} className="pr-0">
                                        <Form.Control size="sm" as="select" value={configuracion.idParametro} name="conf" onChange={handleChange}>
                                            <option value="">Seleccionar configuración</option>
                                            {
                                                configuracions && configuracions.map((elemento, index) =>
                                                    <option key={index} value={elemento.idParametro + ',' + elemento.tipoInput}>{elemento.Descripcion} </option>
                                                )
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col sm={2} className="pl-auto" hidden={(escritura === true) ? false : true}>
                                        <button title="Agregar configuración" className="btn p-0 buttonHeaderForm" type="submit" onClick={() => handleAddFields()} ><img alt="Agregar configuración" src={adds} height="17px" className="m-1" /></button>
                                    </Col>
                                </Form.Group>
                                <Row className="mx-5 px-3">
                                    <Form className="w-100" /*onSubmit={handleSubmitSponsor}*/>
                                        <Col sm={10}>
                                            <p className="mt-3 TitleLabel"> <strong> Configuración</strong></p>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={5}>
                                                    Código <span className="required">*</span>
                                                </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control size="sm" readOnly={true} onChange={handleChangeSponsor} name="codigo" value={codigo} type="text" placeholder="Código " />

                                                </Col>
                                            </Form.Group>
                                            {inputFields && inputFields.map((inputField, Index) => {
                                                switch (inputField.tipoInput) {
                                                    case 'input':
                                                        return <InputEntrada key={Index} inputField={inputField} Index={Index} funciones={funciones} escritura={escritura} editable={NoEscribir} />

                                                    case 'select':
                                                        return <SelectEntrada key={Index} inputField={inputField} Index={Index} funciones={funciones} escritura={escritura} editable={NoEscribir} />

                                                    case 'switch':
                                                        return <InputSwitch key={Index} inputField={inputField} Index={Index} funciones={funciones} escritura={escritura} editable={NoEscribir} />


                                                    case 'check':
                                                        return <InputCheck key={Index} inputField={inputField} Index={Index} funciones={funciones} escritura={escritura} editable={NoEscribir} />

                                                    default:
                                                        return <InputEntrada key={Index} inputField={inputField} Index={Index} funciones={funciones} escritura={escritura} editable={NoEscribir} />

                                                }
                                            }
                                            )}
                                            <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`} >
                                                <Col sm={6} className='mt-3 ml-auto' hidden={NoEscribir}>
                                                    <button type="submit" className="btn done-btn w-100" onClick={handleSubmitConfig}  ><strong>Aceptar</strong></button>
                                                </Col>
                                            </Form.Group>

                                        </Col>
                                    </Form>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="proveedores"><br />
                                <Form className="w-100" onSubmit={handleSubmit(guardarProveedor)}>
                                    <Row className="mx-3 px-3">
                                        <Form.Label column sm={5}>
                                            <p className="mt-3 TitleLabel mb-0"> <strong> {nombre}</strong></p>
                                        </Form.Label>
                                    </Row>
                                    <Form.Group as={Row} className="mx-3 px-3">
                                        <Col sm={5} className="pr-0">

                                            <Form.Control size="sm" as="select" value={formUser.provedores} name="proveedores" onChange={handleChangeProvedor}>
                                                <option value="">Seleccionar {nombre}</option>
                                                {proveedor && proveedor.map((element, index) =>
                                                    <option key={index} value={(nombre === 'Compradores' ? element.idProveedor : element.idSponsor)}>{element.razonSocial}</option>
                                                )}
                                            </Form.Control>
                                        </Col>

                                        <Col sm={3}>
                                            <Row className={`justify-content-end mb-2 ${escritura ? '' : " d-none"} `}>
                                                <div onClick={() => abrirModal2()} className="btn mr-3 p-0 buttonHeaderForm">
                                                    <img height="17px" className="m-1" src={iconUser} alt="img" />
                                                </div>
                                                {(tipoFormulario === "EDIT" || tipoFormulario === "CANCEL" || tipoFormulario === "ADD") ?
                                                    <>
                                                        <Col sm={"auto"} className={`${escritura ? '' : "hiddenElement"}`}>
                                                            <div onClick={añadirPro} className="btn ml-3 mr-2 p-0 buttonHeaderForm" title='Agregar Nuevo Proveedor'>
                                                                <img height="17px" className="m-1" src={clearIcon} alt="Img" />
                                                            </div>
                                                        </Col>

                                                    </>
                                                    : <></>}
                                            </Row>
                                        </Col>



                                        <Col sm={12}>
                                            <p className="mt-5 TitleLabel"> <strong> Datos {nombre}</strong></p>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4}>
                                                    DOI
                                                    </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control size="sm" as="select" disabled={readOne} value={objeto.tipDoc} onChange={handleChangeSponsor} name="tipDoc" >
                                                        {tipoDocStore && tipoDocStore.map(element =>
                                                            <option key={element.Valor} value={element.Valor}>{element.Descripcion}</option>
                                                        )}

                                                    </Form.Control>
                                                    <ErrorMessage mensaje={errors.tipDoc?.message}></ErrorMessage>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4}>
                                                    Número DOI
                                                </Form.Label>
                                                <Col sm={5}>
                                                    <Form.Control size="sm" readOnly={readAll}  value={objeto.Ruc} onChange={handleChangeSponsor} name="Ruc" placeholder="RUC"></Form.Control>
                                                    <ErrorMessage mensaje={errors.Ruc?.message}></ErrorMessage>
                                                </Col>
                                                {tipoFormulario === "ADD" && 
                                                    <Col sm={2}>
                                                        <button className="buttonPrincipal btn mt-3 w-100" onClick={BuscarSponsor} >Buscar</button>
                                                    </Col>
                                                }
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4} >
                                                    Razon social<span className="required">*</span>
                                                </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control size="sm" readOnly={readOne} value={objeto.razonSocial} onChange={handleChangeSponsor} name="razonSocial" type="text" placeholder="Razón Social" />
                                                    <ErrorMessage mensaje={errors.razonSocial?.message}></ErrorMessage>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4}>
                                                    Dirección<span className="required">*</span>
                                                </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control ref={register} size="sm" readOnly={readAll} value={objeto.direccion} onChange={handleChangeSponsor} name="direccion" type="text" placeholder="Dirección" />
                                                    <ErrorMessage mensaje={errors.direccion?.message}></ErrorMessage>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4}>
                                                    Correo<span className="required">*</span>
                                                </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control ref={register} size="sm" readOnly={readAll} value={objeto.correo} onChange={handleChangeSponsor} name="correo" type="email" placeholder="Correo Corporativo" />
                                                    <ErrorMessage mensaje={errors.correo?.message}></ErrorMessage>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={4}>
                                                    Teléfono<span className="required">*</span>
                                                </Form.Label>
                                                <Col sm={7}>
                                                    <Form.Control ref={register} size="sm" readOnly={readAll} value={objeto.telefono} onChange={handleChangeSponsor} name="telefono" type="number" placeholder="Teléfono" />
                                                    <ErrorMessage mensaje={errors.telefono?.message}></ErrorMessage>
                                                </Col>
                                            </Form.Group>
                                            <p className="TitleLabel pt-4"> <strong> Datos de Contacto </strong></p>
                                            {/* <Form.Label>Representantes</Form.Label> */}
                                            <Form.Group as={Row}>
                                                <Col sm={7}>
                                                    {(tipoFormulario === 'EDIT' || tipoFormulario === 'CANCEL') ? <>
                                                        <Form.Control onChange={changeProveedor} as="select" custom value={indexProveedor} >
                                                            <option >Selecciona un contacto</option>
                                                            {formProveedor && formProveedor.map((element, index) =>
                                                                element.nombre ? <option key={index} value={index}>{element.nombre + ' ' + element.apePat}</option> : null
                                                            )}
                                                        </Form.Control>
                                                    </> : <></>}
                                                    {(tipoFormulario === 'ADD' || tipoFormulario === 'ADDS') ? <>
                                                        <Form.Control onChange={changeProveedor} as="select" custom value={indexProveedor} >
                                                            <option >Selecciona un contacto</option>
                                                            {formProveedor && formProveedor.map((element, index) =>
                                                                element.nombre ? <option key={index} value={index}>{element.nombre + ' ' + element.apePat}</option> : null
                                                            )}
                                                        </Form.Control>
                                                    </> : <></>}

                                                </Col>
                                                {(tipoFormulario === "EDIT") ?
                                                    <>
                                                        <Col sm={"auto"} className={`${escritura ? '' : "hiddenElement"}`}>
                                                            <div onClick={añadirProvedor} className="btn ml-3 mr-2 p-0 buttonHeaderForm" title='Agregar Nuevo contacto'>
                                                                <img height="17px" className="m-1" src={clearIcon} alt="Img" />
                                                            </div>
                                                        </Col>
                                                        {(formProveedor[indexProveedor] !== undefined) ?
                                                            <Col sm={"auto"} className={`${escritura ? '' : "hiddenElement"}`}>
                                                                <div onClick={eliminarContactoProv} className="btn p-0  buttonHeaderForm">
                                                                    <img height="17px" className="m-1 mx-2" src={deleteIcon} alt="" />
                                                                </div>
                                                            </Col>
                                                            : ''}
                                                    </>
                                                    : <>
                                                        {(tipoFormulario === "ADDS") ?
                                                            <Col sm={"auto"} className={`${escritura ? '' : "hiddenElement"}`}>
                                                                <div onClick={añadirProvedor} className="btn ml-3 mr-2 p-0 buttonHeaderForm" title='Agregar Nuevo Proveedor'>
                                                                    <img height="17px" className="m-1" src={clearIcon} alt="Img" />
                                                                </div>
                                                            </Col>

                                                            : ''}
                                                    </>}

                                            </Form.Group>
                                            {((formProveedor[indexProveedor] !== undefined && tipoFormulario === 'CANCEL') || (formProveedor[indexProveedor] !== undefined && tipoFormulario === 'EDIT')) ?
                                                <div>
                                                    {/* <p>Datos del Representante: {formProveedor[indexRepresentantes].nombre+' '+formProveedor[indexRepresentantes].apePat}</p> */}
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={4}>
                                                            Nombres<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={8}>
                                                            <Form.Control size="sm" readOnly={(habilitar === false) ? false : readAll} value={formProveedor[indexProveedor].nombre} onChange={(event) => handleChangeProveedor(event, indexProveedor)} name="nombre" type="text" placeholder="Nombres" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={4}>
                                                            Apellido paterno<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={8}>
                                                            <Form.Control size="sm" readOnly={(habilitar === false) ? false : readAll} value={formProveedor[indexProveedor].apePat} onChange={(event) => handleChangeProveedor(event, indexProveedor)} name="apePat" type="text" placeholder="Apellido paterno" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={4}>
                                                            Apellido materno<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={8}>
                                                            <Form.Control size="sm" readOnly={(habilitar === false) ? false : readAll} value={formProveedor[indexProveedor].apeMat} onChange={(event) => handleChangeProveedor(event, indexProveedor)} name="apeMat" type="text" placeholder="Apellido materno" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={4}>
                                                            Email<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={8}>
                                                            <Form.Control size="sm" readOnly={(habilitar === false) ? false : readAll} value={formProveedor[indexProveedor].correo} onChange={(event) => handleChangeProveedor(event, indexProveedor)} name="correo" type="email" placeholder="Email" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} >
                                                        <Form.Label column sm={4}>
                                                            Teléfono<span className="required">*</span>
                                                        </Form.Label>
                                                        <Col sm={8}>
                                                            <Form.Control size="sm" readOnly={(habilitar === false) ? false : readAll} value={formProveedor[indexProveedor].telefono} onChange={(event) => handleChangeProveedor(event, indexProveedor)} name="telefono" type="text" placeholder="Teléfono" />
                                                        </Col>
                                                    </Form.Group>

                                                </div>
                                                :
                                                (tipoFormulario === 'ADDS') ?

                                                    <div>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Nombresss<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={ter.nombre} readOnly={habilitar} size="sm" onChange={(event) => handleChangeProveedorNuevo(event, indexProveedor)} name="nombre" type="text" placeholder="Nombres" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Apellido Paterno<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={ter.apePat} readOnly={habilitar} size="sm" onChange={(event) => handleChangeProveedorNuevo(event, indexProveedor)} name="apePat" type="text" placeholder="Apellido paterno" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Apellido Materno<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={ter.apeMat} readOnly={habilitar} size="sm" onChange={(event) => handleChangeProveedorNuevo(event, indexProveedor)} name="apeMat" type="text" placeholder="Apellido materno" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Email<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={ter.correo} readOnly={habilitar} size="sm" onChange={(event) => handleChangeProveedorNuevo(event, indexProveedor)} name="correo" type="email" placeholder="Email" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} >
                                                            <Form.Label column sm={4}>
                                                                Teléfono<span className="required">*</span>
                                                            </Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control value={ter.telefono} readOnly={habilitar} size="sm" onChange={(event) => handleChangeProveedorNuevo(event, indexProveedor)} name="telefono" type="number" placeholder="Teléfono" />
                                                            </Col>
                                                        </Form.Group>

                                                    </div> : ''
                                            }
                                            <Form.Group as={Row} className={`${escritura ? '' : "hiddenElement"}`}>
                                                {(tipoFormulario === "ADD") ?
                                                    <><Col sm={6} className="border-acciones">
                                                        <div className="btn done-btn w-100" onClick={registrarProv} ><strong>Aceptar</strong></div>
                                                    </Col>
                                                        <Col sm={6} className="border-acciones" >
                                                            <div className="btn  delete-btn w-100" onClick={cacelarProd} ><strong>Cancelar</strong></div>
                                                        </Col>
                                                    </> :
                                                    <></>}
                                                {(tipoFormulario === "ADDS") ?
                                                    <><Col sm={6} className="border-acciones">
                                                        <button type="submit" className="btn done-btn w-100"  ><strong>{(tipoFormulario === 'ADDS') ? 'Aceptar' : 'Aceptar'}</strong></button>
                                                    </Col>
                                                        <Col sm={6} className="border-acciones" >
                                                            <div className="btn  delete-btn w-100" onClick={cacelarProd} ><strong>Cancelar</strong></div>
                                                        </Col>
                                                    </> :
                                                    <></>}
                                                {(tipoFormulario === "EDIT") ?
                                                    <>
                                                        <Col sm={6} className="border-acciones">
                                                            <button type="submit" className="btn done-btn w-100"  ><strong>{(tipoFormulario === 'ADDS') ? 'Aceptar' : 'Aceptar'}</strong></button>
                                                        </Col>
                                                        <Col sm={6} className="border-acciones">
                                                            <div className="btn delete-btn w-100" onClick={deleteForm}  ><strong>Eliminar</strong></div>
                                                        </Col>
                                                    </> :
                                                    <></>}
                                            </Form.Group>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </>
    );
}
const SelectEntrada = ({ inputField, Index, funciones, escritura, editable }) => {
    const [hijos, setHijos] = useState([])
    useEffect(async () => {
        let conf = {};
        let result = [];
        conf.idPadre = inputField.idParametro;
        conf.estado = 'ACT'
        result = await axiosClient.post(`parametro/listar`, conf)
        setHijos(result.data.data)
    }, [])
    return (
        <Form.Group as={Row} >
            <Form.Label column sm={5} >
                <span ></span>{inputField.labels}<span className="required">*</span>
            </Form.Label>
            <Col sm={6}>
                <Form.Control disabled={editable} size="sm" as="select" value={inputField.valor} name="valor" onChange={event => funciones.handleChangeInput(Index, event)}>
                    <option value="" >Seleccionar</option>
                    {
                        hijos.map((elemento, index) =>
                            <option value={elemento.Valor} key={index}>{elemento.Descripcion} </option>
                        )
                    }
                </Form.Control>
            </Col>
            <Col sm={1} className="pl-0">
                <div hidden={(escritura === true) ? false : true} title="Eliminar configuración" className="btn p-0 buttonHeaderForm" onClick={() => funciones.handleRemoveFields(Index)} ><img alt="Eliminar configuración" src={rem} height="17px" className="m-1" /></div>
            </Col>
        </Form.Group>
    )
}

const InputEntrada = ({ inputField, Index, funciones, escritura, editable }) => {
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={5}  >
                <span ></span>{inputField.labels}<span className="required">*</span>
            </Form.Label>

            <Col sm={6}>
                <Form.Control readOnly={editable} size="sm" value={inputField.valor} onChange={event => funciones.handleChangeInput(Index, event)} name="valor" type="text" placeholder="Valor" />
            </Col>
            <Col sm={1} className="pl-0">
                <div hidden={(escritura === true) ? false : true} title="Eliminar configuración" className="btn p-0 buttonHeaderForm" onClick={() => funciones.handleRemoveFields(Index)} ><img alt="Eliminar configuración" src={rem} height="17px" className="m-1" /></div>
            </Col>
        </Form.Group>
    )
}

const InputSwitch = ({ inputField, Index, funciones, escritura, editable }) => {
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={5} >
                <span ></span>{inputField.labels}<span className="required">*</span>
            </Form.Label>
            <Col sm={6}>
                <Form.Check disabled={editable} name="valor" size="lg" type="switch" id="custom-switch" defaultChecked={(inputField.valor === 'false') ? false : inputField.valor} onChange={event => funciones.handleChangeSwitch(Index, event)} />
            </Col>
            <Col sm={1} className="pl-0">
                <div hidden={(escritura === true) ? false : true} title="Eliminar Configuración" className="btn p-0 buttonHeaderForm" onClick={() => funciones.handleRemoveFields(Index)} ><img alt="Eliminar Configuracion" src={rem} height="17px" className="m-1" /></div>
            </Col>
        </Form.Group>
    )
}

const InputCheck = ({ inputField, Index, funciones, escritura, editable }) => {
    const [hijos, setHijos] = useState([])
    useEffect(async () => {
        let conf = {};
        let result = [];
        conf.idPadre = inputField.idParametro;
        conf.estado = 'ACT'
        result = await axiosClient.post(`parametro/listar`, conf)
        setHijos(result.data.data,'yei')
    }, [])
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={5} >
                <span ></span>{inputField.labels}<span className="required">*</span>
            </Form.Label>
            <Col sm={6}>
                {
                    hijos.map((elemento, index) =>
                        <Form.Check disabled={editable} defaultChecked={(elemento.Valor === inputField.valor) ? true : false} name="valor" label={elemento.Descripcion} custom inline key={index} size="lg" type="radio" id={index + 1} onChange={event => funciones.handleChangeChk(Index, event, elemento.Valor)} />
                    )
                }
            </Col>
            <Col sm={1} className="pl-0">
                <div hidden={(escritura === true) ? false : true} title="Eliminar configuración" className="btn p-0 buttonHeaderForm" onClick={() => funciones.handleRemoveFields(Index)} ><img alt="Eliminar configuración" src={rem} height="17px" className="m-1" /></div>
            </Col>
        </Form.Group>
    )
}
export default FormularioUsuarios;