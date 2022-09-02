const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
require("dotenv").config()

const signinController = require("./Controller/signin-controller")
const signupController = require("./Controller/signup-controller")
const authController = require("./Controller/auth-controller")
const cartController = require("./Controller/cart_controller")
const phoneController = require("./Controller/phones_controller")
const payment = require("./payment")

const app = express()
app.use(express.json())
app.use(cors())
app.use("/signup",signupController)
app.use("/signin",signinController)
app.use("/auth",authController)
app.use("/cart",cartController)
app.use("/phone",phoneController)
app.use("/razor",payment)

const port = process.env.PORT || 3000
const db = process.env.db

app.listen(port,async()=>{

  try{
      await mongoose.connect(db)
      console.log("Connected Port number",port)
  }
  catch(err)
  {
      console.error(err,"Failed to Connect to DB",db)
  }
})
