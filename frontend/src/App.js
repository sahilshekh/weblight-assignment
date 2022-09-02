import './App.css'
import {SiteNavbar} from "./Components/Navbar/Navbar"
import { useSelector} from "react-redux"
import { Navigate, Route, Routes } from 'react-router-dom'
import { SignUp } from './Components/SignUpIn/signup'
import { SignIn } from './Components/SignUpIn/signin'
import { Home } from './Components/Home/Home'
import { Footer } from './Components/Footer/Footer'
import {UnderTen} from "./Components/Category/under_ten"
import {UnderTwenty} from "./Components/Category/under_twenty"
import { Single } from './Components/Mobile_Details/mobile_details'
import { Cart } from './Components/Cart/cart'
import { SmartPhones } from './Components/SmartPhones'
import { Checkout } from './Components/Checkout/checkout'
import { Payment } from './Components/payment'
import { Confirm } from './Components/Order_Confirm/confirm'


function App() {

  let {isAuth} = useSelector((store) => store.user)

  const PrivateRoutes = ({children}) =>{
    return isAuth ? children : <Navigate to="/signin"/>
  }

  return (
    <div className="App" >
      <SiteNavbar/>
      <Routes>
          <Route path="/" element={
            <PrivateRoutes>
            <Home/>
          </PrivateRoutes>
          }/>
          <Route path="/home" element={
            <PrivateRoutes>
              <Home/>
            </PrivateRoutes>
          }/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/mobiles" element={
            <PrivateRoutes>
              <SmartPhones/>
            </PrivateRoutes>
            }/>
          <Route path="/mobiles/under_10000" element={
            <PrivateRoutes>
              <UnderTen/>
            </PrivateRoutes>
            }/>
          <Route path="/mobiles/under_20000" element={
            <PrivateRoutes>
              <UnderTwenty/>
            </PrivateRoutes>
            }/>
          <Route path="/mobile/:name" element={<Single/>}/>
          <Route path="/mobiles/cart" element={
            <PrivateRoutes>
              <Cart/>
            </PrivateRoutes>
            }/>
          <Route path="/mobile/checkout" element={<Checkout/>}/>
          <Route path="/mobile/payment" element={<Payment/>}/>
          <Route path="/mobile/confirm" element={<Confirm/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
