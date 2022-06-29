import React, {useContext} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Context } from '../Context';



const PrivateRoute = () => {

    var { authenticatedUser } = useContext(Context);

    return authenticatedUser 
    ? 
    <Outlet /> 
    : 
    <Navigate to="/signin" />;
    
}

export default PrivateRoute;