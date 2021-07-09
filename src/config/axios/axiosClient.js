import axios from 'axios';

//Configuracion para hacer las peticiones al servidor backend.
//Se debe ingresar la url
const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/'
    //baseURL: 'https://acelera-back.azurewebsites.net/'
});
export  const baseURLFront = 'http://localhost:3000/'
// export  const baseURLFront = 'https://acelera-front.azurewebsites.net/'
export default axiosClient