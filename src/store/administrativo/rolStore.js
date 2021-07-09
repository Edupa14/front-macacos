// constantes
const dataInicial = {
    array: []
}

// types
const ROL_LIST_SUCCESS = 'ROL_LIST_SUCCESS'

// reducer
export default function rolReducer(state = dataInicial, action){
    switch(action.type){
        case ROL_LIST_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
// actions
export const obtenerRolesAction = (dataAxios) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ROL_LIST_SUCCESS,
            payload: dataAxios  
        })
    } catch (error) {
        console.log(error)
    }
}