
import Style from "./Navbar.module.css"
import {AccountCircle,ShoppingCart} from '@mui/icons-material/';
import { Link, useNavigate} from "react-router-dom";
import React,{ useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { GetCart} from "../../Redux/Cart/action";
import {logOut} from "../../Redux/User/action"
import {Button,Menu,MenuItem,Badge,IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 17,
    top: "-5px",
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const StyledShoppingCart = styled(ShoppingCart)(({ theme }) => (
  {
   color:"white",
   fontSize:"34px"
  }
));
  

export const SiteNavbar = () =>{


   let {username} = JSON.parse(localStorage.getItem("user")) || "username"
  // let username = "sahil"
  // console.log(username,"line no 33")

  if(username == undefined)
  {
    username = "username"
  }

  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {carts} = useSelector((store)=> store.items)
  const {isAuth} = useSelector((store)=> store.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(GetCart())
  },[])

  const ChangeLocation = () =>{

    if(isAuth)
    {
      dispatch(logOut())
    }
    else
    {
      navigate("/signin")
    }
  }

    let counts = 0;
    if(!carts)
    {
      return <div></div>
    }
    
    if(isAuth)
    {
      carts?.map((item)=>{
        counts = counts+item.count
      })
    }

    return <div className={Style.navbar}>
        <div className={Style.logo_title}>
          <b> <Link style={{textDecoration:"none",color:"rgb(239, 138, 5)"}} to="/home">Mobi Galaxy</Link></b>
        </div>
        <div className={Style.smartPhones}>
            <Button
              id="basic-button"
              style={{color:"white",fontWeight:900}}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
              SmartPhones
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',}}>
              <MenuItem onClick={handleClose}> <Link className="Link" to="/mobiles">All SmartPhones</Link> </MenuItem>
              <MenuItem onClick={handleClose}><Link className="Link" to="/mobiles/under_10000">Under 10000</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link className="Link" to="/mobiles/under_20000">Under 20000</Link></MenuItem>
            </Menu>
          </div>
        <div className={Style.right_content}>
          <div style={{display:"flex"}}>
            <AccountCircle className={Style.Icons} style={{color:username == "username"?"white":"orange"}}/>
            <b className={Style.userName}>{username}</b>
          </div>
          <div style={{display:"flex"}}>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={counts} color="warning" onClick={()=>{
                navigate("/mobiles/cart")
              }}>
                <StyledShoppingCart className={Style.Icons}>
                </StyledShoppingCart>
              </StyledBadge>
            </IconButton>
            <b className={Style.Cart}>
              <Link style={{textDecoration:"none",color:"white"}} 
              to="/mobiles/cart">Cart</Link>
            </b>
          </div>
          <b style={{cursor:"pointer"}} onClick={()=>{
            ChangeLocation()
          }}>{isAuth?"Logout":"Login"}</b>
        </div>
    </div>
}