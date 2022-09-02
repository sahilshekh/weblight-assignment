import Style from "./order.module.css"
import {Table,TableBody,TableCell,TableContainer,
    TableHead,TableRow,Paper} from '@mui/material'
import axios from "axios"
import {useEffect,useState} from "react"
import { useDispatch } from "react-redux"
import {cartItems} from "../../Redux/Cart/action"

export const Confirm = () =>{

    const user = JSON.parse(localStorage.getItem("formData"))
    const payment = JSON.parse(localStorage.getItem("id"))
    const regUser = JSON.parse(localStorage.getItem("user"))

    const dispatch = useDispatch()

    const [paydetails,setPayDetails] = useState()

    const address = `${user.address} ,${user.city} ,${user.state} ,${user.country}, ${user.pincode}`

    useEffect(()=>{        
        axios.post("https://mobi-world-8.herokuapp.com/razor/payment/details",{payment_id:payment})
        .then((res)=>{
            setPayDetails(res.data)        
        })
    },[])

    useEffect(()=>{
        axios.delete("https://mobi-world-8.herokuapp.com/cart")
        .then(()=>{
            dispatch(cartItems([]))
        })
    },[])

    return <div>
        <div className={Style.success}>
            <h2>Order Successfull !</h2>
        </div>
        <div className={Style.Order_Div}>
        <div className={Style.User}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableBody className={Style.TableBody}>
                    <TableRow style={{height:"10%"}}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell align="left"> <b>Name</b></TableCell>
                        <TableCell align="center"> <kbd>{user.name}</kbd></TableCell>
                    </TableRow>
                    <TableRow style={{height:"80px"}}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell align="left"> <b>Address</b></TableCell>
                        <TableCell align="center"> <kbd>{address}</kbd></TableCell>
                    </TableRow>
                    <TableRow style={{height:"80px"}}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell align="left"> <b>Phone</b></TableCell>
                        <TableCell align="center"> <kbd>{user.phone}</kbd></TableCell>
                    </TableRow>
                    <TableRow style={{height:"80px"}}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell align="left"> <b>Email</b></TableCell>
                        <TableCell align="center"> <kbd>{regUser.email}</kbd></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </div>
        <div className={Style.Order}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 130 }} aria-label="simple table">
                <TableBody className={Style.TableBody}>
                    <TableRow style={{height:"80px"}}>
                        <TableCell align="left"> <b>Order Id</b></TableCell>
                        <TableCell align="center"> <kbd> {paydetails?.order_id || "-----"} </kbd></TableCell>
                    </TableRow>
                    <TableRow style={{height:"80px"}}>
                        <TableCell align="left"> <b>Status</b> </TableCell>
                        <TableCell align="center"> <kbd>Success</kbd></TableCell>
                    </TableRow>
                    <TableRow style={{height:"80px"}}>
                        <TableCell align="left"> <b>Mode of Payment</b></TableCell>
                        <TableCell align="center"> <kbd>{paydetails?.method}</kbd></TableCell>
                    </TableRow>
                    <TableRow style={{height:"80px"}}>
                        <TableCell align="left"> <b>Payment from</b></TableCell>
                        <TableCell align="center"> <kbd>{paydetails?.bank || paydetails?.card_id || 
                        paydetails?.vpa||paydetails?.wallet} </kbd> </TableCell>
                    </TableRow>
                    <TableRow style={{height:"80px"}}>
                        <TableCell align="left"> <b>Transaction Id</b></TableCell>
                        <TableCell align="center"> <kbd>
                            {paydetails?.acquirer_data.upi_transaction_id || 
                                    paydetails?.acquirer_data.bank_transaction_id}</kbd> </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </div>
        </div>
    </div>
}