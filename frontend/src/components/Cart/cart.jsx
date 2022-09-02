import { Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import {GetCart,UpdateCart,DeleteCart} from "../../Redux/Cart/action"
import Style from "./cart.module.css"
import { v4 as uuid } from 'uuid';
import {Link} from "react-router-dom"

export const Cart = () =>{

    const {carts} = useSelector((store)=> store.items)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(GetCart())
    },[])

    if(carts.length == 0)
    {
        return <div style={{width:"90%",height:"500px",margin:"auto"}}>
            <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fiticsystem.com%2Fimg%2Fempty-cart.png&f=1&nofb=1" alt="" />
        </div>
    }

    return <div className={Style.cartBox}>
            <div className={Style.ImgSpecs}>
            {carts?.map((item)=>(
                <div key={uuid()} className={Style.Item}>
                    <div style={{width:"50%"}}>
                        <img className={Style.image} src={item.image} alt="" />
                    </div>
                    <div className={Style.contents}>
                        <h3>{item.name}</h3>
                        <h4>Unit: <b style={{fontSize:"24px"}}>{item.count}</b> </h4>
                        <div className={Style.Button}>
                        <button onClick={()=>{
                            dispatch(UpdateCart(item,item._id,item.inPrice,item.count+1))}}>+</button>
                        <button disabled={item.count==1} style={{background:item.count==1?"red":""}} onClick={()=>{
                            dispatch(UpdateCart(item,item._id,item.inPrice,item.count-1))}}>-</button>  
                        </div>
                        <h2>₹ {item.upPrice}</h2>
                        <Button variant="contained" style={{background:"rgb(187, 0, 0)"}}
                        onClick={()=>{dispatch(DeleteCart(item._id))}}>Remove</Button>
                    </div>
                </div>
            ))}
            </div>
            <div style={{textAlign:"right"}}>
            <Button variant="outlined" className={Style.Checkout}>
                        <Link style={{color:"white"}} className="Link" 
                        to="/mobile/checkout">Checkout</Link>
            </Button>
            </div>
    </div>
    
}