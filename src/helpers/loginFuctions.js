// import alerta from "./alerts";

const TOKEN_KEY = 'jwts';


export const login = () => {
    localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('Nombre');
    localStorage.removeItem('apePat');
    localStorage.removeItem('apeMat');
    localStorage.removeItem('correo');
    localStorage.removeItem('accesos');
    localStorage.removeItem('idUsuario');
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false
}

export const setTiempoSesion = () =>{
 
    // if(localStorage.tiempo === undefined){
        
    //     localStorage.tiempo = 50000
    //     if(localStorage.tiempo <= 0) clearInterval(contador);
    //     setTimeout(() => {
    //         alerta("TU SESION SE CERRARÁ","error")
    //         logout()
    //         localStorage.removeItem('tiempo');
    //         localStorage.removeItem('cambio');
    //         window.location.href ='/login'
            
    //     }, localStorage.tiempo);
    // }else{
      
    //     localStorage.cambio=''
    //     localStorage.tiempo = localStorage.tiempo
    //     if(localStorage.tiempo === 0) clearInterval(contador);
    //         setTimeout(() => {
    //             alerta("TU SESION SE CERRARÁ","error")
    //             logout()
    //             localStorage.removeItem('tiempo');
    //             localStorage.removeItem('cambio');
    //             window.location.href ='/login'  
    //         }, localStorage.tiempo );
    // }
    
    // let contador = setInterval(()=>{
    //     // if(localStorage.cambio === undefined){
    //         localStorage.tiempo = localStorage.tiempo - 1000
    //     // }
        
    // },1000)
    
}