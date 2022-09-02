import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Navigate } from "react-router-dom";
import Style from "./SignInUp.module.css"
import {Signup} from "../../Redux/User/action"

export const SignUp = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => dispatch(Signup(data));
  const {registered} = useSelector((store)=> store.user)

  if(registered)
  {
    return <Navigate to="/signin"></Navigate>
  }

  return (
    <>
    <form className={Style.Form} onSubmit={handleSubmit(onSubmit)}>

      <input {...register("name", { required: true })} placeholder="Enter your name"/>
      {errors.name && <span style={{color:"red"}}>This field is required</span>}

      <input {...register("username", { required: true })} placeholder="Enter a Username"/>
      {errors.username && <span style={{color:"red"}}>This field is required</span>}

      <input {...register("phone", { required: true })} placeholder="Enter your Phone number"/>
      {errors.phone && <span style={{color:"red"}}>This field is required</span>}

      <input {...register("email", { required: true })} placeholder="Enter your Email"/>
      {errors.email && <span style={{color:"red"}}>This field is required</span>}

      <input {...register("password", { min:8, required: true })} placeholder="Enter a Password"/>
      {errors.password && <span style={{color:"red"}}>This field must be of 8 Characters </span>}

      <input type="submit" />
    </form>

    <div className={Style.account}>
      <b>Already have the Account?</b>
      <Button className={Style.button} variant="contained" onClick={()=>{
        navigate("/signin")
      }}>Signin</Button>
    </div>
    </>
  );
}