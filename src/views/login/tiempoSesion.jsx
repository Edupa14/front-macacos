/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react';
// import { logout } from 'helpers/loginFuctions';
// import alerta from 'helpers/alerts';
const TiempoSesion = () => {

     const [fecha] = useState(new Date())

    useEffect(()=>{
        if(localStorage.fecha === undefined){
            localStorage.fecha = fecha
            let seconds = fecha.getSeconds()+19
            let minute = fecha.getMinutes() + 30
            let hour = fecha.getHours()
            let dt = fecha.getDate()
            let mm = fecha.getMonth()
            let yyyy = fecha.getFullYear();
            if(seconds > 60){
                seconds = seconds - 60
                minute = minute + 1
            } 
            if(minute > 60){
                minute = minute - 60
                hour = hour + 1
            }
            if(hour>23){
                hour = 23
                minute = 59
                seconds = 59
            }
            localStorage.tiempoFinal = new Date(yyyy,mm,dt,hour,minute,seconds)
        }
        let contador = setInterval(()=>{
            if(new Date(localStorage.tiempoFinal) - new Date() >0){
                localStorage.fecha = new Date()       
            }else{
                // alerta('Su sesión se va a cerrar')
                clearInterval(contador)
                localStorage.removeItem('fecha');
                localStorage.removeItem('tiempoFinal');
                // logout() 
                // window.location ='/login'
            }
        },5000)
    },[])

    // const [tiempo,setTiempo] = useState(12000)
    // useEffect(()=>{
    //     if(localStorage.tiempo !== undefined){
    //         setTiempo(localStorage.tiempo)
    //     }else{
    //         localStorage.tiempo = tiempo
    //     }
    //     let contador = setInterval(()=>{
    //         let time = localStorage.tiempo - 1000
    //         if(localStorage.tiempo >0){
    //             localStorage.tiempo = time
    //         }else{
    //             // alerta('Su sesión se va a cerrar')
    //             clearInterval(contador)
    //             setTiempo(0)
    //             localStorage.removeItem('tiempo');
    //             // logout() 
    //         }
    //     },1000)
    // },[])


    return (
        <></>
    );
}

export default TiempoSesion;