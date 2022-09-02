import axios from "axios";
import { useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import {useNavigate} from "react-router-dom"

export const Payment = () =>{

    const navigate = useNavigate()

    const Razorpay = useRazorpay();
    const [order,setOrder] = useState("")

    let total = {
        amount:JSON.parse(localStorage.getItem("total"))
    }  
    const {phone} = JSON.parse(localStorage.getItem("formData")) 
    
    let amount = total.amount*100
    useEffect(()=>{
        axios.post("https://mobi-world-8.herokuapp.com/razor/orderId",amount)
        .then(({data})=>{
            setOrder(data.orderId)
        })
    },[])

    const options = {
        "key": "rzp_test_FEuVDwpJ8tTUZi", 
        "amount": amount,
        "currency": "INR",
        "name": "Mobi World",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order, 
        "handler": function (response){

            axios.post("https://mobi-world-8.herokuapp.com/razor/verify",{response})
            .then(({data})=>{
                console.log("data",data)
                if(data.signatureIsValid)
                {
                    localStorage.setItem("id",JSON.stringify(response.razorpay_payment_id))
                    navigate("/mobile/confirm")
                }
                else
                {
                    alert("Payment Failed!. Please try again")
                    navigate("/mobile/checkout")
                }
            })
        },
        "prefill": {
            "name": "Mobiworld",
            "email": "mobileworld@mobilWorld.com",
            "contact": phone || "888888888"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "orange"
        }
    };
    console.log(options,"Options")
    let rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.reason);
    });
    
    rzp1.open();

    return <div></div>
}

