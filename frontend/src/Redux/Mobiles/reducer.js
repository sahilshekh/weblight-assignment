import 
{LOADING,MOBILES_TEN_DETAILS,SMARTPHONES,
    MOBILES_TWENTY_DETAILS,ERRORS,MOBILE} 
    from "./action"

const initState = {
    loading:false,
    details:[],
    item_info:[],
    error:false
}

export const MobileReducer = (state = initState,{type,payload})=>{

    switch (type)
    {
        case LOADING:
            return {...state,loading:true}
        case SMARTPHONES:
            return {...state,loading:false,details:payload,error:false}
        case MOBILES_TEN_DETAILS:
            return {...state,loading:false,details:payload,error:false}
        case MOBILES_TWENTY_DETAILS:
            return {...state,loading:false,details:payload,error:false}
        case MOBILE:
            return {...state,loading:false,item_info:payload,error:false}
        case ERRORS:
            return {...state,loading:false,error:true}
        default:
            return state
    }
}