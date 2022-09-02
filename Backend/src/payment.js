const express = require("express")
const Razorpay = require("razorpay")

const router = express.Router()

const instance = new Razorpay({
    key_id: process.env.razorId,
    key_secret: process.env.razorKey,
  });

  const details = new Razorpay(
    { key_id: process.env.razorId, key_secret: process.env.razorKey })

router.post("/payment/details",async(req,res)=>{
  try{
      const {payment_id} = req.body
      const data = await details.payments.fetch(payment_id)
      return res.send(data)
    }
    catch(err)
    {
      return res.send(err)
    }
  
})

router.post("/orderId",async(req,res)=>{
try{
    const options = {
      amount: req.body.amount*100,
      currency: "INR",
      receipt: "order_rcptid_08"
    };
    instance.orders.create(options, function(err, order) {

      return res.send({orderId:order.id})
    });
  }
  catch(err)
  {
    return res.send(err)
  }

})

router.post("/verify",async(req,res)=>{

  let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
 
   let crypto = require("crypto");
   let expectedSignature = crypto.createHmac('sha256', 'YL2n7mUUjYes0ibhMPGUbjAQ')
                                   .update(body.toString())
                                   .digest('hex');
                                   console.log("sig received " ,req.body.response.razorpay_signature);
                                   console.log("sig generated " ,expectedSignature);
   let response = {"signatureIsValid":"false"}
   if(expectedSignature === req.body.response.razorpay_signature)
    response={"signatureIsValid":"true"}
       return res.send(response);
   });


module.exports = router