import axiosClient from "config/axios/axiosClient"

// constantes
const dataInicial = {
    array: []
}

// types
const PRODUCTO_LIST_SUCCESS = 'PRODUCTO_LIST_SUCCESS'

// reducer
export default function programaReducer(state = dataInicial, action){
    switch(action.type){
        case PRODUCTO_LIST_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
// actions
export const obtenerProgramaAction = (idSponsor) => async (dispatch, getState) => {
    try {
        let obj = {etiqueta: "PROGRAMA"}
        let response = await axiosClient.post(`parametro/listar`,obj)
        dispatch({
            type: PRODUCTO_LIST_SUCCESS,
            payload: response.data.data  
        })
    } catch (error) {
        console.log(error)
    }
}