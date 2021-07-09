/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import {Form,Button,Container,Col} from 'react-bootstrap'
import AxiosClient from 'config/axios/axiosClient'
import {useDispatch,useSelector} from 'react-redux';
import { obtenerSponsorAction } from 'store/operativo/sponsorStore';
import alerta from 'helpers/alerts';
import 'components/sidebars/sidebars.css'

const SidebarPlanilla = ({obtenerPlanilla, dataPla}) => { 
    const [statefile,setStatefile]=useState({})
    const [dataFormulario,setDataFormulario]=useState({})
    const [dataFormularioPro,setDataFormularioPro]=useState({})
    const [dataProductos, setDataProducto] = useState([])
    const [dataPrograma, setDataPrograma] = useState([])
    const [datas, setDatas] = useState({})
    const [ruc, setRuc] = useState('sin Dato')
    const [rz, setRz] = useState('sin Dato')
    const [idSponsors, setIdSponsor] = useState(0)

    const dispatch = useDispatch()
    const user = useSelector(store => store.users.objecto)
    const getListarPrograma = async (idSponsor) => {
        let dataParametro = {};
        dataParametro.idSponsor = idSponsor;
        dataParametro.estado = 'ACT'
        let response = await AxiosClient.post('sponsors/listPrograma', dataParametro)
        let rpta = undefined
        if (response.data.ok === true) {
            rpta = response.data.data
            setDataPrograma(rpta);
        }
    }
    const procesarPlanilla =async(e)=>{
        let planilla = {}
        let c= 0;
            e.preventDefault()
            let FORM = new FormData()
            FORM.append('excel',statefile)
            if(dataFormulario.idSponsor!==undefined){
                let body=JSON.stringify({'idUsuario': user.idUsuario,'idSponsor': dataFormulario.idSponsor, 'codProd': dataFormularioPro.valor, 'fila': 10, 'pagina': 1})
                FORM.append('Datos',body)
                let response = await AxiosClient.post('procesar/planilla',FORM);
                if(response.status ===200){
                    planilla = response.data.data.resumen;
                    planilla.forEach((elemento)=>{
                        if(elemento.condicion !== 'REGISTRADO'){
                                c++;
                        }
                    })
                    obtenerPlanilla(response.data.data.resumen)
                    let objetoData = {...datas,
                        numOpeGlobal: response.data.data.numOpeGlobal,
                        numOpeSponsor: response.data.data.numOpeSponsor,
                        fechaRegistro: response.data.data.fechaRegistro,
                        montosTotales: response.data.data.montosTotales,
                        ruc: ruc,
                        idSponsor: rz
                    }
                    dataPla(objetoData)
                    if(c === 0){
                        alerta("Planilla registrada exitosamente","success")
                    }else{
                        alerta("Planilla aun no puede ser procesado, verificar condicion","error")
                    }
                }else{
                    alerta("Error al procesar la planilla","error")
                }  
            }else{
                alerta("Debe escoger un Sponsor","error")
            }
             
        }


        const handleChange =(e)=>{
            const { name, value } = e.target;
            getListarPrograma(value)
            setIdSponsor(value)
            setDataFormulario({
                ...dataFormulario,
                [name]: value,
            });
            let index = e.target.selectedIndex; 
            if(name === 'idSponsor'){
                let rz = e.target.options[index].text
                sponsor.forEach((ele)=>{
                    if(ele.idSponsor === parseInt(value)){
                        setRuc(ele.Ruc)
                        setRz(rz)
                        setDatas({
                            ...datas,
                            ruc: ele.Ruc,
                            idSponsor: rz
                        });
                    }
                })
            }
        }
        const handleChangeProd =(e)=>{
            const { name, value } = e.target;
            setDataFormularioPro({
                ...dataFormularioPro,
                [name]: value,
            });
            let index = e.target.selectedIndex; 
            if(name === 'valor'){
                setDatas({
                    ...datas,
                    valor: e.target.options[index].text
                });
            }
        }
        const handleChangePro =(e)=>{
            const { name, value } = e.target;
            getCodProducto(value)
            setDataFormularioPro({
                ...dataFormularioPro,
                [name]: value,
            });
            let index = e.target.selectedIndex; 
            if(name === 'valor'){
                setDatas({
                    ...datas,
                    programa: e.target.options[index].text
                });
            }
        }
        
        const getCodProducto =async(valor)=>{
            let dataParametro = {};
            dataParametro.idSponsor = idSponsors;
            dataParametro.estado = 'ACT'
            dataParametro.codPrograma = valor
        let response = await AxiosClient.post('sponsors/listPrograma', dataParametro)
            let rpta = undefined
            if (response.data.ok === true) {
                rpta = response.data.data
                setDataProducto(rpta);
            }
        }

    const changeFile =(e)=>{
        e.preventDefault()
        let files = e.target.files[0]
        if(files !== undefined){
            let extension = getFileExtension(files.name)
            if(extension === 'xlsx' || extension === 'xls'){
                setStatefile(files)
            }else{
                setStatefile({})
                alerta('El tipo de archivo debe ser excel','error')
            }
        }
        
       
    }

    function getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
      }

    useEffect(()=>{
        dispatch(obtenerSponsorAction({}))

    },[])
    const sponsor = useSelector(store => store.sponsors.array)

    return (
        <>
            <div >
                <hr/>
                <p className="titleSidebar pl-4"> Selecciona una planilla</p>
                <hr/>
                { statefile ? <p className="pl-5">{statefile.name}</p> : ''}
                <Container>
                <Form action="" onSubmit={procesarPlanilla}>
                    <Col xs={12}>
                        <Form.Group>
                                <Form.Label column >
                                Sponsor
                                </Form.Label>
                                <Form.Control onChange={handleChange} name="idSponsor" as="select"  size="sm"  >
                                        <option value="-1">Seleccionar</option>
                                    {
                                        sponsor.map((ele,index)=>
                                            <option value={ele.idSponsor} key={index} >{ele.razonSocial}</option>
                                            )
                                    }
                                </Form.Control>
                        </Form.Group> 
                        <Form.Group>
                                <Form.Label column >
                                Programas
                                </Form.Label>
                                <Form.Control onChange={handleChangePro} name="valor" as="select"  size="sm"  >
                                        <option value="-1">Seleccionar</option>
                                    {
                                        dataPrograma.map((ele,index)=>
                                            <option value={ele.codPrograma} key={index} >{ele.programa}</option>
                                            )
                                    }
                                </Form.Control>
                        </Form.Group> 
                        <Form.Group>
                                <Form.Label column >
                                Productos
                                </Form.Label>
                                <Form.Control onChange={handleChangeProd} name="valor" as="select"  size="sm"  >
                                        <option value="-1">Seleccionar</option>
                                    {
                                        dataProductos.map((ele,index)=>
                                            <option value={ele.codProducto} key={index} >{ele.producto}</option>
                                            )
                                    }
                                </Form.Control> 
                        </Form.Group> <br></br>
                    </Col>
                    <Col xs={12}>
                    <Form.File onChange={changeFile}
                        label="Sube la planilla del excel"
                        custom
                    />
                    </Col>
                    <div className="text-center">
                    <Button type="submit" className="mt-4 buttonPrincipal" variant="danger">Procesar</Button>
                    </div>      
                </Form>  
                </Container>
            </div>
        </>
    );
}

export default SidebarPlanilla;