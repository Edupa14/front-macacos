import queryString from "querystring";
import AxiosClient from '../config/axios/axiosClient' 

class request {
  constructor() {}

  get(path, parameters) {
    const params = queryString.stringify(parameters);
    const target = path + (params !== "" ? "?" + params : params);
    let respuesta= this.request('get',target);
    return respuesta
  }

  post(path, data) {
    const target = path;
    let  body = JSON.stringify(data)
    return this.request('post',target, body);
  }

  delete(path, data) {
    const target = path;
    let  body = JSON.stringify(data)

    return this.request('delete',target, body);
  }

  put(path, data) {
    const target = path;
    let body = JSON.stringify(data)
    return this.request('put',target, body);
  }

  request = (method,path, defaultValue)=> {
    AxiosClient({
        method:method,
        url:path,
        data:defaultValue
    }).then(res=>{
        return res.data
    })

    // return 'hola'
    // return fetch(target, options)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     return response;
    //   })
    //   .catch((error) => {
    //     return error;
    //   });
  }
}

export const requestService = new request();
