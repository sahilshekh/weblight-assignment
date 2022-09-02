import axios from "axios";

export const REGISTERED = "REGISTERED";

export const Registered = (payload)=>({type:REGISTERED})

export const USER_DETAILS = "USER_DETAILS";

export const userDetails = (payload)=>({type:USER_DETAILS,payload})

export const LOGOUT = "LOGOUT";

export const logOut = ()=>({type:LOGOUT})

export const Signup = (details)  => (dispatch) =>{
    alert("Please Wait...")
    axios.post(`https://mobi-world-8.herokuapp.com/signup`,details)
    .then(({data})=>{
        alert(data.message)
        if(data.message == "User Registered")
        {
            dispatch(Registered())
        }
    })
}

export const Signin = (details) => (dispatch)=>{
    
    alert("Please Wait...")
    axios.post(`https://mobi-world-8.herokuapp.com/signin`,details)
    .then(({data})=>{
        dispatch(authentication(data.token))
    })
    .catch((error)=>{
        alert("Incorrect UserName or Password")
    })
}

const authentication = (token) => (dispatch) =>{
    let link = {headers: {authorization : `Bearer ${token}`} }
    axios.get(`https://mobi-world-8.herokuapp.com/auth`,link)
    .then(({data})=>{
        let {user,message} = data

        localStorage.setItem("user",JSON.stringify(user))
        alert(message)
        if(data.message=="Signin Successfull")
        {
            dispatch(userDetails(data.user))
        }
        
    })
    .catch((error)=>{
        alert("Something went wrong, Try Again")
    })
}
