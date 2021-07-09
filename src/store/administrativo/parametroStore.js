import axiosClient from "config/axios/axiosClient"

// constantes
const dataInicial = {
    array: []
}

// types
const PARAMETRO_LIST_SUCCESS = 'PARAMETRO_LIST_SUCCESS'

// reducer
export default function parametrosReducer(state = dataInicial, action){
    switch(action.type){
        case PARAMETRO_LIST_SUCCESS:
            return {...state, array: action.payload} 
        default:
            return state
    }
}
// actions
export const obtenerParametrosAction = () => async (dispatch, getState) => {
    try {
        let response = await axiosClient.post('parametro/listar')
        dispatch({
            type: PARAMETRO_LIST_SUCCESS,
            payload: response.data.data
  
        })
    } catch (error) {
        console.log(error)
    }
}