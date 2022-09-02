import axios from "axios"

export const LOADING = "LOADING";
export const loading = () =>({type:LOADING})

export const SMARTPHONES = "SMARTPHONES";
export const smartPhones = (payload) =>({type:SMARTPHONES,payload})

export const MOBILES_TEN_DETAILS = "MOBILES_TEN_DETAILS";
export const mobileTenDetails = (payload) =>({type:MOBILES_TEN_DETAILS,payload})

export const MOBILES_TWENTY_DETAILS = "MOBILES_TWENTY_DETAILS";
export const mobileTwentyDetails = (payload) =>({type:MOBILES_TWENTY_DETAILS,payload})

export const ERRORS = "ERRORS";
export const errors = () =>({type:ERRORS})

export const MOBILE = "MOBILE";
export const single_mobile = (payload) => ({type:MOBILE,payload})


export const Get_All = () => (dispatch) => {

    dispatch(loading())

    axios.get(`https://mobi-world-8.herokuapp.com/phone`)
    .then(({data})=>{
        dispatch(smartPhones(data))
    })
    .catch(()=>
    {
        dispatch(errors())
    })
}

export const GetAllSortFilter = (sort,brand) => (dispatch) =>{
    
    dispatch(loading())

    brand = brand || ""
    sort = sort == "asc"?1:-1;
    
    axios.get(`https://mobi-world-8.herokuapp.com/phone/matchsort?phone=${brand}&price=${sort}`)
    .then(({data})=>{
        dispatch(smartPhones(data))
    })
}


export const  Get_Under_Ten = () => (dispatch) => {

    dispatch(loading())

    axios.get("https://mobi-world-8.herokuapp.com/phone/ten")
    .then(({data})=>{
        dispatch(mobileTenDetails(data))
    })
    .catch(()=>
    {
        dispatch(errors())
    })
}

export const  Get_Under_Twenty = () => (dispatch) => {

    dispatch(loading())

    axios.get("https://mobi-world-8.herokuapp.com/phone/twenty")
    .then(({data})=>{
        dispatch(mobileTwentyDetails(data))
    })
    .catch(()=>
    {
        dispatch(errors())
    })
}


export const GetTenSortFilter = (sort,brand) => (dispatch) =>{
    
    dispatch(loading())
    brand = brand || ""
    sort = sort == "asc"?1:-1;
    axios.get(`https://mobi-world-8.herokuapp.com/phone/tenmatchsort?phone=${brand}&price=${sort}`)
    .then(({data})=>{
        dispatch(mobileTenDetails(data))
    })
}

export const GetTwentySortFilter = (sort,brand) => (dispatch) =>{
    
    dispatch(loading())
    brand = brand || ""
    sort = sort == "asc"?1:-1;
    axios.get(`https://mobi-world-8.herokuapp.com/phone/twentymatchsort?phone=${brand}&price=${sort}`)
    .then(({data})=>{
        dispatch(mobileTwentyDetails(data))
    })
}

export const GetMobile = (name) => (dispatch) =>{

    dispatch(loading())

    axios.get(`https://mobi-world-8.herokuapp.com/phone/details/${name}`)
    .then(({data})=>{
        dispatch(single_mobile(data))
    })
}