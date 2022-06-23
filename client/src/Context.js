import React, { Component } from 'react';



const Context = React.createContext(); 

export class Provider extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    
  }

  render() {
    
    return(
        <div></div>
    )
    }   
}

export const Consumer = Context.Consumer;


export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

