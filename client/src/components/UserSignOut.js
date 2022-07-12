import React, { useContext, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { Context } from "../Context";

//helps a user signout and return to home screen
const UserSignOut = () => {
    const context = useContext(Context);
    useEffect( () => {
        context.actions.signOut() 
    });
    return (
        <Navigate to='/' />
     )
}

export default UserSignOut;