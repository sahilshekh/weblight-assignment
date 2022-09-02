
import {CARTITEMS} from "./action"

const initState = {
    carts:[]
}

export const cartReducer = (state = initState,{type,payload})=>{

    switch (type)
    {
        case CARTITEMS:
            return {...state,carts:payload}
        default:
            return state;
    }
}