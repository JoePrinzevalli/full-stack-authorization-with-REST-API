import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                <nav>
                    <ul class="header--signedout">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                        {/* <li><Link to="/signout">Sign Out</Link></li> */}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;