import React, { useState } from 'react';
// import Data from './Data';

export const Context = React.createContext(); 

const api = (path, method, body = null, requireAuth = false, credentials = null) => {
  const url = 'http://localhost:5000/api' + path;

  const authOptions = {
      method, 
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
      },
  };

  if (body !== null) {
      authOptions.body = JSON.stringify(body);
  }
  
  if (requireAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      authOptions.headers['Authorization'] = `Basic ${encodedCredentials}`;
  }
  
  
  return fetch(url, authOptions);
  };


export function Provider(props) {

    const [authenticatedUser, setAuthenticatedEmail] = useState();
    const [authenticatedPassword, setAuthenticatedPassword] = useState();
    // const [authenticatedId, setAuthenticatedId] = useState();

    const value = {
      authenticatedUser,
      authenticatedPassword,
      actions: {
          getUser: getUser,
          createUser: createUser,
          signIn: signIn,
          signOut: signOut,
          createCourse: createCourse,
          deleteCourse: deleteCourse
      },
  }

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>  
  )
    
  // 4 fucntions: signOut, signIN, getUser and createUser
  async function signIn (emailAddress, password, ) {
    const user = await getUser(emailAddress, password, );
    if(user !== null) {
        setAuthenticatedEmail(user);
        setAuthenticatedPassword(password);
        // setAuthenticatedId(id)
    }
    return user;
};

  async function signOut() {
    setAuthenticatedEmail(null);
    setAuthenticatedPassword(null);
    // setAuthenticatedId(null)
  };

  async function getUser(emailAddress, password, id) {
    const res = await api(`/users`, 'GET', null, true, {emailAddress, password, id});
    if (res.status === 200) {
        return res.json()
            .then(data => data);
    }
    else if (res.status === 401) {
        return null;
    }
    else {
        throw new Error();
    }
  }

  async function createUser(user) {
    const res = await api('/users', 'POST', user);
    if (res.status === 201) {
        return [];
    }
    else if (res.status === 400) {
        return res.json()
            .then(data => {
                 return data.errors;
            });
    }
    else {
        throw new Error();
    }
}
// const api = (path, method, body = null, requireAuth = false, credentials = null) 
async function createCourse(title, description, estimatedTime, materialsNeeded, emailAddress, password, authenticatedUser) {
  const stuff = (title, description, estimatedTime, materialsNeeded, authenticatedUser.id, authenticatedUser.emailAddress, authenticatedPassword)
  const res = await api('/courses/create', 'POST', stuff, true, {emailAddress, password} );
  console.log(authenticatedUser.id);
  if (res.status === 201) {
      return [];
  }
  else if (res.status === 400) {
      return res.json()
          .then(data => {
               return data.errors;
          });
  }
  else {
      throw new Error();
  }
}

async function deleteCourse() {
  const res = await api('/courses/:id', 'DELETE');
  if (res.status === 201) {
      return [];
  }
  else if (res.status === 400) {
      return res.json()
          .then(data => {
               return data.errors;
          });
  }
  else {
      throw new Error();
  }
}

}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

