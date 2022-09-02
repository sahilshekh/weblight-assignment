import { useEffect, useRef, useState } from "react"
import {Link} from "react-router-dom"
import Style from "./home.module.css"

export const Home = () =>{

    let images = [
        "https://m.media-amazon.com/images/S/aplus-media/vc/19f7a119-76b7-4017-a3d4-d17a9e2bba77.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
        "https://techygalaxy.com/wp-content/uploads/2021/10/xx-7.jpg",
        "https://pbs.twimg.com/media/FOwh2JLWUAA3HFa.jpg",
        "https://www.androidauthority.com/wp-content/uploads/2020/08/redmi-9-india.jpg",
        "https://cdn.paisawapas.com/blog/wp-content/uploads/2018/07/banner.jpg"
    ]

    const [image,setImage] = useState()
    const number = useRef(0)

    useEffect(()=>{

        const run = setInterval(()=>{
            setImage(images[number.current])
            number.current+=1
            number.current == 5?number.current = 0:""
        
        },4000) 
        
        return ()=> clearInterval(run)
        
    })

    return <div>
        <div className={Style.top_image}>
            <img src={image} alt="Phones" />
        </div>
        <div className={Style.catergories_head}>
            <h1>Categories</h1>
            <div className={Style.subTitle}>
                <kbd>₹10000</kbd>
                <kbd>₹20000</kbd>
            </div>
            <div className={Style.cat_images}>
               <Link to="/mobiles/under_10000">
                    <img src="https://www.pricecheckindia.in/wp-content/uploads/2021/04/phones-1.png" alt="10000" loading="eager" />
               </Link>
               <Link to="/mobiles/under_20000">
                    <img src="https://www.shoppingum.com/media/blog/banner_3s7nrq2.jpg" alt="" />
               </Link>
            </div>
        </div>
        <div className={Style.Message}>
            <kbd>" A Place for Best smart phones under Rs 20000 and  Rs 10000 "</kbd>
        </div>

    </div>
}