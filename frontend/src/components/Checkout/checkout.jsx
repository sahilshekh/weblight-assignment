import Style from "./checkout.module.css"
import {Box,TextField} from '@mui/material';
import { useEffect, useReducer } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux"
import {GetCart} from "../../Redux/Cart/action"
import {Table,TableCell,TableContainer,Button,
        TableBody,TableHead,TableRow,Paper} from '@mui/material';


const initState = {
    name:"",
    phone:"",
    address:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
}

const FormReducer = (store,{type,payload})=>{

    switch (type)
    {
        case "ADD_NAME":
            return {...store,name:payload}
        case "ADD_PHONE":
            return {...store,phone:payload}
        case "ADD_ADDRESS":
            return {...store,address:payload}
        case "ADD_CITY":
            return {...store,city:payload}
        case "ADD_STATE":
            return {...store,state:payload}
        case "ADD_COUNTRY":
            return {...store,country:payload}
        case "ADD_PINCODE":
            return {...store,pincode:payload}
        default:
            return store
        }
}

export const Checkout = () =>{

    const [store,dispatch] = useReducer(FormReducer,initState)

    const {carts} = useSelector((store)=> store.items)
    const reduxdispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        reduxdispatch(GetCart())
    },[])
    
    const Discount_RATE = 0.05;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

let rows = []
carts?.map((item)=>{
     rows = [...rows,createRow(item.name,item.inPrice,item.count)];
      })

const invoiceSubtotal = subtotal(rows);
const invoiceDiscount = Discount_RATE * invoiceSubtotal|0;
const invoiceTotal = invoiceSubtotal - invoiceDiscount|0;

      const {name,phone,address,city,state,country,pincode} = store

    return <div className={Style.MainBox}>
            <Box className={Style.formBox} component="form"sx={{
                    '& > :not(style)': { m: 0, width: '100ch' },}}
                noValidate autoComplete="off">
                    <h1 style={{marginBottom:"3%"}}>Billing Details</h1>
                <div className={Style.forms}>

                    <TextField fullWidth required id="outlined-required" value={name}
                        label="Full Name" size="small" color="warning"
                       onChange={(e)=>{dispatch({type:"ADD_NAME",payload:e.target.value})}} />

                    <TextField fullWidth required id="outlined-required" value={phone}
                    label="Phone Number" size="small" color="warning" 
                        onChange={(e)=>{dispatch({type:"ADD_PHONE",payload:e.target.value})}} />

                    <TextField fullWidth required id="outlined-required" value={address}
                    label="Street Address" size="small" color="warning"
                        onChange={(e)=>{dispatch({type:"ADD_ADDRESS",payload:e.target.value})}} />

                    <TextField fullWidth required id="outlined-required" value={city}
                    label="City" size="small" color="warning"
                        onChange={(e)=>{dispatch({type:"ADD_CITY",payload:e.target.value})}} />

                    <TextField fullWidth required id="outlined-required" value={state}
                    label="State" size="small" color="warning"
                        onChange={(e)=>{dispatch({type:"ADD_STATE",payload:e.target.value})}} />

                    <TextField fullWidth required id="outlined-required" value={country}
                    label="Country"size="small" color="warning"
                       onChange={(e)=>{dispatch({type:"ADD_COUNTRY",payload:e.target.value})}} />

                    <TextField fullWidth required id="outlined-required" value={pincode}
                    type="number" label="Pincode"
                         size="small" color="warning"
                        onChange={(e)=>{dispatch({type:"ADD_PINCODE",payload:e.target.value})}} />
                </div>
            </Box>
            <Box className={Style.formBox} component="div"sx={{
                    '& > :not(style)': { m: 0, width: '30ch' },}}
                noValidate autoComplete="off">
                <h1 style={{marginLeft:"30%",marginBottom:"5%"}}>Cart Details</h1>
                <TableContainer component={Paper} className={Style.Table} style={{fontSize:18}}>
                    <Table sx={{ minWidth: 200 }} aria-label="spanning table">
                        <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:900,fontSize:20}} align="center" colSpan={3}>
                                Details
                            </TableCell>
                            <TableCell align="center" style={{fontWeight:900,fontSize:20}}>
                                Price</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontWeight:900,fontSize:17,color:"blue"}}>Mobiles</TableCell>
                            <TableCell align="center" style={{fontWeight:900,fontSize:17,color:"blue"}}>Price</TableCell>
                            <TableCell align="center" style={{fontWeight:900,fontSize:17,color:"blue"}}>Unit</TableCell>
                            <TableCell align="center" style={{fontWeight:900,fontSize:17,color:"blue"}}>Sum</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.desc}>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell align="center">{row.qty}</TableCell>
                            <TableCell align="center">{row.unit}</TableCell>
                            <TableCell align="center">{ccyFormat(row.price)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2} style={{fontWeight:900}}>Subtotal</TableCell>
                            <TableCell align="center">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontWeight:900}}>Discount</TableCell>
                            <TableCell align="center" style={{color:"green",fontWeight:900}}>{`${(Discount_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="center" >{ccyFormat(invoiceDiscount)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} style={{fontWeight:900,fontSize:20}}>Total</TableCell>
                            <TableCell align="center" style={{fontWeight:900,fontSize:20}}>{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button className={Style.pay}
                    variant="contained"
                    onClick={()=>{
                        localStorage.setItem("formData",JSON.stringify(store))
                        localStorage.setItem("total",JSON.stringify(invoiceTotal))
                        navigate("/mobile/payment")
                    }}>Pay</Button>
            </Box>
        </div>
}
