import {USER_DETAILS,LOGOUT,REGISTERED} from "./action" 

const initState = {
    registered:false,
    isAuth:JSON.parse(localStorage.getItem("auth")) || false,
    userDetails:[]
}

export const UserReducer = (state = initState,{type,payload})=>{
    switch (type)
    {
        case REGISTERED:
            return {...state,registered:true}
        case USER_DETAILS:
            localStorage.setItem("auth",JSON.stringify(true))
            return {...state,isAuth:true,userDetails:payload};
        case LOGOUT:
            localStorage.setItem("user",JSON.stringify({}))
            localStorage.setItem("auth",JSON.stringify(false))
            return {...state,isAuth:false,userDetails:[]}
        default:
            return state;
    }
    
}