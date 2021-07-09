import axiosClient from "config/axios/axiosClient"

// constantes
const dataInicial = {
    array: []
}

// types
const SPONSOR_LIST_SUCCESS = 'SPONSOR_LIST_SUCCESS'

// reducer
export default function sponsorReducer(state = dataInicial, action){
    switch(action.type){
        case SPONSOR_LIST_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
// actions
export const obtenerSponsorAction = (idSponsor) => async (dispatch, getState) => {
    try {
        let response = await axiosClient.post(`sponsors/proveedores`,idSponsor)
        dispatch({
            type: SPONSOR_LIST_SUCCESS,
            payload: response.data.data  
        })
    } catch (error) {
        console.log(error)
    }
}