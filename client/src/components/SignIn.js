import React, {useState, useContext} from 'react';
import { Context } from '../Context';
import { Link, useNavigate } from 'react-router-dom';


const SignIn = () => {

    const handleCancel = (e) => {
        e.preventDefault();
        history('/');
    }

    const context = useContext(Context);
    const history = useNavigate();
    const [emailAddress, setEmailAddress ] = useState('');
    const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState( [] );

    const handleSubmit = (e) => {
        e.preventDefault();
        context.actions.signIn({emailAddress, password})
        .then( user => {
            if ((user) === null) {
                return { errors: ['Your login was unsuccessful. Please try again.'] };
            } else {
                history('/');
            }
      })
      .catch((err) => {
        console.log(err);
        history('/error');
      });
  }


    return(
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                {/* { errors } */}
                <React.Fragment>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email"
                    onChange={(e) => setEmailAddress(e.target.value)}
                    value={emailAddress}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                    id="password" 
                    name="password" 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}   
                    />
                    <button className="button" type="submit" onClick={handleSubmit}>Sign In</button>
                    <button className='button button-secondary' onClick={handleCancel}>Cancel</button>
                </React.Fragment>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </main>
    )
}


export default SignIn;