import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector,useDispatch} from "react-redux"
import {Get_All,GetAllSortFilter} from "../Redux/Mobiles/action"
import Style from "./Category/category.module.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link} from "react-router-dom"
import { Loading } from "./loading"


export const SmartPhones = ({handleScroll,size})=>{

    const {loading,details,error} = useSelector((store)=> store.mobiles)
    const dispatch = useDispatch()

    const [sort,setSort] = useState("asc")
    const [brand,setBrand] = useState("")

    useEffect(()=>{
        dispatch(GetAllSortFilter(sort,brand))
    },[sort,brand])

    useEffect(()=>{
        dispatch(Get_All())
    },[])

    if(loading)
    {
        return <Loading></Loading>
    }

    return <>
         <div className={Style.topBar}>
         <FormControl style={{marginTop:0,marginRight:"4%"}} 
                    sx={{ m: 1, minWidth: 180 }} size="small">
            <InputLabel style={{color:"black",fontWeight:900}} id="demo-select-small">Brand</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    onChange={(e)=>{setBrand(e.target.value)}}
                    label="Brand"
                    >
                    <MenuItem value=" ">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Real"}>Realme</MenuItem>
                    <MenuItem value={"Redmi"}>Redmi</MenuItem>
                    <MenuItem value={"Moto"}>Motorola</MenuItem>
                    <MenuItem value={"Samsung"}>Samsung</MenuItem>
                    <MenuItem value={"Infinix"}>Infinix</MenuItem>
                    <MenuItem value={"OnePlus"}>One Plus</MenuItem>
                    <MenuItem value={"Poco"}>Poco</MenuItem>
                </Select>
            </FormControl>
            <Button style={{marginRight:"5%",background:sort=="asc"?"green":"red"}} 
            variant="contained"
            onClick={()=>{setSort(sort=="asc"?"desc":"asc")}}>Price {sort}</Button>
        </div>
    
        <div className={Style.MainBox}>
        {details.map((phone)=>(
            <div className={Style.EachItem}>
                <div className={Style.Image}>
                    <img id={Style.img} src={phone.images[0]} alt="" />
                </div>
                <div className={Style.details}>
                    <h2>{phone.name}</h2>
                    <p><b>Price : </b> ₹ {phone.price}</p>
                    <p><b>Launch Date : </b> {phone.launch_date}</p>
                    <Button className={Style.button}>
                        <Link className="Link" to={`/mobile/${phone.name}`}>View Details</Link>
                    </Button>
                </div>
            </div>
            ))}
        </div>
    </>
}