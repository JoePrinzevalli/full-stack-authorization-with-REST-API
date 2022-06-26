import React from "react";
import { Link } from "react-router-dom";

function SignIn() {

    return(
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <React.Fragment>
                    <label for="emailAddress">Email Address</label>
                    <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email"  
                    />
                    <label for="password">Password</label>
                    <input 
                    id="password" 
                    name="password" 
                    type="password"  
                    />
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='/';">Cancel</button>
                </React.Fragment>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </main>
    )
}


export default SignIn;