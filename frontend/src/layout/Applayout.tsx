import { Outlet } from "react-router-dom"
import Navbars from "./Navber"


const Applayout = () => {
  
  
  return (
    <>
    <Navbars />
    <Outlet />
    </>
  )
}

export default Applayout