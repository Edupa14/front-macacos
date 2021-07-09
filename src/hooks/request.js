import { useState, useEffect } from 'react'
import AxiosClient from '../config/axios/axiosClient' 

const  useFetch = (method,url, defaultValue,parametro)=> {
    const [data, setData] = useState(defaultValue)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchResource = async()=>{
            if(parametro !=undefined){        
                try {
                    let response = await AxiosClient({
                        method:method,
                        url:url,
                        data:defaultValue
                    })
                    if(response.status === 200){
                        let datos = response.data
                        setData(datos)
                    }
                    if(response.status === 300){
                        console.log('CODIGO 300')
                    }
                    if(response.status === 404){
                        console.log('CODIGO 404')
                    }
                    if(response.status === 500){
                        console.log('CODIGO 500')
                    }
                } catch (error) {
                    setError(error)
                }
            }
        }
        fetchResource()
    }, [method,url, defaultValue])
    return { data, error }
}
export default useFetch

    