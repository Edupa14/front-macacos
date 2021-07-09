import AxiosClient from 'config/axios/axiosClient';
import {baseURLFront} from 'config/axios/axiosClient';
export const funcionLog = async (datos) =>{
    datos.idUsuario = localStorage.idUsuario;
    datos.url = baseURLFront+datos.url
    await AxiosClient.post('log/crear',datos)
} 