import { Navigate } from "react-router-dom";

import {Outlet} from 'react-router-dom'
function ProtectRouter() {   
        if (!localStorage.getItem('accessToken')) {
           return <Navigate to='/' />
           }
     return (
        <Outlet/>
  )
}

export default ProtectRouter