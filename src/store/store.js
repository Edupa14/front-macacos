import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from 'store/administrativo/userStore'
import rolReducer from 'store/administrativo/rolStore'
import parametrosReducer from 'store/administrativo/parametroStore'
import sponsorReducer from 'store/operativo/sponsorStore'
import productosReducer from 'store/operativo/productoStore'
import mixedReducer from 'store/globales/mixStore'
import programaReducer from './operativo/programaStore'
import MonedaReducer from './operativo/monedaStore'

const rootReducer = combineReducers({
    users: userReducer,
    roles: rolReducer,
    sponsors: sponsorReducer,
    productos:productosReducer,
    programas:programaReducer,
    monedas:MonedaReducer,
    parametros: parametrosReducer,
    mixed:mixedReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}