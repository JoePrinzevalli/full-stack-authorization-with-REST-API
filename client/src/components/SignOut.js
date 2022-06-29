import React, { useContext, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { Context } from "../Context";

const SignOut = () => {
    const context = useContext(Context);
    useEffect( () => {
        context.actions.signOut() 
    });
    return (
        <Navigate to='/' />
     )
}

export default SignOut;