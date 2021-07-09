import axiosClient from "config/axios/axiosClient"

// constantes
const dataInicial = {
    estados: [],
    tipo_docs:[]
}

// types
const ESTADO_LIST_SUCCESS = 'ESTADO_LIST_SUCCESS'
const TIPO_DOC_LIST_SUCCESS = 'TIPO_DOC_LIST_SUCCESS'

// reducer
export default function mixedReducer(state = dataInicial, action){
    switch(action.type){
        case ESTADO_LIST_SUCCESS:
            return {...state, estados: action.payload}
        case TIPO_DOC_LIST_SUCCESS:
            return {...state, tipo_docs: action.payload}
        default:
            return state
    }
}
// actions
export const obtenerEstadosAction = () => async (dispatch, getState) => {
    try {
        let obj = {idPadre: 0, etiqueta: "ESTADO"}
        let response = await axiosClient.post(`parametro/listar`,obj)
        dispatch({
            type: ESTADO_LIST_SUCCESS,
            payload: response.data.data  
        })
    } catch (error) {
        console.log(error)
    }
}

export const obtenerTipoDocumentoAction = () => async (dispatch, getState) => {
    try {
        let obj = {idPadre: 0, etiqueta: "TIPODOC"}
        let response = await axiosClient.post(`parametro/listar`,obj)
        dispatch({
            type: TIPO_DOC_LIST_SUCCESS,
            payload: response.data.data  
        })
    } catch (error) {
        console.log(error)
    }
}