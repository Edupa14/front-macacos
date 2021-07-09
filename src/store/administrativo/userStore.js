// constantes
const dataInicial = {
    objecto: {}
}

// types
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'

// reducer
export default function userReducer(state = dataInicial, action){
    switch(action.type){
        case LOGIN_USER_SUCCESS:
            return {...state, objecto: action.payload}
        default:
            return state
    }
}
// actions
export const obtenerUsersAction = (dataAxios) => async (dispatch, getState) => {
    try {
        localStorage.Nombre = dataAxios.Nombre
        localStorage.apePat = dataAxios.apePat
        localStorage.apeMat = dataAxios.apeMat
        localStorage.correo = dataAxios.correo
        localStorage.accesos =  JSON.stringify(dataAxios.accesos)
        localStorage.idUsuario = dataAxios.idUsuario
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: dataAxios  
        })
    } catch (error) {
        console.log(error)
    }
}