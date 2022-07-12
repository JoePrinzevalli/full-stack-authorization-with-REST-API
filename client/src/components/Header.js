import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from '../Context';

//a static header for every page
const Header = () => {
    const context = useContext(Context);
    return(
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                <nav>
                {context.authenticatedUser 
                    ? 
                    (
                            <ul className="header--signedin">
                                <li>Welcome, {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}!</li>
                                <li>
                                    <Link to='/signout/'> Sign Out </Link>
                                </li>
                            </ul>
                    ) 
                    : 
                    (
                        <React.Fragment>
                            <ul className='header--signedout' >
                                <li><Link  to='/signup/'> Sign Up</Link></li>
                                <li><Link  to='/signin/'> Sign In</Link></li>
                            </ul>
                        </React.Fragment>
                    )
                }
                </nav>
            </div>
        </header>
    )
}

export default Header;