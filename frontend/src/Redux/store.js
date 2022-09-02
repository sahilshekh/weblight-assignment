import { configureStore } from '@reduxjs/toolkit'
import {MobileReducer,} from "./Mobiles/reducer"
import thunk from 'redux-thunk'
import { compose,applyMiddleware, combineReducers } from 'redux'
import { UserReducer } from './User/reducer'
import {cartReducer} from "./Cart/reducer"

const rootReducer = combineReducers({
    mobiles:MobileReducer,
    user:UserReducer,
    items:cartReducer
})

const middleware = [thunk];

export const store = configureStore({reducer:rootReducer},
    compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

