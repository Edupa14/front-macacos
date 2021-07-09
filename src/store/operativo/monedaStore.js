import axiosClient from "config/axios/axiosClient"

// constantes
const dataInicial = {
    array: []
}

// types
const MONEDA_LIST_SUCCESS = 'MONEDA_LIST_SUCCESS'

// reducer
export default function MonedaReducer(state = dataInicial, action){
    switch(action.type){
        case MONEDA_LIST_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
// actions
export const obtenerMonedaAction = () => async (dispatch, getState) => {
    try {
        let obj = {etiqueta: "MONEDA"}
        let response = await axiosClient.post(`parametro/listar`,obj)
        dispatch({
            type: MONEDA_LIST_SUCCESS,
            payload: response.data.data  
        })
    } catch (error) {
        console.log(error)
    }
}