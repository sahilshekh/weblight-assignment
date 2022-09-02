import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import {useDispatch,useSelector} from "react-redux";
import { useNavigate, Navigate} from "react-router-dom";
import {Signin} from "../../Redux/User/action"
import Style from "./SignInUp.module.css"

export const SignIn = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isAuth} = useSelector((store)=> store.user)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => dispatch(Signin(data));

    if(isAuth)
  {
    return <Navigate to="/home"></Navigate>
  }

  return (<>
    <form className={Style.Form}  onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: true })} placeholder="Enter Username"/>
      {errors.username && <span style={{color:"red"}}>This field is required</span>}
      
      <input {...register("password", { required: true })} type="password" placeholder="Enter Password"/>
      {errors.password && <span style={{color:"red"}}>This field is required</span>}
      
      <input type="submit" />
    </form>
    <div className={Style.account}>
      <b>Don't have an Account?</b>
      <Button style={{margin:"0 3% 0 3%",fontWeight:900}} variant="contained" onClick={()=>{
        navigate("/signup")
      }}>Signup</Button>
    </div>
    </>
  );
}